import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

import { MagicSurge } from './types';
import { getRandomSurge } from './data/surges';
import { SurgeCard } from './components/SurgeCard';
import { RollHistory } from './components/RollHistory';

export default function App() {
  const [currentSurge, setCurrentSurge] = useState<MagicSurge | null>(null);
  const [history, setHistory] = useState<MagicSurge[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Load history on mount
  useEffect(() => {
    const saved = localStorage.getItem('wild-magic-history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleRoll = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setCurrentSurge(null); // Clear current to show loading state

    // Фейковая задержка для эффекта "броска" (бросаем кубы)
    setTimeout(() => {
      const newSurge = getRandomSurge();
      setCurrentSurge(newSurge);
      
      const newHistory = [newSurge, ...history].slice(0, 50); // Keep last 50
      setHistory(newHistory);
      localStorage.setItem('wild-magic-history', JSON.stringify(newHistory));
      
      setIsGenerating(false);
    }, 600); // 600ms мнимого броска
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('wild-magic-history');
    setCurrentSurge(null);
  };

  return (
    <div className="min-h-screen bg-natural-bg font-serif text-natural-text overflow-x-hidden flex flex-col">
      
      {/* Header */}
      <header className="h-20 bg-natural-dark text-natural-accent-light flex items-center justify-between px-6 sm:px-10 shadow-lg shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-natural-red rounded-full flex items-center justify-center border-2 border-natural-accent">
            <span className="text-xl font-bold">⚡</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-wide uppercase font-sans hidden sm:block">Генератор Дикой Магии</h1>
          <h1 className="text-xl font-semibold tracking-wide uppercase font-sans block sm:hidden">Д&Д Всплески</h1>
        </div>
        <div className="text-right flex flex-col items-end">
          <p className="text-[10px] sm:text-xs opacity-70 uppercase tracking-widest font-sans">Версия 5e Enhanced</p>
          <p className="text-xs sm:text-sm font-bold text-natural-accent">240+ Эффектов</p>
        </div>
      </header>

      {/* Main Area */}
      <main className="flex-1 flex flex-col lg:flex-row p-4 sm:p-8 gap-8 max-w-7xl mx-auto w-full">
        
        {/* Interaction Section */}
        <section className="flex-1 flex flex-col gap-8 order-1 lg:order-2">
          
          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div 
                key="loading"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 bg-natural-surface border-2 border-natural-border rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-2xl min-h-[300px]"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-full border-t-4 border-l-4 border-natural-accent"
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-natural-dark">
                    <Zap className="w-8 h-8 animate-pulse" />
                  </div>
                </div>
                <p className="mt-6 font-sans text-natural-dark animate-pulse tracking-widest text-sm uppercase font-bold">
                  Искажение плетения...
                </p>
              </motion.div>
            )}

            {!isGenerating && currentSurge && (
              <SurgeCard key={currentSurge.id} surge={currentSurge} />
            )}

            {!isGenerating && !currentSurge && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 bg-natural-surface border-2 border-natural-border rounded-3xl p-10 flex flex-col items-center justify-center text-center shadow-lg min-h-[300px]"
              >
               <div className="mb-4">
                  <span className="text-6xl font-bold text-natural-red opacity-20">d1000</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-natural-dark leading-tight">
                  Потяните за нити магии
                </h3>
                <p className="text-natural-text-muted text-sm sm:text-base leading-relaxed max-w-md">
                  Нажмите кнопку генерации, чтобы получить один из более 240+ сбалансированных эффектов Дикой Магии для D&D 5e.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="h-24 sm:h-32 flex items-center justify-center shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isGenerating}
              onClick={handleRoll}
              className="bg-natural-dark hover:bg-natural-dark-hover text-natural-accent w-full h-full rounded-2xl border-4 border-natural-accent flex flex-col items-center justify-center shadow-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.3em] font-bold opacity-70 mb-1 z-10">
                {isGenerating ? 'Бросок костей...' : 'Вызвать всплеск'}
              </span>
              <span className="text-2xl sm:text-4xl font-bold uppercase tracking-widest z-10">
                МАГИЧЕСКИЙ ВЗРЫВ
              </span>
            </motion.button>
          </div>
        </section>

        {/* History Sidebar */}
        <aside className="w-full lg:w-1/3 order-2 lg:order-1 flex">
          <RollHistory 
            history={history} 
            onClear={clearHistory} 
          />
        </aside>

      </main>

      {/* Footer */}
      <footer className="h-auto py-4 sm:h-12 sm:py-0 bg-natural-panel border-t border-natural-border flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 text-[10px] sm:text-[11px] font-sans font-bold uppercase tracking-widest text-natural-text-light gap-2 mt-auto">
        <div>Сбалансировано по SRD 5.1</div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <span className="cursor-not-allowed opacity-50">Настройки</span>
          <span className="cursor-not-allowed opacity-50">Таблица вероятностей</span>
          <span className="cursor-not-allowed opacity-50">Экспорт в PDF</span>
        </div>
        <div>Offline Mode: OK</div>
      </footer>

    </div>
  );
}

