import { motion } from 'motion/react';
import { MagicSurge } from '../types';

interface RollHistoryProps {
  history: MagicSurge[];
  onClear: () => void;
}

export function RollHistory({ history, onClear }: RollHistoryProps) {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'buff': return 'border-natural-green';
      case 'debuff': return 'border-natural-red';
      case 'chaotic': return 'border-natural-accent';
      default: return 'border-natural-dark';
    }
  }

  return (
    <div className="w-full bg-natural-panel border border-natural-border rounded-xl flex flex-col shadow-inner overflow-hidden">
      <div className="p-4 border-b border-natural-border bg-natural-panel-header flex justify-between items-center shrink-0">
        <h2 className="text-sm font-bold uppercase tracking-tighter opacity-80 font-sans text-natural-dark">
          История всплесков
        </h2>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="text-[10px] font-sans font-bold uppercase tracking-wider text-natural-text-light hover:text-natural-red transition-colors"
          >
            Очистить
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 max-h-[400px] lg:max-h-none custom-scrollbar">
        {history.length === 0 ? (
          <div className="text-center p-8 opacity-50">
            <p className="text-sm italic font-serif">Журнал пуст.</p>
          </div>
        ) : (
          history.map((surge, index) => {
            const time = new Date(surge.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            return (
              <motion.div 
                key={`${surge.id}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.5) }}
                className={`bg-natural-surface p-3 rounded border-l-4 ${getBadgeColor(surge.type)} shadow-sm ${index > 0 ? 'opacity-80 hover:opacity-100 transition-opacity' : ''}`}
              >
                <div className="flex justify-between items-baseline mb-1 gap-2">
                  <span className="text-[10px] font-sans font-bold text-natural-text-light truncate shrink">
                    {surge.title}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-natural-text-light shrink-0">
                    {time}
                  </span>
                </div>
                <p className="text-sm italic text-natural-text line-clamp-2 leading-snug">
                  {surge.flavor}
                </p>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
