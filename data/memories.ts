/**
 * Memories are generated automatically from the images on disk.
 *
 * Drop photos into:  public/images/memory/<category>/*.jpeg|jpg|png|webp|gif
 *
 * Every image found becomes a memory card in the Gallery and Memories pages.
 * To add more photos later, just copy them into the right category folder and
 * rebuild — no code changes needed. Supported categories are listed below.
 */

import fs from "node:fs";
import path from "node:path";
import type { Memory } from "@/data/story";

/** Folder name -> label shown in the UI + the mood preset used for the frame. */
const CATEGORY_META: Record<
  string,
  { label: string; preset: string; captions: string[] }
> = {
  childhood: {
    label: "Childhood",
    preset: "dawn",
    captions: [
      "Tiny hands, giant dreams.",
      "Twirling without a care.",
      "The years that smelled like home.",
      "Small shoes, enormous adventures.",
      "Where every day felt endless.",
    ],
  },
  school: {
    label: "School",
    preset: "meadow",
    captions: [
      "Half notes, half doodles, full memories.",
      "Laughing too loud in quiet corridors.",
      "Friendships that outlasted the syllabus.",
      "Lunch breaks and little secrets.",
    ],
  },
  friends: {
    label: "Friends",
    preset: "sunset",
    captions: [
      "The people who feel like sunshine.",
      "Inside jokes and endless laughs.",
      "Partners in every little crime.",
      "Ordinary days turned golden.",
    ],
  },
  family: {
    label: "Family",
    preset: "bloom",
    captions: [
      "Her first story, her safest place.",
      "Loud house, louder laughter.",
      "Where every problem felt smaller.",
      "Roots, warmth, and unconditional love.",
    ],
  },
  trips: {
    label: "Trips",
    preset: "sea",
    captions: [
      "Where the map ended, the fun began.",
      "Wrong turns, right memories.",
      "New places, same wonder.",
      "Counting stars and losing count.",
    ],
  },
  birthday: {
    label: "Birthdays",
    preset: "night",
    captions: [
      "She wished. We pretended not to watch.",
      "Another year softer, brighter, braver.",
      "Candles, cake and quiet wishes.",
      "A day that's entirely hers.",
    ],
  },
  art: {
    label: "Art",
    preset: "bloom",
    captions: [
      "Colours straight from her heart.",
      "Every stroke tells a story.",
      "Little masterpieces, big feelings.",
      "Where her imagination lives.",
    ],
  },
};

/** Display order of the categories (only those with photos appear). */
const CATEGORY_ORDER = [
  "childhood",
  "school",
  "friends",
  "family",
  "trips",
  "birthday",
  "art",
];

const IMAGE_EXT = new Set([".jpeg", ".jpg", ".png", ".webp", ".gif"]);

/** Natural sort so pic2 comes before pic10. */
function naturalCompare(a: string, b: string) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function listImages(dir: string): string[] {
  try {
    return fs
      .readdirSync(dir)
      .filter((f) => IMAGE_EXT.has(path.extname(f).toLowerCase()))
      .sort(naturalCompare);
  } catch {
    return [];
  }
}

/**
 * Read pixel dimensions straight from the file header — no image library
 * needed. Supports JPEG, PNG, GIF and (basic) WebP. Returns null if it can't
 * be parsed, in which case we treat the image as landscape.
 */
function imageSize(file: string): { width: number; height: number } | null {
  let buf: Buffer;
  try {
    buf = fs.readFileSync(file);
  } catch {
    return null;
  }

  // PNG: width/height are big-endian 32-bit ints at offset 16/20.
  if (buf.length > 24 && buf.toString("ascii", 1, 4) === "PNG") {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // GIF: little-endian 16-bit width/height at offset 6/8.
  if (buf.length > 10 && buf.toString("ascii", 0, 3) === "GIF") {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }

  // WebP (VP8X): canvas size at offset 24 (24-bit little-endian, +1).
  if (
    buf.length > 30 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP" &&
    buf.toString("ascii", 12, 16) === "VP8X"
  ) {
    const w = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    const h = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
    return { width: w, height: h };
  }

  // JPEG: scan the segment markers for a Start-Of-Frame (SOFn).
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let o = 2;
    while (o < buf.length) {
      if (buf[o] !== 0xff) {
        o++;
        continue;
      }
      const marker = buf[o + 1];
      // SOF0..SOF15 (excluding DHT/DAC/RSTn) carry the frame dimensions.
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
        const height = buf.readUInt16BE(o + 5);
        const width = buf.readUInt16BE(o + 7);
        return { width, height };
      }
      o += 2 + buf.readUInt16BE(o + 2);
    }
  }

  return null;
}

function buildMemories(): { items: Memory[]; categories: string[] } {
  const root = path.join(process.cwd(), "public", "images", "memory");
  const items: Memory[] = [];
  const usedCategories: string[] = [];

  for (const folder of CATEGORY_ORDER) {
    const meta = CATEGORY_META[folder];
    if (!meta) continue;
    const files = listImages(path.join(root, folder));
    if (files.length === 0) continue;

    usedCategories.push(meta.label);

    files.forEach((file, i) => {
      // Shape each card to the photo's real aspect ratio so the image fills
      // the whole card edge-to-edge without being cropped or leaving gaps.
      const dim = imageSize(path.join(root, folder, file));
      let ratio = dim ? dim.width / dim.height : 1;
      // Clamp extreme ratios so very tall/wide photos don't break the layout.
      ratio = Math.min(Math.max(ratio, 0.6), 1.5);
      const tall = ratio < 0.95;

      items.push({
        id: `${folder}-${i}`,
        title: meta.label,
        date: meta.label,
        note: meta.captions[i % meta.captions.length],
        category: meta.label,
        preset: meta.preset,
        src: `/images/memory/${folder}/${file}`,
        tall,
        ratio: Math.round(ratio * 1000) / 1000,
      });
    });
  }

  const categories = ["All", ...usedCategories];
  return { items, categories };
}

const generated = buildMemories();

export const memories: Memory[] = generated.items;
export const memoryCategories: string[] = generated.categories;
