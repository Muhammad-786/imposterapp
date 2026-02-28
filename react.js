import React, { useState, useEffect } from 'react';
import { Users, Settings, Eye, EyeOff, Play, RotateCcw, ShieldQuestion, HelpCircle, X, Edit2, Plus } from 'lucide-react';

// --- GAME DATA ---
const wordCategories = {
  kidsAnimals: {
    icon: "🐘",
    name: "Easy: Animals in the Quran",
    words: ["Camel", "Elephant", "Whale", "Spider", "Ant", "Bee", "Snake", "Cow", "Bird", "Fish"]
  },
  kidsFood: {
    icon: "🍯",
    name: "Easy: Food & Drink",
    words: ["Dates", "Honey", "Milk", "Zamzam Water", "Olives", "Figs", "Pomegranate", "Grapes"]
  },
  kidsDeeds: {
    icon: "❤️",
    name: "Easy: Good Deeds",
    words: ["Smiling", "Sharing", "Saying Salam", "Helping Parents", "Making Dua", "Giving Charity", "Telling the Truth", "Reading Quran"]
  },
  kidsNature: {
    icon: "🌍",
    name: "Easy: Creations of Allah",
    words: ["The Sun", "The Moon", "The Stars", "Mountains", "The Ocean", "Trees", "Rain", "Clouds"]
  },
  kidsTimes: {
    icon: "⏰",
    name: "Easy: Times & Prayers",
    words: ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha", "Jumu'ah (Friday)", "Ramadan", "Eid"]
  },
  objects: {
    icon: "📿",
    name: "Easy: Islamic Objects",
    words: [
      "The Kaaba", "Zamzam Water", "Miswak", "Prayer Mat", "Tasbih (Prayer Beads)", 
      "The Quran", "Masjid (Mosque)", "Kufi / Hat", "Hijab", "Halal Sweets"
    ]
  },
  countriesPlaces: {
    icon: "🗺️",
    name: "Islamic Countries & Places",
    words: [
      "Makkah", "Madinah", "Jerusalem (Al-Quds)", "Palestine", "Saudi Arabia", 
      "Turkey", "Egypt", "Morocco", "Yemen", "Syria", "Andalusia", "Pakistan", "Indonesia"
    ]
  },
  prophets: {
    icon: "🐪",
    name: "Prophets of Islam",
    words: [
      "Prophet Adam", "Prophet Nuh", "Prophet Ibrahim", "Prophet Musa", 
      "Prophet Isa", "Prophet Muhammad", "Prophet Yusuf", "Prophet Yunus", 
      "Prophet Sulaiman", "Prophet Ayyub"
    ]
  },
  pillars: {
    icon: "🕌",
    name: "Pillars of Islam & Iman",
    words: [
      "Shahadah (Faith)", "Salah (Prayer)", "Zakat (Charity)", "Sawm (Fasting)", "Hajj (Pilgrimage)",
      "Belief in Allah", "Belief in Angels", "Belief in Holy Books", "Belief in Prophets", "Belief in the Day of Judgement", "Belief in Qadar"
    ]
  },
  makharij: {
    icon: "📖",
    name: "Tajweed: Makharij (Hard)",
    words: [
      "Halqiyyah (Throat Letters)", "Lahawiyyah (Deep Tongue)", "Shajariyyah (Middle Tongue)", 
      "Haafiyah (Edge of Tongue)", "Tarafiyyah (Tip of Tongue)", "Nit'iyyah (Palate)", 
      "Lisawiyyah (Gums)", "Safeeriyah (Whistling)", "Shafawiyyah (Lips)", 
      "Jawfee (Empty Space)", "Khaysoom (Nasal Cavity)"
    ]
  },
  angels: {
    icon: "✨",
    name: "Angels of Allah",
    words: [
      "Jibril", "Mikail", "Israfil", "Izrail (Angel of Death)", 
      "Munkar", "Nakir", "Kiraman Katibin (The Recorders)", "Ridwan", "Malik"
    ]
  },
  months: {
    icon: "🌙",
    name: "Islamic Months",
    words: [
      "Muharram", "Safar", "Rabi' al-Awwal", "Rabi' ath-Thani", "Jumada al-Ula", 
      "Jumada al-Akhirah", "Rajab", "Sha'ban", "Ramadan", "Shawwal", "Dhul-Qa'dah", "Dhul-Hijjah"
    ]
  },
  sahabah: {
    icon: "🛡️",
    name: "Famous Sahabah (Companions)",
    words: [
      "Abu Bakr as-Siddiq", "Umar ibn al-Khattab", "Uthman ibn Affan", "Ali ibn Abi Talib", 
      "Bilal ibn Rabah", "Khalid ibn al-Walid", "Salman al-Farsi", "Abu Hurairah"
    ]
  },
  surahs: {
    icon: "📜",
    name: "Famous Surahs",
    words: [
      "Surah Al-Fatihah", "Surah Al-Baqarah", "Surah Ya-Sin", "Surah Al-Kahf", 
      "Surah Al-Mulk", "Surah Ar-Rahman", "Surah Al-Ikhlas", "Surah Al-Falaq", "Surah An-Nas"
    ]
  }
};

export default function App() {
  // --- STATE ---
  const [gameState, setGameState] = useState('setup'); // 'setup', 'passing', 'viewing', 'discussion', 'reveal'
  
  // Setup State
  const [players, setPlayers] = useState(['Player 1', 'Player 2', 'Player 3', 'Player 4']);
  const [imposterCount, setImposterCount] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('kidsAnimals'); // Default to easy category
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  
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
    if (players.length < 25) {
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

    // 2. Pick Secret Word
    const wordsList = wordCategories[selectedCategory].words;
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

  // --- COMPONENTS ---
  const HowToPlayModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#222] w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="p-6">
          <button 
            onClick={() => setShowHowToPlay(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
          
          <h2 className="text-2xl font-bold text-white mb-6">How to Play</h2>
          
          <div className="space-y-4 text-gray-200">
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">1</span>
              <p>Gather 3-25 friends and pass the phone around.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">2</span>
              <p>Each player <strong>presses and holds</strong> the card to see the secret word — except the Imposter, who will see "Imposter".</p>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">3</span>
              <p>One by one, players say a word related to the secret word (e.g. if the word is "Camel", say "Desert").</p>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">4</span>
              <p>The imposter must fake it and try to blend in without knowing the true word.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">5</span>
              <p>Keep giving clues and discussing until someone thinks they've figured it out.</p>
            </div>
            <div className="flex gap-4">
              <span className="text-emerald-500 font-bold text-xl">6</span>
              <p>Vote for who you think the imposter is — then tap to reveal the truth!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-emerald-500/30">
      
      {/* Header */}
      <header className="p-4 flex items-center justify-between border-b border-gray-800 bg-[#1a1a1a]">
        <button onClick={() => setShowHowToPlay(true)} className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-full">
          <HelpCircle size={20} />
        </button>
        <h1 className="text-2xl font-black tracking-widest text-center flex-1 uppercase text-gray-100">
          <span className="text-emerald-500">Islamic</span> Imposter
        </h1>
        <button className="p-2 text-gray-400 hover:text-white transition-colors bg-gray-800 rounded-full">
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
                
                {players.length < 25 && (
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
              <h3 className="text-gray-400 font-bold tracking-widest text-sm flex items-center gap-2 mb-4">
                <span className="text-lg">📚</span> CATEGORIES
              </h3>
              
              <div className="grid grid-cols-1 gap-2 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#10b981 transparent' }}>
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
                e.preventDefault(); // Prevents text selection/magnifier on mobile
                setIsPressing(true);
                setHasPeeked(true);
              }}
              onPointerUp={() => setIsPressing(false)}
              onPointerLeave={() => setIsPressing(false)}
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
                  <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Your Secret Word</span>
                  
                  {imposters.includes(currentPlayerIdx) ? (
                    <div className="text-center">
                      <h3 className="text-4xl font-black text-red-500 tracking-tight mb-1">IMPOSTER</h3>
                      <p className="text-red-400/80 text-sm mb-4">You don't know the word. Blend in!</p>
                      
                      {/* Show fellow imposters if there is more than 1 */}
                      {imposters.length > 1 && (
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
        {gameState === 'discussion' && (
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

        {/* STATE: REVEAL */}
        {gameState === 'reveal' && (
          <div className="w-full text-center flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-500">
            
            {!isRevealed ? (
              <div className="space-y-8 w-full">
                <h2 className="text-3xl font-black mb-8">Who was it?</h2>
                <p className="text-gray-400 mb-8">Discuss and vote on who you think the Imposter is. Once agreed, tap below to reveal the truth.</p>
                
                <button 
                  onClick={() => setIsRevealed(true)}
                  className="w-64 h-64 rounded-full bg-gray-800 border-4 border-gray-700 flex flex-col items-center justify-center mx-auto shadow-2xl active:scale-95 transition-transform"
                >
                  <Eye size={48} className="text-gray-400 mb-4" />
                  <span className="text-xl font-bold text-gray-300">Reveal Imposter</span>
                </button>
              </div>
            ) : (
              <div className="w-full space-y-10 animate-in zoom-in-95 duration-500">
                <div className="space-y-2">
                  <h3 className="text-gray-400 text-lg uppercase tracking-widest font-semibold">The Imposter was...</h3>
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
      {showHowToPlay && <HowToPlayModal />}

    </div>
  );
}