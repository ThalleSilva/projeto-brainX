import { 
  Home, BookOpen, Plus, Search, Bell, User, 
  ArrowRight, Calculator, Code, Sparkles, Send, Book, MessageSquare, 
  LogOut, ExternalLink, GraduationCap, FolderHeart, FileText, 
  Link as LinkIcon, Paperclip, Download, Trash2, Flame, Star, Timer, Play, Pause, RotateCcw, Headphones
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';

// --- Types ---
interface Message { role: 'ai' | 'user'; text: string; }
interface StudySession { id: number; subject: string; messages: Message[]; }
interface StudyMaterial { id: number; title: string; type: string; content: string; fileName: string; createdAt: string; }

// --- Main App ---
export default function Dashboard({ onLogout }: { onLogout?: () => void }) {
  const [currentView, setCurrentView] = useState<'home' | 'session' | 'portfolio'>('home');
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [materials, setMaterials] = useState<StudyMaterial[]>([]);
  
  const [message, setMessage] = useState('');
  const [loadingMsg, setLoadingMsg] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatType, setNewMatType] = useState('Link');
  const [newMatContent, setNewMatContent] = useState('');
  const [fileName, setFileName] = useState('');

  const [profileOpen, setProfileOpen] = useState(false);
  const userId = localStorage.getItem("userId");

  // === NOVOS ESTADOS: GAMIFICAÇÃO & MODO ZEN ===
  const [zenMode, setZenMode] = useState(false);
  
  // XP e Nível via LocalStorage
  const [xp, setXp] = useState(() => parseInt(localStorage.getItem('bx_xp') || '0'));
  const [level, setLevel] = useState(() => parseInt(localStorage.getItem('bx_level') || '1'));
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('bx_streak') || '1')); // Começa com 1 dia
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Pomodoro
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);

  // Efeitos da Gamificação
  useEffect(() => {
    localStorage.setItem('bx_xp', xp.toString());
    localStorage.setItem('bx_level', level.toString());
    localStorage.setItem('bx_streak', streak.toString());
  }, [xp, level, streak]);

  const gainXp = (amount: number) => {
    let newXp = xp + amount;
    const nextLevelLimit = level * 100;
    
    if (newXp >= nextLevelLimit) {
      setLevel(l => l + 1);
      setXp(newXp - nextLevelLimit);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 4000);
    } else {
      setXp(newXp);
    }
  };

  // Efeito do Pomodoro
  useEffect(() => {
    let interval: any = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      gainXp(50); // Ganha 50 XP ao terminar um pomodoro!
      alert("Pomodoro finalizado! Você ganhou 50 XP! Hora de uma pausa.");
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Efeitos e Loads Base
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5132/api/chat/sessions/${userId}`)
        .then(res => setSessions(res.data))
        .catch(console.error);
      loadMaterials();
    }
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, activeSessionId, loadingMsg, currentView]);

  const loadMaterials = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:5132/api/portfolio/${userId}`);
      setMaterials(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    if (onLogout) onLogout();
  };

  // Navegação
  const navigateToHome = () => { setActiveSessionId(null); setCurrentView('home'); };
  const navigateToPortfolio = () => { setActiveSessionId(null); setCurrentView('portfolio'); };
  const navigateToSession = (id: number) => { setActiveSessionId(id); setCurrentView('session'); };

  // --- Funções de API e Upload ---
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ops! O arquivo é muito grande. O limite máximo é de 5MB.");
        e.target.value = ''; 
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => setNewMatContent(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMaterial = async () => {
    if (!newMatTitle || !newMatContent || !userId) return;
    try {
      await axios.post('http://localhost:5132/api/portfolio/add', {
        userId: parseInt(userId), title: newMatTitle, type: newMatType,
        content: newMatContent, fileName: newMatType === 'Arquivo' ? fileName : ''
      });
      setShowAddForm(false);
      setNewMatTitle(''); setNewMatContent(''); setFileName('');
      loadMaterials();
      gainXp(20); // Ganha 20 XP ao salvar material
    } catch (error) {
      alert("Erro ao salvar material.");
    }
  };

  const handleDeleteMaterial = async (id: number) => {
    const confirmar = window.confirm("Tem certeza que deseja excluir este material?");
    if (!confirmar) return;

    try {
      await axios.delete(`http://localhost:5132/api/portfolio/delete/${id}`);
      setMaterials(prev => prev.filter(mat => mat.id !== id));
    } catch (error: any) {
      console.error(error.response);
      alert("Erro ao excluir. Verifique se a API está rodando corretamente.");
    }
  };

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || message;
    if (!textToSend.trim() || !userId) return;
    
    setMessage('');
    setLoadingMsg(true);

    if (activeSessionId) {
      setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, { role: 'user', text: textToSend }] } : s));
    }

    try {
      const payload = { userId: parseInt(userId), sessionId: activeSessionId, message: textToSend };
      const res = await axios.post('http://localhost:5132/api/chat/ask', payload);
      const data = res.data;

      if (data.isNewSession) {
        const newSession = { id: data.sessionId, subject: data.subject, messages: [{ role: 'user', text: textToSend }, { role: 'ai', text: data.reply }] };
        setSessions(prev => [newSession, ...prev]);
        navigateToSession(data.sessionId);
      } else {
        if (activeSessionId) {
          setSessions(prev => prev.map(s => s.id === activeSessionId ? { ...s, messages: [...s.messages, { role: 'ai', text: data.reply }] } : s));
        } else {
          alert("Assistente: " + data.reply);
        }
      }
      gainXp(10); // Ganha 10 XP por pergunta respondida
    } catch (error) {
      console.error(error);
      alert("Erro de conexão.");
    } finally {
      setLoadingMsg(false);
    }
  };

  const activeSessionData = sessions.find(s => s.id === activeSessionId);
  const lastUserMessage = activeSessionData?.messages.filter(m => m.role === 'user').pop()?.text;

const getDynamicSuggestions = (subject?: string, lastMsg?: string) => {
    const followUps: Record<string, string[]> = {
      // C#
      'O que é variavel?': ['Quais os tipos de dados?', 'O que é array?'],
      'Explique POO': ['O que é herança?', 'O que é encapsulamento?', 'O que é polimorfismo?'],
      'Como usar for?': ['Explique while', 'Como funciona o foreach?'],
      'O que é api?': ['O que é json?', 'O que é entity framework?'],
      'O que é classe abstrata?': ['O que é interface?', 'O que é injecao de dependencia?'],
      
      // Matemática
      'Teorema de pitagoras': ['O que é trigonometria?'],
      'O que é fracao?': ['Como resolver regra de tres?', 'Como calcular porcentagem?'],
      'Fórmula de bhaskara': ['O que é o delta?', 'O que é funcao do segundo grau?'],
      'O que é juros simples?': ['Explique juros compostos'],
      'O que é probabilidade?': ['O que é arranjo?', 'O que é combinacao?', 'O que é permutacao?'],
      'O que é media?': ['O que é mediana?', 'O que é moda?'],
      
      // Português
      'Regra da crase': ['O que é sujeito?', 'Como usar virgula?'],
      'Uso dos porque': ['Qual a diferenca entre mal e mau?', 'Onde e aonde?'],
      'Diferenca de mas e mais': ['Senao ou se nao?'],
      'O que é metafora?': ['O que é pleonasmo?', 'O que é hiperbole?', 'O que é ironia?'],
      'O que é oxitona?': ['O que é proparoxitona?']
    };

    if (lastMsg && followUps[lastMsg]) return followUps[lastMsg];
    
    // Sugestões Iniciais (Porta de entrada)
    if (subject === 'C#') return ['O que é variavel?', 'Explique POO', 'O que é api?', 'Como usar for?'];
    if (subject === 'Matemática') return ['Fórmula de bhaskara', 'O que é fracao?', 'O que é probabilidade?', 'O que é media?'];
    if (subject === 'Português') return ['Regra da crase', 'Uso dos porque', 'Diferenca de mas e mais', 'O que é metafora?'];
    
    return [];
  };

  const currentSuggestions = getDynamicSuggestions(activeSessionData?.subject, lastUserMessage);

  return (
    // Se o Modo Zen estiver ativo, a cor de fundo muda para focar mais
    <div className={`min-h-screen transition-colors duration-500 ${zenMode ? 'bg-[#0f172a] text-white' : 'bg-background'}`}>
      
      {/* --- TOPBAR --- */}
      <header className={`fixed top-0 left-0 w-full z-40 backdrop-blur-md flex justify-between items-center px-8 py-4 border-b ${zenMode ? 'bg-[#0f172a]/90 border-white/10' : 'bg-surface/80 border-transparent'}`}>
        <div className={`flex items-center gap-8 transition-all ${zenMode ? 'pl-0' : 'pl-64'}`}>
          <span className="text-2xl font-black tracking-tighter text-primary cursor-pointer flex items-center gap-2" onClick={navigateToHome}>
            <Sparkles size={24} className={zenMode ? 'text-white' : 'text-primary'} /> BrainX
          </span>
        </div>
        
        {/* Componentes Centrais da TopBar (Pomodoro) */}
        <div className="hidden md:flex items-center gap-4 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/20 shadow-sm">
          <Timer size={18} className="text-primary" />
          <span className={`font-mono font-bold text-lg ${timerActive ? 'text-primary' : 'text-on-surface'}`}>{formatTime(timeLeft)}</span>
          <div className="flex gap-1 border-l border-outline-variant/30 pl-3 ml-1">
            <button onClick={() => setTimerActive(!timerActive)} className="p-1.5 hover:bg-primary/10 hover:text-primary rounded-lg transition-colors">
              {timerActive ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={() => { setTimerActive(false); setTimeLeft(25 * 60); }} className="p-1.5 hover:bg-error/10 hover:text-error rounded-lg transition-colors">
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          
          {/* MODO ZEN TOGGLE */}
          <button 
            onClick={() => setZenMode(!zenMode)} 
            className={`p-2 rounded-full transition-colors flex items-center gap-2 px-4 font-bold text-sm ${zenMode ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'}`}
          >
            <Headphones size={18} /> {zenMode ? 'Modo Zen Ativo' : 'Modo Foco'}
          </button>

          {/* Gamificação Stats */}
          <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-outline-variant/10">
            <div className="flex items-center gap-1 text-orange-500 font-bold text-sm" title="Dias seguidos de estudo">
              <Flame size={18} fill="currentColor" /> {streak}
            </div>
            <div className="w-px h-4 bg-outline-variant/30"></div>
            <div className="flex items-center gap-1 text-primary font-bold text-sm" title={`Nível ${level} (${xp}/${level * 100} XP)`}>
              <Star size={18} fill="currentColor" /> Nvl {level}
            </div>
          </div>

          <div className="relative">
            <button onClick={() => setProfileOpen(!profileOpen)} className="p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full transition-colors bg-surface-container-low">
              <User size={20} />
            </button>
            
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-xl py-2 z-50">
                <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-3 font-semibold">
                  <LogOut size={16} /> Sair da conta
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* --- SIDEBAR --- */}
      {/* Esconde a Sidebar se o Modo Zen estiver ativo */}
      {!zenMode && (
        <aside className="fixed left-0 top-0 h-full flex flex-col pt-20 pb-8 bg-surface-container-high w-64 border-r-0 z-30 transition-all duration-300 ease-in-out">
          <nav className="flex-1 space-y-1 overflow-y-auto mt-4">
            <a href="#" onClick={navigateToHome} className={`flex items-center py-3 pl-5 transition-all hover:bg-surface-container-low group ${currentView === 'home' ? 'text-primary font-bold border-l-4 border-primary-container bg-surface-container-low' : 'text-on-surface-variant'}`}>
              <Home size={20} className={`mr-3 ${currentView === 'home' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
              <span className="text-sm font-medium">Início</span>
            </a>

            <a href="#" onClick={navigateToPortfolio} className={`flex items-center py-3 pl-5 transition-all hover:bg-surface-container-low group ${currentView === 'portfolio' ? 'text-primary font-bold border-l-4 border-primary-container bg-surface-container-low' : 'text-on-surface-variant'}`}>
              <FolderHeart size={20} className={`mr-3 ${currentView === 'portfolio' ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`} />
              <span className="text-sm font-medium">Meu Portfólio</span>
            </a>

            <div className="mt-8 px-5">
              <p className="text-xs font-bold text-outline uppercase tracking-wider mb-3">Sessões Salvas</p>
              {sessions.length === 0 ? (
                <p className="text-xs text-on-surface-variant italic">Nenhuma sessão.</p>
              ) : (
                sessions.map((sess: any) => (
                  <a key={sess.id} href="#" onClick={() => navigateToSession(sess.id)} className={`flex items-center py-2 transition-colors ${activeSessionId === sess.id && currentView === 'session' ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-primary'}`}>
                    <MessageSquare size={16} className={`mr-3 shrink-0 ${activeSessionId === sess.id && currentView === 'session' ? 'text-primary' : ''}`} />
                    <span className="text-sm font-medium truncate">{sess.subject}</span>
                  </a>
                ))
              )}
            </div>
          </nav>

          <div className="px-4 mt-auto">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={navigateToHome} className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all mb-4 flex items-center justify-center gap-2">
              <Plus size={18} /> Nova Sessão
            </motion.button>
          </div>
        </aside>
      )}

      {/* Alerta de Subir de Nível Flutuante */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.5 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl z-50 flex items-center gap-3 font-black text-xl"
          >
            <Star size={32} className="animate-spin" /> VOCÊ SUBIU PARA O NÍVEL {level}!
          </motion.div>
        )}
      </AnimatePresence>

      <main className={`pt-24 px-12 pb-20 max-w-7xl mx-auto transition-all duration-500 ${zenMode ? 'ml-0 max-w-4xl' : 'ml-64'}`}>
        
        {/* ================= VISÃO HOME ================= */}
        {currentView === 'home' && !zenMode && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <section className="mb-12 mt-4 bg-gradient-to-r from-primary to-primary-container p-10 rounded-3xl text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
              <h1 className="text-4xl font-black tracking-tight mb-4 relative z-10">Qual o seu foco hoje?</h1>
              <p className="text-on-primary-container text-lg mb-8 max-w-xl relative z-10">Escolha um tópico abaixo para iniciar uma sessão de estudos guiada.</p>
              
              <div className="relative max-w-2xl z-10">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
                  placeholder="Ou digite direto aqui: 'Quero estudar C#'..."
                  className="w-full bg-white text-on-surface border-none shadow-lg rounded-2xl py-4 px-6 text-lg focus:ring-4 focus:ring-primary-fixed transition-all outline-none"
                />
                <button onClick={() => sendMessage()} disabled={loadingMsg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2.5 rounded-xl hover:bg-primary-fixed hover:text-primary-fixed-variant transition-colors disabled:opacity-50">
                  <ArrowRight size={20} />
                </button>
              </div>
            </section>

            <section className="mb-16">
              <div className="flex justify-between items-end mb-6">
                <h2 className="text-2xl font-bold text-on-surface">Tópicos Interativos</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['Matemática', 'C#', 'Português'].map((mat) => (
                  <motion.div key={mat} whileHover={{ y: -5 }} className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-transparent hover:border-primary/20 transition-all flex flex-col h-full">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {mat === 'C#' ? <Code size={24} /> : mat === 'Matemática' ? <Calculator size={24} /> : <Book size={24} />}
                    </div>
                    <h3 className="text-lg font-bold mb-4">{mat === 'C#' ? 'Programação (C#)' : mat}</h3>
                    <button onClick={() => sendMessage(`Quero estudar ${mat}`)} className="w-full mt-auto py-2.5 bg-surface-container-low text-primary font-bold rounded-xl hover:bg-primary hover:text-white transition-colors">Iniciar Sessão</button>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {/* Mensagem se tentar ver Home no Modo Zen */}
        {currentView === 'home' && zenMode && (
          <div className="flex flex-col items-center justify-center h-[60vh] text-center">
            <Headphones size={64} className="text-primary/50 mb-6" />
            <h1 className="text-4xl font-black mb-4">Modo Foco Ativado</h1>
            <p className="text-white/70 max-w-md">Você está no Santuário Cognitivo. Abra uma sessão de estudos salva ou desative o modo foco no topo da tela para ver outras opções.</p>
          </div>
        )}

        {/* ================= VISÃO PORTFÓLIO ================= */}
        {currentView === 'portfolio' && !zenMode && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex justify-between items-center mb-10 mt-4">
              <div>
                <h1 className="text-4xl font-black tracking-tight text-primary">Meu Portfólio</h1>
                <p className="text-on-surface-variant mt-2">Salve PDFs, links úteis e resumos de estudo.</p>
              </div>
              <button onClick={() => setShowAddForm(!showAddForm)} className="px-6 py-3 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-primary-container transition-all flex items-center gap-2">
                {showAddForm ? 'Cancelar' : <><Plus size={20} /> Adicionar Material</>}
              </button>
            </div>

            {showAddForm && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-10 bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-primary/10">
                <h3 className="text-lg font-bold mb-6">Novo Material de Estudo</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Título do Material</label>
                    <input type="text" value={newMatTitle} onChange={e => setNewMatTitle(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ex: PDF de Matemática" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Tipo de Material</label>
                    <select value={newMatType} onChange={e => { setNewMatType(e.target.value); setNewMatContent(''); setFileName(''); }} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/20">
                      <option value="Link">🔗 Link Externo</option>
                      <option value="Resumo">📝 Resumo / Anotação</option>
                      <option value="Arquivo">📎 Anexar Arquivo (Max 5MB)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  {newMatType === 'Arquivo' ? (
                    <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-outline-variant/50 rounded-xl hover:border-primary/50 transition-colors bg-surface-container-low relative">
                      <input type="file" onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                      <Paperclip size={32} className="text-outline-variant mb-2" />
                      <p className="text-sm font-bold text-on-surface-variant text-center px-4">
                        {fileName ? `Pronto! Arquivo: ${fileName}` : 'Clique ou arraste um arquivo aqui (Máximo 5MB)'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <label className="block text-sm font-bold mb-2">{newMatType === 'Link' ? 'Cole a URL aqui' : 'Digite seu resumo'}</label>
                      <textarea value={newMatContent} onChange={e => setNewMatContent(e.target.value)} rows={3} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-4 outline-none focus:ring-2 focus:ring-primary/20 resize-none" placeholder={newMatType === 'Link' ? 'https://...' : 'Anotações...'} />
                    </>
                  )}
                </div>
                
                <button onClick={handleSaveMaterial} disabled={!newMatContent} className="px-6 py-3 bg-gradient-to-r from-primary to-primary-container text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50">
                  Salvar no Cofre (+20 XP)
                </button>
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map(mat => (
                <div key={mat.id} className="bg-surface-container-lowest p-6 rounded-3xl border border-outline-variant/20 hover:border-primary/30 transition-all shadow-sm flex flex-col relative group">
                  <button onClick={() => handleDeleteMaterial(mat.id)} className="absolute top-4 right-4 p-2 bg-error/10 text-error rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error hover:text-white" title="Excluir material">
                    <Trash2 size={16} />
                  </button>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${mat.type === 'Arquivo' ? 'bg-secondary/10 text-secondary' : mat.type === 'Link' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                      {mat.type === 'Arquivo' ? <Paperclip size={20} /> : mat.type === 'Link' ? <LinkIcon size={20} /> : <FileText size={20} />}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-outline">{mat.type}</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-on-surface pr-8">{mat.title}</h4>
                  
                  {mat.type === 'Arquivo' ? (
                    <a href={mat.content} download={mat.fileName || 'arquivo'} className="inline-flex items-center gap-2 px-4 py-2 mt-auto mb-4 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors w-max">
                      <Download size={16} /> Baixar {mat.fileName ? (mat.fileName.length > 15 ? mat.fileName.substring(0, 15) + '...' : mat.fileName) : 'Arquivo'}
                    </a>
                  ) : mat.type === 'Link' ? (
                    <a href={mat.content} target="_blank" rel="noreferrer" className="text-sm text-primary hover:underline break-all mb-4 mt-auto">
                      Acessar Link Externo <ExternalLink size={14} className="inline ml-1" />
                    </a>
                  ) : (
                    <p className="text-sm text-on-surface-variant mb-4 mt-auto line-clamp-3">{mat.content}</p>
                  )}
                  <div className="text-[10px] text-outline pt-4 border-t border-outline-variant/20">
                    Salvo em: {new Date(mat.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ================= VISÃO DA SESSÃO ATIVA (CHAT) ================= */}
        {currentView === 'session' && activeSessionId !== null && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className={`h-[calc(100vh-140px)] flex flex-col rounded-3xl shadow-[0_20px_50px_rgba(0,64,161,0.08)] border relative overflow-hidden ${zenMode ? 'bg-[#1e293b] border-white/10' : 'bg-surface-container-lowest border-primary/5'}`}>
            <div className={`flex items-center justify-between p-8 border-b shrink-0 z-10 ${zenMode ? 'bg-[#1e293b] border-white/5' : 'bg-white/50 backdrop-blur-sm border-outline-variant/10'}`}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md"><Sparkles size={24} /></div>
                <div>
                  <h2 className={`text-2xl font-bold ${zenMode ? 'text-white' : 'text-on-surface'}`}>Sessão de {activeSessionData?.subject}</h2>
                  <p className={`text-sm ${zenMode ? 'text-white/60' : 'text-on-surface-variant'}`}>Tutor Virtual focado</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              {activeSessionData?.messages.map((msg, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`p-4 rounded-2xl max-w-[75%] text-base leading-relaxed shadow-sm ${msg.role === 'ai' ? (zenMode ? 'bg-[#334155] text-white rounded-tl-none' : 'bg-surface-container-low text-on-surface rounded-tl-none border border-outline-variant/20') : 'bg-primary text-white rounded-tr-none'}`}>{msg.text}</div>
                </motion.div>
              ))}
              {loadingMsg && (
                <div className="flex justify-start">
                  <div className={`p-4 rounded-2xl rounded-tl-none flex gap-2 items-center ${zenMode ? 'bg-[#334155]' : 'bg-surface-container-low border border-outline-variant/20'}`}>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={`p-6 border-t shrink-0 ${zenMode ? 'bg-[#1e293b] border-white/5' : 'bg-surface-container-lowest border-outline-variant/10'}`}>
              {currentSuggestions.length > 0 && (
                <div className="flex flex-wrap justify-center gap-3 mb-4 max-w-4xl mx-auto">
                  {currentSuggestions.map((sug, idx) => (
                    <button key={idx} onClick={() => sendMessage(sug)} disabled={loadingMsg} className={`px-5 py-2.5 text-primary border rounded-full text-sm font-bold transition-all disabled:opacity-50 ${zenMode ? 'bg-[#334155] border-transparent hover:bg-primary hover:text-white' : 'bg-surface-container-low border-outline-variant/30 hover:bg-primary hover:text-white'}`}>{sug}</button>
                  ))}
                </div>
              )}
              <div className="relative max-w-4xl mx-auto">
                <textarea 
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                  className={`w-full rounded-2xl p-4 pr-16 focus:ring-2 focus:ring-primary/20 resize-none outline-none shadow-inner ${zenMode ? 'bg-[#0f172a] border-none text-white placeholder:text-white/30' : 'bg-surface-container-low border border-outline-variant/20 text-on-surface placeholder:text-outline/50'}`} placeholder="Digite sua pergunta..." rows={2}
                />
                <button onClick={() => sendMessage()} disabled={loadingMsg || !message.trim()} className="absolute bottom-4 right-4 bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center hover:bg-primary-container transition-all active:scale-95 disabled:opacity-50"><Send size={18} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}