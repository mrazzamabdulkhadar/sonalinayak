/**
 * Static content pack (Version 1), served as a static data file.
 */

export const profile = {
  name: "Sona",
  nickname: "Sona",
  birthday: "04th (Oct)",
  hometown: "Cuttack, Odisha",
  favoriteColor: "Purple, Black, Silver",
  favoriteFood: "Momo, Chocolate",
  hobbies: "Dance, Art, Photography, Music",
  personality: "Caring, Funny, Kind, Stubborn",
  littleHabits: "Overthinks, Laughs a lot",
  thingsSheLoves: [
    "Nature & sunsets",
    "Good music",
    "Rainy days",
    "Her family & friends",
    "Cute things",
    "Long conversations",
  ],
};

export type Chapter = {
  year: string;
  title: string;
  text: string;
  preset: string;
  src?: string;
};

export const chapters: Chapter[] = [
  { year: "2008", title: "The Beginning", text: "She came into this world with a heart full of love and endless possibilities.", preset: "dawn", src: "/images/2008.jpeg" },
  { year: "2015", title: "Childhood", text: "Tiny hands, big dreams.", preset: "meadow", src: "/images/2015.jpeg" },
  { year: "2018", title: "Growing Up", text: "School, friends & countless memories.", preset: "bloom", src: "/images/2018.jpeg" },
  { year: "2022", title: "Teenage Years", text: "New dreams. New people. New emotions.", preset: "sunset", src: "/images/2022.jpeg" },
  { year: "2024", title: "A New Chapter", text: "Life started changing.", preset: "sea", src: "/images/2024.jpeg" },
  { year: "2026", title: "Present", text: "The girl she has become.", preset: "night", src: "/images/2026.jpeg" },
];

export type Memory = {
  id: string;
  title: string;
  date: string;
  note: string;
  category: string;
  preset: string;
  src?: string;
  tall?: boolean;
  /** width / height of the real photo, used to shape its card. */
  ratio?: number;
};

/**
 * Memory cards (Gallery + Memories pages) are generated automatically from the
 * images on disk. See `data/memories.ts`. Drop photos into
 * `public/images/memory/<category>/` and they appear after a rebuild.
 */

export type Quote = { id: string; text: string; category: string; language: string };

export const shayariCategories = ["All", "Romantic", "Deep", "Love", "Emotional", "Her", "Sad"];

export const shayari: Quote[] = [
  { id: "q1", text: "Kahein tum chand ho, ya meri duaon ka jawab,\nHar dafa tumhe dekhoon, dil kahe bas tum hi lajawab.", category: "Romantic", language: "hinglish" },
  { id: "q2", text: "Teri muskurahat ne ajeeb sa jaadu kar diya,\nJo dil kabhi kisi ka na hua, woh tera ho gaya.", category: "Romantic", language: "hinglish" },
  { id: "q3", text: "Tum se milna sirf ek mulaqat nahi,\nLagta hai jaise meri adhuri kahani ka aakhri safha mil gaya.", category: "Romantic", language: "hinglish" },
  { id: "q4", text: "Kahein wo raat jaisa manzar tha, Ya teri aankhon ka asar tha,\nJo bhi tha... Us lamhe mein sirf tera hi zikr tha.", category: "Romantic", language: "hinglish" },
  { id: "q5", text: "Har dua mein tera naam chupaya hai,\nLog kehte hain mohabbat chhup nahi sakti,\nMaine muskura kar sirf tera khayal bataya hai.", category: "Love", language: "hinglish" },
  { id: "q6", text: "Teri baatein chai ki pehli sip jaisi hain,\nHar roz chahiye... Aur kabhi kam nahi hoti.", category: "Love", language: "hinglish" },
  { id: "q7", text: "Tumhare baad kisi aur ko dekha hi nahi,\nNa isliye ke koi khoobsurat nahi tha,\nBas meri nazar wafadar thi.", category: "Love", language: "hinglish" },
  { id: "q8", text: "Mohabbat ka hisaab nahi hota,\nBas ek naam hota hai... Aur mere liye woh tum ho.", category: "Love", language: "hinglish" },
  { id: "q9", text: "Uski muskurahat mein kuch toh baat hai,\nwarna yun hi koi dil ke itne paas nahi aata.", category: "Her", language: "hinglish" },
  { id: "q10", text: "Kuch rishte khamoshi se bhi gehre hote hain,\nbin kahe sab kuch samajh jaana bhi ek ibaadat hai.", category: "Emotional", language: "hinglish" },
  { id: "q11", text: "Chaand ko dekha tha raat bhar,\nphir yaad aaya... usse zyada khoobsurat toh koi aur hai.", category: "Her", language: "hinglish" },
  { id: "q12", text: "Woh jab door jaati hai toh lagta hai,\nkoi apna hissa saath le jaata hai.", category: "Sad", language: "hinglish" },
  { id: "q13", text: "Kuch log yaadon mein nahi,\ndil ke kisi khoobsurat kone mein rehte hain.", category: "Emotional", language: "hinglish" },
  { id: "q14", text: "Uski ek muskurahat kaafi hai,\nek ordinary din ko yaadgaar banane ke liye.", category: "Her", language: "hinglish" },
  { id: "q15", text: "Woh saamne ho toh lafz kam pad jaate hain,\naur door ho toh khayal zyada aa jaate hain.", category: "Deep", language: "hinglish" },
  { id: "q16", text: "Ajeeb si aadat ho tum,\nDoor bhi raho... Toh bhi sabse kareeb lagte ho.", category: "Deep", language: "hinglish" },
  { id: "q17", text: "Raat bhar chand se baatein ki,\nUsne poocha kis ki yaad hai?\nMaine muskura kar sirf tumhara naam liya.", category: "Deep", language: "hinglish" },
  { id: "q18", text: "Na chaand chahiye, Na sitare chahiye,\nBas ek tum ho... Aur woh bhi hamesha ke liye.", category: "Romantic", language: "hinglish" },
  { id: "q19", text: "Tumhari aankhon mein jo sukoon dekha,\nUske baad duniya ki har jagah bechain si lagi.", category: "Deep", language: "hinglish" },
  { id: "q20", text: "Kaash waqt bhi tumhari tarah hota,\nJitna guzarta... Utna hi khoobsurat lagta.", category: "Emotional", language: "hinglish" },
  { id: "q21", text: "Sona, teri muskurahat mein ajeeb sa noor hai,\nTu paas ho toh har lamha dil ko manzoor hai.", category: "Her", language: "hinglish" },
  { id: "q22", text: "Chaand bhi sharma jaaye teri roshni ke saamne,\nDil kho jaata hai bas tera naam aane se.", category: "Romantic", language: "hinglish" },
  { id: "q23", text: "Teri aankhon mein ek alag si baat hai,\nTujhe dekhte hi dil ko ek ajeeb si rahat hai.", category: "Her", language: "hinglish" },
  { id: "q24", text: "Tera zikr aaye toh chehra muskura jaata hai,\nPata nahi dil tujhe itna kyun chahta hai.", category: "Love", language: "hinglish" },
  { id: "q25", text: "Tu kareeb ho toh waqt tham sa jaata hai,\nTu door ho toh har pal tera khayal aata hai.", category: "Deep", language: "hinglish" },
  { id: "q26", text: "Meri har dua mein tera naam aa jaata hai,\nShayad dil tujhe apna maan chuka hai.", category: "Love", language: "hinglish" },
  { id: "q27", text: "Ek teri muskurahat ke liye kya kya na kar jaaun,\nTu khush rahe, bas isi dua mein har roz muskuraun.", category: "Romantic", language: "hinglish" },
  { id: "q28", text: "Tu khwaab nahi jo subah bhool jaaun,\nTu woh ehsaas hai jise har pal mehsoos karna chaahun.", category: "Deep", language: "hinglish" },
  { id: "q29", text: "Teri ek baat dil ko chhoo jaati hai,\nAur teri ek smile poora din bana jaati hai.", category: "Her", language: "hinglish" },
  { id: "q30", text: "Mohabbat ka matlab shayad mujhe nahi pata,\nBas tera naam sunte hi dil muskura deta hai.", category: "Romantic", language: "hinglish" },
];

export type Line = { id: string; text: string; category: string };

export const lineCategories = ["All", "Flirty", "Romantic", "Cute", "Compliments"];

export const lines: Line[] = [
  { id: "l1", text: "Tum Google ho kya? Kyunki jo dhoondta hoon, woh tum mein mil jaata hai.", category: "Flirty" },
  { id: "l2", text: "Itni khoobsurat hona legal hai ya permission leni padti hai?", category: "Flirty" },
  { id: "l3", text: "Warning: Tumhari smile addictive hai.", category: "Flirty" },
  { id: "l4", text: "Tumhare saath time fast nahi hota... bas yaadgar ho jaata hai.", category: "Flirty" },
  { id: "l5", text: "Tumse baat karna meri favourite hobby ban chuki hai.", category: "Flirty" },
  { id: "l6", text: "Agar beauty ka koi syllabus hota, tum uska complete textbook hoti.", category: "Compliments" },
  { id: "l7", text: "Dil ne bola \"Ignore kar,\" aankhon ne bola \"Impossible.\"", category: "Flirty" },
  { id: "l8", text: "Ek baat bataun? Tum real life filter lagti ho.", category: "Compliments" },
  { id: "l9", text: "Tumhari DP dekh kar Wi-Fi bhi full signal de deta hai.", category: "Cute" },
  { id: "l10", text: "Main shayad poet nahi... lekin tumhe dekh kar har lafz shayari ban jaata hai.", category: "Romantic" },
  { id: "l11", text: "Kuch log zindagi mein aate nahi... bas dil mein utar jaate hain.", category: "Romantic" },
  { id: "l12", text: "Tumhari hasi meri favourite notification hai.", category: "Cute" },
  { id: "l13", text: "Agar sukoon ka koi chehra hota, toh shayad tumhara hota.", category: "Compliments" },
  { id: "l14", text: "Tum mere din ki sabse khoobsurat wajah ho.", category: "Romantic" },
  { id: "l15", text: "Har kahani mein hero zaroori nahi hota... kabhi kabhi ek muskurahat hi kaafi hoti hai.", category: "Romantic" },
  { id: "l16", text: "Dil ko ghar mil gaya jab se tum mile.", category: "Romantic" },
  { id: "l17", text: "Tum sirf pasand nahi... aadat ban gaye ho.", category: "Romantic" },
  { id: "l18", text: "Tumhari khamoshi bhi bohot kuch keh jaati hai.", category: "Cute" },
  { id: "l19", text: "Tum meri favourite \"what if\" nahi... meri favourite \"finally\" ho.", category: "Romantic" },
  { id: "l20", text: "Kuch log milte hain... aur phir ghar jaisa sukoon de jaate hain.", category: "Compliments" },
  { id: "l21", text: "Mohabbat awaaz nahi karti... bas dil mein reh jaati hai.", category: "Romantic" },
  { id: "l22", text: "Agar lafzon ki rooh hoti, toh woh tumhara naam leti.", category: "Romantic" },
  { id: "l23", text: "Dil ki sabse khoobsurat jagah par tum rehte ho.", category: "Compliments" },
  { id: "l24", text: "Tumhari yaad bhi tumhari tarah khoobsurat hai.", category: "Compliments" },
  { id: "l25", text: "Har baar tumhe dekh kar lagta hai... duniya itni buri bhi nahi.", category: "Cute" },
  { id: "l26", text: "Tum meri dua ka woh hissa ho jo kabhi alfaaz nahi ban saka.", category: "Romantic" },
  { id: "l27", text: "Itni cute hona zaroori tha kya? Dil ko bhi toh sambhalna hota hai.", category: "Flirty" },
  { id: "l28", text: "Tumhari smile ka koi secret hai kya? Har baar dil chura leti hai.", category: "Flirty" },
  { id: "l29", text: "Tumse baat karne ki aadat ho gayi hai... ab iska ilaaj kya hai?", category: "Flirty" },
  { id: "l30", text: "Tum saamne aati ho aur meri saari smartness kahin chali jaati hai.", category: "Flirty" },
  { id: "l31", text: "Tumhari aankhon mein aisa kya hai jo baar baar dekhne ka mann karta hai?", category: "Flirty" },
  { id: "l32", text: "Ek sawaal hai — tum hamesha itni adorable hoti ho, ya mere saamne extra effort karti ho?", category: "Flirty" },
  { id: "l33", text: "Tumse baat karna thoda dangerous hai... dil har conversation ke baad aur attach ho jaata hai.", category: "Flirty" },
  { id: "l34", text: "Tum mere thoughts mein bina permission ke entry kyun le leti ho?", category: "Flirty" },
  { id: "l35", text: "Sach batao, tumhe pata hai na ki tumhari smile kisi ka poora mood badal sakti hai?", category: "Flirty" },
  { id: "l36", text: "Tumhari maujoodgi mere aam dinon ko bhi khaas bana deti hai.", category: "Romantic" },
  { id: "l37", text: "Tumse baat karke dil ko ek alag sa sukoon milta hai.", category: "Compliments" },
  { id: "l38", text: "Mujhe perfect din nahi chahiye... tumhari ek smile hi kaafi hai.", category: "Romantic" },
  { id: "l39", text: "Tum sirf meri favourite notification nahi, meri favourite insaan bhi ho.", category: "Cute" },
  { id: "l40", text: "Kuch log zindagi mein chupke se aate hain aur bohot zaroori ban jaate hain — tum unhi mein se ho.", category: "Romantic" },
  { id: "l41", text: "Tumhe khush dekh kar meri apni khushi bhi badh jaati hai.", category: "Compliments" },
  { id: "l42", text: "Tumse hui chhoti si baat bhi meri favourite yaad ban jaati hai.", category: "Cute" },
  { id: "l43", text: "Duniya mein bohot khoobsurat cheezein hain, par tumhari simplicity sabse pyaari hai.", category: "Compliments" },
  { id: "l44", text: "Tumhe special hone ke liye kisi wajah ki zarurat nahi... tum khud hi special ho.", category: "Compliments" },
  { id: "l45", text: "Agar sukoon ka koi naam hota, toh shayad woh tumhara naam hota.", category: "Romantic" },
];

export const thenNowPairs = [
  { title: "Then", then: "Little girl with big dreams.", now: "Still dreaming. Just a little bigger now.", thenPreset: "dawn", nowPreset: "sunset" },
];

export const thenNowChips = [
  "Then → Now",
  "Dreams → Achievements",
  "Childhood → Adulthood",
  "Old Photos → New Photos",
];

export type SongTab = "Around Her" | "Reminds Me of Her" | "Your Song" | "Late Night Songs" | "Childhood Songs";

export type Song = {
  id: string;
  title: string;
  artist: string;
  reason: string;
  duration: string;
  preset: string;
  audio: string;
  cover?: string;
  tab: SongTab;
};

export const songTabs: SongTab[] = ["Around Her", "Reminds Me of Her", "Your Song", "Late Night Songs", "Childhood Songs"];

export const songs: Song[] = [
  // Around Her — the ones that simply feel like her
  { id: "s1", title: "Aaj Phir", artist: "Arijit Singh", reason: "Because every heartbeat hums her name.", duration: "3:56", preset: "sunset", audio: "/songs/aaj-phir.mp3", cover: "/songs/songthumbnails/pic1.png", tab: "Around Her" },
  { id: "s2", title: "Pehli Dafa", artist: "Atif Aslam", reason: "Because first meetings change everything.", duration: "4:15", preset: "dawn", audio: "/songs/pehli-dafa.mp3", cover: "/songs/songthumbnails/pic2.png", tab: "Around Her" },
  { id: "s3", title: "Tujhe Main Pyar Karoon", artist: "Kailash Kher", reason: "Because loving her is the easiest thing.", duration: "4:19", preset: "meadow", audio: "/songs/tujhe-main-pyar-karoon.mp3", cover: "/songs/songthumbnails/pic3.png", tab: "Around Her" },
  { id: "s4", title: "Tera Mera Hai Pyar Amar", artist: "Ahmed Jahanzeb", reason: "Because this love story deserves an OST.", duration: "3:08", preset: "bloom", audio: "/songs/tera-mera-pyar-amar.mp3", cover: "/songs/songthumbnails/pic4.png", tab: "Around Her" },
  { id: "s5", title: "From the Start", artist: "Laufey", reason: "Soft, honest, and a little in love.", duration: "2:26", preset: "dawn", audio: "/songs/from-the-start.mp3", cover: "/songs/songthumbnails/pic5.png", tab: "Around Her" },

  // Reminds Me of Her — songs that pull her into frame
  { id: "s6", title: "Broken Angel", artist: "Arash feat. Helena", reason: "The song that feels like her voice.", duration: "4:16", preset: "night", audio: "/songs/broken-angel.mp3", cover: "/songs/songthumbnails/pic6.png", tab: "Reminds Me of Her" },
  { id: "s7", title: "Favorite", artist: "Isabel LaRosa", reason: "Because she's the one on repeat.", duration: "2:12", preset: "night", audio: "/songs/favorite.mp3", cover: "/songs/songthumbnails/pic7.png", tab: "Reminds Me of Her" },
  { id: "s8", title: "Collide", artist: "Justine Skye ft. Tyga", reason: "For the way everything lines up around her.", duration: "4:24", preset: "sea", audio: "/songs/collide.mp3", cover: "/songs/songthumbnails/pic8.png", tab: "Reminds Me of Her" },
  { id: "s9", title: "Harleys in Hawaii", artist: "Katy Perry", reason: "Slow rides and warmer evenings with her.", duration: "4:58", preset: "sunset", audio: "/songs/harleys-in-hawaii.mp3", cover: "/songs/songthumbnails/pic9.png", tab: "Reminds Me of Her" },
  { id: "s10", title: "I'm Yours", artist: "Jason Mraz", reason: "Because the answer was always her.", duration: "3:02", preset: "meadow", audio: "/songs/im-yours.mp3", cover: "/songs/songthumbnails/pic10.png", tab: "Reminds Me of Her" },

  // Your Song — the ones that are hers to keep
  { id: "s11", title: "Kangna Tera Ni", artist: "Lashkare", reason: "Because she looks perfect in every rhythm.", duration: "3:50", preset: "bloom", audio: "/songs/kangna-tera-ni.mp3", cover: "/songs/songthumbnails/pic11.png", tab: "Your Song" },
  { id: "s12", title: "Despacito", artist: "Luis Fonsi ft. Daddy Yankee", reason: "For the days she dances without a care.", duration: "4:41", preset: "sea", audio: "/songs/despacito.mp3", cover: "/songs/songthumbnails/pic12.png", tab: "Your Song" },
  { id: "s13", title: "Espresso", artist: "Sabrina Carpenter", reason: "Her kind of fun, bottled into a beat.", duration: "3:35", preset: "sunset", audio: "/songs/espresso.mp3", cover: "/songs/songthumbnails/pic13.png", tab: "Your Song" },
  { id: "s14", title: "Gata Only", artist: "FloyyMenor ft. Cris MJ", reason: "The one she can't sit still through.", duration: "3:42", preset: "night", audio: "/songs/gata-only.mp3", cover: "/songs/songthumbnails/pic14.png", tab: "Your Song" },
  { id: "s15", title: "Shake It to the Max", artist: "MOLIY, Shenseea & co.", reason: "Pure joy, turned all the way up.", duration: "4:14", preset: "bloom", audio: "/songs/shake-it-to-the-max.mp3", cover: "/songs/songthumbnails/pic15.png", tab: "Your Song" },
  { id: "s16", title: "Peligrosa", artist: "FloyyMenor", reason: "A little bit of her mischief in a song.", duration: "2:46", preset: "sea", audio: "/songs/peligrosa.mp3", cover: "/songs/songthumbnails/pic16.png", tab: "Your Song" },

  // Late Night Songs — the quieter, darker, deeper hours
  { id: "s17", title: "Labon Ko", artist: "K.K.", reason: "Because some songs are felt, not heard.", duration: "4:29", preset: "night", audio: "/songs/labon-ko.mp3", cover: "/songs/songthumbnails/pic17.png", tab: "Late Night Songs" },
  { id: "s18", title: "Under the Influence", artist: "Chris Brown", reason: "For the late, unhurried kind of nights.", duration: "4:04", preset: "night", audio: "/songs/under-the-influence.mp3", cover: "/songs/songthumbnails/pic18.png", tab: "Late Night Songs" },
  { id: "s19", title: "Unholy", artist: "Sam Smith & Kim Petras", reason: "The darker glow after midnight.", duration: "4:14", preset: "night", audio: "/songs/unholy.mp3", cover: "/songs/songthumbnails/pic19.png", tab: "Late Night Songs" },
  { id: "s20", title: "Killshot (Slowed + Reverb)", artist: "Magdalena Bay", reason: "Dreamy, slow, and a little lost in it.", duration: "4:35", preset: "sea", audio: "/songs/killshot.mp3", cover: "/songs/songthumbnails/pic20.png", tab: "Late Night Songs" },
  { id: "s21", title: "I Wanna Be Your Slave", artist: "Måneskin", reason: "For the nights with a little more fire.", duration: "2:52", preset: "night", audio: "/songs/i-wanna-be-your-slave.mp3", cover: "/songs/songthumbnails/pic21.png", tab: "Late Night Songs" },
  { id: "s22", title: "YAD (English Version)", artist: "YAD", reason: "A moody loop for the small hours.", duration: "2:58", preset: "sea", audio: "/songs/yad.mp3", cover: "/songs/songthumbnails/pic22.png", tab: "Late Night Songs" },

  // Childhood Songs — the carefree, nostalgic playlist
  { id: "s23", title: "Criminal", artist: "Britney Spears", reason: "A throwback that never grows up.", duration: "3:43", preset: "dawn", audio: "/songs/criminal.mp3", cover: "/songs/songthumbnails/pic23.png", tab: "Childhood Songs" },
  { id: "s24", title: "Gangsta", artist: "Karan Aujla", reason: "The one that owns the whole room.", duration: "3:12", preset: "sunset", audio: "/songs/gangsta.mp3", cover: "/songs/songthumbnails/pic24.png", tab: "Childhood Songs" },
  { id: "s25", title: "Angels in Tibet", artist: "Amaarae", reason: "Light, playful, and endlessly repeatable.", duration: "2:42", preset: "meadow", audio: "/songs/angels-in-tibet.mp3", cover: "/songs/songthumbnails/pic25.png", tab: "Childhood Songs" },
  { id: "s26", title: "Sad Girlz Luv Money", artist: "Amaarae ft. Kali Uchis", reason: "Carefree energy for the good days.", duration: "5:06", preset: "bloom", audio: "/songs/sad-girlz-luv-money.mp3", cover: "/songs/songthumbnails/pic26.png", tab: "Childhood Songs" },
];

export type Letter = { id: string; title: string; preview: string; body: string[]; signature: string };

export const letters: Letter[] = [
  {
    id: "lt1", title: "Kabhi Kabhi Sochta Hoon", preview: "Agar tum meri zindagi mein na aati, toh...",
    body: [
      "Dear Ammu,",
      "Kabhi kabhi sochta hoon, agar tum meri zindagi mein na aati, toh shayad mujhe kabhi pata hi nahi chalta ki ek insaan ki presence kisi ke din ko itna khoobsurat bana sakti hai.",
      "Bas itna kehna tha — I'm glad you're here.",
    ],
    signature: "always, for her",
  },
  {
    id: "lt2", title: "Ek Chhoti Si Baat", preview: "Koi hai jo tumhari ek smile ke liye hazaar wajah dhoond lega.",
    body: [
      "Dear Sona,",
      "Main promises kam karta hoon... lekin ek baat zaroor keh sakta hoon.",
      "Jab bhi tum muskuraogi, meri dua hogi ki woh muskurahat kabhi kam na ho.",
      "Aur agar kabhi udaas ho jao, toh yaad rakhna — koi hai jo tumhari ek smile ke liye hazaar wajah dhoond lega.",
    ],
    signature: "always, for her",
  },
  {
    id: "lt3", title: "Tumhari Smile", preview: "Tumhari smile ke baare mein pata nahi kya magic hai.",
    body: [
      "Dear Cutie,",
      "Tumhari smile ke baare mein pata nahi kya magic hai.",
      "Bas tumhe hasta hua dekhta hoon aur lagta hai, haan... aaj ka din thoda aur achha hai.",
      "Isliye please, smile karte rehna.",
    ],
    signature: "someone who notices",
  },
  {
    id: "lt4", title: "Shayad Tumhe Pata Nahi", preview: "Tumhari chhoti chhoti baatein kisi ke liye kitni badi ho sakti hain...",
    body: [
      "Dear Babes,",
      "Shayad tumhe kabhi pata nahi chalega ki tumhari chhoti chhoti baatein kisi ke liye kitni badi ho sakti hain.",
      "Tumhara ek simple sa “kya kar rahe ho?”, ek random message, ya bina kisi reason ke bheji hui ek smile... ye sab kabhi kabhi poore din ka mood badal dete hain.",
      "Tumhe shayad ye sab normal lagta hoga.",
      "Lekin mere liye, they're little moments worth remembering.",
    ],
    signature: "someone who remembers the little things",
  },
  {
    id: "lt5", title: "Agar Kabhi Tum Udaas Ho", preview: "Tumhe har waqt strong rehne ki zarurat nahi hai.",
    body: [
      "Dear Ammu,",
      "Agar kabhi tumhe lage ki sab kuch thoda zyada ho gaya hai, toh ek baat yaad rakhna — tumhe har waqt strong rehne ki zarurat nahi hai.",
      "Kabhi thak jaana bhi okay hai.",
      "Kabhi chup rehna bhi okay hai.",
      "Aur kabhi bas kisi ke paas baith kar kuch na kehna bhi okay hai.",
      "Agar kabhi aisa din aaye, toh main bas itna chahta hoon ki tum khud par thoda sa pyaar zaroor rakhna.",
      "Because you deserve the same kindness you give to everyone else.",
    ],
    signature: "always caring, quietly",
  },
  {
    id: "lt6", title: "Tum Mere Liye Kya Ho", preview: "I don't really know how to give a perfect name to what you mean to me.",
    body: [
      "Dear Sona,",
      "I don't really know how to give a perfect name to what you mean to me.",
      "You're not just someone I talk to.",
      "You're one of those people whose message can make an ordinary day feel different.",
      "You're the person I sometimes think about for no reason.",
      "The person whose happiness somehow matters to me.",
      "And maybe that's enough of an explanation.",
      "I don't need a complicated word for it.",
      "I just know that having you around feels nice.",
    ],
    signature: "from someone who is grateful for you",
  },
  {
    id: "lt7", title: "Ek Din Jab Tum Ye Padho", preview: "Maybe one day you'll find this letter and wonder why I wrote all these things.",
    body: [
      "Dear Cutie,",
      "Maybe one day you'll find this letter and wonder why I wrote all these things.",
      "Maybe you'll smile.",
      "Maybe you'll laugh at how dramatic I was.",
      "Or maybe you'll just close the letter and move on.",
      "And that's okay.",
      "I didn't write this expecting anything from you.",
      "I wrote it because some feelings become lighter when they are written down.",
      "There are things we don't always say out loud — not because they aren't important, but because sometimes words feel too small.",
      "So here they are, quietly kept on a page.",
      "You matter.",
      "You have been a beautiful part of my thoughts.",
      "And somewhere in this little collection of words, there will always be a small place that reminds me of you.",
    ],
    signature: "written, without expectations",
  },
  {
    id: "lt8", title: "If I Could Tell You Everything", preview: "If I could tell you everything that crosses my mind...",
    body: [
      "Dear Babes,",
      "If I could tell you everything that crosses my mind when I think about you, this letter would probably never end.",
      "I'd tell you about the random moments when your name suddenly appears in my thoughts.",
      "I'd tell you how a simple conversation with you can stay in my head much longer than it probably should.",
      "I'd tell you that sometimes your smile feels like a tiny piece of sunshine.",
      "And I'd tell you that I hope life is gentle with you.",
      "I hope you find reasons to laugh even on difficult days.",
      "I hope you meet people who appreciate your heart.",
      "I hope you never feel like you have to become someone else to be loved.",
      "And most importantly, I hope you always remember that somewhere, someone genuinely wishes good things for you.",
      "Maybe you'll never read this.",
      "Maybe you will.",
      "Either way, I think some feelings are beautiful simply because they were honestly felt.",
    ],
    signature: "always, for her",
  },
];

export const dreamCategories = [
  { icon: "plane", title: "Places To Visit", text: "Switzerland, Iceland, Paris." },
  { icon: "briefcase", title: "Career Dreams", text: "Build a life she loves." },
  { icon: "home", title: "Future Dreams", text: "Cozy home filled with joy and people." },
  { icon: "heart", title: "Relationship Dreams", text: "A love story worth telling." },
  { icon: "compass", title: "Experiences", text: "Skydiving, stargazing, new cuisines." },
  { icon: "award", title: "Achievements", text: "Make her family proud." },
] as const;

export const whySpecial = [
  { num: "01", title: "Her Smile", text: "It can light up the darkest days — the kind of smile that makes a whole room softer.", hand: "So special ♡" },
  { num: "02", title: "Her Laugh", text: "She laughs a lot, and it's the kind of sound rooms remember long after she's gone.", hand: "priceless" },
  { num: "03", title: "Her Kind, Caring Heart", text: "She gives without keeping score and looks after everyone before herself.", hand: "soft heart" },
  { num: "04", title: "Her Art & Her Dance", text: "Give her a canvas, a camera, or a beat — she turns feelings into something beautiful.", hand: "pure magic" },
  { num: "05", title: "Her Little Habits", text: "Overthinking everything, then laughing it all off a second later. So completely her.", hand: "so her" },
  { num: "06", title: "Her Stubborn Strength", text: "Soft heart, unshakeable spine. Once she decides, there's no talking her out of it.", hand: "brave" },
];

// NOTE: Replace the placeholder names (e.g. "Her Family", "The Trio") with the
// real people in Sona's life. Photos point to her family/friends albums.
export const peopleGroups = [
  {
    group: "Family",
    members: [
      { name: "Her Family", relation: "Home base", note: "Her first story and her safest place, back home in Cuttack.", preset: "dawn", src: "/images/memory/family/pic.jpeg" },
      { name: "Festive Days", relation: "Together always", note: "Every festival feels brighter with everyone around.", preset: "bloom", src: "/images/memory/family/pic5.jpeg" },
      { name: "Home Moments", relation: "Love in little things", note: "Loud house, louder laughter, warmest hugs.", preset: "sunset", src: "/images/memory/family/pic10.jpeg" },
      { name: "Her Roots", relation: "Where it all began", note: "The people who shaped her heart first.", preset: "meadow", src: "/images/memory/family/pic15.jpeg" },
    ],
  },
  {
    group: "Best Friends",
    members: [
      { name: "Her People", relation: "Partners in crime", note: "Group chats, inside jokes, and laughter that never runs out.", preset: "night", src: "/images/memory/friends/pic19.jpeg" },
      { name: "The Selfie Squad", relation: "Always camera-ready", note: "A hundred photos, one keeper, zero regrets.", preset: "bloom", src: "/images/memory/friends/pic2.jpeg" },
      { name: "Day Ones", relation: "Since forever", note: "Friends who knew her before she knew herself.", preset: "sunset", src: "/images/memory/friends/pic7.jpeg" },
      { name: "Adventure Buddies", relation: "Up for anything", note: "Wrong turns, right memories, endless fun.", preset: "sea", src: "/images/memory/friends/pic13.jpeg" },
    ],
  },
  {
    group: "Special People",
    members: [
      { name: "The Ones Who Matter", relation: "Close to her heart", note: "A few souls who quietly changed her story for the better.", preset: "sunset", src: "/images/memory/family/pic3.jpeg" },
      { name: "Her Soul Sister", relation: "Heart to heart", note: "The one she tells everything to, first.", preset: "dawn", src: "/images/memory/friends/pic11.jpeg" },
      { name: "Her Safe Place", relation: "Always there", note: "Quiet support on loud days.", preset: "night", src: "/images/memory/family/pic8.jpeg" },
      { name: "Sweet Souls", relation: "Pure kindness", note: "People who make her smile without trying.", preset: "bloom", src: "/images/memory/friends/pic16.jpeg" },
    ],
  },
  {
    group: "Mentors",
    members: [
      { name: "Her Guides", relation: "The ones who taught her", note: "Teachers and mentors who believed in her first.", preset: "meadow", src: "/images/memory/school/pic.jpeg" },
      { name: "School Days", relation: "Lessons & laughter", note: "Classrooms, corridors, and friendships that stayed.", preset: "sea", src: "/images/memory/school/pic1.jpeg" },
      { name: "Life Lessons", relation: "Learning everywhere", note: "Every trip and every turn taught her something.", preset: "sunset", src: "/images/memory/trips/pic4.jpeg" },
      { name: "Her Role Models", relation: "The ones she looks up to", note: "People whose strength quietly inspires her own.", preset: "bloom", src: "/images/memory/friends/pic17.jpeg" },
    ],
  },
];

export const storyChapters = [
  { num: "01", title: "Once Upon a Time", text: "Before we begin, everyone always wonder, her smile, her vibe, her energy, everything." },
  { num: "02", title: "Growing Up", text: "NewCAPTERGIRL, new lessons, new beautiful little moments." },
  { num: "03", title: "The People She Met", text: "Some taught her lessons, some gave her love, both shaped her." },
  { num: "04", title: "The Things That Changed Her", text: "Everything changed her, softly or strongly, both mattered." },
  { num: "05", title: "Who She Is Today", text: "Stronger, softer, braver, and still becoming." },
];
