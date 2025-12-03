import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card, Language } from '../types';
import { Zap, Repeat } from 'lucide-react';
import { translations } from '../translations';

interface StatsPanelProps {
  deck: Card[];
  lang: Language;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ deck, lang }) => {
  const t = translations[lang];
  
  const avgElixir = useMemo(() => {
    if (deck.length === 0) return 0;
    const total = deck.reduce((acc, card) => acc + (typeof card.elixir === 'number' ? card.elixir : 0), 0);
    return (total / deck.length).toFixed(1);
  }, [deck]);

  const cycleElixir = useMemo(() => {
      if (deck.length < 4) return '-';
      const sorted = deck.map(c => typeof c.elixir === 'number' ? c.elixir : 1.5).sort((a,b) => a - b);
      const cheapest4 = sorted.slice(0, 4);
      return Math.min(...deck.map(c => typeof c.elixir === 'number' ? c.elixir : 99)) + cheapest4.reduce((acc, curr) => acc + curr, 0);
  }, [deck]);

  const elixirDistribution = useMemo(() => {
    const dist = [0, 0, 0, 0, 0, 0, 0, 0];
    deck.forEach(c => {
        const val = typeof c.elixir === 'number' ? c.elixir : 0;
        const cost = Math.min(val, 7);
        dist[cost] = (dist[cost] || 0) + 1;
    });
    return dist.map((count, cost) => ({
        cost: cost === 7 ? '7+' : cost.toString(),
        count
    })).filter((_, i) => i < 8);
  }, [deck]);

  const getBarColor = () => '#5e3a1f'; // Dark Wood
  const activeBarColor = '#F4C542'; // Gold

  return (
    <div className="bg-clash-wood border-4 border-clash-woodDark rounded-xl p-1 relative shadow-clash-card h-full flex flex-col">
      {/* Screw heads */}
      <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
      <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>
      <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-black/40 shadow-inner"></div>

      {/* Inner Parchment Area */}
      <div className="bg-clash-parchment h-full w-full rounded-lg border-2 border-[#bfa780] p-4 flex flex-col justify-between shadow-inner">
          <div>
            <h2 className="text-lg font-display font-bold text-clash-woodDark mb-4 text-center border-b-2 border-clash-woodDark/20 pb-2 uppercase tracking-wide">
                {t.deckAnalytics}
            </h2>

            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-xl bg-[#e6dcc5] border border-[#c9bba0] flex flex-col items-center justify-center shadow-sm">
                    <span className="text-clash-woodDark/70 text-[10px] uppercase font-black mb-1 flex items-center gap-1">
                        <Zap size={12} className="fill-clash-woodDark/70" /> {t.avgElixir}
                    </span>
                    <span className={`text-3xl font-display font-black text-shadow-sm ${Number(avgElixir) > 4.0 ? 'text-red-600' : 'text-clash-blue'}`}>
                        {avgElixir}
                    </span>
                </div>
                <div className="p-3 rounded-xl bg-[#e6dcc5] border border-[#c9bba0] flex flex-col items-center justify-center shadow-sm">
                    <span className="text-clash-woodDark/70 text-[10px] uppercase font-black mb-1 flex items-center gap-1">
                        <Repeat size={12} /> {t.cycle}
                    </span>
                    <span className="text-3xl font-display font-black text-clash-stone text-shadow-sm">
                        {cycleElixir}
                    </span>
                </div>
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-end">
            <h3 className="text-[10px] text-clash-woodDark font-bold mb-2 uppercase tracking-wider text-center bg-[#e6dcc5] rounded-full py-0.5 mx-auto px-3 border border-[#c9bba0]">
                {t.elixirCurve}
            </h3>
            <div className="h-28 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={elixirDistribution}>
                    <XAxis 
                        dataKey="cost" 
                        stroke="#8B5E3C" 
                        tick={{fill: '#5e3a1f', fontSize: 10, fontWeight: 700}} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <Tooltip 
                        cursor={{fill: '#e6dcc5', opacity: 0.5}}
                        contentStyle={{backgroundColor: '#2E2E2E', border: '2px solid #F4C542', borderRadius: '8px', color: '#fff', fontSize: '12px', padding: '4px 8px'}}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={18}>
                        {elixirDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.count > 0 ? activeBarColor : getBarColor()} stroke="black" strokeWidth={1} />
                        ))}
                    </Bar>
                </BarChart>
                </ResponsiveContainer>
            </div>
          </div>
      </div>
    </div>
  );
};

export default StatsPanel;