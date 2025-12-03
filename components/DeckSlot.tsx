import React from 'react';
import { Card, Language } from '../types';
import CardItem from './CardItem';
import { Plus } from 'lucide-react';

interface DeckSlotProps {
  card?: Card;
  onRemove: (card: Card) => void;
  lang: Language;
}

const DeckSlot: React.FC<DeckSlotProps> = ({ card, onRemove, lang }) => {
  if (card) {
    return (
        <div className="w-full animate-fade-in">
            <CardItem card={card} onClick={() => onRemove(card)} lang={lang} />
        </div>
    );
  }

  return (
    <div className="w-full aspect-[3/4] rounded-xl border-4 border-clash-stoneLight bg-clash-stone shadow-clash-inset flex flex-col items-center justify-center text-clash-parchment/30 hover:text-clash-gold transition-all duration-200 cursor-default group relative overflow-hidden">
      {/* Stone Texture Overlay */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
      
      <div className="p-3 rounded-full border-2 border-dashed border-current group-hover:border-solid group-hover:bg-clash-stoneLight/50 transition-all z-10">
        <Plus size={24} strokeWidth={3} />
      </div>
    </div>
  );
};

export default DeckSlot;