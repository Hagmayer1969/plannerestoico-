import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, BookOpen, History, Hourglass, Settings } from 'lucide-react';
import { getMonthlyTheme } from '../lib/stoicThemes';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const locale = typeof navigator !== 'undefined' ? navigator.language : 'pt-BR';
  const theme = getMonthlyTheme(new Date(), locale);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background z-10" />
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAeBybmekW1DPjGn0VxoaFmQUcpKHe_mwQCIkVdgfqxodZusYg138vjgEqViA5bE82PTZTXv1RCRteCDo_Wdc0A9jqipsPW9ohk2kXEwbuNJgDLNVfv4n_CShguOlEz1KJxv1gmejZ4gSg7PFNKwBcoKvFICVnRfxqEEdRJHJtJfAM4X0qRh7O1VVzhxHh7Tgx1VOHqZgZix-H6WAT4DQ4asl2aq45rxNcRXpJ30Xq5QnkQ1m8Aj2WE3N2VHJpI8MQtgzzaX9tU74hh"
          alt="Marco Aurélio"
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
          referrerPolicy="no-referrer"
        />
      </div>

      <main className="relative z-30 flex flex-col justify-between items-center min-h-screen px-8 pt-24 pb-16 max-w-lg mx-auto">
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] text-secondary uppercase mb-4 opacity-60">A LIÇÃO MENSAL</span>
          <div className="h-[1px] w-8 bg-primary/30" />
        </motion.header>

        <motion.article 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full text-center"
        >
          <h1 className="font-serif text-6xl md:text-7xl italic text-on-background tracking-tighter mb-8 leading-tight">
            {theme.title}
          </h1>
          <div className="space-y-6">
            <p className="font-serif text-xl md:text-2xl text-on-background/80 font-light italic leading-relaxed">
              "{theme.quote}"
            </p>
            <p className="font-sans text-sm md:text-base text-secondary/80 max-w-xs mx-auto leading-relaxed tracking-wide">
              {theme.description}
            </p>
          </div>
        </motion.article>

        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full flex flex-col items-center gap-12"
        >
          <div className="flex items-center gap-6 text-outline-variant/40">
            <span className="h-[1px] w-12 bg-current" />
            <div className="w-2 h-2 rounded-full bg-current" />
            <span className="h-[1px] w-12 bg-current" />
          </div>

          <button 
            onClick={onComplete}
            className="group relative w-full overflow-hidden bg-gradient-to-r from-primary to-primary-container text-on-primary py-5 rounded-sm shadow-[0_0_20px_rgba(233,193,118,0.1)] transition-all duration-500 hover:shadow-[0_0_30px_rgba(233,193,118,0.2)] active:scale-[0.98]"
          >
            <span className="relative z-10 font-sans text-xs uppercase tracking-[0.25em] font-bold">CONTINUAR</span>
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button className="font-sans text-[10px] uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors duration-300">
            REFLETIR SOBRE ISSO DEPOIS
          </button>
        </motion.footer>
      </main>
    </div>
  );
}

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative min-h-screen flex flex-col items-center stone-texture">
      {/* Header */}
      <header className="bg-background fixed top-0 w-full z-50 h-16 flex justify-between items-center px-6">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          </div>
          <h1 className="font-serif tracking-tighter text-2xl text-primary uppercase">O ARQUIVO</h1>
        </div>
        <span className="font-serif italic text-primary tracking-widest text-xs uppercase opacity-80">Diário Estoico</span>
      </header>

      <main className="flex-grow w-full max-w-lg px-6 pt-24 pb-32 flex flex-col relative z-10">
        {/* Silhouette Background */}
        <div className="absolute top-20 right-0 opacity-10 pointer-events-none transform translate-x-1/4 scale-150">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGg4X89GiDVRZQL2lz8FyBy3Xytayl7UGZm_FToqqf1D29wjsU7yaibFKjswn3ThLxZnTBwCHlo6rtAhRHPi86k9ej9GYfzpZtWEA3rRHk5R8JZjqxATU0PhEYrMPgi7EikTkHCzi1exCIXmosrEXeO59mDue_qoxeCmBXX-IY6FFF2nvPLwmWjzGKqj2bA8nv6Pa04_xcWrPYUld5Qh_9hYEUEWR8wBR80BcwEqN2fgj4J0GpBVz3tK5WdGJrhnIDEvAQvI_NdGoI" 
            alt="" 
            className="w-full grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        <motion.section 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12 relative z-10"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary/60 mb-2">INTRODUÇÃO</p>
          <h2 className="font-serif text-5xl leading-tight tracking-tighter mb-4 italic">
            Cultive <br /> Tranquilidade.
          </h2>
          <p className="text-secondary/70 leading-relaxed font-light text-sm max-w-[80%]">
            Afaste-se do ruído. Este é o seu santuário digital para contemplação, intencionalidade e quietude.
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative group cursor-pointer mb-12"
        >
          <div className="aspect-[9/16] w-full rounded-lg overflow-hidden bg-surface-container-low shadow-2xl relative">
            <video
              src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              poster="https://lh3.googleusercontent.com/aida-public/AB6AXuBeh4K0ZKNQ53F2u-1yOUHZNjR3Lt_faFeAt6fIk4-sdppOzjNo-uSBmMF03VO2oHDv5O_7CBdeOUH3oaQukxPVtW-umhfz6hPcen3SboZVQam3IWCPZEvhqPv-CTK_sciU1oW8-T27oMeuzWHumCjeONnGBsppB95jtEMjWqzIY9fSvFYerHs7XQHtWhTcDJZ30ZEN8Kah090y38xRGHNdsqdoqYclLLwuC9KXJeXpwApv_DT3sQCQ_FcsuYYbDus7cz4AT0v7Nruc"
              controls
              playsInline
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center border border-primary/20 transition-transform duration-300">
                <Play className="text-primary w-8 h-8 fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="glass-panel p-4 rounded">
                <span className="font-serif text-lg italic text-on-background">A Senda Estoica</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-1 h-1 rounded-full bg-primary/60" />
                  <span className="font-sans text-[10px] uppercase tracking-widest text-secondary/50">4:12 TEMPO DE VÍDEO</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-auto"
        >
          <button 
            onClick={onStart}
            className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-5 rounded-lg font-sans font-bold text-sm tracking-[0.15em] uppercase flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_20px_rgba(233,193,118,0.15)] hover:shadow-[0_0_30px_rgba(233,193,118,0.25)]"
          >
            Iniciar a Jornada
            <ArrowRight size={16} />
          </button>
          <p className="text-center mt-6 text-secondary/40 font-sans text-[10px] tracking-widest uppercase">
            FOCO EM PRIVACIDADE. NENHUMA CONTA É NECESSÁRIA PARA COMEÇAR.
          </p>
        </motion.section>
      </main>

      {/* BottomNavBar */}
      <nav className="fixed bottom-0 left-0 w-full z-50 h-20 bg-background/90 backdrop-blur-xl border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] flex justify-around items-center px-8 pb-4">
        <button className="flex flex-col items-center justify-center text-primary scale-110 transition-transform">
          <BookOpen size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Ler</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <History size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Escrever</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <Hourglass size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Foco</span>
        </button>
        <button className="flex flex-col items-center justify-center text-outline-variant opacity-60 hover:text-secondary transition-colors">
          <Settings size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">Ajustes</span>
        </button>
      </nav>

      {/* Grain Overlay */}
      <div className="grain-overlay" />
    </div>
  );
}
