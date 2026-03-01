import React, { useState, useRef } from 'react';
import { Users, Settings, Eye, EyeOff, Play, RotateCcw, HelpCircle, X, Edit2, Plus, Trash2, ChevronDown, ChevronUp, Clock, Vibrate, Moon, RefreshCw, Info } from 'lucide-react';

// --- GAME DATA ---
const wordCategories = {
  // ── EASY CATEGORIES ─────────────────────────────────────────────────────────
  kidsAnimals: {
    icon: "🐘",
    name: "Easy: Animals in the Quran",
    words: [
      "Camel", "Elephant", "Whale", "Spider", "Ant", "Bee", "Snake", "Cow", "Bird", "Fish",
      "Donkey", "Horse", "Lion", "Dog", "Hoopoe", "Wolf", "Sheep", "Goat", "Ram", "Goose",
      "Locust", "Frog", "Louse", "Fly", "Mosquito", "Monkey", "Pig", "Swallow", "Crow", "Dove",
      "Cat", "Ox", "Deer", "Fox", "Bear", "Eagle", "Peacock", "Rabbit", "Turtle", "Crab"
    ]
  },
  kidsFood: {
    icon: "🍯",
    name: "Easy: Food & Drink",
    words: [
      "Dates", "Honey", "Milk", "Zamzam Water", "Olives", "Figs", "Pomegranate", "Grapes",
      "Bread", "Meat", "Lentils", "Garlic", "Onion", "Cucumber", "Watermelon", "Barley",
      "Wheat", "Butter", "Cheese", "Vinegar", "Olive Oil", "Ginger", "Pears", "Apples",
      "Raisins", "Almonds", "Walnuts", "Chickpeas", "Fish", "Lamb", "Goat Meat", "Camel Milk",
      "Sweet Melon", "Lentil Soup", "Flatbread", "Quinces", "Pistachios", "Saffron"
    ]
  },
  kidsDeeds: {
    icon: "❤️",
    name: "Easy: Good Deeds",
    words: [
      "Smiling", "Sharing", "Saying Salam", "Helping Parents", "Making Dua", "Giving Charity",
      "Telling the Truth", "Reading Quran", "Saying Bismillah", "Saying Alhamdulillah",
      "Fasting", "Praying on Time", "Visiting the Sick", "Forgiving Others", "Keeping Promises",
      "Being Patient", "Cleaning the Masjid", "Feeding the Poor", "Loving for Others What You Love",
      "Removing Harm from the Road", "Saying Jazakallah Khair", "Making Istighfar",
      "Respecting Elders", "Being Kind to Animals", "Thanking Allah", "Reciting Dhikr",
      "Paying Zakat", "Going to Jumu'ah", "Lowering the Gaze", "Backing a Brother"
    ]
  },
  kidsNature: {
    icon: "🌍",
    name: "Easy: Creations of Allah",
    words: [
      "The Sun", "The Moon", "The Stars", "Mountains", "The Ocean", "Trees", "Rain", "Clouds",
      "Rivers", "Deserts", "Flowers", "Snow", "Lightning", "Wind", "Fire", "Soil",
      "Valleys", "Volcanoes", "Rainbows", "Thunder", "Glaciers", "Waterfalls", "Forests",
      "The Sky", "The Earth", "Earthquakes", "Tsunamis", "Tornadoes", "Hurricanes",
      "The Galaxy", "Black Holes", "The Atmosphere", "Coral Reefs", "Caves", "Icebergs"
    ]
  },
  kidsTimes: {
    icon: "⏰",
    name: "Easy: Times & Prayers",
    words: [
      "Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumu'ah (Friday)", "Ramadan", "Eid al-Fitr",
      "Eid al-Adha", "Tahajjud", "Witr", "Ishraq", "Duha", "Laylatul Qadr", "Night of Miraj",
      "Day of Arafah", "10th of Muharram (Ashura)", "15th of Sha'ban", "First 10 Days of Dhul-Hijjah",
      "Monday Fast", "Thursday Fast", "White Days (13-14-15)", "New Islamic Year",
      "Birth of the Prophet (Rabi' al-Awwal)", "Isra wal Miraj Night"
    ]
  },
  objects: {
    icon: "📿",
    name: "Easy: Islamic Objects",
    words: [
      "The Kaaba", "Zamzam Well", "Miswak", "Prayer Mat", "Tasbih (Prayer Beads)",
      "The Quran", "Masjid (Mosque)", "Kufi / Hat", "Hijab", "Halal Sweets",
      "Adhan Clock", "Minaret", "Qibla Compass", "Islamic Calligraphy", "Wudu Jug",
      "Eid Lantern (Fanoos)", "Crescent Moon & Star", "Black Stone (Hajar al-Aswad)",
      "Maqam Ibrahim", "Zamzam Bottle", "Islamic Bookmarks", "Turbah (Prayer Stone)",
      "Sutra (Prayer Barrier)", "Eid Gift Box", "Ramadan Tent", "Zakat Box",
      "Masjid Dome", "Ablution Area", "Minbar (Pulpit)", "Misbaha", "Tasbeeh Counter"
    ]
  },

  // ── MEDIUM CATEGORIES ────────────────────────────────────────────────────────
  countriesPlaces: {
    icon: "🗺️",
    name: "Islamic Countries & Places",
    words: [
      "Makkah", "Madinah", "Jerusalem (Al-Quds)", "Palestine", "Saudi Arabia",
      "Turkey", "Egypt", "Morocco", "Yemen", "Syria", "Andalusia", "Pakistan", "Indonesia",
      "Jordan", "Libya", "Algeria", "Somalia", "Malaysia", "Bangladesh", "Nigeria",
      "Senegal", "Iran", "Iraq", "Bosnia", "Azerbaijan", "Kazakhstan", "Uzbekistan",
      "Chechnya", "Kosovo", "Oman", "UAE", "Qatar", "Kuwait", "Bahrain", "Tunisia",
      "Mauritania", "Mali", "Niger", "Chad", "Sudan", "Brunei", "Maldives",
      "Masjid al-Haram", "Masjid an-Nabawi", "Masjid al-Aqsa", "Cave of Hira",
      "Cave of Thawr", "Mount Uhud", "Badr", "Karbala", "Samarkand", "Baghdad (Old)"
    ]
  },
  prophets: {
    icon: "🐪",
    name: "Prophets of Islam",
    words: [
      "Prophet Adam", "Prophet Nuh", "Prophet Ibrahim", "Prophet Musa",
      "Prophet Isa", "Prophet Muhammad ﷺ", "Prophet Yusuf", "Prophet Yunus",
      "Prophet Sulaiman", "Prophet Ayyub", "Prophet Idris", "Prophet Hud",
      "Prophet Salih", "Prophet Lut", "Prophet Shuayb", "Prophet Dawud",
      "Prophet Zakariyya", "Prophet Yahya", "Prophet Ilyas", "Prophet Al-Yasa",
      "Prophet Dhul-Kifl", "Prophet Ismail", "Prophet Ishaq", "Prophet Yaqub",
      "Prophet Haroun (Harun)"
    ]
  },
  pillars: {
    icon: "🕌",
    name: "Pillars of Islam & Iman",
    words: [
      "Shahadah (Declaration of Faith)", "Salah (Prayer)", "Zakat (Charity)",
      "Sawm (Fasting)", "Hajj (Pilgrimage)",
      "Belief in Allah", "Belief in Angels", "Belief in Holy Books",
      "Belief in Prophets", "Belief in the Day of Judgement", "Belief in Qadar (Decree)",
      "Tawhid (Oneness of Allah)", "Shirk (Its Opposite)", "Taqwa (God-Consciousness)",
      "Ihsan (Excellence in Worship)", "Tawbah (Repentance)", "Wudu (Ablution)",
      "Ghusl (Full Purification)", "Tayammum (Dry Ablution)", "Adhan (Call to Prayer)",
      "Iqamah", "Niyyah (Intention)", "Qibla (Direction of Prayer)"
    ]
  },
  sahabah: {
    icon: "🛡️",
    name: "Famous Sahabah (Companions)",
    words: [
      "Abu Bakr as-Siddiq", "Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib",
      "Bilal ibn Rabah", "Khalid ibn al-Walid", "Salman al-Farsi", "Abu Hurairah",
      "Abdullah ibn Masud", "Abdullah ibn Abbas", "Muadh ibn Jabal", "Zayd ibn Harithah",
      "Talhah ibn Ubaydullah", "Zubayr ibn Awwam", "Abdur-Rahman ibn Awf",
      "Said ibn Abi Waqqas", "Abu Darda", "Abu Musa al-Ashari", "Ammar ibn Yasir",
      "Amr ibn al-As", "Usama ibn Zayd", "Anas ibn Malik", "Jabir ibn Abdullah",
      "Abu Ubayda ibn al-Jarrah", "Sad ibn Muadh", "Khabbab ibn al-Aratt",
      "Miqdad ibn al-Aswad", "Nuaym ibn Masud", "Hudhayfah ibn al-Yaman"
    ]
  },
  surahs: {
    icon: "📜",
    name: "Famous Surahs",
    words: [
      "Surah Al-Fatihah", "Surah Al-Baqarah", "Surah Ya-Sin", "Surah Al-Kahf",
      "Surah Al-Mulk", "Surah Ar-Rahman", "Surah Al-Ikhlas", "Surah Al-Falaq", "Surah An-Nas",
      "Surah Al-Imran", "Surah An-Nisa", "Surah Al-Maidah", "Surah Al-Anam",
      "Surah Al-Anfal", "Surah At-Tawbah", "Surah Yunus", "Surah Hud", "Surah Yusuf",
      "Surah Ibrahim", "Surah Al-Hijr", "Surah An-Nahl", "Surah Al-Isra",
      "Surah Al-Muminun", "Surah An-Nur", "Surah Al-Furqan", "Surah Ash-Shuara",
      "Surah Al-Qasas", "Surah Al-Ankabut", "Surah Luqman", "Surah Al-Ahzab",
      "Surah Sad", "Surah Az-Zumar", "Surah Ghafir", "Surah Fussilat", "Surah Ash-Shura",
      "Surah Ad-Dukhan", "Surah Al-Fath", "Surah Al-Hujurat", "Surah Qaf",
      "Surah Al-Waqiah", "Surah Al-Hashr", "Surah Al-Jumu'ah", "Surah Al-Munafiqun",
      "Surah At-Tahrim", "Surah Al-Qalam", "Surah Al-Muzzammil", "Surah Al-Muddaththir",
      "Surah Al-Qiyamah", "Surah Al-Insan", "Surah An-Naba", "Surah An-Naziat",
      "Surah Abasa", "Surah At-Takwir", "Surah Al-Infitar", "Surah Al-Mutaffifin",
      "Surah Al-Inshiqaq", "Surah Al-Buruj", "Surah At-Tariq", "Surah Al-Ala",
      "Surah Al-Ghashiyah", "Surah Al-Fajr", "Surah Al-Balad", "Surah Ash-Shams",
      "Surah Al-Layl", "Surah Ad-Duha", "Surah Ash-Sharh", "Surah At-Tin",
      "Surah Al-Alaq", "Surah Al-Qadr", "Surah Al-Bayyinah", "Surah Az-Zalzalah",
      "Surah Al-Adiyat", "Surah Al-Qariah", "Surah At-Takathur", "Surah Al-Asr",
      "Surah Al-Humazah", "Surah Al-Fil", "Surah Quraysh", "Surah Al-Maun",
      "Surah Al-Kawthar", "Surah Al-Kafirun", "Surah An-Nasr", "Surah Al-Masad"
    ]
  },
  angels: {
    icon: "✨",
    name: "Angels of Allah",
    words: [
      "Jibril (Revelation)", "Mikail (Rain & Provision)", "Israfil (The Trumpet)",
      "Izrail (Angel of Death)", "Munkar (Grave Questions)", "Nakir (Grave Questions)",
      "Raqib (Records Good Deeds)", "Atid (Records Bad Deeds)",
      "Ridwan (Keeper of Jannah)", "Malik (Keeper of Jahannam)",
      "Harut", "Marut", "Kiraman Katibin (The Noble Recorders)",
      "Carriers of the Throne (Hamalat al-Arsh)", "The Guardian Angels (Muaqqibat)",
      "Angel of the Mountains", "Angel of the Sea", "Angels of Mercy",
      "Angels of Punishment", "The Angels Who Greet in Jannah"
    ]
  },
  months: {
    icon: "🌙",
    name: "Islamic Months",
    words: [
      "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' ath-Thani",
      "Jumada al-Ula", "Jumada al-Akhirah", "Rajab", "Sha'ban",
      "Ramadan", "Shawwal", "Dhul-Qa'dah", "Dhul-Hijjah",
      "Sacred Months (Al-Ashhur al-Hurum)", "Month of the Prophet's Birth",
      "Month of the Isra wal Miraj", "Month of the Battle of Badr",
      "Month of the Conquest of Makkah", "Month of Laylatul Qadr",
      "The Blessed Month", "Month of Hajj"
    ]
  },

  // ── HARD CATEGORIES ──────────────────────────────────────────────────────────
  makharij: {
    icon: "📖",
    name: "Tajweed: Makharij (Hard)",
    words: [
      "Halqiyyah (Throat Letters)", "Lahawiyyah (Deep Tongue)", "Shajariyyah (Middle Tongue)",
      "Haafiyah (Edge of Tongue)", "Tarafiyyah (Tip of Tongue)", "Nit'iyyah (Palate)",
      "Lisawiyyah (Gums)", "Safeeriyah (Whistling)", "Shafawiyyah (Lips)",
      "Jawfee (Empty Space)", "Khaysoom (Nasal Cavity)",
      "Aqsal-Halq (Deepest Throat)", "Wasat al-Halq (Middle Throat)",
      "Adnal-Halq (Nearest Throat)", "Aqsal-Lisan (Back of Tongue)",
      "Wasat al-Lisan (Middle of Tongue)", "Haff al-Lisan (Side of Tongue)",
      "Taraf al-Lisan (Tip of Tongue)", "Al-Jauf (Air Space)",
      "Al-Khayshoom (Nasal Passage)", "Sifaat (Characteristics of Letters)",
      "Ghunnah (Nasalization)", "Madd (Elongation)", "Qalqalah (Echo)",
      "Tafkheem (Heavy Pronunciation)", "Tarqeeq (Light Pronunciation)"
    ]
  },
  tajweedRules: {
    icon: "🔤",
    name: "Tajweed Rules (Hard)",
    words: [
      "Ikhfa (Concealment)", "Idgham (Merging)", "Iqlab (Substitution)", "Idhaar (Clear Pronunciation)",
      "Idhaar Halqi", "Idgham Bila Ghunnah", "Idgham Ma'a Ghunnah",
      "Madd Tabii (Natural Elongation)", "Madd Wajib Muttasil", "Madd Jaiz Munfasil",
      "Madd Arid Lissukoon", "Madd Leen", "Madd Lazim",
      "Qalqalah Sughra", "Qalqalah Kubra",
      "Waqf (Stopping)", "Ibtida (Starting)", "Saktah (Brief Pause)",
      "Tafkheem wal Tarqeeq", "Lam Shamsiyyah", "Lam Qamariyyah",
      "Noon Sakinah Rules", "Meem Sakinah Rules", "Lahn (Mistake in Recitation)",
      "Hafs an Asim", "Warsh an Nafi"
    ]
  },

  // ── NEW CATEGORIES ────────────────────────────────────────────────────────────
  womenInIslam: {
    icon: "🌸",
    name: "Great Women in Islam",
    words: [
      "Khadijah bint Khuwaylid", "Aisha bint Abi Bakr", "Fatimah az-Zahra",
      "Maryam (Mary) عليها السلام", "Asiyah (Wife of Pharaoh)", "Umm Salamah",
      "Hafsa bint Umar", "Umm Habibah", "Zaynab bint Jahsh",
      "Umm Sulaym", "Nusaybah bint Kaab (Umm Umarah)", "Sumayya bint Khayyat",
      "Umm Ayman (Barakah)", "Safiyyah bint Huyayy", "Juwayriyah bint al-Harith",
      "Zaynab bint Ali", "Ruqayyah bint Muhammad", "Umm Kulthum bint Muhammad",
      "Bilqis (Queen of Sheba)", "Hajar (Hagar)", "Sarah (Wife of Ibrahim)",
      "Rahma (Wife of Ayyub)", "Umm Musa (Mother of Musa)", "Sister of Musa"
    ]
  },
  islamicScholars: {
    icon: "🎓",
    name: "Famous Islamic Scholars",
    words: [
      "Imam Abu Hanifah", "Imam Malik", "Imam Ash-Shafi'i", "Imam Ahmad ibn Hanbal",
      "Imam Al-Bukhari", "Imam Muslim", "Imam At-Tirmidhi", "Imam Abu Dawud",
      "Imam An-Nasai", "Imam Ibn Majah", "Ibn Taymiyyah", "Ibn al-Qayyim",
      "Al-Ghazali", "Ibn Kathir", "An-Nawawi", "Ibn Hajar al-Asqalani",
      "Al-Qurtubi", "At-Tabari", "Ibn Rushd (Averroes)", "Ibn Sina (Avicenna)",
      "Al-Kindi", "Al-Farabi", "Ibn Khaldun", "Al-Biruni", "Al-Khawarizmi",
      "Umar ibn Abd al-Aziz", "Hasan al-Basri", "Sufyan ath-Thawri",
      "Al-Izz ibn Abd al-Salam", "Al-Suyuti", "Ibn Battuta", "Al-Nawawi"
    ]
  },
  mosques: {
    icon: "🕌",
    name: "Famous Mosques & Islamic Sites",
    words: [
      "Masjid al-Haram (Makkah)", "Masjid an-Nabawi (Madinah)", "Masjid al-Aqsa (Jerusalem)",
      "Dome of the Rock", "Masjid Quba (First Mosque)", "Masjid al-Qiblatayn",
      "Sultan Ahmed Mosque (Blue Mosque)", "Hagia Sophia Mosque",
      "Sheikh Zayed Grand Mosque", "Hassan II Mosque (Morocco)",
      "Umayyad Mosque (Damascus)", "Al-Azhar Mosque (Cairo)",
      "Cordoba Mosque (Spain)", "Istiqlal Mosque (Jakarta)",
      "Faisal Mosque (Islamabad)", "Masjid Nabawi Extension",
      "Quba Mosque Extension", "Mosque of Ibn Tulun", "Djinguereber Mosque (Mali)",
      "Crystal Mosque (Malaysia)", "Pele Mosque (Istanbul)"
    ]
  },
  prophetStories: {
    icon: "📖",
    name: "Stories of the Prophets",
    words: [
      "Adam & the Forbidden Tree", "Nuh's Ark (The Great Flood)",
      "Ibrahim & the Fire", "Ibrahim & the Idols", "The Sacrifice of Ismail",
      "Yusuf in the Well", "Yusuf & the Dream", "Yusuf & Zulaikha",
      "Musa & Pharaoh", "Parting of the Red Sea", "The Ten Plagues of Egypt",
      "Musa & the Golden Calf", "Dawud & Jalut (Goliath)", "Sulaiman & the Ants",
      "Sulaiman & the Hoopoe Bird", "Sulaiman & Bilqis (Queen of Sheba)",
      "Yunus & the Whale", "Ayyub's Long Illness", "Isa & the Table from Heaven",
      "Isa Healing the Blind", "The Birth of Isa (Jesus)",
      "Muhammad ﷺ in Cave Hira", "The Night Journey (Isra wal Miraj)",
      "The Battle of Badr", "The Conquest of Makkah", "The Year of Sorrow",
      "Zakariyya's Dua for a Child", "Yahya's Birth", "Idris Raised to Heaven",
      "The People of the Cave (Ashab al-Kahf)"
    ]
  },
  hajjRituals: {
    icon: "🕋",
    name: "Hajj & Umrah Rituals",
    words: [
      "Ihram (Sacred State)", "Tawaf (Circling the Kaaba)", "Sa'i (Walking between Safa & Marwa)",
      "Wuquf at Arafat", "Muzdalifah (Overnight Stay)", "Mina (Tent City)",
      "Stoning of the Devil (Rami)", "Halq (Head Shaving)", "Taqsir (Hair Trimming)",
      "Qurbani (Sacrifice)", "Talbiyah (Labayk Allahumma Labayk)",
      "Istilam (Touching the Black Stone)", "Zamzam Water",
      "Maqam Ibrahim", "Hateem (Semi-Circle near Kaaba)",
      "Safa", "Marwa", "Jabal Rahmah (Mount of Mercy)", "Muzdalifah Pebbles",
      "Day of Arafah (9 Dhul-Hijjah)", "Eid al-Adha (10 Dhul-Hijjah)",
      "Ayyam at-Tashreeq (11-12-13 Dhul-Hijjah)",
      "Farewell Tawaf (Tawaf al-Wada)", "Umrah (Lesser Pilgrimage)",
      "Hady (Sacrificial Animal)", "Green Markers in Sa'i",
      "Gate of Salam (Masjid al-Haram)", "Multazam (Door of Kaaba)"
    ]
  },
  jannaNar: {
    icon: "🌿",
    name: "Jannah & Jahannam",
    words: [
      "Jannah (Paradise)", "Jahannam (Hellfire)", "Firdaws (Highest Level of Jannah)",
      "The Sirat (Bridge)", "The Mizaan (Scales of Deeds)",
      "The Book of Deeds", "Hisab (Reckoning)", "Shafa'ah (Intercession)",
      "Hawdh al-Kawthar (The Pond)", "The Shade of the Throne",
      "Rivers of Milk in Jannah", "Rivers of Honey in Jannah",
      "Rivers of Wine in Jannah", "Al-Kawthar (The River)",
      "Ghurfa (Rooms in Jannah)", "Lote Tree (Sidrat al-Muntaha)",
      "Seeing Allah in Jannah", "The Gates of Jannah (8 Gates)",
      "Bab ar-Rayyan (Gate for Fasting)", "Bab as-Sadaqah (Gate for Charity)",
      "Zaqqum Tree (Hellfire Tree)", "Scorching Wind of Hellfire",
      "Levels of Hellfire (7 Levels)", "Angels of Hellfire (Zabaniyan)",
      "The Day of Resurrection (Yawm al-Qiyamah)", "Trumpet Blast (Sur)",
      "Rising from Graves", "The Plain of Mahshar (Gathering)",
      "Punishment of the Grave", "Blessings of the Grave"
    ]
  },
  asmaUlHusna: {
    icon: "☪️",
    name: "Names of Allah (Al-Asma al-Husna)",
    words: [
      "Allah", "Ar-Rahman (The Most Merciful)", "Ar-Rahim (The Most Compassionate)",
      "Al-Malik (The King)", "Al-Quddus (The Holy)", "As-Salam (The Source of Peace)",
      "Al-Mumin (The Giver of Faith)", "Al-Muhaymin (The Guardian)",
      "Al-Aziz (The Almighty)", "Al-Jabbar (The Compeller)",
      "Al-Mutakabbir (The Supreme)", "Al-Khaliq (The Creator)",
      "Al-Bari (The Originator)", "Al-Musawwir (The Fashioner)",
      "Al-Ghaffar (The Forgiving)", "Al-Qahhar (The Subduer)",
      "Al-Wahhab (The Bestower)", "Ar-Razzaq (The Provider)",
      "Al-Fattah (The Opener)", "Al-Alim (The All-Knowing)",
      "Al-Qabid (The Restrainer)", "Al-Basit (The Expander)",
      "Al-Hafidh (The Preserver)", "Al-Muqit (The Sustainer)",
      "Al-Hasib (The Reckoner)", "Al-Jalil (The Majestic)",
      "Al-Karim (The Generous)", "Ar-Raqib (The Watchful)",
      "Al-Mujib (The Responder to Prayer)", "Al-Wasi (The All-Encompassing)",
      "Al-Hakim (The Wise)", "Al-Wadud (The Loving)",
      "Al-Majid (The Glorious)", "Al-Baith (The Resurrector)",
      "Al-Baqi (The Everlasting)", "Al-Wali (The Protecting Friend)",
      "Al-Hamid (The Praiseworthy)", "Al-Muhyi (The Giver of Life)",
      "Al-Mumit (The Taker of Life)", "Al-Hayy (The Ever-Living)",
      "Al-Qayyum (The Self-Sustaining)", "Al-Ahad (The One)",
      "As-Samad (The Eternal)", "Al-Qadir (The Capable)",
      "As-Sami (The All-Hearing)", "Al-Basir (The All-Seeing)",
      "Al-Lateef (The Subtle)", "Al-Khabir (The Aware)",
      "Al-Halim (The Forbearing)", "Al-Adhim (The Magnificent)"
    ]
  },
  islamicEtiquette: {
    icon: "🤲",
    name: "Sunnah Acts & Etiquette",
    words: [
      "Using Miswak (Tooth Stick)", "Eating with the Right Hand", "Entering Home with Right Foot",
      "Leaving Mosque with Left Foot", "Saying Bismillah Before Eating",
      "Saying Alhamdulillah After Eating", "Drinking in Three Sips",
      "Not Blowing into Food or Drink", "Returning Salam Fully",
      "Visiting the Sick", "Following a Funeral", "Sneezing & Saying Alhamdulillah",
      "Replying Yarhamukallah to a Sneeze", "Saying Yarhamukumullah",
      "Giving Gifts", "Shaking Hands", "Hugging on Eid",
      "Starting with the Right Side (in Wudu)", "Saying Dua Before Sleeping",
      "Sleeping on the Right Side", "Saying Dua Upon Waking",
      "Entering the Toilet with Left Foot", "Exiting Toilet with Right Foot",
      "Saying Dua Before Entering Toilet", "Covering the Awrah",
      "Looking Down When Walking", "Not Wasting Food", "Respecting the Quran",
      "Not Speaking in the Toilet", "Keeping the Masjid Clean",
      "Clipping Nails on Friday", "Trimming the Moustache",
      "Keeping the Beard", "Wearing White", "Wearing Perfume (Itar)"
    ]
  },
  islamicHistory: {
    icon: "⚔️",
    name: "Islamic History Events",
    words: [
      "The First Revelation (Cave Hira)", "The Hijrah to Madinah (622 CE)",
      "Battle of Badr (624 CE)", "Battle of Uhud (625 CE)",
      "Battle of the Trench / Khandaq (627 CE)",
      "Treaty of Hudaybiyyah (628 CE)", "Conquest of Makkah (630 CE)",
      "Battle of Hunayn (630 CE)", "Farewell Hajj (632 CE)",
      "Passing of the Prophet ﷺ (632 CE)", "Caliphate of Abu Bakr",
      "Caliphate of Umar (Conquest of Jerusalem)", "Caliphate of Uthman (Quran Compiled)",
      "Caliphate of Ali", "Battle of Karbala (680 CE)",
      "Umayyad Caliphate", "Abbasid Caliphate", "Fall of Baghdad (1258 CE)",
      "Saladin Recaptures Jerusalem (1187 CE)", "Muslim Spain (Andalusia 711–1492 CE)",
      "Battle of Tours (732 CE)", "Ottoman Empire Established",
      "Conquest of Constantinople (1453 CE)", "Battle of Ain Jalut (1260 CE)",
      "Spread of Islam to Africa", "Islam Reaches China (Tang Dynasty)",
      "First Masjid in Madinah (Quba)", "The Year of Grief (619 CE)",
      "The Boycott of Banu Hashim", "Migration to Abyssinia (615 CE)"
    ]
  },
  islamicTerms: {
    icon: "📚",
    name: "Islamic Vocabulary (Medium)",
    words: [
      "Tawhid (Monotheism)", "Shirk (Associating Partners)", "Kufr (Disbelief)",
      "Nifaq (Hypocrisy)", "Iman (Faith)", "Islam (Submission)",
      "Ihsan (Excellence)", "Tawbah (Repentance)", "Istighfar (Seeking Forgiveness)",
      "Tawakkul (Reliance on Allah)", "Sabr (Patience)", "Shukr (Gratitude)",
      "Ikhlas (Sincerity)", "Taqwa (God-Consciousness)", "Zuhd (Asceticism)",
      "Wara (Caution from Haram)", "Khushoo (Humility in Prayer)",
      "Bid'ah (Innovation in Religion)", "Sunnah (Prophetic Practice)",
      "Hadith (Prophetic Saying)", "Fiqh (Islamic Jurisprudence)",
      "Fatwa (Islamic Ruling)", "Ijma (Scholarly Consensus)",
      "Qiyas (Analogical Reasoning)", "Ijtihad (Independent Reasoning)",
      "Halal (Permitted)", "Haram (Forbidden)", "Makruh (Disliked)", "Mustahabb (Recommended)",
      "Wajib (Obligatory)", "Fard (Duty)", "Nafl (Voluntary Act)",
      "Riba (Usury/Interest)", "Zakat (Obligatory Charity)", "Sadaqah (Voluntary Charity)",
      "Waqf (Endowment)", "Kaffarah (Expiation)", "Diyah (Blood Money)",
      "Mahr (Bridal Gift)", "Nikah (Marriage Contract)", "Talaq (Divorce)",
      "Khul (Wife-Initiated Divorce)", "Ghayb (The Unseen)", "Barzakh (Barrier between Death & Resurrection)"
    ]
  },
  quranFacts: {
    icon: "✨",
    name: "Quran Facts (Hard)",
    words: [
      "114 Surahs", "6236 Verses (Ayat)", "30 Parts (Juz)", "604 Pages",
      "Surah Al-Baqarah (Longest Surah)", "Surah Al-Kawthar (Shortest Surah)",
      "Longest Ayah: Ayat al-Dayn (2:282)", "Shortest Ayah: Surah Al-Fajr",
      "First Revealed Ayah: Iqra (96:1)", "Last Revealed Ayah: 5:3",
      "Meccan Surahs (86)", "Medinan Surahs (28)",
      "Muqattaat (Disconnected Letters)", "7 Ahruf (Dialects)",
      "10 Qirat (Readings)", "Hafs an Asim Reading",
      "Warsh an Nafi Reading", "Bismillah appears 114 times",
      "Surah At-Tawbah (No Bismillah)", "Surah An-Naml has extra Bismillah",
      "Al-Fatiha (7 Verses)", "Ayat al-Kursi (Verse of the Throne)",
      "The Last Two Ayahs of Al-Baqarah", "Surah Al-Ikhlas = 1/3 of Quran",
      "First Hafidh of Quran", "Compilation under Abu Bakr",
      "Standardization under Uthman", "Arabic Diacritics added by Al-Hajjaj",
      "The Preserved Tablet (Al-Lawh al-Mahfuz)", "Night of Power (Laylatul Qadr)",
      "Quran Revealed over 23 Years"
    ]
  }
};

// --- EMOJI OPTIONS ---
const EMOJI_OPTIONS = ["🎯","🌟","🔥","💡","🎮","📝","🏆","🎲","🌈","⚡","🎪","🧠","💎","🚀","🌙","☀️","🎭","🎨","🎵","🌺","🕌","☪️","📿","🤲","🌿","🛡️","📖","🌸"];

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: Custom Category  (defined OUTSIDE App to prevent keyboard-closing bug)
// ─────────────────────────────────────────────────────────────────────────────
function CustomCategoryModal({
  onClose, editingCustomKey,
  customName, setCustomName,
  customIcon, setCustomIcon,
  customWords, setCustomWords,
  customWordInput, setCustomWordInput,
  bulkInput, setBulkInput,
  showBulk, setShowBulk,
  showEmojiPicker, setShowEmojiPicker,
  addCustomWord, applyBulkInput, removeCustomWord, saveCustomCategory,
  wordInputRef
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="bg-[#1a1a1a] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-gray-700 shadow-2xl max-h-[92vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
          <h2 className="text-xl font-black text-white">{editingCustomKey ? 'Edit Category' : 'New Custom Category'}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><X size={22} /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>

          {/* Icon + Name */}
          <div className="flex gap-3">
            <div className="relative">
              <button
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-14 h-14 text-2xl bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center hover:border-emerald-500 transition-colors"
              >{customIcon}</button>
              {showEmojiPicker && (
                <div className="absolute top-16 left-0 z-10 bg-[#222] border border-gray-700 rounded-2xl p-3 shadow-2xl grid grid-cols-7 gap-1.5">
                  {EMOJI_OPTIONS.map(e => (
                    <button key={e} onClick={() => { setCustomIcon(e); setShowEmojiPicker(false); }}
                      className="text-xl w-9 h-9 rounded-lg hover:bg-gray-700 flex items-center justify-center">{e}</button>
                  ))}
                </div>
              )}
            </div>
            <input
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder="Category name..."
              className="flex-1 bg-gray-800 border border-gray-700 focus:border-emerald-500 rounded-xl px-4 text-white placeholder-gray-500 focus:outline-none text-sm font-semibold"
            />
          </div>

          {/* Single word input */}
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Add Words</p>
            <div className="flex gap-2">
              <input
                ref={wordInputRef}
                value={customWordInput}
                onChange={e => setCustomWordInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCustomWord(); } }}
                placeholder="Type a word and press Enter..."
                className="flex-1 bg-gray-800 border border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-sm"
              />
              <button onClick={addCustomWord} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 rounded-xl font-bold transition-colors"><Plus size={18} /></button>
            </div>
          </div>

          {/* Bulk paste */}
          <div>
            <button
              onClick={() => setShowBulk(!showBulk)}
              className="flex items-center gap-2 text-emerald-400 text-sm font-semibold hover:text-emerald-300 transition-colors"
            >
              {showBulk ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              Bulk paste words
            </button>
            {showBulk && (
              <div className="mt-3 space-y-2">
                <textarea
                  value={bulkInput}
                  onChange={e => setBulkInput(e.target.value)}
                  placeholder={`Paste words separated by commas, semicolons, or new lines.\n\nApple, Banana\nMango; Grape`}
                  rows={6}
                  className="w-full bg-gray-800 border border-gray-700 focus:border-emerald-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none text-sm resize-none"
                />
                <button
                  onClick={applyBulkInput}
                  disabled={!bulkInput.trim()}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors text-sm"
                >Add All Words</button>
              </div>
            )}
          </div>

          {/* Word chips */}
          {customWords.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Words ({customWords.length})</p>
                {customWords.length < 3 && <p className="text-amber-400 text-xs">Need at least 3</p>}
              </div>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>
                {customWords.map((w, i) => (
                  <div key={i} className="flex items-center gap-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-sm text-gray-200">
                    <span className="max-w-[160px] truncate">{w}</span>
                    <button onClick={() => removeCustomWord(i)} className="text-gray-500 hover:text-red-400 ml-1"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 border-t border-gray-800 shrink-0">
          <button
            onClick={saveCustomCategory}
            disabled={!customName.trim() || customWords.length < 3}
            className="w-full py-4 bg-[#ccff00] hover:bg-[#b8e600] disabled:opacity-30 disabled:cursor-not-allowed text-black font-black rounded-2xl transition-colors uppercase tracking-wide"
          >Save Category</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: How to Play
// ─────────────────────────────────────────────────────────────────────────────
function HowToPlayModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80" onClick={onClose}>
      <div className="bg-[#222] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white"><X size={24} /></button>
          <h2 className="text-2xl font-bold text-white mb-6">How to Play</h2>
          <div className="space-y-4 text-gray-200">
            {[
              'Gather 3–25 friends and pass the phone around.',
              'Each player presses and holds the card to see the secret word — except the Impostor, who sees "IMPOSTOR".',
              'One by one, players say one word or clue related to the secret word.',
              'The impostor must fake it and blend in without knowing the true word.',
              'Keep giving clues until someone thinks they\'ve figured it out.',
              'Vote for who you think the impostor is — then tap to reveal the truth!'
            ].map((text, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-emerald-500 font-bold text-xl shrink-0">{i + 1}</span>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MODAL: Settings
// ─────────────────────────────────────────────────────────────────────────────
function SettingsModal({ onClose, settings, onToggle, onTimerChange, onMaxPlayersChange, onResetCustom }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80" onClick={onClose}>
      <div
        className="bg-[#1a1a1a] w-full max-w-md rounded-t-3xl sm:rounded-3xl border border-gray-700 shadow-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-800 shrink-0">
          <h2 className="text-xl font-black text-white flex items-center gap-2"><Settings size={20} className="text-emerald-400" /> Settings</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white p-1"><X size={22} /></button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-3" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>

          {/* Section: Gameplay */}
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest pb-1">Gameplay</p>

          {/* Peek Timer */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Clock size={18} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Peek Timer</p>
                  <p className="text-gray-500 text-xs">Auto-hide card after N seconds</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={settings.timerEnabled} onChange={() => onToggle('timerEnabled')} />
                <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
            {settings.timerEnabled && (
              <div className="flex gap-2 mt-1">
                {[5, 10, 15, 20, 30].map(s => (
                  <button
                    key={s}
                    onClick={() => onTimerChange(s)}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-colors ${
                      settings.timerSeconds === s
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >{s}s</button>
                ))}
              </div>
            )}
          </div>

          {/* Show who starts */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-500/10 rounded-xl flex items-center justify-center">
                <Users size={18} className="text-purple-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Show Starting Player</p>
                <p className="text-gray-500 text-xs">Display who speaks first</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.showStartingPlayer} onChange={() => onToggle('showStartingPlayer')} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Impostor sees partners */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
                <span className="text-lg">🥷</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Impostors See Partners</p>
                <p className="text-gray-500 text-xs">When multiple impostors, they know each other</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.impostorsKnowEachOther} onChange={() => onToggle('impostorsKnowEachOther')} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Max Players */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Max Players</p>
                  <p className="text-gray-500 text-xs">Maximum players allowed per game</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onMaxPlayersChange(Math.max(3, (settings.maxPlayers || 25) - 1))}
                  className="w-8 h-8 rounded-xl bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center font-bold text-lg transition-colors"
                >−</button>
                <span className="w-10 text-center text-white font-bold text-lg">{settings.maxPlayers || 25}</span>
                <button
                  onClick={() => onMaxPlayersChange((settings.maxPlayers || 25) + 1)}
                  className="w-8 h-8 rounded-xl bg-gray-700 hover:bg-gray-600 text-white flex items-center justify-center font-bold text-lg transition-colors"
                >+</button>
              </div>
            </div>
          </div>

          {/* Vibration */}
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Vibrate size={18} className="text-yellow-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Vibration</p>
                <p className="text-gray-500 text-xs">Haptic feedback on reveal</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={settings.vibration} onChange={() => onToggle('vibration')} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          {/* Section: Data */}
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest pb-1 pt-2">Data</p>

          <button
            onClick={onResetCustom}
            className="w-full bg-gray-800/60 border border-red-500/30 hover:border-red-500/60 rounded-2xl p-4 flex items-center gap-3 transition-colors group"
          >
            <div className="w-9 h-9 bg-red-500/10 rounded-xl flex items-center justify-center">
              <Trash2 size={18} className="text-red-400" />
            </div>
            <div className="text-left">
              <p className="text-red-400 font-semibold text-sm group-hover:text-red-300">Delete All Custom Categories</p>
              <p className="text-gray-500 text-xs">Cannot be undone</p>
            </div>
          </button>

          {/* About */}
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest pb-1 pt-2">About</p>
          <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <Info size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Impostor: Deen Edition</p>
              <p className="text-gray-500 text-xs">Version 1.0.0 · Made with ❤️ for the Ummah</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('setup'); // 'setup', 'passing', 'viewing', 'discussion', 'reveal'
  
  // Setup State
  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [imposterCount, setImposterCount] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('kidsAnimals');
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Settings State
  const defaultSettings = {
    timerEnabled: false,
    timerSeconds: 10,
    showStartingPlayer: true,
    impostorsKnowEachOther: true,
    vibration: true,
    maxPlayers: 25,
  };
  const [settings, setSettings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('gameSettings') || 'null') || defaultSettings; }
    catch { return defaultSettings; }
  });

  const updateSettings = (updated) => {
    setSettings(updated);
    localStorage.setItem('gameSettings', JSON.stringify(updated));
  };

  const toggleSetting = (key) => updateSettings({ ...settings, [key]: !settings[key] });
  const setTimerSeconds = (s) => updateSettings({ ...settings, timerSeconds: s });

  // Custom Categories State
  const [customCategories, setCustomCategories] = useState(() => {
    try { return JSON.parse(localStorage.getItem('customCategories') || '{}'); }
    catch { return {}; }
  });
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [editingCustomKey, setEditingCustomKey] = useState(null); // null = new
  const [customName, setCustomName] = useState('');
  const [customIcon, setCustomIcon] = useState('🎯');
  const [customWords, setCustomWords] = useState([]);
  const [customWordInput, setCustomWordInput] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulk, setShowBulk] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const wordInputRef = useRef(null);
  
  // Player Editing State
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  
  // In-Game State
  const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
  const [imposters, setImposters] = useState([]);
  const [secretWord, setSecretWord] = useState('');
  const [startingPlayerIdx, setStartingPlayerIdx] = useState(0);
  
  // Hiding Card State
  const [isPressing, setIsPressing] = useState(false);
  const [hasPeeked, setHasPeeked] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  // --- PLAYER MANAGEMENT LOGIC ---
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditValue(players[index]);
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const newPlayers = [...players];
      newPlayers[editingIndex] = editValue.trim() || `Player ${editingIndex + 1}`;
      setPlayers(newPlayers);
      setEditingIndex(null);
    }
  };

  const addPlayer = () => {
    if (players.length < (settings.maxPlayers || 25)) {
      setPlayers([...players, `Player ${players.length + 1}`]);
    }
  };

  const removePlayer = (index, e) => {
    e.stopPropagation();
    if (players.length <= 3) return; // Minimum 3 players needed
    const newPlayers = players.filter((_, i) => i !== index);
    setPlayers(newPlayers);
    
    // Adjust imposters if needed
    const maxImposters = Math.floor(newPlayers.length / 2);
    if (imposterCount > maxImposters) {
      setImposterCount(maxImposters || 1);
    }
  };

  // --- CUSTOM CATEGORY LOGIC ---
  const saveCustomCategories = (updated) => {
    setCustomCategories(updated);
    localStorage.setItem('customCategories', JSON.stringify(updated));
  };

  const openNewCustomModal = () => {
    setEditingCustomKey(null);
    setCustomName('');
    setCustomIcon('🎯');
    setCustomWords([]);
    setCustomWordInput('');
    setBulkInput('');
    setShowBulk(false);
    setShowEmojiPicker(false);
    setShowCustomModal(true);
  };

  const openEditCustomModal = (key) => {
    const cat = customCategories[key];
    setEditingCustomKey(key);
    setCustomName(cat.name);
    setCustomIcon(cat.icon);
    setCustomWords([...cat.words]);
    setCustomWordInput('');
    setBulkInput('');
    setShowBulk(false);
    setShowEmojiPicker(false);
    setShowCustomModal(true);
  };

  const addCustomWord = () => {
    const w = customWordInput.trim();
    if (w && !customWords.includes(w)) {
      setCustomWords([...customWords, w]);
      setCustomWordInput('');
      wordInputRef.current?.focus();
    }
  };

  const applyBulkInput = () => {
    const parsed = bulkInput
      .split(/[\n,;]+/)
      .map(w => w.trim())
      .filter(w => w.length > 0);
    const merged = [...customWords];
    parsed.forEach(w => { if (!merged.includes(w)) merged.push(w); });
    setCustomWords(merged);
    setBulkInput('');
    setShowBulk(false);
  };

  const removeCustomWord = (idx) => {
    setCustomWords(customWords.filter((_, i) => i !== idx));
  };

  const saveCustomCategory = () => {
    if (!customName.trim() || customWords.length < 3) return;
    const key = editingCustomKey || `custom_${Date.now()}`;
    const updated = { ...customCategories, [key]: { icon: customIcon, name: customName.trim(), words: customWords } };
    saveCustomCategories(updated);
    if (!editingCustomKey) setSelectedCategory(key);
    setShowCustomModal(false);
  };

  const deleteCustomCategory = (key) => {
    const updated = { ...customCategories };
    delete updated[key];
    saveCustomCategories(updated);
    if (selectedCategory === key) setSelectedCategory('kidsAnimals');
  };

  // --- GAME LOGIC ---
  const startGame = () => {
    // 1. Pick Imposters (using indices)
    const imposterIndices = [];
    while (imposterIndices.length < imposterCount) {
      const randomIdx = Math.floor(Math.random() * players.length);
      if (!imposterIndices.includes(randomIdx)) {
        imposterIndices.push(randomIdx);
      }
    }
    setImposters(imposterIndices);

    // 2. Pick Secret Word (built-in or custom)
    const allCats = { ...wordCategories, ...customCategories };
    const wordsList = allCats[selectedCategory]?.words || wordCategories.kidsAnimals.words;
    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setSecretWord(randomWord);

    // 3. Pick Random Starting Player
    const randomStartIdx = Math.floor(Math.random() * players.length);
    setStartingPlayerIdx(randomStartIdx);

    // 4. Reset Game Loop
    setCurrentPlayerIdx(0);
    setGameState('passing');
    setIsPressing(false);
    setHasPeeked(false);
    setIsRevealed(false);
  };

  const handleNextPlayer = () => {
    if (!hasPeeked) return; // Prevent skipping without looking
    
    setIsPressing(false);
    setHasPeeked(false);
    
    if (currentPlayerIdx < players.length - 1) {
      setCurrentPlayerIdx(currentPlayerIdx + 1);
      setGameState('passing');
    } else {
      setGameState('discussion');
    }
  };

  const restartGame = () => {
    setGameState('setup');
    setCurrentPlayerIdx(0);
    setIsRevealed(false);
  };

  // --- TIMER LOGIC ---
  const timerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(null);

  const startPeekTimer = () => {
    if (!settings.timerEnabled) return;
    setTimeLeft(settings.timerSeconds);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const stopPeekTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(null);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-emerald-500/30">

      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-gray-800 bg-[#1a1a1a]">
        <button onClick={() => setShowHowToPlay(true)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-full">
          <HelpCircle size={20} />
        </button>
        <h1 className="text-lg font-black tracking-wide text-center flex-1 text-gray-100 leading-tight">
          <span className="text-emerald-400">☪️ Impostor</span>
          <span className="text-gray-400 font-medium">: Deen Edition</span>
        </h1>
        <button onClick={() => setShowSettings(true)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-full">
          <Settings size={20} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-col items-center justify-center p-6 w-full max-w-md mx-auto" style={{ minHeight: 'calc(100vh - 80px)' }}>
        
        {/* STATE: SETUP */}
        {gameState === 'setup' && (
          <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            
            {/* Players Card */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-bold tracking-widest text-sm flex items-center gap-2">
                  <span className="text-lg">✋</span> PLAYERS
                </h3>
                <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-sm font-bold">
                  {players.length}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {players.map((player, index) => (
                  <div key={index} className="relative">
                    {editingIndex === index ? (
                      <input
                        autoFocus
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={saveEdit}
                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                        className="bg-gray-700 text-white px-3 py-2 rounded-xl text-sm w-32 border border-emerald-500 focus:outline-none"
                      />
                    ) : (
                      <div 
                        onClick={() => handleEditClick(index)}
                        className="group bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer border border-gray-700 px-3 py-2 rounded-xl text-sm flex items-center gap-2 select-none"
                      >
                        <Edit2 size={14} className="text-gray-400" />
                        <span className="font-medium truncate max-w-[100px]">{player}</span>
                        {players.length > 3 && (
                          <button 
                            onClick={(e) => removePlayer(index, e)}
                            className="text-gray-500 hover:text-red-400 ml-1 p-0.5"
                          >
                            <X size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                
                {players.length < (settings.maxPlayers || 25) && (
                  <button 
                    onClick={addPlayer}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 border-dashed px-3 py-2 rounded-xl text-sm flex items-center gap-1 transition-colors"
                  >
                    <Plus size={16} /> Add
                  </button>
                )}
              </div>
            </div>

            {/* Categories Card (Scrollable) */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 font-bold tracking-widest text-sm flex items-center gap-2">
                  <span className="text-lg">📚</span> CATEGORIES
                </h3>
                <button
                  onClick={openNewCustomModal}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Plus size={13} /> Custom
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>

                {/* Custom categories first */}
                {Object.entries(customCategories).map(([key, category]) => (
                  <div key={key} className={`rounded-xl border flex items-center gap-3 transition-all ${
                    selectedCategory === key
                      ? 'border-emerald-500 bg-emerald-500/10'
                      : 'border-purple-500/40 bg-purple-500/5 hover:bg-purple-500/10'
                  }`}>
                    <button
                      onClick={() => setSelectedCategory(key)}
                      className="flex-1 p-3 text-left flex items-center gap-3"
                    >
                      <span className="text-xl">{category.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className={`font-medium text-sm block truncate ${selectedCategory === key ? 'text-emerald-50' : 'text-gray-300'}`}>{category.name}</span>
                        <span className="text-xs text-purple-400">{category.words.length} words · Custom</span>
                      </div>
                    </button>
                    <div className="flex gap-1 pr-2">
                      <button onClick={() => openEditCustomModal(key)} className="p-1.5 text-gray-500 hover:text-emerald-400 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => deleteCustomCategory(key)} className="p-1.5 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}

                {/* Built-in categories */}
                {Object.entries(wordCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                      selectedCategory === key 
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-50' 
                        : 'border-gray-700 bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Imposters Settings */}
            <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 p-5 shadow-xl">
              <div className="flex justify-between items-center text-sm font-bold text-gray-400 tracking-widest mb-4">
                <span className="flex items-center gap-2"><span className="text-lg">🥷</span> IMPOSTERS</span>
                <span className="text-red-400 bg-red-400/10 px-2 py-0.5 rounded">{imposterCount}</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setImposterCount(Math.max(1, imposterCount - 1))}
                  className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-xl active:bg-gray-700 disabled:opacity-50 transition-colors"
                  disabled={imposterCount <= 1}
                >-</button>
                <div className="flex-1 text-center text-sm text-gray-500">
                  Recommended: {Math.max(1, Math.floor(players.length / 4))}
                </div>
                <button 
                  onClick={() => setImposterCount(Math.min(Math.floor(players.length/2), imposterCount + 1))}
                  className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center text-xl active:bg-gray-700 disabled:opacity-50 transition-colors"
                  disabled={imposterCount >= Math.floor(players.length/2) || players.length < 4}
                >+</button>
              </div>
            </div>

            {/* Start Button */}
            <button 
              onClick={startGame}
              className="w-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-lg py-5 rounded-2xl shadow-lg shadow-[#ccff00]/20 transform transition active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Play fill="currentColor" size={24} /> Start Game
            </button>
          </div>
        )}

        {/* STATE: PASSING / VIEWING */}
        {(gameState === 'passing' || gameState === 'viewing') && (
          <div className="w-full flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
            
            <div className="space-y-1">
              <div className="text-gray-400 font-semibold tracking-widest uppercase text-sm">Pass the phone to</div>
              <h2 className="text-4xl font-black text-emerald-400">{players[currentPlayerIdx]}</h2>
            </div>

            {/* HIDING CARD */}
            <div 
              onPointerDown={(e) => {
                e.preventDefault();
                setIsPressing(true);
                setHasPeeked(true);
                startPeekTimer();
                if (settings.vibration && navigator.vibrate) navigator.vibrate(30);
              }}
              onPointerUp={() => { setIsPressing(false); stopPeekTimer(); }}
              onPointerLeave={() => { setIsPressing(false); stopPeekTimer(); }}
              onContextMenu={(e) => e.preventDefault()} // Prevents right-click/long-press menu
              style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
              className={`w-full max-w-sm min-h-[300px] border-2 rounded-3xl flex flex-col items-center justify-center p-8 shadow-2xl relative overflow-hidden transition-all duration-150 cursor-pointer ${
                isPressing 
                  ? 'bg-[#222] border-emerald-500/50 scale-[0.98]' 
                  : 'bg-[#1a1a1a] border-gray-700 hover:bg-gray-800'
              }`}
            >
              {!isPressing ? (
                <div className="flex flex-col items-center pointer-events-none">
                  <EyeOff size={64} className="text-gray-500 mb-4" />
                  <p className="text-xl font-bold text-gray-300">Press and Hold</p>
                  <p className="text-gray-500 text-sm mt-2">Make sure nobody else is looking</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full w-full pointer-events-none animate-in zoom-in-95 duration-100">
                  {settings.timerEnabled && timeLeft !== null && (
                    <div className={`absolute top-4 right-4 text-xs font-black px-2 py-1 rounded-lg ${ timeLeft <= 3 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400' }`}>
                      {timeLeft}s
                    </div>
                  )}
                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Your Secret Word</span>
                  
                  {imposters.includes(currentPlayerIdx) ? (
                    <div className="text-center">
                      <h3 className="text-4xl font-black text-red-500 tracking-tight mb-1">IMPOSTOR</h3>
                      <p className="text-red-400/80 text-sm mb-4">You don't know the word. Blend in!</p>
                      
                      {settings.impostorsKnowEachOther && imposters.length > 1 && (
                        <div className="mt-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-in fade-in zoom-in-50">
                          <p className="text-xs text-red-300 uppercase tracking-wider mb-1">Your Partners:</p>
                          <p className="text-sm font-bold text-red-400">
                            {imposters.filter(idx => idx !== currentPlayerIdx).map(idx => players[idx]).join(', ')}
                          </p>
                        </div>
                      )}  
                    </div>
                  ) : (
                    <div className="text-center w-full px-2">
                      <h3 className="text-xl md:text-2xl font-bold text-emerald-400 leading-snug mb-2 break-words" dir="auto">
                        {secretWord}
                      </h3>
                      <p className="text-emerald-400/80 text-sm">You are a scholar. Find the imposter!</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* NEXT BUTTON (OUTSIDE CARD) */}
            <div className="w-full max-w-sm">
              <button 
                onClick={handleNextPlayer}
                disabled={!hasPeeked}
                className={`w-full font-bold py-5 px-8 rounded-2xl transition-all duration-300 ${
                  hasPeeked 
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/50 active:scale-95' 
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                }`}
              >
                {!hasPeeked 
                  ? "Peek at your card first" 
                  : currentPlayerIdx < players.length - 1 
                    ? "Next Player ➔" 
                    : "Go to Discussion ➔"}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="flex gap-2 text-gray-600 flex-wrap justify-center px-4 pt-4">
              {players.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentPlayerIdx ? 'bg-emerald-500 w-6' : i < currentPlayerIdx ? 'bg-gray-500 w-2' : 'bg-gray-800 w-2'}`} />
              ))}
            </div>

          </div>
        )}

        {/* STATE: DISCUSSION */}
        {gameState === 'discussion' && settings.showStartingPlayer && (
          <div className="w-full text-center space-y-10 animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-full p-8 inline-block mb-4 relative">
              <Users size={64} className="text-emerald-500" />
              <div className="absolute top-0 right-0 -mr-2 -mt-2 bg-[#ccff00] text-black w-8 h-8 rounded-full flex items-center justify-center font-black shadow-lg">
                1
              </div>
            </div>
            
            <div className="space-y-4 bg-[#1a1a1a] p-6 rounded-3xl border border-gray-800 shadow-xl">
              <h2 className="text-3xl font-black text-white">Who Starts?</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                <span className="text-emerald-400 font-bold text-2xl uppercase tracking-wider block my-4 animate-pulse">
                  {players[startingPlayerIdx]}
                </span>
                Goes first! Say <strong>one word</strong> related to the secret word. Then go in a circle.
              </p>
              <div className="bg-gray-800/50 p-4 rounded-xl text-left mt-6 border border-gray-700/50">
                <p className="text-[#ccff00] text-sm font-semibold mb-1">Tip:</p>
                <p className="text-gray-400 text-sm">Don't be too obvious, or the Imposter will guess the word. Don't be too vague, or people will think YOU are the Imposter!</p>
              </div>
            </div>

            <div className="pt-4">
              <button 
                onClick={() => setGameState('reveal')}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-red-900/50 transform transition active:scale-95"
              >
                Ready to Vote
              </button>
            </div>
          </div>
        )}

        {/* STATE: DISCUSSION (no starting player) */}
        {gameState === 'discussion' && !settings.showStartingPlayer && (
          <div className="w-full text-center space-y-10 animate-in slide-in-from-bottom-8 duration-500">
            <div className="space-y-4 bg-[#1a1a1a] p-6 rounded-3xl border border-gray-800 shadow-xl">
              <h2 className="text-3xl font-black text-white">Discussion Time</h2>
              <p className="text-gray-400">Take turns saying one word or clue related to the secret word. Vote when ready.</p>
            </div>
            <button onClick={() => setGameState('reveal')} className="w-full bg-red-600 hover:bg-red-500 text-white font-bold text-lg py-5 rounded-2xl shadow-lg shadow-red-900/50 transform transition active:scale-95">
              Ready to Vote
            </button>
          </div>
        )}

        {/* STATE: REVEAL */}
        {gameState === 'reveal' && (
          <div className="w-full text-center flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            
            {!isRevealed ? (
              <div className="space-y-8 w-full">
                <h2 className="text-3xl font-black mb-8">Who was it?</h2>
                <p className="text-gray-400 mb-8">Agree on who you think the Impostor is, then tap to reveal the truth.</p>
                
                <button 
                  onClick={() => {
                    setIsRevealed(true);
                    if (settings.vibration && navigator.vibrate) navigator.vibrate([100, 50, 100]);
                  }}
                  className="w-64 h-64 rounded-full bg-gray-800 border-4 border-gray-700 flex flex-col items-center justify-center mx-auto shadow-2xl active:scale-95 transition-transform"
                >
                  <Eye size={48} className="text-gray-400 mb-4" />
                  <span className="text-xl font-bold text-gray-300">Reveal Impostor</span>
                </button>
              </div>
            ) : (
              <div className="w-full space-y-10 animate-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h3 className="text-gray-400 text-lg uppercase tracking-widest font-semibold">The Impostor was...</h3>
                  <h2 className="text-5xl font-black text-red-500">
                    {imposters.length === 1 
                      ? players[imposters[0]] 
                      : imposters.map(idx => players[idx]).join(' & ')}
                  </h2>
                </div>

                <div className="bg-[#1a1a1a] border border-gray-800 rounded-3xl p-8 shadow-xl w-full">
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-semibold">The Secret Word was</p>
                  <p className="text-xl md:text-2xl font-bold text-emerald-400 break-words" dir="auto">{secretWord}</p>
                </div>

                <button 
                  onClick={restartGame}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-bold text-lg py-5 rounded-2xl border border-gray-700 flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw size={20} /> Play Again
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Modals */}
      {showHowToPlay && <HowToPlayModal onClose={() => setShowHowToPlay(false)} />}

      {showSettings && (
        <SettingsModal
          onClose={() => setShowSettings(false)}
          settings={settings}
          onToggle={toggleSetting}
          onTimerChange={setTimerSeconds}
          onMaxPlayersChange={(val) => updateSettings({ ...settings, maxPlayers: val })}
          onResetCustom={() => {
            if (window.confirm('Delete all custom categories?')) {
              saveCustomCategories({});
              setSelectedCategory('kidsAnimals');
            }
          }}
        />
      )}

      {showCustomModal && (
        <CustomCategoryModal
          onClose={() => setShowCustomModal(false)}
          editingCustomKey={editingCustomKey}
          customName={customName} setCustomName={setCustomName}
          customIcon={customIcon} setCustomIcon={setCustomIcon}
          customWords={customWords} setCustomWords={setCustomWords}
          customWordInput={customWordInput} setCustomWordInput={setCustomWordInput}
          bulkInput={bulkInput} setBulkInput={setBulkInput}
          showBulk={showBulk} setShowBulk={setShowBulk}
          showEmojiPicker={showEmojiPicker} setShowEmojiPicker={setShowEmojiPicker}
          addCustomWord={addCustomWord}
          applyBulkInput={applyBulkInput}
          removeCustomWord={removeCustomWord}
          saveCustomCategory={saveCustomCategory}
          wordInputRef={wordInputRef}
        />
      )}

    </div>
  );
}