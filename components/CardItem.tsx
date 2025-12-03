
import React, { useState } from 'react';
import { Card, Rarity, Language } from '../types';
import { ImageOff, Info } from 'lucide-react';
import { cardNameTranslations } from '../cardTranslations';

interface CardItemProps {
  card: Card;
  onClick: (card: Card) => void;
  onInfo?: (card: Card) => void;
  disabled?: boolean;
  lang?: Language;
}

const getRarityBorderColor = (rarity: Rarity, isEvolution?: boolean) => {
  if (isEvolution) return 'border-evolution';
  switch (rarity) {
    case Rarity.COMMON: return 'border-clash-blue'; // Using Clash Blue for Common instead of slate
    case Rarity.RARE: return 'border-rarity-rare';
    case Rarity.EPIC: return 'border-rarity-epic';
    case Rarity.LEGENDARY: return 'border-rarity-legendary';
    case Rarity.CHAMPION: return 'border-rarity-champion';
    default: return 'border-gray-500';
  }
};

const getRarityBg = (rarity: Rarity, isEvolution?: boolean) => {
    if (isEvolution) return 'bg-evolution';
    switch (rarity) {
      case Rarity.COMMON: return 'bg-clash-blue';
      case Rarity.RARE: return 'bg-rarity-rare';
      case Rarity.EPIC: return 'bg-rarity-epic';
      case Rarity.LEGENDARY: return 'bg-rarity-legendary';
      case Rarity.CHAMPION: return 'bg-rarity-champion';
      default: return 'bg-gray-500';
    }
};

const CardItem: React.FC<CardItemProps> = ({ card, onClick, onInfo, disabled, lang = 'en' }) => {
  const [imgError, setImgError] = useState(false);
  const displayName = lang === 'pt' ? (cardNameTranslations[card.id] || card.name) : card.name;

  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInfo) onInfo(card);
  };

  return (
    <div 
      onClick={() => !disabled && onClick(card)}
      className={`
        relative group cursor-pointer transition-transform duration-150 ease-out
        w-full aspect-[3/4] rounded-xl overflow-hidden
        border-b-4 border-r-2 border-l-2 border-t-2 border-black
        bg-clash-stone
        ${disabled ? 'opacity-40 grayscale cursor-not-allowed' : 'hover:-translate-y-1 hover:brightness-110 active:translate-y-0'}
        ${card.isEvolution ? 'shadow-[0_0_15px_rgba(217,70,239,0.4)]' : 'shadow-lg'}
      `}
    >
      {/* Card Inner Frame (Rarity Color) */}
      <div className={`absolute inset-0 border-[3px] ${getRarityBorderColor(card.rarity, card.isEvolution)} rounded-lg z-10 pointer-events-none opacity-80`}></div>

      {/* Evolution Glow Animation */}
      {card.isEvolution && (
        <div className="absolute inset-0 bg-evolution/10 animate-pulse-glow z-0"></div>
      )}

      {/* Image - CHANGED: inset-0 to fill completely */}
      <div className="absolute inset-0 bg-black overflow-hidden">
        {card.imageUrl && !imgError ? (
            <img 
            src={card.imageUrl} 
            alt={displayName}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={() => setImgError(true)}
            />
        ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-clash-parchment p-2 text-center bg-clash-stoneLight pattern-dots">
            <ImageOff size={24} className="mb-2 opacity-50" />
            <span className="text-[10px] font-bold font-display leading-tight opacity-70 uppercase">{displayName}</span>
            </div>
        )}
      </div>

      {/* Elixir Indicator - Smaller 2D Cartoon Pinkish Curved Drop */}
      <div className="absolute -top-1 -left-1 z-20 w-[26px] h-[32px]">
         <svg width="100%" height="100%" viewBox="0 0 34 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md">
            {/* Solid Pinkish/Magenta Fill with Black Cartoon Outline - Curved Tip */}
            <path 
                d="M24 2C24 2 32 16 32 26C32 34.2843 25.2843 39 17 39C8.71573 39 2 34.2843 2 26C2 16 14 8 24 2Z" 
                fill="#e93bf0" 
                stroke="black" 
                strokeWidth="3"
            />
            {/* Simple Cartoon Shine */}
            <path 
                d="M10 18C10 18 12 14 16 16" 
                stroke="white" 
                strokeWidth="3" 
                strokeLinecap="round" 
                opacity="0.9"
            />
         </svg>
         <span className="absolute top-[21px] left-[13px] -translate-x-1/2 -translate-y-1/2 text-white font-display font-black text-sm text-shadow-sm z-30 leading-none pointer-events-none">
            {typeof card.elixir === 'number' ? card.elixir : '?'}
         </span>
      </div>

      {/* Info Button */}
      {onInfo && !disabled && (
        <button 
          onClick={handleInfoClick}
          className="absolute top-8 right-1 p-1 rounded-md bg-black/50 text-white/80 hover:bg-clash-blue hover:text-white border border-white/20 hover:border-white transition-all z-20 opacity-0 group-hover:opacity-100"
        >
          <Info size={14} />
        </button>
      )}

      {/* Bottom Name Plate */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
         {/* Gradient fade behind text */}
         <div className="h-12 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
         <div className="absolute bottom-1 w-full px-1 text-center">
            <h3 className="text-[10px] sm:text-[11px] font-display font-bold text-white uppercase tracking-wider text-shadow-md truncate px-1">
                {displayName}
            </h3>
            {/* Rarity Bar */}
            <div className="h-1.5 w-full bg-gray-800 mt-0.5 rounded-full overflow-hidden border border-black/50 mx-auto max-w-[80%]">
                <div className={`h-full w-full ${getRarityBg(card.rarity, card.isEvolution)}`} />
            </div>
         </div>
      </div>
    </div>
  );
};

export default CardItem;
