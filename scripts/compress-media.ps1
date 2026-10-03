<#
.SYNOPSIS
  Batch-compress the site's media (audio, images, GIFs) with FFmpeg.

.DESCRIPTION
  The two biggest payloads shipped from /public are the MP3 soundtrack and the
  animated GIF(s). This script re-encodes them to web-friendly sizes without a
  noticeable quality drop on phone/laptop speakers and screens.

  What it does:
    1. Ensures FFmpeg is available (offers to install it via winget).
    2. Re-encodes every MP3 under public/songs to a target bitrate (default 128k)
       into a sibling folder, then (optionally) swaps the originals in-place.
    3. Converts large JPEGs to WebP (optional).
    4. Prints a before/after size report.

  GIF -> MP4 conversion is intentionally left as an opt-in flag because the
  birthday cake GIF relies on CSS `mix-blend-screen`, which a plain <video>
  does not reproduce the same way. Use -ConvertGifs only if you also update
  the markup to a <video> element.

.PARAMETER AudioBitrate
  Target MP3 bitrate. Default "128k". Use "160k" or "192k" for higher quality.

.PARAMETER InPlace
  Replace the original MP3s with the compressed versions (a .bak copy is kept
  unless -NoBackup is also passed).

.PARAMETER ConvertImages
  Also generate .webp alongside large .jpg/.jpeg files.

.PARAMETER ConvertGifs
  Also convert .gif -> .mp4 (remember to switch the markup to <video>).

.EXAMPLE
  # Dry run — just see what would change and the size report
  ./scripts/compress-media.ps1

.EXAMPLE
  # Compress audio to 128k and replace originals (keeps .bak backups)
  ./scripts/compress-media.ps1 -InPlace
#>

[CmdletBinding()]
param(
  [string]$AudioBitrate = "128k",
  [switch]$InPlace,
  [switch]$NoBackup,
  [switch]$ConvertImages,
  [switch]$ConvertGifs
)

$ErrorActionPreference = "Stop"

# Resolve project root relative to this script (scripts/ -> project root)
$root     = Split-Path -Parent $PSScriptRoot
$songsDir = Join-Path $root "public\songs"
$imgDir   = Join-Path $root "public\images"

function Write-Head($t) { Write-Host "`n== $t ==" -ForegroundColor Cyan }
function MB($bytes) { [math]::Round($bytes / 1MB, 2) }

# ---------------------------------------------------------------------------
# 1. Ensure FFmpeg
# ---------------------------------------------------------------------------
Write-Head "Checking FFmpeg"
$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
if (-not $ffmpeg) {
  Write-Host "FFmpeg not found." -ForegroundColor Yellow
  $winget = Get-Command winget -ErrorAction SilentlyContinue
  if ($winget) {
    $ans = Read-Host "Install FFmpeg now with winget? (y/N)"
    if ($ans -eq "y") {
      winget install --id Gyan.FFmpeg -e --accept-source-agreements --accept-package-agreements
      Write-Host "`nFFmpeg installed. CLOSE and REOPEN your terminal, then run this script again." -ForegroundColor Green
    } else {
      Write-Host "Skipped. Install FFmpeg and re-run." -ForegroundColor Yellow
    }
  } else {
    Write-Host "winget not available. Install FFmpeg manually: https://ffmpeg.org/download.html" -ForegroundColor Yellow
  }
  return
}
Write-Host "FFmpeg found: $($ffmpeg.Source)" -ForegroundColor Green

$dryRun = -not ($InPlace -or $ConvertImages -or $ConvertGifs)
if ($dryRun) {
  Write-Host "`n[DRY RUN] No flags passed. Showing sizes only." -ForegroundColor Magenta
  Write-Host "Pass -InPlace to compress audio, -ConvertImages / -ConvertGifs for the rest.`n" -ForegroundColor Magenta
}

$before = 0
$after  = 0

# ---------------------------------------------------------------------------
# 2. Audio: re-encode MP3s
# ---------------------------------------------------------------------------
Write-Head "Audio (public/songs -> $AudioBitrate)"
if (Test-Path $songsDir) {
  $mp3s = Get-ChildItem $songsDir -Recurse -Include *.mp3
  foreach ($f in $mp3s) {
    $origMB = MB $f.Length
    $before += $f.Length
    if ($dryRun) {
      Write-Host ("  {0,-32} {1,7} MB" -f $f.Name, $origMB)
      $after += $f.Length
      continue
    }
    if (-not $InPlace) { $after += $f.Length; continue }

    $tmp = Join-Path $f.DirectoryName ("_tmp_" + $f.Name)
    & ffmpeg -y -loglevel error -i $f.FullName -codec:a libmp3lame -b:a $AudioBitrate $tmp
    if ($LASTEXITCODE -eq 0 -and (Test-Path $tmp)) {
      if (-not $NoBackup) { Copy-Item $f.FullName "$($f.FullName).bak" -Force }
      Move-Item $tmp $f.FullName -Force
      $newLen = (Get-Item $f.FullName).Length
      $after += $newLen
      Write-Host ("  {0,-32} {1,7} MB -> {2,7} MB" -f $f.Name, $origMB, (MB $newLen)) -ForegroundColor Green
    } else {
      if (Test-Path $tmp) { Remove-Item $tmp -Force }
      $after += $f.Length
      Write-Host ("  {0,-32} FAILED, left as-is" -f $f.Name) -ForegroundColor Red
    }
  }
} else {
  Write-Host "  (no public/songs folder)" -ForegroundColor DarkGray
}

# ---------------------------------------------------------------------------
# 3. Images: JPEG -> WebP (optional)
# ---------------------------------------------------------------------------
if ($ConvertImages -and (Test-Path $imgDir)) {
  Write-Head "Images (JPEG -> WebP, quality 80)"
  $jpgs = Get-ChildItem $imgDir -Recurse -Include *.jpg, *.jpeg | Where-Object { $_.Length -gt 150KB }
  foreach ($f in $jpgs) {
    $webp = [IO.Path]::ChangeExtension($f.FullName, ".webp")
    & ffmpeg -y -loglevel error -i $f.FullName -c:v libwebp -quality 80 $webp
    if ($LASTEXITCODE -eq 0) {
      Write-Host ("  {0,-28} {1,6} MB -> {2,6} MB (.webp)" -f $f.Name, (MB $f.Length), (MB (Get-Item $webp).Length)) -ForegroundColor Green
    }
  }
  Write-Host "  Note: update <Image src> references from .jpg/.jpeg to .webp." -ForegroundColor Yellow
}

# ---------------------------------------------------------------------------
# 4. GIF -> MP4 (opt-in)
# ---------------------------------------------------------------------------
if ($ConvertGifs -and (Test-Path $imgDir)) {
  Write-Head "GIF -> MP4"
  $gifs = Get-ChildItem $imgDir -Recurse -Include *.gif
  foreach ($f in $gifs) {
    $mp4 = [IO.Path]::ChangeExtension($f.FullName, ".mp4")
    & ffmpeg -y -loglevel error -i $f.FullName -movflags faststart -pix_fmt yuv420p `
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" $mp4
    if ($LASTEXITCODE -eq 0) {
      Write-Host ("  {0,-20} {1,6} MB -> {2,6} MB (.mp4)" -f $f.Name, (MB $f.Length), (MB (Get-Item $mp4).Length)) -ForegroundColor Green
    }
  }
  Write-Host "  Note: swap <Image src='*.gif'> for <video src='*.mp4' autoPlay loop muted playsInline>." -ForegroundColor Yellow
  Write-Host "  The cake GIF uses mix-blend-screen; a <video> won't reproduce that blend identically." -ForegroundColor Yellow
}

# ---------------------------------------------------------------------------
# Report
# ---------------------------------------------------------------------------
Write-Head "Summary"
Write-Host ("  Audio before: {0} MB" -f (MB $before))
if (-not $dryRun -and $InPlace) {
  Write-Host ("  Audio after:  {0} MB" -f (MB $after)) -ForegroundColor Green
  Write-Host ("  Saved:        {0} MB" -f (MB ($before - $after))) -ForegroundColor Green
  Write-Host "`n  Backups (.bak) kept next to each file unless -NoBackup was used." -ForegroundColor DarkGray
}
Write-Host ""
