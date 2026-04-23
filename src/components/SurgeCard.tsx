import { motion } from 'motion/react';
import { MagicSurge } from '../types';

interface SurgeCardProps {
  surge: MagicSurge;
}

export function SurgeCard({ surge }: SurgeCardProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buff': return 'border-natural-green';
      case 'debuff': return 'border-natural-red';
      case 'chaotic': return 'border-natural-accent';
      default: return 'border-natural-dark';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'buff': return 'Положительный';
      case 'debuff': return 'Отрицательный';
      case 'chaotic': return 'Хаос';
      default: return 'Нейтральный';
    }
  };
  
  const getBadgeBg = (type: string) => {
    switch (type) {
      case 'buff': return 'bg-natural-green';
      case 'debuff': return 'bg-natural-red';
      case 'chaotic': return 'bg-natural-accent text-natural-dark';
      default: return 'bg-natural-dark text-natural-accent';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex-1 bg-natural-surface border-2 border-natural-border rounded-3xl p-6 sm:p-10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl`}
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-natural-accent to-transparent"></div>
      
      <div className="mb-4 sm:mb-6">
        <span className="text-4xl sm:text-6xl font-bold text-natural-red opacity-20 uppercase tracking-wider">
          Эффект
        </span>
      </div>

      <h3 className="text-2xl sm:text-4xl font-bold mb-4 sm:mb-6 text-natural-dark leading-tight font-cinzel">
        {surge.title}
      </h3>
      
      <p className="text-lg sm:text-xl text-natural-text-muted italic mb-4 max-w-xl leading-relaxed">
        {surge.flavor}
      </p>

      <div className="w-full max-w-xl border-t border-natural-border my-4 pt-4">
        <p className="text-base sm:text-lg font-sans text-natural-text font-medium leading-relaxed">
          {surge.mechanic}
        </p>
      </div>

      <div className="mt-4 sm:mt-10 flex flex-wrap justify-center gap-3 sm:gap-4">
        <span className={`px-4 py-1 ${getBadgeBg(surge.type)} text-natural-bg rounded-full text-xs sm:text-sm font-sans uppercase font-bold tracking-widest`}>
          {getTypeName(surge.type)}
        </span>
        <span className="px-4 py-1 bg-natural-panel border border-natural-border text-natural-text-muted rounded-full text-xs sm:text-sm font-sans uppercase font-bold tracking-widest">
          {surge.duration}
        </span>
      </div>
    </motion.div>
  );
}
