
import React, { useState, useMemo } from 'react';
import { ALL_CARDS, META_DECKS } from './constants';
import { Card, Rarity, FilterState, Language } from './types';
import { translations } from './translations';
import { cardNameTranslations, cardDescriptionTranslations, evolutionTranslations } from './cardTranslations';
import DeckSlot from './components/DeckSlot';
import CardItem from './components/CardItem';
import StatsPanel from './components/StatsPanel';
import { generateDeck, analyzeDeck } from './services/geminiService';
import { Sparkles, Brain, RotateCcw, Search, Filter, X, ChevronDown, Check, Dna, Globe, Zap, Shield, TrendingUp, Dices, Crown, Trophy, Copy, Layout, ListFilter, Ban, CheckCircle2, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Helper to extract base ID (e.g. 'evo_knight' -> 'knight', 'c_knight' -> 'knight')
const getCardBaseId = (id: string) => {
  return id.replace(/^(c_|r_|e_|l_|ch_|evo_)/, '');
};

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const [activeTab, setActiveTab] = useState<'builder' | 'meta'>('builder');

  const [deck, setDeck] = useState<Card[]>([]);
  const [filter, setFilter] = useState<FilterState>({
    search: '',
    rarity: 'All',
    elixir: 'All'
  });
  const [showEvolutions, setShowEvolutions] = useState(false);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  
  // Auto Build State
  const [showAutoBuildModal, setShowAutoBuildModal] = useState(false);
  const [targetElixir, setTargetElixir] = useState(3.5);
  
  // Constraint Rules State
  const [showConstraintsModal, setShowConstraintsModal] = useState(false);
  const [constraintMode, setConstraintMode] = useState<'include' | 'exclude'>('include');
  const [includedCardIds, setIncludedCardIds] = useState<string[]>([]);
  const [excludedCardIds, setExcludedCardIds] = useState<string[]>([]);
  const [constraintSearch, setConstraintSearch] = useState('');
  
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'pt' : 'en');
  };

  // Main Deck Builder Filtered Cards
  const filteredCards = useMemo(() => {
    return ALL_CARDS.filter(card => {
      if (showEvolutions && !card.isEvolution) return false;
      if (!showEvolutions && card.isEvolution) return false;
      
      const searchTerm = filter.search.toLowerCase();
      let matchesSearch = card.name.toLowerCase().includes(searchTerm);
      if (!matchesSearch && lang === 'pt') {
        const translatedName = cardNameTranslations[card.id];
        if (translatedName && translatedName.toLowerCase().includes(searchTerm)) {
            matchesSearch = true;
        }
      }

      const matchesRarity = filter.rarity === 'All' || card.rarity === filter.rarity;
      const matchesElixir = filter.elixir === 'All' || card.elixir === filter.elixir;
      
      return matchesSearch && matchesRarity && matchesElixir;
    });
  }, [filter, showEvolutions, lang]);

  // Constraints Modal Filtered Cards
  const filteredConstraintCards = useMemo(() => {
    return ALL_CARDS.filter(card => {
      const searchTerm = constraintSearch.toLowerCase();
      let matchesSearch = card.name.toLowerCase().includes(searchTerm);
      if (!matchesSearch && lang === 'pt') {
        const translatedName = cardNameTranslations[card.id];
        if (translatedName && translatedName.toLowerCase().includes(searchTerm)) {
            matchesSearch = true;
        }
      }
      return matchesSearch;
    });
  }, [constraintSearch, lang]);

  const organizeDeck = (cards: Card[]) => {
    return [...cards].sort((a, b) => {
      // 1. Evolutions always first
      if (a.isEvolution && !b.isEvolution) return -1;
      if (!a.isEvolution && b.isEvolution) return 1;

      // 2. Champions always second (after evos)
      if (a.rarity === Rarity.CHAMPION && b.rarity !== Rarity.CHAMPION) return -1;
      if (a.rarity !== Rarity.CHAMPION && b.rarity === Rarity.CHAMPION) return 1;

      return 0;
    });
  };

  const addToDeck = (card: Card) => {
    const cardBaseId = getCardBaseId(card.id);
    const existingCardIndex = deck.findIndex(c => getCardBaseId(c.id) === cardBaseId);
    
    if (existingCardIndex !== -1) {
        const existingCard = deck[existingCardIndex];
        if (existingCard.id === card.id) return;
        if (card.isEvolution && !existingCard.isEvolution) {
            const currentEvoCount = deck.filter(c => c.isEvolution).length;
            if (currentEvoCount >= 2) {
                alert(lang === 'pt' ? "Você só pode ter 2 Evoluções no deck!" : "You can only have 2 Evolutions in your deck!");
                return;
            }
        }
        if (card.rarity === Rarity.CHAMPION && existingCard.rarity !== Rarity.CHAMPION) {
             const currentChampCount = deck.filter(c => c.rarity === Rarity.CHAMPION).length;
             if (currentChampCount >= 1) {
                alert(lang === 'pt' ? "Você só pode ter 1 Campeão no deck!" : "You can only have 1 Champion in your deck!");
                return;
             }
        }
        const newDeck = [...deck];
        newDeck[existingCardIndex] = card;
        setDeck(organizeDeck(newDeck));
        return;
    }
    if (deck.length >= 8) return;
    if (card.isEvolution) {
        const evoCount = deck.filter(c => c.isEvolution).length;
        if (evoCount >= 2) {
            alert(lang === 'pt' ? "Você só pode ter 2 Evoluções no deck!" : "You can only have 2 Evolutions in your deck!");
            return;
        }
    }
    if (card.rarity === Rarity.CHAMPION) {
        const championCount = deck.filter(c => c.rarity === Rarity.CHAMPION).length;
        if (championCount >= 1) {
            alert(lang === 'pt' ? "Você só pode ter 1 Campeão no deck!" : "You can only have 1 Champion in your deck!");
            return;
        }
    }
    const newDeck = [...deck, card];
    setDeck(organizeDeck(newDeck));
  };

  const removeFromDeck = (card: Card) => {
    const newDeck = deck.filter(c => c.id !== card.id);
    setDeck(organizeDeck(newDeck));
  };

  const clearDeck = () => setDeck([]);

  const getCardCost = (c: Card) => typeof c.elixir === 'number' ? c.elixir : 1.5;

  const handleCopyToGame = () => {
    if (deck.length === 0) return;
    // Note: Official Clash Royale deep links require numeric IDs (e.g. 26000001).
    // Since our database uses string IDs, this link format is for demonstration/internal use
    // or requires a backend service to map text IDs to numeric IDs.
    // For now, we generate a link structure that mimics the real one.
    const ids = deck.map(c => c.id).join(';');
    const url = `https://link.clashroyale.com/deck/en?deck=${ids}`;
    navigator.clipboard.writeText(url);
    alert(t.linkCopied);
  };

  const handleAutoBuild = () => {
    setIsGenerating(true);
    let currentDeck: Card[] = [];
    let evoCount = 0;
    let championCount = 0;
    let availableCards = ALL_CARDS.sort(() => 0.5 - Math.random());
    
    for (const card of availableCards) {
        if (currentDeck.length >= 8) break;
        if (currentDeck.find(d => getCardBaseId(d.id) === getCardBaseId(card.id))) continue;
        let canAdd = true;
        if (card.isEvolution && evoCount >= 2) canAdd = false;
        if (card.rarity === Rarity.CHAMPION && championCount >= 1) canAdd = false;
        if (canAdd) {
            currentDeck.push(card);
            if (card.isEvolution) evoCount++;
            if (card.rarity === Rarity.CHAMPION) championCount++;
        }
    }
    
    // Balance for Elixir
    for (let i = 0; i < 200; i++) {
        const total = currentDeck.reduce((acc, c) => acc + getCardCost(c), 0);
        const currentAvg = total / 8;
        const diff = currentAvg - targetElixir;
        if (Math.abs(diff) < 0.125) break; 
        const isTooExpensive = diff > 0;
        let swappableCards = currentDeck;
        if (swappableCards.length === 0) break;
        let cardToRemoveIndex = -1;
        if (isTooExpensive) {
             const sorted = swappableCards.sort((a,b) => getCardCost(b) - getCardCost(a));
             cardToRemoveIndex = currentDeck.findIndex(c => c.id === sorted[0].id);
        } else {
             const sorted = swappableCards.sort((a,b) => getCardCost(a) - getCardCost(b));
             cardToRemoveIndex = currentDeck.findIndex(c => c.id === sorted[0].id);
        }
        if (cardToRemoveIndex === -1) break;
        const cardToRemove = currentDeck[cardToRemoveIndex];
        const candidates = ALL_CARDS.filter(c => 
            !currentDeck.find(d => getCardBaseId(d.id) === getCardBaseId(c.id)) &&
            (c.isEvolution ? (currentDeck.filter(e => e.isEvolution).length - (cardToRemove.isEvolution ? 1 : 0)) < 2 : true) &&
            (c.rarity === Rarity.CHAMPION ? (currentDeck.filter(ch => ch.rarity === Rarity.CHAMPION).length - (cardToRemove.rarity === Rarity.CHAMPION ? 1 : 0)) < 1 : true) &&
            (isTooExpensive ? getCardCost(c) < getCardCost(cardToRemove) : getCardCost(c) > getCardCost(cardToRemove))
        );
        if (candidates.length > 0) {
            currentDeck[cardToRemoveIndex] = candidates[Math.floor(Math.random() * candidates.length)];
        } else { break; }
    }
    setDeck(organizeDeck(currentDeck));
    setIsGenerating(false);
    setShowAutoBuildModal(false);
  };

  // --- CONSTRAINT LOGIC ---

  const toggleConstraint = (card: Card) => {
      const id = card.id;
      
      if (constraintMode === 'include') {
          if (excludedCardIds.includes(id)) {
              setExcludedCardIds(prev => prev.filter(c => c !== id));
          }
          if (includedCardIds.includes(id)) {
              setIncludedCardIds(prev => prev.filter(c => c !== id));
          } else {
              if (includedCardIds.length >= 8) {
                  alert(t.errorMax8);
                  return;
              }
              setIncludedCardIds(prev => [...prev, id]);
          }
      } else {
          if (includedCardIds.includes(id)) {
              setIncludedCardIds(prev => prev.filter(c => c !== id));
          }
          if (excludedCardIds.includes(id)) {
              setExcludedCardIds(prev => prev.filter(c => c !== id));
          } else {
              setExcludedCardIds(prev => [...prev, id]);
          }
      }
  };

  const clearConstraints = () => {
      setIncludedCardIds([]);
      setExcludedCardIds([]);
  };

  const handleGenerateWithConstraints = async () => {
      const includedCards = includedCardIds.map(id => ALL_CARDS.find(c => c.id === id)).filter(Boolean) as Card[];
      
      const evoCount = includedCards.filter(c => c.isEvolution).length;
      if (evoCount > 2) {
          alert(t.errorTooManyEvos);
          return;
      }
      
      const champCount = includedCards.filter(c => c.rarity === Rarity.CHAMPION).length;
      if (champCount > 1) {
          alert(t.errorTooManyChamps);
          return;
      }

      const baseIds = new Set<string>();
      for (const card of includedCards) {
          const base = getCardBaseId(card.id);
          if (baseIds.has(base)) {
              alert(t.errorConflict);
              return;
          }
          baseIds.add(base);
      }

      setIsGenerating(true);
      setShowConstraintsModal(false);
      
      try {
          const cardNames = await generateDeck("Synergistic deck with constraints", lang, includedCardIds, excludedCardIds);
          
          const newDeck: Card[] = [];
          const seenBaseIds = new Set<string>();
          let currentEvoCount = 0;
          let currentChampCount = 0;

          includedCards.forEach(c => {
               newDeck.push(c);
               seenBaseIds.add(getCardBaseId(c.id));
               if (c.isEvolution) currentEvoCount++;
               if (c.rarity === Rarity.CHAMPION) currentChampCount++;
          });

          for (const name of cardNames) {
              if (newDeck.length >= 8) break;
              const found = ALL_CARDS.find(c => c.name.toLowerCase() === name.toLowerCase());
              if (!found) continue;
              const baseId = getCardBaseId(found.id);
              if (seenBaseIds.has(baseId)) continue; 
              if (excludedCardIds.includes(found.id)) continue;
              if (found.isEvolution && currentEvoCount >= 2) continue;
              if (found.rarity === Rarity.CHAMPION && currentChampCount >= 1) continue;
              newDeck.push(found);
              seenBaseIds.add(baseId);
              if (found.isEvolution) currentEvoCount++;
              if (found.rarity === Rarity.CHAMPION) currentChampCount++;
          }
          setDeck(organizeDeck(newDeck));
      } catch (e) {
          alert("Error generating deck.");
      } finally {
          setIsGenerating(false);
      }
  };

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const cardNames = await generateDeck(aiPrompt, lang);
      const newDeck: Card[] = [];
      let evoCount = 0;
      let championCount = 0;
      const seenBaseIds = new Set<string>();

      cardNames.forEach(name => {
        const found = ALL_CARDS.find(c => c.name.toLowerCase() === name.toLowerCase());
        if (found) {
            const baseId = getCardBaseId(found.id);
            if (seenBaseIds.has(baseId)) return; 
            let canAdd = true;
            if (found.isEvolution && evoCount >= 2) canAdd = false;
            if (found.rarity === Rarity.CHAMPION && championCount >= 1) canAdd = false;
            if (canAdd) {
                newDeck.push(found);
                seenBaseIds.add(baseId);
                if (found.isEvolution) evoCount++;
                if (found.rarity === Rarity.CHAMPION) championCount++;
            }
        }
      });
      setDeck(organizeDeck(newDeck.slice(0, 8)));
      setShowAiModal(false);
    } catch (error) {
      alert("Failed to generate deck.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAiAnalyze = async () => {
    if (deck.length !== 8) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setShowAnalysisModal(true);
    try {
      const result = await analyzeDeck(deck, lang);
      setAnalysisResult(result);
    } catch (error) {
      setAnalysisResult(t.analysisFailed);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyMetaDeck = (cardIds: string[]) => {
      const newDeck: Card[] = [];
      cardIds.forEach(id => {
          const card = ALL_CARDS.find(c => c.id === id);
          if (card) newDeck.push(card);
      });
      setDeck(organizeDeck(newDeck));
      setActiveTab('builder');
      alert(t.deckCopied);
  };

  const getCardDescription = (card: Card) => {
    if (lang === 'pt') {
        return cardDescriptionTranslations[card.id] || card.description;
    }
    return card.description;
  };

  const getEvolutionStats = (card: Card) => {
      if (!card.evolutionStats) return null;
      if (lang === 'pt' && evolutionTranslations[card.id]) {
          return {
              ...card.evolutionStats,
              ability: evolutionTranslations[card.id].ability,
              statBoost: evolutionTranslations[card.id].statBoost
          };
      }
      return card.evolutionStats;
  };

  return (
    <div className="min-h-screen pb-20 overflow-x-hidden">
      
      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-clash-wood border-b-4 border-black shadow-clash-btn">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('builder')}>
             <div className="relative w-14 h-20 transition-transform group-hover:scale-105">
                 {/* Gold Border Layer (Shield) */}
                 <div 
                    className="absolute inset-0 bg-clash-gold shadow-lg"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}
                 />
                 {/* Inner Purple Layer (Shield) */}
                 <div 
                    className="absolute inset-[3px] bg-clash-purple overflow-hidden"
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)' }}
                 >
                     <div className="w-full h-full relative">
                         <img 
                            src="https://raw.githubusercontent.com/RoyaleAPI/cr-api-assets/master/cards/knight.png" 
                            alt="DeckLab Logo" 
                            className="w-full h-full object-cover scale-110 object-top" 
                        />
                     </div>
                 </div>
                 {/* Crown */}
                 <div className="absolute -top-3 -right-2 text-clash-gold animate-bounce-sm z-20"><Crown size={16} fill="currentColor" /></div>
             </div>
             <div className="flex flex-col">
                 <h1 className="text-2xl font-display font-black tracking-tight text-white text-shadow-lg leading-none">Deck<span className="text-clash-gold">Lab</span></h1>
                 <span className="text-[10px] text-clash-parchment font-bold uppercase tracking-widest opacity-80">Clash Builder</span>
             </div>
          </div>

          {/* Tab Navigation (Desktop) */}
          <div className="hidden sm:flex bg-black/40 p-1 rounded-xl border-2 border-white/10 backdrop-blur-sm">
              <button 
                  onClick={() => setActiveTab('builder')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold uppercase transition-all clash-btn border-b-4 ${activeTab === 'builder' ? 'bg-clash-blue border-clash-blueDark text-white shadow-lg' : 'bg-transparent border-transparent text-clash-parchment hover:text-white'}`}
              >
                  <Layout size={18} />
                  {t.tabBuilder}
              </button>
              <button 
                  onClick={() => setActiveTab('meta')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold uppercase transition-all clash-btn border-b-4 ${activeTab === 'meta' ? 'bg-clash-gold border-clash-goldDim text-clash-woodDark shadow-lg' : 'bg-transparent border-transparent text-clash-parchment hover:text-white'}`}
              >
                  <Trophy size={18} />
                  {t.tabMeta}
              </button>
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-2">
            <button 
                onClick={toggleLanguage}
                className="group flex items-center gap-2 px-3 py-2 bg-clash-stone border-b-4 border-black hover:border-clash-gold text-clash-parchment hover:text-white rounded-lg text-xs font-black transition-all active:border-b-0 active:translate-y-1"
                title={lang === 'en' ? "Switch to Portuguese" : "Mudar para Inglês"}
            >
                <Globe size={16} />
                <span>{lang === 'en' ? 'EN' : 'PT'}</span>
            </button>
            
            <button 
              onClick={() => setShowConstraintsModal(true)}
              className="hidden sm:flex group items-center gap-2 px-3 py-2 bg-clash-woodDark border-b-4 border-black hover:border-clash-gold text-white rounded-lg text-xs font-black transition-all active:border-b-0 active:translate-y-1"
              title={t.cardRules}
            >
              <ListFilter size={18} />
            </button>

            <button 
              onClick={() => setShowAutoBuildModal(true)}
              className="group flex items-center gap-2 px-3 py-2 bg-clash-purple border-b-4 border-clash-purpleDark text-white rounded-lg transition-all active:border-b-0 active:translate-y-1 shadow-clash-btn"
              title={t.autoBuild}
            >
              <Dices size={20} />
            </button>

            <button 
              onClick={() => setShowAiModal(true)}
              className="group flex items-center gap-2 px-4 py-2 bg-clash-blue border-b-4 border-clash-blueDark text-white hover:brightness-110 rounded-lg text-sm font-black transition-all active:border-b-0 active:translate-y-1 shadow-clash-btn"
            >
              <Sparkles size={16} className="text-white" />
              <span className="hidden sm:inline">{t.aiDraft}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Tab Nav */}
      <div className="sm:hidden flex border-b-4 border-black bg-clash-wood sticky top-20 z-40 shadow-xl">
            <button 
                onClick={() => setActiveTab('builder')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase transition-all ${activeTab === 'builder' ? 'text-white bg-black/20' : 'text-clash-parchment'}`}
            >
                <Layout size={16} />
                {t.tabBuilder}
            </button>
            <button 
                onClick={() => setActiveTab('meta')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase transition-all ${activeTab === 'meta' ? 'text-clash-gold bg-black/20' : 'text-clash-parchment'}`}
            >
                <Trophy size={16} />
                {t.tabMeta}
            </button>
      </div>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-12">
        {activeTab === 'builder' ? (
            /* --- DECK BUILDER VIEW --- */
            <>
                <section className="animate-slide-up">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
                    <div>
                        <h2 className="text-3xl font-display font-black text-white text-shadow-lg uppercase tracking-wide">{t.yourDeck}</h2>
                        <div className="h-1 w-20 bg-clash-gold mt-1 rounded-full shadow-lg"></div>
                    </div>
                    
                    <div className="flex gap-3">
                        <button 
                        onClick={clearDeck}
                        disabled={deck.length === 0}
                        className="px-4 py-2 bg-red-600 border-b-4 border-red-800 text-white rounded-lg font-bold uppercase text-xs hover:bg-red-500 disabled:opacity-50 disabled:grayscale transition-all active:border-b-0 active:translate-y-1 shadow-clash-btn"
                        >
                           <RotateCcw size={16} className="inline mr-2" /> {t.clearDeck}
                        </button>
                        <button
                        onClick={handleAiAnalyze}
                        disabled={deck.length !== 8}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-black uppercase transition-all shadow-clash-btn min-w-[140px] justify-center border-b-4 active:border-b-0 active:translate-y-1
                            ${deck.length === 8 
                            ? 'bg-green-500 border-green-700 text-white hover:bg-green-400' 
                            : 'bg-clash-stone border-black text-clash-parchment opacity-50 cursor-not-allowed'}
                        `}
                        >
                        {deck.length === 8 
                            ? <><Brain size={18} /> {t.analyze}</>
                            : <span className="opacity-70">{8 - deck.length} {t.cardsLeft}</span>}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Deck Slots */}
                    <div className="lg:col-span-2">
                        {/* Stone Slab Background */}
                        <div className="bg-clash-stone border-4 border-clash-stoneLight rounded-2xl p-6 relative shadow-clash-card">
                            {/* Decorative rivets */}
                            <div className="absolute top-2 left-2 w-3 h-3 bg-black/50 rounded-full border border-white/10"></div>
                            <div className="absolute top-2 right-2 w-3 h-3 bg-black/50 rounded-full border border-white/10"></div>
                            
                            <div className="grid grid-cols-4 gap-3 sm:gap-4 place-items-center">
                                {Array.from({ length: 8 }).map((_, i) => (
                                    <div key={i} className="relative w-full">
                                        {i < 2 && (
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-evolution text-white border-2 border-white shadow-md text-[9px] font-black px-2 py-0.5 rounded-md z-10 whitespace-nowrap uppercase tracking-wider">
                                                Evo Slot
                                            </div>
                                        )}
                                        <DeckSlot 
                                            card={deck[i]} 
                                            onRemove={removeFromDeck} 
                                            lang={lang}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 flex justify-between items-center text-xs font-black uppercase tracking-widest px-2 bg-black/20 py-2 rounded-lg border border-white/5">
                                <span className="text-clash-parchment">{deck.length} / 8 {t.cardsCount}</span>
                                <span className={`flex items-center gap-2 ${deck.length === 8 ? "text-green-400" : "text-orange-400"}`}>
                                    {deck.length === 8 ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />}
                                    {deck.length === 8 ? t.ready : t.deckIncomplete}
                                </span>
                            </div>

                            {/* Copy to Game Button */}
                            <button
                                onClick={handleCopyToGame}
                                disabled={deck.length !== 8}
                                className={`w-full mt-4 py-4 rounded-xl font-black uppercase tracking-wider text-sm border-b-4 flex items-center justify-center gap-3 transition-all active:border-b-0 active:translate-y-1 shadow-lg
                                    ${deck.length === 8 
                                        ? 'bg-clash-blue border-clash-blueDark text-white hover:brightness-110' 
                                        : 'bg-gray-700 border-gray-900 text-gray-400 cursor-not-allowed'}
                                `}
                            >
                                <Share2 size={20} />
                                {t.copyToGame}
                            </button>
                        </div>
                    </div>

                    {/* Stats Preview */}
                    <div className="lg:col-span-1 h-full min-h-[200px]">
                    <StatsPanel deck={deck} lang={lang} />
                    </div>
                </div>
                </section>

                <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="sticky top-24 z-30 mb-8 px-1">
                    <div className="bg-clash-wood border-4 border-black shadow-xl rounded-xl p-3 flex flex-col sm:flex-row gap-3 relative">
                        
                        {/* Metal Rivets on Bar */}
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-6 bg-gray-400 rounded-r-md border-y border-r border-black"></div>
                        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-6 bg-gray-400 rounded-l-md border-y border-l border-black"></div>

                        {/* Search */}
                        <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-clash-parchment" size={20} />
                        <input 
                            type="text" 
                            placeholder={t.searchPlaceholder}
                            className="w-full bg-clash-stone border-2 border-clash-stoneLight text-white placeholder-clash-parchment/50 focus:border-clash-gold rounded-lg h-12 pl-12 pr-4 text-sm font-medium shadow-clash-inset transition-colors"
                            value={filter.search}
                            onChange={(e) => setFilter({...filter, search: e.target.value})}
                        />
                        </div>

                        {/* Filters */}
                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1 sm:pb-0">
                            
                            {/* Evolution Toggle */}
                            <button
                                onClick={() => setShowEvolutions(!showEvolutions)}
                                className={`
                                    flex items-center gap-2 px-4 py-3 rounded-lg text-xs font-black uppercase tracking-wide transition-all whitespace-nowrap border-b-4 active:border-b-0 active:translate-y-1
                                    ${showEvolutions 
                                        ? 'bg-evolution border-fuchsia-900 text-white' 
                                        : 'bg-clash-stone border-black text-clash-parchment hover:text-white'}
                                `}
                            >
                                <Dna size={16} />
                                {t.evolutions}
                            </button>

                            <div className="relative group">
                            <select 
                                className="appearance-none bg-clash-stone border-b-4 border-black hover:border-clash-gold text-clash-parchment text-xs font-black uppercase px-4 py-3 pr-10 rounded-lg cursor-pointer transition-colors focus:outline-none"
                                value={filter.rarity}
                                onChange={(e) => setFilter({...filter, rarity: e.target.value as any})}
                            >
                                <option value="All">{t.rarity}: {t.all}</option>
                                {Object.values(Rarity).map(r => (
                                    <option key={r} value={r}>{t[r.toLowerCase() as keyof typeof t] || r}</option>
                                ))}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-clash-parchment pointer-events-none" />
                            </div>

                            <div className="relative group">
                            <select 
                                className="appearance-none bg-clash-stone border-b-4 border-black hover:border-clash-gold text-clash-parchment text-xs font-black uppercase px-4 py-3 pr-10 rounded-lg cursor-pointer transition-colors focus:outline-none"
                                value={filter.elixir}
                                onChange={(e) => setFilter({...filter, elixir: e.target.value === 'All' ? 'All' : Number(e.target.value)})}
                            >
                                <option value="All">{t.elixir}: {t.all}</option>
                                {[1,2,3,4,5,6,7,8,9].map(n => <option key={n} value={n}>{n}</option>
                                )}
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-clash-parchment pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4 sm:gap-6 px-1">
                    {filteredCards.map(card => {
                        const inDeck = !!deck.find(c => c.id === card.id);
                        const evoCount = deck.filter(c => c.isEvolution).length;
                        const isEvoDisabled = !inDeck && card.isEvolution && evoCount >= 2;
                        const championCount = deck.filter(c => c.rarity === Rarity.CHAMPION).length;
                        const isChampionDisabled = !inDeck && card.rarity === Rarity.CHAMPION && championCount >= 1;

                        return (
                        <div key={card.id} className="relative">
                            <CardItem 
                                card={card} 
                                onClick={addToDeck}
                                onInfo={setSelectedCard}
                                disabled={inDeck || deck.length >= 8 || isEvoDisabled || isChampionDisabled}
                                lang={lang}
                            />
                            {inDeck && (
                                <div className="absolute -top-3 -right-3 bg-green-500 border-2 border-green-700 text-white rounded-lg p-1.5 shadow-lg z-20 animate-bounce-sm">
                                <Check size={16} strokeWidth={4} />
                                </div>
                            )}
                        </div>
                        );
                    })}
                </div>
                </section>
            </>
        ) : (
            /* --- META DECKS VIEW --- */
            <section className="animate-fade-in">
                 <div className="relative overflow-hidden rounded-2xl bg-clash-blue border-4 border-clash-gold shadow-clash-card p-8 mb-12">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20"></div>
                    <div className="absolute top-0 right-0 p-12 opacity-20 animate-pulse">
                         <Crown size={240} className="text-white" />
                    </div>
                    
                    <div className="relative z-10 text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center justify-center p-4 bg-black/30 rounded-xl mb-6 backdrop-blur-md border-2 border-clash-gold shadow-lg">
                            <Crown className="text-clash-gold mr-3 animate-bounce" size={32} fill="currentColor" />
                            <h2 className="text-3xl font-display font-black text-white tracking-widest uppercase text-shadow-lg">
                                {t.metaTitle}
                            </h2>
                            <Crown className="text-clash-gold ml-3 animate-bounce" size={32} fill="currentColor" />
                        </div>
                        <p className="text-lg md:text-xl text-clash-parchment leading-relaxed font-bold drop-shadow-md bg-black/20 p-4 rounded-xl border border-white/5">
                            {t.metaDescription}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {META_DECKS.map((metaDeck) => {
                        const deckCards = metaDeck.cardIds.map(id => ALL_CARDS.find(c => c.id === id)).filter(Boolean) as Card[];
                        const sortedDeck = organizeDeck(deckCards);
                        return (
                            <div key={metaDeck.id} className="group relative bg-clash-stone border-4 border-black rounded-2xl overflow-hidden hover:border-clash-gold hover:-translate-y-2 transition-all duration-300 shadow-clash-card">
                                <div className="p-4 border-b-4 border-black bg-clash-woodDark relative">
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="relative flex justify-between items-start z-10">
                                        <div>
                                            <h3 className="font-display font-black text-xl text-white text-shadow-md uppercase">{metaDeck.name}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="flex items-center gap-1 bg-black/40 text-clash-parchment text-xs font-bold px-2 py-1 rounded border border-white/10">
                                                    <Zap size={12} className="text-evolution fill-evolution" /> {metaDeck.avgElixir}
                                                </span>
                                                <span className={`px-2 py-1 rounded text-xs font-bold border border-black/20 uppercase ${
                                                    metaDeck.difficulty === 'Hard' ? 'bg-red-600 text-white' : 
                                                    metaDeck.difficulty === 'Medium' ? 'bg-orange-500 text-white' : 
                                                    'bg-green-600 text-white'
                                                }`}>
                                                    {metaDeck.difficulty}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1.5 bg-gradient-to-b from-green-500 to-green-700 text-white px-3 py-1.5 rounded-lg border-2 border-green-300 shadow-md">
                                                <TrendingUp size={18} />
                                                <span className="font-black text-lg text-shadow-sm">{metaDeck.winRate}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 grid grid-cols-4 gap-2 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                                    {sortedDeck.map((card, idx) => (
                                        <div key={idx} className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-black shadow-md">
                                            <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
                                            {card.isEvolution && <div className="absolute inset-0 border-2 border-evolution shadow-[inset_0_0_10px_rgba(217,70,239,0.8)]"></div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 bg-clash-stoneLight border-t-4 border-black">
                                    <p className="text-xs text-clash-parchment mb-4 italic pl-3 border-l-4 border-clash-gold leading-relaxed">"{metaDeck.description}"</p>
                                    <button 
                                        onClick={() => copyMetaDeck(metaDeck.cardIds)}
                                        className="w-full py-3 bg-clash-blue border-b-4 border-clash-blueDark text-white font-black uppercase rounded-xl transition-all hover:bg-blue-500 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <Copy size={20} />
                                        {t.copyDeck}
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        )}
      </main>

      {/* --- MODALS --- */}

      {/* Constraints Modal */}
      {showConstraintsModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in">
              <div className="bg-clash-stone border-4 border-clash-gold w-full max-w-5xl h-[85vh] rounded-3xl shadow-2xl flex flex-col relative overflow-hidden">
                  
                  {/* Header */}
                  <div className="p-6 border-b-4 border-black bg-clash-wood flex items-center justify-between shrink-0 shadow-lg relative z-20">
                      <div>
                          <h2 className="text-2xl font-black font-display text-white text-shadow-lg flex items-center gap-3 uppercase">
                              <ListFilter className="text-clash-gold" /> {t.rulesModalTitle}
                          </h2>
                      </div>
                      <button onClick={() => setShowConstraintsModal(false)} className="p-2 rounded-lg bg-red-600 border-b-4 border-red-800 text-white hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Mode Switcher */}
                  <div className="p-4 grid grid-cols-2 gap-4 shrink-0 bg-clash-stoneLight border-b-4 border-black">
                      <button 
                          onClick={() => setConstraintMode('include')}
                          className={`py-4 rounded-xl border-b-4 flex flex-col items-center justify-center gap-2 transition-all clash-btn
                              ${constraintMode === 'include' 
                                  ? 'bg-green-600 border-green-800 text-white' 
                                  : 'bg-clash-stone border-black text-gray-500 hover:text-white'}
                          `}
                      >
                          <CheckCircle2 size={28} />
                          <span className="font-black uppercase tracking-wider text-sm">{t.modeInclude}</span>
                      </button>
                      <button 
                          onClick={() => setConstraintMode('exclude')}
                          className={`py-4 rounded-xl border-b-4 flex flex-col items-center justify-center gap-2 transition-all clash-btn
                              ${constraintMode === 'exclude' 
                                  ? 'bg-red-600 border-red-800 text-white' 
                                  : 'bg-clash-stone border-black text-gray-500 hover:text-white'}
                          `}
                      >
                          <Ban size={28} />
                          <span className="font-black uppercase tracking-wider text-sm">{t.modeExclude}</span>
                      </button>
                  </div>

                  {/* Search Bar */}
                  <div className="p-4 bg-black/20 shrink-0">
                      <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-clash-parchment" size={20} />
                          <input 
                              type="text" 
                              placeholder={t.searchPlaceholder}
                              className="w-full bg-clash-stone border-2 border-clash-stoneLight text-white focus:border-clash-gold rounded-lg h-12 pl-12 pr-4 shadow-clash-inset"
                              value={constraintSearch}
                              onChange={(e) => setConstraintSearch(e.target.value)}
                          />
                      </div>
                  </div>

                  {/* Card Grid */}
                  <div className="flex-grow overflow-y-auto p-4 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
                          {filteredConstraintCards.map(card => {
                              const isIncluded = includedCardIds.includes(card.id);
                              const isExcluded = excludedCardIds.includes(card.id);
                              
                              return (
                                  <div 
                                      key={card.id} 
                                      className="relative cursor-pointer transition-transform hover:scale-105 active:scale-95"
                                      onClick={() => toggleConstraint(card)}
                                  >
                                      <div className={`
                                          rounded-lg overflow-hidden aspect-[3/4] relative border-2 border-black shadow-md
                                          ${isIncluded ? 'ring-4 ring-green-500 z-10 scale-105' : ''}
                                          ${isExcluded ? 'ring-4 ring-red-500 grayscale opacity-60' : ''}
                                      `}>
                                          <img src={card.imageUrl} className="w-full h-full object-cover" loading="lazy" />
                                          {isIncluded && (
                                              <div className="absolute inset-0 flex items-center justify-center bg-green-500/40 backdrop-blur-[1px]">
                                                  <CheckCircle2 size={40} className="text-white drop-shadow-xl" strokeWidth={3} />
                                              </div>
                                          )}
                                          {isExcluded && (
                                              <div className="absolute inset-0 flex items-center justify-center bg-red-500/40 backdrop-blur-[1px]">
                                                  <Ban size={40} className="text-white drop-shadow-xl" strokeWidth={3} />
                                              </div>
                                          )}
                                      </div>
                                  </div>
                              )
                          })}
                      </div>
                  </div>

                  {/* Footer / Dock */}
                  <div className="p-4 bg-clash-wood border-t-4 border-black shrink-0 flex items-center justify-between gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.5)] z-20">
                      <div className="flex gap-2 overflow-x-auto max-w-[50%] scrollbar-hide py-2 px-1 bg-black/20 rounded-lg border border-black/10 shadow-inner h-16 items-center">
                           {includedCardIds.length === 0 && excludedCardIds.length === 0 && <span className="text-xs text-white/40 px-2 italic">Select cards...</span>}
                           {includedCardIds.map(id => {
                               const c = ALL_CARDS.find(card => card.id === id);
                               return c ? <img key={id} src={c.imageUrl} className="w-10 h-[13.33px] object-cover rounded border-2 border-green-500" style={{height: 'auto', aspectRatio: '3/4'}} /> : null
                           })}
                           {excludedCardIds.length > 0 && <div className="w-[1px] h-full bg-white/20 mx-1"></div>}
                           {excludedCardIds.map(id => {
                               const c = ALL_CARDS.find(card => card.id === id);
                               return c ? <img key={id} src={c.imageUrl} className="w-10 h-[13.33px] object-cover rounded border-2 border-red-500 grayscale opacity-70" style={{height: 'auto', aspectRatio: '3/4'}} /> : null
                           })}
                      </div>

                      <div className="flex gap-3">
                          <button onClick={clearConstraints} className="px-4 py-3 rounded-lg bg-gray-600 border-b-4 border-gray-800 text-white font-bold hover:bg-gray-500 active:border-b-0 active:translate-y-1 transition-all">
                              {t.clearDeck}
                          </button>
                          <button 
                              onClick={handleGenerateWithConstraints}
                              disabled={isGenerating}
                              className="px-6 py-3 bg-clash-blue border-b-4 border-clash-blueDark hover:bg-blue-500 text-white rounded-lg font-black uppercase shadow-lg flex items-center gap-2 active:border-b-0 active:translate-y-1 transition-all"
                          >
                              {isGenerating ? <div className="animate-spin w-5 h-5 border-4 border-white/30 border-t-white rounded-full"></div> : <Sparkles size={20} className="fill-white" />}
                              {t.generateWithRules}
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      {/* Selected Card Modal */}
      {selectedCard && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setSelectedCard(null)}>
           <div className="bg-clash-stone w-full max-w-md rounded-2xl border-4 border-clash-gold shadow-2xl p-6 relative overflow-hidden" onClick={e => e.stopPropagation()}>
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 pointer-events-none"></div>
                
                <button 
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-red-600 border-b-4 border-red-800 text-white active:border-b-0 active:translate-y-1 transition-all z-30"
                >
                  <X size={20} />
                </button>
                <div className="flex flex-col items-center mb-6 z-10 relative">
                   <div className="w-36 h-48 mb-4 relative">
                       {selectedCard.isEvolution && (
                          <div className="absolute -inset-6 bg-evolution/40 blur-2xl rounded-full animate-pulse-glow" />
                       )}
                       <div className="w-full h-full relative z-10 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                           <img src={selectedCard.imageUrl} className="w-full h-full object-contain" alt={selectedCard.name} />
                       </div>
                       
                       <div className="absolute -bottom-3 -right-3 w-12 h-14 z-20">
                            {/* Large Elixir Icon */}
                            <svg viewBox="0 0 34 42" fill="none" className="w-full h-full drop-shadow-lg">
                                <path d="M17 2C17 2 32 18 32 27C32 35.2843 25.2843 40 17 40C8.71573 40 2 35.2843 2 27C2 18 17 2 17 2Z" fill="url(#paint_lg_elixir)" stroke="black" strokeWidth="2"/>
                                <defs>
                                    <linearGradient id="paint_lg_elixir" x1="17" y1="2" x2="17" y2="40" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#ff5edb"/>
                                        <stop offset="1" stopColor="#7e1296"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 text-white font-display font-black text-xl text-shadow-md">
                                {selectedCard.elixir}
                            </span>
                       </div>
                   </div>
                   <h2 className={`text-3xl font-display font-black text-center uppercase text-shadow-lg ${selectedCard.isEvolution ? 'text-evolution' : 'text-white'}`}>
                       {lang === 'pt' ? (cardNameTranslations[selectedCard.id] || selectedCard.name) : selectedCard.name}
                   </h2>
                   <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-black/50 ${selectedCard.rarity === Rarity.LEGENDARY ? 'bg-rarity-legendary text-black' : 'bg-gray-600 text-white'}`}>
                            {t[selectedCard.rarity.toLowerCase() as keyof typeof t] || selectedCard.rarity}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-black/50 bg-clash-wood text-white">
                            {selectedCard.type}
                        </span>
                   </div>
                </div>
                <div className="space-y-4 relative z-10">
                    <div className="bg-[#e6dcc5] rounded-xl p-4 border-2 border-[#c9bba0] shadow-inner text-clash-woodDark font-medium">
                        <p className="text-sm leading-relaxed">{getCardDescription(selectedCard)}</p>
                    </div>
                    {selectedCard.isEvolution && selectedCard.evolutionStats && (
                        <div className="space-y-2 animate-slide-up">
                            <h3 className="text-sm font-black text-evolution uppercase tracking-wider flex items-center gap-2 text-shadow-sm">
                                <Dna size={16} /> Evolution Details
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                <div className="bg-evolution/10 rounded-xl p-3 border-2 border-evolution/30 flex items-center gap-3">
                                    <div className="bg-evolution text-white p-2 rounded-lg border border-black/20 shadow-sm">
                                        <TrendingUp size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-evolution font-black uppercase">Cycles</p>
                                        <div className="flex gap-1 mt-1">
                                            {Array.from({length: selectedCard.evolutionStats.cycles}).map((_, i) => (
                                                <div key={i} className="w-3 h-3 bg-evolution rotate-45 border border-white shadow-sm" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-evolution/10 rounded-xl p-3 border-2 border-evolution/30 flex items-center gap-3">
                                    <div className="bg-evolution text-white p-2 rounded-lg border border-black/20 shadow-sm">
                                        <Zap size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-evolution font-black uppercase">Ability</p>
                                        <p className="text-sm text-white font-bold text-shadow-sm">{getEvolutionStats(selectedCard)?.ability}</p>
                                    </div>
                                </div>
                                <div className="bg-evolution/10 rounded-xl p-3 border-2 border-evolution/30 flex items-center gap-3">
                                    <div className="bg-evolution text-white p-2 rounded-lg border border-black/20 shadow-sm">
                                        <Shield size={18} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-evolution font-black uppercase">Stat Boost</p>
                                        <p className="text-sm text-white font-bold text-shadow-sm">{getEvolutionStats(selectedCard)?.statBoost}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
           </div>
        </div>
      )}

      {/* Auto Build Modal */}
      {showAutoBuildModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-clash-stone w-full max-w-sm rounded-3xl border-4 border-clash-purple shadow-2xl p-6 md:p-8 relative overflow-hidden flex flex-col">
             <button 
              onClick={() => setShowAutoBuildModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-red-600 border-b-4 border-red-800 text-white hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all"
             >
              <X size={20} />
             </button>
             <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 bg-clash-purple rounded-2xl flex items-center justify-center mb-4 border-4 border-clash-purpleDark shadow-lg rotate-3">
                   <Dices size={40} className="text-white" />
                </div>
                <h2 className="text-2xl font-black font-display text-white text-shadow-lg uppercase tracking-wide">{t.targetElixirTitle}</h2>
                <p className="text-clash-parchment text-sm mt-2 font-medium">{t.targetElixirDesc}</p>
             </div>
             <div className="mb-8 bg-black/20 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-xs font-bold text-clash-parchment uppercase">{t.avgElixir}</span>
                    <span className="text-5xl font-display font-black text-clash-purple text-shadow-md">{targetElixir.toFixed(1)}</span>
                </div>
                {/* Styled Range Slider */}
                <div className="relative h-6 w-full">
                    <div className="absolute top-1/2 left-0 w-full h-3 bg-black rounded-full border border-white/10 -translate-y-1/2"></div>
                    <input 
                        type="range" 
                        min="2.0" 
                        max="7.3" 
                        step="0.1" 
                        value={targetElixir} 
                        onChange={(e) => setTargetElixir(parseFloat(e.target.value))}
                        className="absolute w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div 
                        className="absolute top-1/2 h-full bg-clash-purple rounded-l-full -translate-y-1/2 pointer-events-none"
                        style={{width: `${((targetElixir - 2.0) / (7.3 - 2.0)) * 100}%`}}
                    ></div>
                    <div 
                        className="absolute top-1/2 w-6 h-6 bg-white border-4 border-clash-purple rounded-full shadow-lg -translate-y-1/2 -ml-3 pointer-events-none z-10"
                        style={{left: `${((targetElixir - 2.0) / (7.3 - 2.0)) * 100}%`}}
                    ></div>
                </div>
             </div>
             <button 
                onClick={handleAutoBuild}
                className="w-full py-4 bg-clash-purple border-b-4 border-clash-purpleDark text-white font-black uppercase rounded-xl hover:brightness-110 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-3 shadow-lg"
             >
                <Zap size={24} fill="currentColor" />
                {t.generate}
             </button>
          </div>
        </div>
      )}

      {/* AI Draft Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-clash-wood w-full max-w-lg rounded-2xl border-4 border-clash-gold shadow-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-10 pointer-events-none"></div>
            
            <button 
              onClick={() => setShowAiModal(false)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-red-600 border-b-4 border-red-800 text-white hover:bg-red-500 active:border-b-0 active:translate-y-1 transition-all z-20"
            >
              <X size={20} />
            </button>
            <div className="mb-6 relative z-10">
              <div className="w-16 h-16 bg-clash-blue rounded-xl flex items-center justify-center mb-4 border-4 border-clash-blueDark shadow-clash-btn">
                <Sparkles size={32} className="text-white fill-white" />
              </div>
              <h2 className="text-3xl font-black font-display text-white text-shadow-lg uppercase">{t.aiModalTitle}</h2>
              <p className="text-clash-parchment font-medium mt-2 bg-black/20 p-2 rounded-lg border border-white/5">{t.aiModalDesc}</p>
            </div>
            <textarea 
              className="w-full h-40 bg-clash-parchment border-4 border-[#bfa780] rounded-xl p-4 text-base text-clash-woodDark font-medium focus:outline-none focus:border-clash-blue transition-all resize-none placeholder-clash-woodDark/50 shadow-inner"
              placeholder={t.aiPlaceholder}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <div className="mt-6">
              <button 
                onClick={handleAiGenerate}
                disabled={isGenerating || !aiPrompt.trim()}
                className="w-full py-4 bg-clash-blue border-b-4 border-clash-blueDark text-white font-black uppercase rounded-xl hover:brightness-110 disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-3 shadow-lg active:border-b-0 active:translate-y-1"
              >
                {isGenerating ? (
                  <>
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t.draftingStrategy}
                  </>
                ) : (
                  t.generateDeck
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-clash-parchment w-full max-w-3xl max-h-[85vh] flex flex-col rounded-xl border-4 border-clash-woodDark shadow-2xl relative overflow-hidden">
            {/* Scroll Header */}
            <div className="p-6 border-b-2 border-[#bfa780] flex items-center justify-between bg-[#e6dcc5]">
                <div>
                   <h2 className="text-2xl font-black font-display text-clash-woodDark uppercase tracking-wide flex items-center gap-3">
                     <Brain size={24} /> {t.analysisTitle}
                   </h2>
                   <p className="text-xs text-clash-woodDark/70 font-bold uppercase mt-1">{t.analysisSubtitle}</p>
                </div>
                <button 
                  onClick={() => setShowAnalysisModal(false)}
                  className="p-2 rounded-lg bg-clash-woodDark text-white hover:bg-clash-wood transition-colors"
                >
                  <X size={24} />
                </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar bg-clash-parchment">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                  <div className="relative">
                     <div className="w-20 h-20 border-8 border-[#c9bba0] rounded-full"></div>
                     <div className="absolute top-0 left-0 w-20 h-20 border-8 border-clash-woodDark border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-clash-woodDark font-bold animate-pulse text-lg">{t.analyzing}</p>
                </div>
              ) : (
                <div className="prose prose-stone prose-lg max-w-none text-clash-woodDark">
                  {analysisResult ? (
                    <ReactMarkdown 
                        components={{
                            h1: ({node, ...props}) => <h1 className="text-clash-woodDark font-display text-3xl font-black uppercase mb-4 border-b-4 border-clash-woodDark pb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-clash-blue font-display text-2xl font-black uppercase mt-8 mb-3" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-clash-woodDark font-display text-xl font-bold mt-6 mb-2" {...props} />,
                            strong: ({node, ...props}) => <strong className="text-clash-purple font-black" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 mb-4 marker:text-clash-woodDark" {...props} />,
                            li: ({node, ...props}) => <li className="pl-1 font-medium" {...props} />
                        }}
                    >
                        {analysisResult}
                    </ReactMarkdown>
                  ) : (
                    <div className="text-center py-10 text-red-600 bg-red-100 rounded-xl border-2 border-red-300">
                        <p className="font-bold">{t.analysisFailed}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
