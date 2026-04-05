import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Plus, BookOpen, History, Hourglass, Settings } from 'lucide-react';

const SkeletonItem = () => (
  <div className="w-full h-12 bg-surface-container-low/50 animate-pulse rounded-sm border-b border-outline-variant/10" />
);

const SkeletonRitual = () => (
  <div className="space-y-8 animate-pulse">
    <div className="space-y-4">
      <div className="h-3 w-24 bg-surface-container-high rounded-full" />
      <div className="space-y-2">
        <div className="h-10 w-full bg-surface-container-low rounded-sm" />
        <div className="h-10 w-full bg-surface-container-low rounded-sm" />
      </div>
    </div>
    <div className="h-32 w-full bg-surface-container-high rounded-sm" />
  </div>
);

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-background text-on-background font-sans selection:bg-primary/30 min-h-screen pb-24">
      {/* TopAppBar */}
      <header className="bg-background flex justify-between items-center w-full px-6 h-16 sticky top-0 z-50 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <h1 className="font-serif tracking-tighter text-2xl text-primary uppercase">O ARQUIVO</h1>
        </div>
        <div className="font-serif italic text-primary tracking-widest text-sm opacity-80 uppercase">
          MEMENTO MORI
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8 space-y-12">
        {/* Header Quote */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline">Entrada do Diário</p>
          <h2 className="font-serif italic text-4xl text-on-background leading-tight">Aquiete a mente, e a alma falará.</h2>
        </motion.section>

        {/* Section 1: Reminders */}
        <motion.section 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="stone-texture bg-surface-container-low p-6 rounded-lg border border-outline-variant/15 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-lg">
              <Bell className="text-primary w-6 h-6" />
            </div>
            <div>
              <h3 className="font-serif text-xl text-on-background">Ativar lembretes</h3>
              <p className="font-sans text-xs text-secondary/60">Receba avisos estoicos diários</p>
            </div>
          </div>
          <button className="bg-primary text-on-primary px-4 py-2 text-xs font-semibold uppercase tracking-widest rounded shadow-lg hover:opacity-90 transition-opacity">
            ATIVAR
          </button>
        </motion.section>

        {/* Section 2: Ritual 3-1-3 */}
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl">Ritual 3-1-3</h3>
            <span className="font-sans text-[10px] text-outline uppercase tracking-widest">REFLEXÃO MATINAL</span>
          </div>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="ritual-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <SkeletonRitual />
              </motion.div>
            ) : (
              <motion.div 
                key="ritual-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid gap-8"
              >
                {/* 3 Motivos de Gratidão */}
                <div className="space-y-4">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-secondary block">3 Motivos de Gratidão</label>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        className="w-full bg-surface-container-lowest border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-sm py-3 transition-colors placeholder:text-outline/40"
                        placeholder="Sou grato por..."
                      />
                    ))}
                  </div>
                </div>

                {/* 1 Alvo do Dia */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent blur opacity-25" />
                  <div className="relative stone-texture bg-surface-container-high p-8 border border-primary/20">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary block mb-4 text-center">1 Alvo do Dia</label>
                    <textarea
                      className="w-full bg-transparent border-none focus:ring-0 text-center font-serif text-2xl text-on-background placeholder:text-outline/30 resize-none italic"
                      placeholder="O que define o sucesso hoje?"
                      rows={2}
                    />
                  </div>
                </div>

                {/* 3 Pontos de Melhoria */}
                <div className="space-y-4">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-secondary block">3 Pontos de Melhoria</label>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <input
                        key={i}
                        type="text"
                        className="w-full bg-surface-container-lowest border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-sm py-3 transition-colors placeholder:text-outline/40"
                        placeholder="Refletir sobre a conduta..."
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Section 3: Daily Agenda */}
        <section className="space-y-6 pt-4">
          <h3 className="font-serif text-3xl">Compromissos diários</h3>
          
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="agenda-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/10"
              >
                {[1, 2, 3, 4].map((i) => <SkeletonItem key={i} />)}
              </motion.div>
            ) : (
              <motion.div
                key="agenda-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/10">
                  {[
                    { time: '08:00', title: 'Meditação Matinal' },
                    { time: '10:00', title: 'Trabalho Focado (Deep Work)' },
                    { time: '13:00', title: 'Leitura de Filosofia' },
                    { time: '16:00', title: 'Exercício e Reflexão' },
                  ].map((item, idx) => (
                    <div 
                      key={idx}
                      className={`flex items-center group px-4 py-5 hover:bg-surface-container-high transition-colors ${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''}`}
                    >
                      <span className="font-sans text-[10px] text-outline w-12 shrink-0">{item.time}</span>
                      <div className="flex-1 px-4">
                        <span className="text-sm text-on-background block">{item.title}</span>
                      </div>
                      <div className="w-5 h-5 rounded border border-outline-variant group-hover:border-primary flex items-center justify-center transition-colors">
                        <Check className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-6 flex items-center justify-center gap-2 py-4 border border-dashed border-outline-variant/30 text-outline hover:text-primary hover:border-primary transition-all text-xs font-sans uppercase tracking-widest">
                  <Plus size={14} />
                  ADICIONAR COMPROMISSO
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-8 pb-4 bg-background/90 backdrop-blur-xl z-50 h-20 border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <button className="flex flex-col items-center justify-center text-primary scale-110 transition-transform">
          <BookOpen size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">HOJE</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <History size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">REGISTROS</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <Hourglass size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">FOCO</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <Settings size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">AJUSTES</span>
        </button>
      </nav>

      {/* Grain Overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
