import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, Check, Plus, BookOpen, History, Hourglass, Settings, Edit3, Trash2 } from 'lucide-react';
import { loadJson, saveJson } from '../lib/localStorage';
import { getMonthlyTheme } from '../lib/stoicThemes';

type Commitment = {
  time: string;
  title: string;
  completed: boolean;
};

type RitualState = {
  gratitudes: string[];
  dailyGoal: string;
  improvements: string[];
};

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
  const [gratitudes, setGratitudes] = useState<string[]>(['', '', '']);
  const [dailyGoal, setDailyGoal] = useState('');
  const [improvements, setImprovements] = useState<string[]>(['', '', '']);
  const [commitments, setCommitments] = useState<Commitment[]>([
    { time: '08:00', title: 'Meditação Matinal', completed: false },
    { time: '10:00', title: 'Trabalho Focado (Deep Work)', completed: false },
    { time: '13:00', title: 'Leitura de Filosofia', completed: false },
    { time: '16:00', title: 'Exercício e Reflexão', completed: false },
  ]);
  const [isAddingCommitment, setIsAddingCommitment] = useState(false);
  const [newCommitmentTitle, setNewCommitmentTitle] = useState('');
  const [newCommitmentTime, setNewCommitmentTime] = useState('18:00');
  const [editingCommitmentIndex, setEditingCommitmentIndex] = useState<number | null>(null);
  const [editCommitmentTitle, setEditCommitmentTitle] = useState('');
  const [editCommitmentTime, setEditCommitmentTime] = useState('18:00');
  const [remindersActive, setRemindersActive] = useState(false);
  const [selectedPage, setSelectedPage] = useState<'ler' | 'escrever' | 'foco' | 'ajustes'>('escrever');
  const currentDateLabel = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date());

  const RITUAL_STORAGE_KEY = 'stoic-planner-ritual';
  const COMMITMENTS_STORAGE_KEY = 'stoic-planner-commitments';
  const REMINDERS_STORAGE_KEY = 'stoic-planner-reminders-active';

  useEffect(() => {
    const storedRitual = loadJson<RitualState | null>(RITUAL_STORAGE_KEY, null);
    if (storedRitual) {
      setGratitudes(storedRitual.gratitudes);
      setDailyGoal(storedRitual.dailyGoal);
      setImprovements(storedRitual.improvements);
    }

    const storedCommitments = loadJson<Commitment[]>(COMMITMENTS_STORAGE_KEY, []);
    if (storedCommitments.length > 0) {
      setCommitments(storedCommitments);
    }

    const storedReminders = loadJson<boolean | null>(REMINDERS_STORAGE_KEY, null);
    if (typeof storedReminders === 'boolean') {
      setRemindersActive(storedReminders);
    }

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    saveJson(RITUAL_STORAGE_KEY, { gratitudes, dailyGoal, improvements });
  }, [gratitudes, dailyGoal, improvements]);

  useEffect(() => {
    saveJson(COMMITMENTS_STORAGE_KEY, commitments);
  }, [commitments]);

  useEffect(() => {
    saveJson(REMINDERS_STORAGE_KEY, remindersActive);
  }, [remindersActive]);

  const locale = typeof navigator !== 'undefined' ? navigator.language : 'pt-BR';
  const monthlyTheme = getMonthlyTheme(new Date(), locale);
  const todayLabel = new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());

  const updateGratitude = (index: number, value: string) => {
    setGratitudes((current) => current.map((item, idx) => (idx === index ? value : item)));
  };

  const updateImprovement = (index: number, value: string) => {
    setImprovements((current) => current.map((item, idx) => (idx === index ? value : item)));
  };

  const toggleCommitment = (index: number) => {
    setCommitments((current) =>
      current.map((item, idx) => (idx === index ? { ...item, completed: !item.completed } : item))
    );
  };

  const addCommitment = () => {
    const title = newCommitmentTitle.trim();
    const time = newCommitmentTime.trim();
    if (!title || !time) {
      return;
    }

    setCommitments((current) => [...current, { title, time, completed: false }]);
    setNewCommitmentTitle('');
    setNewCommitmentTime('18:00');
    setIsAddingCommitment(false);
  };

  const toggleReminders = () => {
    setRemindersActive((current) => !current);
  };

  const startEditCommitment = (index: number) => {
    const item = commitments[index];
    setEditingCommitmentIndex(index);
    setEditCommitmentTitle(item.title);
    setEditCommitmentTime(item.time);
  };

  const saveCommitmentEdit = () => {
    if (editingCommitmentIndex === null) {
      return;
    }

    const title = editCommitmentTitle.trim();
    const time = editCommitmentTime.trim();
    if (!title || !time) {
      return;
    }

    setCommitments((current) =>
      current.map((item, idx) =>
        idx === editingCommitmentIndex ? { ...item, title, time } : item
      )
    );
    setEditingCommitmentIndex(null);
    setEditCommitmentTitle('');
    setEditCommitmentTime('18:00');
  };

  const cancelCommitmentEdit = () => {
    setEditingCommitmentIndex(null);
    setEditCommitmentTitle('');
    setEditCommitmentTime('18:00');
  };

  const deleteCommitment = (index: number) => {
    setCommitments((current) => current.filter((_, idx) => idx !== index));
    if (editingCommitmentIndex === index) {
      cancelCommitmentEdit();
    }
  };

  const pageButtonClass = (page: typeof selectedPage) =>
    `flex flex-col items-center justify-center transition-transform ${selectedPage === page ? 'text-primary scale-110' : 'text-outline-variant opacity-60 hover:text-secondary'}`;

  const renderPageContent = () => {
    if (selectedPage === 'ler') {
      return (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl">Lição do Mês</h3>
            <span className="font-sans text-[10px] text-outline uppercase tracking-widest">Revisão Estoica</span>
          </div>
          <div className="stone-texture bg-surface-container-low p-6 rounded-lg border border-outline-variant/15">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-full border border-primary/20">
                <BookOpen className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline">Tema Atual</p>
                <h4 className="font-serif text-2xl text-on-background">{monthlyTheme.title}</h4>
              </div>
            </div>
            <p className="font-serif text-xl text-on-background/90 italic leading-relaxed mb-4">"{monthlyTheme.quote}"</p>
            <p className="text-sm text-secondary/80 leading-relaxed">{monthlyTheme.description}</p>
          </div>
        </section>
      );
    }

    if (selectedPage === 'foco') {
      return (
        <section className="space-y-6 pt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-baseline justify-between">
              <div>
                <h3 className="font-serif text-3xl">Foco</h3>
                <span className="font-sans text-[10px] uppercase tracking-widest text-outline">Agenda & Prioridades</span>
              </div>
              <div className="text-right">
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-secondary/70">Dia</p>
                <p className="font-sans text-sm uppercase tracking-[0.2em] text-on-background">{currentDateLabel}</p>
              </div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-lg overflow-hidden border border-outline-variant/10">
            {commitments.map((item, idx) => (
              <div
                key={idx}
                className={`flex items-center group px-4 py-5 hover:bg-surface-container-high transition-colors ${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''}`}
              >
                <span className="font-sans text-[10px] text-outline w-12 shrink-0">{item.time}</span>
                <div className="flex-1 px-4">
                  {editingCommitmentIndex === idx ? (
                    <div className="grid gap-2">
                      <input
                        type="time"
                        value={editCommitmentTime}
                        onChange={(event) => setEditCommitmentTime(event.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      />
                      <input
                        type="text"
                        value={editCommitmentTitle}
                        onChange={(event) => setEditCommitmentTitle(event.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      />
                    </div>
                  ) : (
                    <span className={`text-sm block ${item.completed ? 'text-secondary/80 line-through' : 'text-on-background'}`}>{item.title}</span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editingCommitmentIndex === idx ? (
                    <>
                      <button
                        type="button"
                        onClick={saveCommitmentEdit}
                        className="px-3 py-2 rounded bg-primary text-on-primary text-xs font-semibold"
                      >
                        Salvar
                      </button>
                      <button
                        type="button"
                        onClick={cancelCommitmentEdit}
                        className="px-3 py-2 rounded border border-outline-variant text-xs text-outline"
                      >
                        Cancelar
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleCommitment(idx)}
                        className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${item.completed ? 'border-primary bg-primary/10' : 'border-outline-variant group-hover:border-primary'}`}
                      >
                        {item.completed ? (
                          <Check className="w-3 h-3 text-primary" />
                        ) : (
                          <span className="block w-2 h-2 rounded-full bg-outline-variant group-hover:bg-primary transition-colors" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => startEditCommitment(idx)}
                        className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center transition-colors hover:border-primary hover:text-primary"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteCommitment(idx)}
                        className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center transition-colors hover:border-red-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setIsAddingCommitment((current) => !current)}
            className="w-full mt-6 flex items-center justify-center gap-2 py-4 border border-dashed border-outline-variant/30 text-outline hover:text-primary hover:border-primary transition-all text-xs font-sans uppercase tracking-widest"
          >
            <Plus size={14} />
            {isAddingCommitment ? 'FECHAR' : 'ADICIONAR COMPROMISSO'}
          </button>
          {isAddingCommitment && (
            <div className="mt-6 space-y-4 rounded-lg border border-outline-variant/20 bg-surface-container-high p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-sans uppercase tracking-[0.2em] text-outline">Novo compromisso</p>
                  <p className="text-xs text-secondary/70">Adicione horário e descrição.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCommitment(false)}
                  className="text-xs uppercase tracking-[0.2em] text-outline hover:text-primary"
                >
                  Cancelar
                </button>
              </div>
              <div className="grid gap-3">
                <input
                  type="time"
                  value={newCommitmentTime}
                  onChange={(event) => setNewCommitmentTime(event.target.value)}
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                />
                <input
                  type="text"
                  value={newCommitmentTitle}
                  onChange={(event) => setNewCommitmentTitle(event.target.value)}
                  placeholder="Descrição do compromisso"
                  className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                />
                <button
                  type="button"
                  onClick={addCommitment}
                  className="w-full bg-primary text-on-primary py-3 rounded uppercase tracking-[0.2em] text-xs font-semibold"
                >
                  SALVAR COMPROMISSO
                </button>
              </div>
            </div>
          )}
        </section>
      );
    }

    if (selectedPage === 'ajustes') {
      return (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between">
            <h3 className="font-serif text-3xl">Ajustes</h3>
            <span className="font-sans text-[10px] text-outline uppercase tracking-widest">Personalize sua rotina</span>
          </div>
          <div className="bg-surface-container-low p-6 rounded-lg border border-outline-variant/15 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-lg">Lembretes Estoicos</p>
                <p className="text-xs text-secondary/70">Ative ou desative as notificações diárias.</p>
              </div>
              <button
                type="button"
                onClick={toggleReminders}
                className={`px-4 py-2 rounded uppercase text-xs font-semibold ${remindersActive ? 'bg-primary text-on-primary' : 'border border-outline-variant text-outline'}`}
              >
                {remindersActive ? 'Ativos' : 'Inativos'}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-serif text-lg">Lição do Mês</p>
                <p className="text-xs text-secondary/70">Revisite o tema e a citação mensal.</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPage('ler')}
                className="px-4 py-2 rounded uppercase text-xs font-semibold bg-surface-container-high border border-outline-variant text-outline hover:text-primary"
              >
                Revisar
              </button>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
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
                <div className="space-y-4">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-secondary block">3 Motivos de Gratidão</label>
                  <div className="space-y-2">
                    {gratitudes.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => updateGratitude(index, event.target.value)}
                        className="w-full bg-surface-container-lowest border-b border-outline-variant/30 focus:border-primary focus:ring-0 text-sm py-3 transition-colors placeholder:text-outline/40"
                        placeholder="Sou grato por..."
                      />
                    ))}
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/10 to-transparent blur opacity-25" />
                  <div className="relative stone-texture bg-surface-container-high p-8 border border-primary/20">
                    <label className="font-sans text-[10px] uppercase tracking-[0.2em] text-primary block mb-4 text-center">1 Alvo do Dia</label>
                    <textarea
                      className="w-full bg-transparent border-none focus:ring-0 text-center font-serif text-2xl text-on-background placeholder:text-outline/30 resize-none italic"
                      placeholder="O que define o sucesso hoje?"
                      rows={2}
                      value={dailyGoal}
                      onChange={(event) => setDailyGoal(event.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="font-sans text-[10px] uppercase tracking-widest text-secondary block">3 Pontos de Melhoria</label>
                  <div className="space-y-2">
                    {improvements.map((value, index) => (
                      <input
                        key={index}
                        type="text"
                        value={value}
                        onChange={(event) => updateImprovement(index, event.target.value)}
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
        <section className="space-y-6 pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <h3 className="font-serif text-3xl">Compromissos diários</h3>
              <span className="font-sans text-[10px] uppercase tracking-widest text-outline">{currentDateLabel}</span>
            </div>
            <span className="font-sans text-[10px] uppercase tracking-widest text-secondary/70">Foco diário</span>
          </div>
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
                  {commitments.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center group px-4 py-5 hover:bg-surface-container-high transition-colors ${idx % 2 !== 0 ? 'bg-surface-container-low/30' : ''}`}
                    >
                      <span className="font-sans text-[10px] text-outline w-12 shrink-0">{item.time}</span>
                      <div className="flex-1 px-4">
                        {editingCommitmentIndex === idx ? (
                          <div className="grid gap-2">
                            <input
                              type="time"
                              value={editCommitmentTime}
                              onChange={(event) => setEditCommitmentTime(event.target.value)}
                              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                            />
                            <input
                              type="text"
                              value={editCommitmentTitle}
                              onChange={(event) => setEditCommitmentTitle(event.target.value)}
                              className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                            />
                          </div>
                        ) : (
                          <span className={`text-sm block ${item.completed ? 'text-secondary/80 line-through' : 'text-on-background'}`}>{item.title}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {editingCommitmentIndex === idx ? (
                          <>
                            <button
                              type="button"
                              onClick={saveCommitmentEdit}
                              className="px-3 py-2 rounded bg-primary text-on-primary text-xs font-semibold"
                            >
                              Salvar
                            </button>
                            <button
                              type="button"
                              onClick={cancelCommitmentEdit}
                              className="px-3 py-2 rounded border border-outline-variant text-xs text-outline"
                            >
                              Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() => toggleCommitment(idx)}
                              className={`w-8 h-8 rounded border flex items-center justify-center transition-colors ${item.completed ? 'border-primary bg-primary/10' : 'border-outline-variant group-hover:border-primary'}`}
                            >
                              {item.completed ? (
                                <Check className="w-3 h-3 text-primary" />
                              ) : (
                                <span className="block w-2 h-2 rounded-full bg-outline-variant group-hover:bg-primary transition-colors" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => startEditCommitment(idx)}
                              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center transition-colors hover:border-primary hover:text-primary"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteCommitment(idx)}
                              className="w-8 h-8 rounded border border-outline-variant flex items-center justify-center transition-colors hover:border-red-400 hover:text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddingCommitment((current) => !current)}
                  className="w-full mt-6 flex items-center justify-center gap-2 py-4 border border-dashed border-outline-variant/30 text-outline hover:text-primary hover:border-primary transition-all text-xs font-sans uppercase tracking-widest"
                >
                  <Plus size={14} />
                  {isAddingCommitment ? 'FECHAR' : 'ADICIONAR COMPROMISSO'}
                </button>
                {isAddingCommitment && (
                  <div className="mt-6 space-y-4 rounded-lg border border-outline-variant/20 bg-surface-container-high p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-sans uppercase tracking-[0.2em] text-outline">Novo compromisso</p>
                        <p className="text-xs text-secondary/70">Adicione horário e descrição.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAddingCommitment(false)}
                        className="text-xs uppercase tracking-[0.2em] text-outline hover:text-primary"
                      >
                        Cancelar
                      </button>
                    </div>
                    <div className="grid gap-3">
                      <input
                        type="time"
                        value={newCommitmentTime}
                        onChange={(event) => setNewCommitmentTime(event.target.value)}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      />
                      <input
                        type="text"
                        value={newCommitmentTitle}
                        onChange={(event) => setNewCommitmentTitle(event.target.value)}
                        placeholder="Descrição do compromisso"
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded px-3 py-2 text-sm focus:border-primary focus:ring-0"
                      />
                      <button
                        type="button"
                        onClick={addCommitment}
                        className="w-full bg-primary text-on-primary py-3 rounded uppercase tracking-[0.2em] text-xs font-semibold"
                      >
                        SALVAR COMPROMISSO
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </>
    );
  };

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
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline">Entrada do Diário</p>
          <h2 className="font-serif italic text-4xl text-on-background leading-tight">Aquiete a mente, e a alma falará.</h2>
        </motion.section>

        <section className="flex flex-col gap-4">
          <div className="stone-texture bg-surface-container-low p-6 rounded-lg border border-outline-variant/15 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 flex items-center justify-center bg-surface-container-high rounded-full border border-primary/20">
                <BookOpen className="text-primary w-6 h-6" />
              </div>
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline">Lição do mês</p>
                <p className="font-serif text-lg text-on-background">{monthlyTheme.title}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPage('ler')}
              className="px-4 py-3 rounded uppercase text-xs font-semibold tracking-[0.2em] bg-primary text-on-primary"
            >
              Revisar
            </button>
          </div>
          <div className="grid sm:grid-cols-[1fr_auto] gap-4">
            <div className="stone-texture bg-surface-container-low p-6 rounded-lg border border-outline-variant/15">
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-outline mb-3">Resumo</p>
              <p className="font-serif text-xl text-on-background leading-relaxed">{monthlyTheme.quote}</p>
            </div>
            <button
              type="button"
              onClick={() => setSelectedPage('ler')}
              className="self-start rounded-lg border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-xs uppercase tracking-[0.2em] font-semibold text-outline hover:text-primary"
            >
              Ver lição do mês
            </button>
          </div>
        </section>

        {renderPageContent()}
      </main>

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-8 pb-4 bg-background/90 backdrop-blur-xl z-50 h-20 border-t border-outline-variant/15 shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
        <button type="button" onClick={() => setSelectedPage('ler')} className={pageButtonClass('ler')}>
          <BookOpen size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">LER</span>
        </button>
        <button type="button" onClick={() => setSelectedPage('escrever')} className={pageButtonClass('escrever')}>
          <History size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">ESCREVER</span>
        </button>
        <button type="button" onClick={() => setSelectedPage('foco')} className={pageButtonClass('foco')}>
          <Hourglass size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">FOCO</span>
        </button>
        <button type="button" onClick={() => setSelectedPage('ajustes')} className={pageButtonClass('ajustes')}>
          <Settings size={24} />
          <span className="font-sans text-[10px] uppercase tracking-widest mt-1">AJUSTES</span>
        </button>
      </nav>

      <div className="grain-overlay" />
    </div>
  );
}
