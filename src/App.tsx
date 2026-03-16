/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Leaf, Recycle, Users, MapPin, Trophy, ShoppingBag, Home, Bell, User, Plus,
  ChevronRight, TrendingUp, Award, Calendar, Info, Search, Shield, HelpCircle,
  LogOut, Mail, Lock, RefreshCw, CheckCircle2, AlertCircle, Settings, UserPlus,
  ArrowLeft, Camera, Share2, MessageSquare, Heart, Clock, Filter, Sparkles, QrCode, Star, Moon, Sun,
  Phone, Instagram, Facebook, Twitter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { User as UserType, EcoAction, MarketplaceItem, CommunityEvent, UserRole, SupportTicket } from './types';

// --- Mock Data ---
const MOCK_USERS: Record<UserRole, UserType> = {
  Admin: { id: 'admin', name: 'Carlos Admin', email: 'admin@ecotrama.com', points: 9999, avatar: 'https://picsum.photos/seed/admin/100/100', level: 'Super Administrador', role: 'Admin' },
  EcoAliado: { id: 'aliado', name: 'Tienda Orgánica', email: 'aliado@ecotrama.com', points: 5000, avatar: 'https://picsum.photos/seed/shop/100/100', level: 'Socio Estratégico', role: 'EcoAliado' },
  EcoAgente: { id: 'agente', name: 'Inspector Verde', email: 'agente@ecotrama.com', points: 2500, avatar: 'https://picsum.photos/seed/agent/100/100', level: 'Verificador Senior', role: 'EcoAgente' },
  EcoAmigo: { id: 'amigo', name: 'Yoman Salcedo', email: 'ysalcedo10@estudiantes.areandina.edu.co', points: 1250, avatar: 'https://picsum.photos/seed/ana/100/100', level: 'Guardián del Bosque', role: 'EcoAmigo' },
};

const LEADERBOARD = [
  { id: 1, name: 'Yoman Salcedo', points: 1250, avatar: 'https://picsum.photos/seed/ana/100/100', rank: 1 },
  { id: 2, name: 'Carlos Admin', points: 950, avatar: 'https://picsum.photos/seed/admin/100/100', rank: 2 },
  { id: 3, name: 'Elena Verde', points: 820, avatar: 'https://picsum.photos/seed/elena/100/100', rank: 3 },
  { id: 4, name: 'Roberto Eco', points: 750, avatar: 'https://picsum.photos/seed/roberto/100/100', rank: 4 },
  { id: 5, name: 'Lucía Sostenible', points: 600, avatar: 'https://picsum.photos/seed/lucia/100/100', rank: 5 },
];

const MOCK_ACTIONS: EcoAction[] = [
  { id: '1', title: 'Reciclaje de Plástico', description: '5kg de PET entregados en el punto azul.', points: 50, category: 'recycling', date: 'Hoy', status: 'verified' },
  { id: '2', title: 'Compostaje Casero', description: 'Paca digestora iniciada con residuos orgánicos.', points: 100, category: 'community', date: 'Ayer', status: 'pending' },
  { id: '3', title: 'Ahorro de Agua', description: 'Reducción del 15% en el consumo mensual.', points: 80, category: 'water', date: 'Hace 3 días', status: 'verified' },
];

const MOCK_MARKET: MarketplaceItem[] = [
  { id: '1', name: 'Bolsas de Tela', description: 'Reutilizables, resistentes y con diseños artísticos locales.', pricePoints: 200, image: 'https://picsum.photos/seed/bag/400/300', category: 'Hogar' },
  { id: '2', name: 'Kit de Semillas', description: 'Semillas orgánicas de hortalizas para tu huerta urbana.', pricePoints: 150, image: 'https://picsum.photos/seed/seeds/400/300', category: 'Huerta' },
  { id: '3', name: 'Jabón Artesanal', description: 'Biodegradable, hecho con aceites vegetales reciclados.', pricePoints: 100, image: 'https://picsum.photos/seed/soap/400/300', category: 'Cuidado' },
];

const MOCK_EVENTS: CommunityEvent[] = [
  { id: 'E1', title: 'Limpieza del Río', date: '20 Mar', location: 'Puente Sur', attendees: 45, image: 'https://picsum.photos/seed/river/400/200', category: 'Limpieza' },
  { id: 'E2', title: 'Taller de Huertas', date: '25 Mar', location: 'Salón Comunal', attendees: 20, image: 'https://picsum.photos/seed/garden/400/200', category: 'Educación' },
];

// --- UX Note Component ---

function UXNote({ isMagic, text, position }: { isMagic: boolean, text: string, position: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = containerRef.current?.parentElement;
    if (!parent || !isMagic) {
      setIsVisible(false);
      return;
    }

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    parent.addEventListener('mouseenter', handleEnter);
    parent.addEventListener('mouseleave', handleLeave);

    return () => {
      parent.removeEventListener('mouseenter', handleEnter);
      parent.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMagic]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none">
      <AnimatePresence>
        {isMagic && isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 5 }}
            className={`absolute ${position} z-[100] w-48 bg-amber-50 border border-amber-200 p-2 rounded-xl shadow-lg pointer-events-none dark:bg-amber-900/90 dark:border-amber-800`}
          >
            <div className="flex gap-2 items-start">
              <Sparkles className="w-3 h-3 text-amber-600 mt-0.5 shrink-0 dark:text-amber-400" />
              <p className="text-[9px] leading-tight text-amber-900 font-medium dark:text-amber-100">{text}</p>
            </div>
            <div className="absolute -top-1 left-4 w-2 h-2 bg-amber-50 border-t border-l border-amber-200 rotate-45 dark:bg-amber-900/90 dark:border-amber-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Main App Component ---

export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [view, setView] = useState<'login' | 'recovery' | 'app' | 'register'>('login');
  const [activeTab, setActiveTab] = useState('home');
  const [subView, setSubView] = useState<{ type: string, data?: any } | null>(null);
  const [isMagicMode, setIsMagicMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('eco-trama-dark-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('eco-trama-dark-mode', isDarkMode.toString());
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (role: UserRole) => {
    setUser(MOCK_USERS[role]);
    setView('app');
  };

  const handleRegister = (newUser: UserType) => {
    setUser(newUser);
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    setActiveTab('home');
    setSubView(null);
  };

  const navigateToSub = (type: string, data?: any) => setSubView({ type, data });
  const goBack = () => setSubView(null);

  if (view === 'login') return <LoginView onLogin={handleLogin} onRecover={() => setView('recovery')} onRegister={() => setView('register')} isMagic={isMagicMode} toggleMagic={() => setIsMagicMode(!isMagicMode)} isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
  if (view === 'recovery') return <RecoveryView onBack={() => setView('login')} isMagic={isMagicMode} isDarkMode={isDarkMode} />;
  if (view === 'register') return <RegisterView onBack={() => setView('login')} onRegister={handleRegister} isMagic={isMagicMode} isDarkMode={isDarkMode} />;

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-emerald-100 dark:bg-stone-950 dark:text-stone-100 transition-colors duration-300">
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between dark:bg-stone-900/80 dark:border-stone-800">
          <div className="flex items-center gap-2 relative">
            <div className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-100 dark:shadow-none">
              <Leaf className="text-white w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg leading-none text-emerald-900 dark:text-emerald-400">EcoTrama</h1>
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter dark:text-emerald-500">{user?.role}</span>
            </div>
            <UXNote isMagic={isMagicMode} text="Patrón F: Logo a la izquierda para reconocimiento inmediato de marca." position="top-full left-0 mt-2" />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 transition-all dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-stone-700"
            >
              {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => setIsMagicMode(!isMagicMode)}
              className={`p-2 rounded-full transition-all ${isMagicMode ? 'bg-amber-100 text-amber-600 shadow-inner' : 'bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-400'}`}
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100 relative dark:bg-emerald-900/20 dark:border-emerald-800">
              <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-bold text-emerald-700 dark:text-emerald-300">{user?.points}</span>
              <UXNote isMagic={isMagicMode} text="Gamificación: Puntos visibles para incentivar la participación constante." position="top-full right-0 mt-2" />
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-stone-400 hover:text-red-500 rounded-full transition-colors relative dark:hover:bg-red-900/20 dark:text-stone-500 dark:hover:text-red-400">
              <LogOut className="w-5 h-5" />
              <UXNote isMagic={isMagicMode} text="Color Semántico: Rojo para acciones destructivas o de salida (peligro)." position="top-full right-0 mt-2" />
            </button>
          </div>
        </header>

      <main className="pb-24 max-w-2xl mx-auto px-4 pt-6">
        <AnimatePresence mode="wait">
          {!subView ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && <Dashboard user={user!} onActionClick={(a) => navigateToSub('action_detail', a)} onNewAction={() => navigateToSub('new_action')} onScanClick={() => navigateToSub('scanner')} isMagic={isMagicMode} onPilotFeedback={() => navigateToSub('pilot_feedback')} />}
              {activeTab === 'market' && <Market onProductClick={(p) => navigateToSub('product_detail', p)} isMagic={isMagicMode} />}
              {activeTab === 'community' && <Community onEventClick={(e) => navigateToSub('event_detail', e)} isMagic={isMagicMode} />}
              {activeTab === 'support' && <Support onNewTicket={() => navigateToSub('new_ticket')} isMagic={isMagicMode} />}
              {activeTab === 'profile' && <Profile user={user!} onSettings={() => navigateToSub('settings')} isMagic={isMagicMode} />}
            </motion.div>
          ) : (
            <motion.div
              key={subView.type}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <SubViewHandler subView={subView} onBack={goBack} isMagic={isMagicMode} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <nav className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-stone-200 px-6 py-3 flex justify-between items-center z-50 dark:bg-stone-900/90 dark:border-stone-800">
        <NavBtn icon={<Home />} label="Inicio" active={activeTab === 'home' && !subView} onClick={() => { setActiveTab('home'); setSubView(null); }} isMagic={isMagicMode} note="Icono + Texto: Accesibilidad para daltónicos y claridad cognitiva." />
        <NavBtn icon={<ShoppingBag />} label="Mercado" active={activeTab === 'market' && !subView} onClick={() => { setActiveTab('market'); setSubView(null); }} />
        <div className="relative -top-6">
          <button 
            onClick={() => navigateToSub('new_action')}
            className="bg-emerald-600 text-white p-4 rounded-2xl shadow-xl shadow-emerald-200 hover:scale-105 active:scale-95 transition-all relative dark:shadow-none"
          >
            <Plus className="w-6 h-6" />
            <UXNote isMagic={isMagicMode} text="FAB (Floating Action Button): Ubicación central para fácil acceso con el pulgar." position="bottom-full left-1/2 -translate-x-1/2 mb-4" />
          </button>
        </div>
        <NavBtn icon={<Users />} label="Comunidad" active={activeTab === 'community' && !subView} onClick={() => { setActiveTab('community'); setSubView(null); }} />
        <NavBtn icon={<User />} label="Perfil" active={activeTab === 'profile' && !subView} onClick={() => { setActiveTab('profile'); setSubView(null); }} />
      </nav>
    </div>
  </div>
);
}

// --- Sub-View Handler ---

function SubViewHandler({ subView, onBack, isMagic }: { subView: { type: string, data?: any }, onBack: () => void, isMagic: boolean }) {
  switch (subView.type) {
    case 'action_detail': return <ActionDetail action={subView.data} onBack={onBack} isMagic={isMagic} />;
    case 'new_action': return <NewActionFlow onBack={onBack} isMagic={isMagic} />;
    case 'product_detail': return <ProductDetail product={subView.data} onBack={onBack} isMagic={isMagic} />;
    case 'event_detail': return <EventDetail event={subView.data} onBack={onBack} isMagic={isMagic} />;
    case 'new_ticket': return <NewTicketForm onBack={onBack} isMagic={isMagic} />;
    case 'settings': return <SettingsView onBack={onBack} isMagic={isMagic} />;
    case 'scanner': return <ScannerView onBack={onBack} isMagic={isMagic} />;
    case 'pilot_feedback': return <PilotFeedbackForm onBack={onBack} isMagic={isMagic} />;
    default: return <div className="p-8 text-center">Vista no encontrada</div>;
  }
}

// --- Main Views ---

function Dashboard({ user, onActionClick, onNewAction, onScanClick, isMagic, onPilotFeedback }: { user: UserType, onActionClick: (a: EcoAction) => void, onNewAction: () => void, onScanClick: () => void, isMagic: boolean, onPilotFeedback: () => void }) {
  const nextLevelPoints = 2000;
  const progress = (user.points / nextLevelPoints) * 100;

  return (
    <div className="space-y-8">
      {/* Pilot Banner */}
      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-4 flex items-center justify-between dark:bg-amber-900/10 dark:border-amber-900/20">
        <div className="flex items-center gap-3">
          <div className="bg-amber-100 p-2 rounded-xl dark:bg-amber-900/30">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <div className="text-xs font-bold text-amber-800 dark:text-amber-300">Fase Piloto Activa</div>
            <div className="text-[10px] text-amber-600 dark:text-amber-500">Tu feedback construye el futuro de EcoTrama.</div>
          </div>
        </div>
        <button 
          onClick={onPilotFeedback}
          className="bg-amber-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-bold hover:bg-amber-700 transition-colors"
        >
          Dar Feedback
        </button>
      </div>

      <section className="bg-emerald-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200 dark:shadow-none">
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold mb-1">¡Hola, {user.name.split(' ')[0]}!</h2>
              <p className="text-emerald-200 text-sm">Has ahorrado 12kg de CO2 esta semana.</p>
            </div>
            <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/10 relative">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest mb-1">Nivel Actual</div>
                  <div className="text-lg font-bold">{user.level}</div>
                </div>
                <div className="text-xs font-bold text-emerald-200">{user.points} / {nextLevelPoints} pts</div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
                />
              </div>
              <UXNote isMagic={isMagic} text="Gamificación: La barra de progreso motiva al usuario a alcanzar el siguiente hito." position="bottom-full left-0 mb-2" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 rounded-xl">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest">Impacto</div>
                  <div className="text-sm font-bold">Alta</div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
                  <Star className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <div className="text-[10px] text-emerald-300 uppercase font-bold tracking-widest">Racha</div>
                  <div className="text-sm font-bold">5 Días</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
      </section>

      <div className="grid grid-cols-3 gap-4 relative">
        <QuickAction icon={<Recycle />} label="Reciclar" color="bg-blue-500" onClick={onNewAction} />
        <QuickAction icon={<QrCode />} label="Escanear" color="bg-emerald-500" onClick={onScanClick} />
        <QuickAction icon={<MapPin />} label="Puntos" color="bg-orange-500" onClick={() => {}} />
      </div>

      <section className="relative">
        <div className="flex justify-between items-center mb-4 px-2">
          <h3 className="font-bold text-lg text-stone-800 dark:text-white">Actividad Reciente</h3>
          <button className="text-emerald-600 text-xs font-bold uppercase tracking-widest dark:text-emerald-400">Ver todo</button>
        </div>
        <div className="space-y-3">
          {MOCK_ACTIONS.map((action, idx) => (
            <motion.button 
              key={action.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => onActionClick(action)}
              className="w-full bg-white p-4 rounded-3xl border border-stone-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-all text-left relative group dark:bg-stone-900 dark:border-stone-800"
            >
              <div className={`p-3 rounded-2xl transition-colors ${action.status === 'verified' ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-orange-50 text-orange-600 group-hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'}`}>
                {action.status === 'verified' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-stone-800 text-sm dark:text-white">{action.title}</h4>
                <p className="text-[10px] text-stone-400 uppercase font-bold dark:text-stone-500">{action.date} • {action.status === 'verified' ? 'Verificado' : 'Pendiente'}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all dark:text-stone-600" />
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Market({ onProductClick, isMagic }: { onProductClick: (p: MarketplaceItem) => void, isMagic: boolean }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Alimentos', 'Hogar', 'Moda'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end px-2 relative">
        <div>
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">EcoMercado</h2>
          <p className="text-stone-500 text-sm dark:text-stone-400">Canjea tus puntos por productos locales.</p>
        </div>
        <button className="p-2 bg-stone-100 rounded-xl text-stone-500 dark:bg-stone-800 dark:text-stone-400"><Filter className="w-5 h-5" /></button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 px-2 no-scrollbar">
        {categories.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none' : 'bg-white text-stone-400 border border-stone-100 dark:bg-stone-900 dark:text-stone-500 dark:border-stone-800'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {MOCK_MARKET.map((item, idx) => (
          <motion.button 
            key={item.id} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onProductClick(item)}
            className="bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm text-left group relative dark:bg-stone-900 dark:border-stone-800"
          >
            <div className="aspect-square overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-emerald-600 dark:bg-stone-900/90 dark:text-emerald-400">
                {item.category === 'food' ? 'Alimento' : 'Hogar'}
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h4 className="font-bold text-stone-800 text-sm mb-1 line-clamp-1 dark:text-white">{item.name}</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm dark:text-emerald-400">
                  <Trophy className="w-3 h-3" /> {item.pricePoints}
                </div>
                <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors dark:bg-emerald-900/20 dark:text-emerald-400 dark:group-hover:bg-emerald-600 dark:group-hover:text-white"><Plus className="w-4 h-4" /></div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function Community({ onEventClick, isMagic }: { onEventClick: (e: CommunityEvent) => void, isMagic: boolean }) {
  const [activeTab, setActiveTab] = useState<'events' | 'ranking'>('events');

  return (
    <div className="space-y-6">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Comunidad</h2>
        <p className="text-stone-500 text-sm dark:text-stone-400">Conecta con otros guardianes del planeta.</p>
      </div>

      <div className="flex bg-stone-100 p-1 rounded-2xl mx-2 dark:bg-stone-800">
        <button 
          onClick={() => setActiveTab('events')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'events' ? 'bg-white text-emerald-600 shadow-sm dark:bg-stone-900 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`}
        >
          Eventos
        </button>
        <button 
          onClick={() => setActiveTab('ranking')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'ranking' ? 'bg-white text-emerald-600 shadow-sm dark:bg-stone-900 dark:text-emerald-400' : 'text-stone-400 dark:text-stone-500'}`}
        >
          Ranking
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'events' ? (
          <motion.div 
            key="events"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            {MOCK_EVENTS.map(event => (
              <button 
                key={event.id} 
                onClick={() => onEventClick(event)}
                className="w-full bg-white rounded-[2rem] overflow-hidden border border-stone-100 shadow-sm text-left group dark:bg-stone-900 dark:border-stone-800"
              >
                <div className="h-40 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-emerald-600 uppercase tracking-widest dark:bg-stone-900/90 dark:text-emerald-400">
                    {event.category}
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-stone-800 mb-2 dark:text-white">{event.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-stone-400 font-bold dark:text-stone-500">
                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</div>
                    <div className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.attendees} asistentes</div>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="ranking"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {LEADERBOARD.map((item, idx) => (
              <div key={item.id} className="bg-white p-4 rounded-3xl border border-stone-100 flex items-center gap-4 shadow-sm dark:bg-stone-900 dark:border-stone-800">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${idx === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' : idx === 1 ? 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400' : idx === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' : 'text-stone-400 dark:text-stone-600'}`}>
                  #{item.rank}
                </div>
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border-2 border-stone-50 dark:border-stone-800" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h4 className="font-bold text-stone-800 text-sm dark:text-white">{item.name}</h4>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest dark:text-stone-500">{item.points} EcoPuntos</p>
                </div>
                {idx === 0 && <Trophy className="w-5 h-5 text-amber-400" />}
              </div>
            ))}
            <UXNote isMagic={isMagic} text="Prueba Social: Ver el progreso de otros motiva la participación y crea sentido de pertenencia." position="top-full left-1/2 -translate-x-1/2 mt-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Support({ onNewTicket, isMagic }: { onNewTicket: () => void, isMagic: boolean }) {
  return (
    <div className="space-y-6">
      <div className="px-2">
        <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Centro de Ayuda</h2>
        <p className="text-stone-500 text-sm dark:text-stone-400">¿Tienes dudas? Estamos aquí para resolverlas.</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button onClick={onNewTicket} className="bg-emerald-600 text-white p-6 rounded-[2rem] shadow-lg shadow-emerald-100 text-left space-y-3 group hover:bg-emerald-700 transition-all dark:shadow-none">
          <div className="bg-white/20 w-10 h-10 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold">Nuevo Ticket</div>
            <p className="text-[10px] opacity-80">Respuesta en <br/>menos de 24h</p>
          </div>
        </button>
        <button className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm text-left space-y-3 hover:border-emerald-200 transition-all dark:bg-stone-900 dark:border-stone-800 dark:hover:border-emerald-500">
          <div className="bg-emerald-50 w-10 h-10 rounded-xl flex items-center justify-center text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-stone-800 dark:text-white">Preguntas</div>
            <p className="text-[10px] text-stone-400 dark:text-stone-500">Guía rápida <br/>de uso</p>
          </div>
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-4 dark:bg-stone-900 dark:border-stone-800">
        <h4 className="font-bold text-stone-800 text-sm px-2 dark:text-white">Canales de Contacto</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl dark:bg-stone-800">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Línea de Soporte</div>
              <div className="text-sm font-bold text-stone-700 dark:text-stone-300">+57 300 123 4567</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl dark:bg-stone-800">
            <div className="bg-blue-100 p-2 rounded-xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Correo Electrónico</div>
              <div className="text-sm font-bold text-stone-700 dark:text-stone-300">soporte@ecotrama.com</div>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-stone-50 rounded-2xl dark:bg-stone-800">
            <div className="bg-emerald-100 p-2 rounded-xl text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">WhatsApp</div>
              <div className="text-sm font-bold text-stone-700 dark:text-stone-300">3148572673</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-4 dark:bg-stone-900 dark:border-stone-800">
        <h4 className="font-bold text-stone-800 text-sm px-2 dark:text-white">Temas Populares</h4>
        <div className="space-y-2">
          {['¿Cómo canjeo mis puntos?', 'Puntos de reciclaje cercanos', 'Problemas con el escáner'].map((topic, i) => (
            <button key={i} className="w-full text-left p-4 rounded-2xl hover:bg-stone-50 transition-all flex justify-between items-center group dark:hover:bg-stone-800">
              <span className="text-sm text-stone-600 font-medium dark:text-stone-300">{topic}</span>
              <ChevronRight className="w-4 h-4 text-stone-300 group-hover:text-emerald-500 transition-all dark:text-stone-600" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Profile({ user, onSettings, isMagic }: { user: UserType, onSettings: () => void, isMagic: boolean }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4 py-8 relative">
        <div className="relative">
          <div className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-xl overflow-hidden dark:border-stone-800">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-2 rounded-xl shadow-lg">
            <Camera className="w-4 h-4" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">{user.name}</h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest dark:bg-emerald-900/30 dark:text-emerald-400">{user.level}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 px-2">
        <div className="bg-white p-4 rounded-3xl border border-stone-100 text-center dark:bg-stone-900 dark:border-stone-800">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">12</div>
          <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest dark:text-stone-500">Acciones</div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-stone-100 text-center dark:bg-stone-900 dark:border-stone-800">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">1.2k</div>
          <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest dark:text-stone-500">Puntos</div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-stone-100 text-center dark:bg-stone-900 dark:border-stone-800">
          <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">4</div>
          <div className="text-[8px] text-stone-400 font-bold uppercase tracking-widest dark:text-stone-500">Insignias</div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden relative dark:bg-stone-900 dark:border-stone-800">
        <ProfileItem icon={<Settings />} label="Configuración" onClick={onSettings} />
        <ProfileItem icon={<Shield />} label="Seguridad" onClick={() => {}} />
        <ProfileItem icon={<Bell />} label="Notificaciones" onClick={() => {}} />
        <ProfileItem icon={<UserPlus />} label="Invitar Amigos" last onClick={() => {}} />
      </div>

      <div className="flex justify-center gap-6 py-4">
        <button className="p-3 bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-emerald-600 transition-all dark:bg-stone-900 dark:border-stone-800">
          <Instagram className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-blue-600 transition-all dark:bg-stone-900 dark:border-stone-800">
          <Facebook className="w-6 h-6" />
        </button>
        <button className="p-3 bg-white rounded-2xl border border-stone-100 text-stone-400 hover:text-sky-500 transition-all dark:bg-stone-900 dark:border-stone-800">
          <Twitter className="w-6 h-6" />
        </button>
      </div>

      <div className="px-4 pb-4">
        <div className="bg-emerald-50 p-6 rounded-[2rem] border border-emerald-100 space-y-3 dark:bg-emerald-900/10 dark:border-emerald-900/20">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl text-white">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest dark:text-emerald-400">Autor de la Plataforma</div>
              <div className="text-sm font-bold text-stone-800 dark:text-white">Yoman Salcedo</div>
            </div>
          </div>
          <div className="space-y-1 pl-11">
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <Mail className="w-3 h-3" /> ysalcedo10@estudiantes.areandina.edu.co
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <Mail className="w-3 h-3" /> yomanino@gmail.com
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <MessageSquare className="w-3 h-3" /> WhatsApp: 3148572673
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 pb-8">
        <button className="w-full py-4 bg-stone-100 text-stone-500 rounded-2xl font-bold text-sm hover:bg-red-50 hover:text-red-500 transition-all dark:bg-stone-800 dark:text-stone-400 dark:hover:bg-red-900/20 dark:hover:text-red-400">
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}

// --- Sub-Views (Second Level) ---

function ActionDetail({ action, onBack, isMagic }: { action: EcoAction, onBack: () => void, isMagic: boolean }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-400 font-bold text-sm mb-4 relative dark:text-stone-500">
        <ArrowLeft className="w-4 h-4" /> Volver
        <UXNote isMagic={isMagic} text="Navegación: Botón de retorno siempre visible para evitar que el usuario se pierda." position="top-full left-0 mt-2" />
      </button>
      <div className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-xl space-y-6 relative dark:bg-stone-900 dark:border-stone-800">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${action.status === 'verified' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400'}`}>
          {action.status === 'verified' ? <CheckCircle2 className="w-8 h-8" /> : <Clock className="w-8 h-8" />}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">{action.title}</h2>
          <p className="text-stone-500 mt-2 dark:text-stone-400">{action.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-50 dark:border-stone-800">
          <div>
            <div className="text-[10px] text-stone-400 uppercase font-bold tracking-widest dark:text-stone-500">Puntos Ganados</div>
            <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">+{action.points}</div>
          </div>
          <div>
            <div className="text-[10px] text-stone-400 uppercase font-bold tracking-widest dark:text-stone-500">Estado</div>
            <div className="text-xl font-bold text-stone-700 capitalize dark:text-stone-300">{action.status}</div>
          </div>
        </div>
        <button className="w-full py-4 bg-emerald-50 text-emerald-600 rounded-2xl font-bold flex items-center justify-center gap-2 dark:bg-emerald-900/20 dark:text-emerald-400">
          <Share2 className="w-4 h-4" /> Compartir Logro
        </button>
        <UXNote isMagic={isMagic} text="Feedback: Estados de color claros (Verde=Ok, Naranja=Espera) para comunicación no verbal." position="bottom-full right-0 mb-4" />
      </div>
    </div>
  );
}

function NewActionFlow({ onBack, isMagic }: { onBack: () => void, isMagic: boolean }) {
  const [step, setStep] = useState(1);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center relative">
        <button onClick={onBack} className="text-stone-400 font-bold text-sm dark:text-stone-500">Cancelar</button>
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className={`w-8 h-1 rounded-full ${step >= i ? 'bg-emerald-600' : 'bg-stone-200 dark:bg-stone-800'}`}></div>)}
        </div>
        <UXNote isMagic={isMagic} text="Indicador de Progreso: Reduce la fatiga mental al mostrar cuánto falta para terminar." position="top-full right-0 mt-2" />
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6 relative">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-white">¿Qué reciclaste hoy?</h2>
            <div className="grid grid-cols-2 gap-4">
              <CategoryBtn icon={<Recycle />} label="Plástico" onClick={() => setStep(2)} />
              <CategoryBtn icon={<Leaf />} label="Orgánico" onClick={() => setStep(2)} />
              <CategoryBtn icon={<Mail />} label="Papel" onClick={() => setStep(2)} />
              <CategoryBtn icon={<Shield />} label="Vidrio" onClick={() => setStep(2)} />
            </div>
            <UXNote isMagic={isMagic} text="Chunking: Dividir tareas complejas en pasos pequeños para mejorar la conversión." position="bottom-full left-0 mb-4" />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Sube tu evidencia</h2>
            <p className="text-stone-500 text-sm dark:text-stone-400">Toma una foto del material en el punto de recolección.</p>
            <div className="aspect-square bg-stone-100 rounded-[2.5rem] border-4 border-dashed border-stone-200 flex flex-col items-center justify-center gap-4 text-stone-400 relative dark:bg-stone-900 dark:border-stone-800 dark:text-stone-600">
              <Camera className="w-12 h-12" />
              <span className="font-bold uppercase text-xs tracking-widest">Abrir Cámara</span>
              <UXNote isMagic={isMagic} text="Affordance de Carga: El borde punteado indica un área donde se debe 'soltar' o subir algo." position="bottom-4 right-4" />
            </div>
            <button onClick={() => setStep(3)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold">Continuar</button>
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 py-12 relative">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 dark:shadow-none">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-stone-800 dark:text-white">¡Registro Enviado!</h2>
            <p className="text-stone-500 text-sm px-8 dark:text-stone-400">Tu acción está siendo verificada por un EcoAgente. Recibirás tus puntos pronto.</p>
            <button onClick={onBack} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold dark:bg-stone-800">Volver al Inicio</button>
            <UXNote isMagic={isMagic} text="Cierre de Tarea: Confirmación visual clara para dar por finalizado el proceso con éxito." position="bottom-full left-1/2 -translate-x-1/2 mb-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductDetail({ product, onBack, isMagic }: { product: MarketplaceItem, onBack: () => void, isMagic: boolean }) {
  const [success, setSuccess] = useState(false);
  if (success) return (
    <div className="text-center space-y-6 py-12">
      <div className="w-24 h-24 bg-emerald-600 text-white rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl dark:shadow-none">
        <ShoppingBag className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-stone-800 dark:text-white">¡Canje Exitoso!</h2>
      <p className="text-stone-500 text-sm px-8 dark:text-stone-400">Tu cupón ha sido generado. Puedes reclamar tu {product.name} en el punto aliado.</p>
      <button onClick={onBack} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold dark:bg-stone-800">Cerrar</button>
    </div>
  );

  return (
    <div className="space-y-6 pb-12">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-400 font-bold text-sm mb-4 dark:text-stone-500">
        <ArrowLeft className="w-4 h-4" /> Volver al Mercado
      </button>
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-stone-100 relative dark:bg-stone-900 dark:border-stone-800">
        <img src={product.image} alt={product.name} className="w-full aspect-video object-cover" referrerPolicy="no-referrer" />
        <div className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white">{product.name}</h2>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest dark:text-emerald-400">{product.category}</span>
            </div>
            <div className="flex items-center gap-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              <Trophy className="w-6 h-6" /> {product.pricePoints}
            </div>
          </div>
          <p className="text-stone-500 leading-relaxed dark:text-stone-400">{product.description}</p>
          <div className="bg-stone-50 p-4 rounded-2xl flex items-center gap-3 dark:bg-stone-800">
            <Clock className="w-5 h-5 text-stone-400 dark:text-stone-500" />
            <span className="text-xs text-stone-500 dark:text-stone-400">Disponible para retiro inmediato en Tienda Centro.</span>
          </div>
          <button 
            onClick={() => setSuccess(true)}
            className="w-full py-5 bg-emerald-600 text-white rounded-3xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-all dark:shadow-none"
          >
            Confirmar Canje
          </button>
          <UXNote isMagic={isMagic} text="CTA Prominente: Botón de acción principal con sombra y tamaño generoso para destacar." position="bottom-full left-0 mb-4" />
        </div>
      </div>
    </div>
  );
}

function EventDetail({ event, onBack, isMagic }: { event: CommunityEvent, onBack: () => void, isMagic: boolean }) {
  const [joined, setJoined] = useState(false);
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-400 font-bold text-sm mb-4 dark:text-stone-500">
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-xl border border-stone-100 relative dark:bg-stone-900 dark:border-stone-800">
        <img src={event.image} alt={event.title} className="w-full h-48 object-cover" referrerPolicy="no-referrer" />
        <div className="p-8 space-y-6">
          <h2 className="text-2xl font-bold text-stone-800 dark:text-white">{event.title}</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium">{event.date} • 8:00 AM</span>
            </div>
            <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium">{event.location}</span>
            </div>
            <div className="flex items-center gap-3 text-stone-600 dark:text-stone-300">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span className="font-medium">{event.attendees} vecinos asistirán</span>
            </div>
          </div>
          <button 
            onClick={() => setJoined(!joined)}
            className={`w-full py-5 rounded-3xl font-bold transition-all ${joined ? 'bg-stone-100 text-stone-500 dark:bg-stone-800 dark:text-stone-400' : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100 dark:shadow-none'}`}
          >
            {joined ? 'Ya estás inscrito' : 'Unirme al Evento'}
          </button>
          <UXNote isMagic={isMagic} text="Prueba Social: Mostrar cuántos vecinos asisten motiva a otros a unirse." position="bottom-full right-0 mb-4" />
        </div>
      </div>
    </div>
  );
}

function NewTicketForm({ onBack, isMagic }: { onBack: () => void, isMagic: boolean }) {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="text-center space-y-6 py-12">
      <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-[2.5rem] flex items-center justify-center mx-auto dark:bg-blue-900/20 dark:text-blue-400">
        <Mail className="w-12 h-12" />
      </div>
      <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Mensaje Enviado</h2>
      <p className="text-stone-500 text-sm px-8 dark:text-stone-400">Hemos recibido tu consulta. Te responderemos a tu correo registrado en breve.</p>
      <button onClick={onBack} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold dark:bg-stone-800">Entendido</button>
    </div>
  );

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-stone-400 font-bold text-sm dark:text-stone-500">Cancelar</button>
      <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Nuevo Ticket</h2>
      <div className="space-y-4 relative">
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest dark:text-stone-500">Asunto</label>
          <input type="text" placeholder="¿En qué podemos ayudarte?" className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl outline-none focus:border-emerald-500 dark:bg-stone-900 dark:border-stone-800 dark:text-white dark:focus:border-emerald-500" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-400 uppercase tracking-widest dark:text-stone-500">Mensaje</label>
          <textarea rows={4} placeholder="Describe tu duda o problema..." className="w-full px-6 py-4 bg-white border border-stone-100 rounded-2xl outline-none focus:border-emerald-500 resize-none dark:bg-stone-900 dark:border-stone-800 dark:text-white dark:focus:border-emerald-500" />
        </div>
        <button onClick={() => setSent(true)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none">Enviar Consulta</button>
        <UXNote isMagic={isMagic} text="Inputs Amigables: Campos de texto con bordes suaves y enfoque claro para evitar frustración." position="top-full left-0 mt-2" />
      </div>
    </div>
  );
}

function SettingsView({ onBack, isMagic }: { onBack: () => void, isMagic: boolean }) {
  return (
    <div className="space-y-6">
      <button onClick={onBack} className="flex items-center gap-2 text-stone-400 font-bold text-sm mb-4 dark:text-stone-500">
        <ArrowLeft className="w-4 h-4" /> Volver
      </button>
      <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Configuración</h2>
      <div className="bg-white rounded-[2.5rem] border border-stone-100 shadow-sm overflow-hidden relative dark:bg-stone-900 dark:border-stone-800">
        <ProfileItem icon={<User />} label="Editar Perfil" onClick={() => {}} />
        <ProfileItem icon={<Mail />} label="Cambiar Correo" onClick={() => {}} />
        <ProfileItem icon={<Lock />} label="Privacidad de Datos" onClick={() => {}} />
        <ProfileItem icon={<Info />} label="Términos y Condiciones" last onClick={() => {}} />
        <UXNote isMagic={isMagic} text="Ley de Hick: Pocas opciones por vista para facilitar la toma de decisiones." position="top-full left-4 mt-2" />
      </div>
    </div>
  );
}

// --- Helpers ---

function NavBtn({ icon, label, active, onClick, isMagic, note }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void, isMagic?: boolean, note?: string }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 transition-all relative ${active ? 'text-emerald-600 scale-110 dark:text-emerald-400' : 'text-stone-300 hover:text-stone-500 dark:text-stone-600 dark:hover:text-stone-400'}`}>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' })}
      <span className="text-[8px] font-bold uppercase tracking-widest">{label}</span>
      {note && <UXNote isMagic={isMagic || false} text={note} position="bottom-full left-1/2 -translate-x-1/2 mb-4" />}
    </button>
  );
}

function QuickAction({ icon, label, color, onClick }: { icon: React.ReactNode, label: string, color: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white p-4 rounded-[2rem] border border-stone-100 shadow-sm flex items-center gap-3 hover:shadow-md transition-all active:scale-95 dark:bg-stone-900 dark:border-stone-800">
      <div className={`${color} p-3 rounded-2xl text-white shadow-lg shadow-stone-100 dark:shadow-none`}>{icon}</div>
      <span className="font-bold text-stone-700 text-sm dark:text-stone-300">{label}</span>
    </button>
  );
}

function CategoryBtn({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-white p-6 rounded-[2rem] border border-stone-100 shadow-sm flex flex-col items-center gap-3 hover:border-emerald-500 transition-all dark:bg-stone-900 dark:border-stone-800 dark:hover:border-emerald-500">
      <div className="text-emerald-600 dark:text-emerald-400">{icon}</div>
      <span className="font-bold text-stone-700 text-xs uppercase tracking-widest dark:text-stone-300">{label}</span>
    </button>
  );
}

function ProfileItem({ icon, label, last, onClick }: { icon: React.ReactNode, label: string, last?: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between p-5 hover:bg-stone-50 transition-colors dark:hover:bg-stone-800 ${!last ? 'border-b border-stone-50 dark:border-stone-800' : ''}`}>
      <div className="flex items-center gap-4">
        <div className="text-stone-400 dark:text-stone-500">{icon}</div>
        <span className="font-bold text-stone-700 text-sm dark:text-stone-300">{label}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-stone-300 dark:text-stone-600" />
    </button>
  );
}

function RegisterView({ onBack, onRegister, isMagic, isDarkMode }: { onBack: () => void, onRegister: (u: UserType) => void, isMagic: boolean, isDarkMode: boolean }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;
    
    const newUser: UserType = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      points: 0,
      avatar: `https://picsum.photos/seed/${name}/100/100`,
      level: 'Nuevo Guardián',
      role: 'EcoAmigo'
    };
    onRegister(newUser);
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-6 relative overflow-hidden dark:bg-stone-950">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative z-10 dark:bg-stone-900 dark:border dark:border-stone-800"
        >
          <button onClick={onBack} className="flex items-center gap-2 text-stone-400 font-bold text-sm mb-6 dark:text-stone-500">
            <ArrowLeft className="w-4 h-4" /> Volver
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400">Únete a la Red</h2>
            <p className="text-stone-500 mt-2 dark:text-stone-400">Crea tu perfil y empieza a transformar tu comunidad.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 dark:text-stone-500">Nombre Completo</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-600" />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre" 
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 outline-none transition-all dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 dark:text-stone-500">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-600" />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@correo.com" 
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 outline-none transition-all dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 dark:text-stone-500">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-600" />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 outline-none transition-all dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" 
                />
              </div>
            </div>

            <div className="pt-4">
              <button type="submit" className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 dark:shadow-none">
                Registrarme
              </button>
            </div>
          </form>
          <UXNote isMagic={isMagic} text="Formulario Simplificado: Solo pedimos los datos esenciales para reducir la fricción en el registro." position="top-full left-1/2 -translate-x-1/2 mt-4" />
        </motion.div>
      </div>
    </div>
  );
}

function LoginView({ onLogin, onRecover, onRegister, isMagic, toggleMagic, isDarkMode, toggleDarkMode }: { onLogin: (role: UserRole) => void, onRecover: () => void, onRegister: () => void, isMagic: boolean, toggleMagic: () => void, isDarkMode: boolean, toggleDarkMode: () => void }) {
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-emerald-900 flex items-center justify-center p-6 relative overflow-hidden dark:bg-stone-950 transition-colors duration-300">
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button 
            onClick={toggleDarkMode}
            className="p-3 rounded-2xl bg-white/10 text-white/50 hover:bg-white/20 transition-all dark:bg-stone-800 dark:text-stone-400"
          >
            {isDarkMode ? <Sun className="w-6 h-6 text-amber-400" /> : <Moon className="w-6 h-6" />}
          </button>
          <button 
            onClick={toggleMagic}
            className={`p-3 rounded-2xl transition-all ${isMagic ? 'bg-amber-100 text-amber-600 shadow-lg' : 'bg-white/10 text-white/50'}`}
          >
            <Sparkles className="w-6 h-6" />
          </button>
        </div>

        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative z-10 dark:bg-stone-900 dark:border dark:border-stone-800"
        >
          <div className="flex flex-col items-center mb-8 relative">
            <div className="bg-emerald-600 p-4 rounded-3xl shadow-xl mb-4">
              <Leaf className="text-white w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-900 dark:text-emerald-400">EcoTrama</h1>
            <p className="text-stone-500 text-center mt-2 dark:text-stone-400">Bienvenido a la red comunal que transforma el futuro.</p>
            <UXNote isMagic={isMagic} text="Identidad de Marca: El icono de hoja y el nombre refuerzan el propósito ecológico desde el segundo 1." position="top-full left-1/2 -translate-x-1/2 mt-2" />
          </div>

          <div className="space-y-4 relative">
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 dark:text-stone-500">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-600" />
                <input type="email" placeholder="tu@correo.com" className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 focus:ring-0 transition-all outline-none dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1 dark:text-stone-500">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-300 dark:text-stone-600" />
                <input type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 focus:ring-0 transition-all outline-none dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" />
              </div>
            </div>
            <button onClick={onRecover} className="text-emerald-600 text-sm font-bold hover:underline block ml-auto dark:text-emerald-400">¿Olvidaste tu contraseña?</button>
            <UXNote isMagic={isMagic} text="Inputs de Alto Contraste: Bordes definidos y estados de enfoque para usuarios con baja visión." position="bottom-full left-0 mb-4" />
          </div>

          <div className="mt-8 space-y-3 relative">
            <button onClick={() => onLogin('EcoAmigo')} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 dark:shadow-none">
              Iniciar Sesión
            </button>
            <button onClick={onRegister} className="w-full py-4 bg-white text-emerald-600 border-2 border-emerald-100 rounded-2xl font-bold hover:bg-emerald-50 transition-all active:scale-95 dark:bg-stone-800 dark:text-emerald-400 dark:border-stone-700 dark:hover:bg-stone-700">
              Crear Cuenta
            </button>
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-stone-100 dark:border-stone-800"></div>
              <span className="flex-shrink mx-4 text-stone-300 text-xs font-bold uppercase tracking-widest dark:text-stone-600">O entrar como</span>
              <div className="flex-grow border-t border-stone-100 dark:border-stone-800"></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(['Admin', 'EcoAliado', 'EcoAgente'] as UserRole[]).map(role => (
                <button key={role} onClick={() => onLogin(role)} className="py-2 px-1 bg-stone-50 border border-stone-100 rounded-xl text-[10px] font-bold text-stone-600 hover:bg-emerald-50 hover:border-emerald-200 transition-all dark:bg-stone-800 dark:text-stone-400 dark:border-stone-700 dark:hover:bg-stone-700">
                  {role}
                </button>
              ))}
            </div>
            <UXNote isMagic={isMagic} text="Accesibilidad de Roles: Acceso rápido para pruebas de prototipo, facilitando el testeo de flujos." position="top-full left-1/2 -translate-x-1/2 mt-2" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function PilotFeedbackForm({ onBack, isMagic }: { onBack: () => void, isMagic: boolean }) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-stone-100 rounded-full transition-colors dark:hover:bg-stone-800">
          <ArrowLeft className="w-6 h-6 text-stone-600 dark:text-stone-400" />
        </button>
        <h2 className="text-xl font-bold text-stone-800 dark:text-white">Feedback del Piloto</h2>
        <div className="w-10"></div>
      </div>

      {!submitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-stone-100 dark:bg-stone-900 dark:border-stone-800"
        >
          <div className="mb-8 text-center">
            <div className="bg-amber-100 w-16 h-16 rounded-3xl flex items-center justify-center text-amber-600 mx-auto mb-4 dark:bg-amber-900/20 dark:text-amber-400">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-stone-800 dark:text-white">¿Cómo va tu experiencia?</h3>
            <p className="text-stone-500 text-sm mt-2 dark:text-stone-400">Estamos en fase piloto y tu opinión es lo más valioso para nosotros.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">Calificación General</label>
              <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star} 
                    onClick={() => setRating(star)}
                    className={`p-2 rounded-xl transition-all ${rating >= star ? 'text-amber-400 scale-110' : 'text-stone-200 dark:text-stone-700'}`}
                  >
                    <Star className={`w-8 h-8 ${rating >= star ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-400 uppercase tracking-widest ml-1">¿Qué mejorarías?</label>
              <textarea 
                placeholder="Cuéntanos cualquier problema o sugerencia..."
                className="w-full p-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 outline-none transition-all h-32 resize-none dark:bg-stone-800 dark:border-stone-700 dark:text-white"
              ></textarea>
            </div>

            <button 
              onClick={() => setSubmitted(true)}
              className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 dark:shadow-none"
            >
              Enviar Feedback
            </button>
          </div>
          <UXNote isMagic={isMagic} text="Escucha Activa: Recolectar feedback temprano es vital en un piloto para iterar rápido." position="top-full left-1/2 -translate-x-1/2 mt-4" />
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] p-12 text-center shadow-xl border border-stone-100 dark:bg-stone-900 dark:border-stone-800"
        >
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6 dark:bg-emerald-900/20 dark:text-emerald-400">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold text-stone-800 dark:text-white">¡Gracias por participar!</h3>
          <p className="text-stone-500 mt-4 dark:text-stone-400">Tu feedback ha sido registrado. Juntos estamos construyendo una comunidad más sostenible.</p>
          <button 
            onClick={onBack}
            className="mt-8 w-full py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all dark:bg-stone-800"
          >
            Volver al Inicio
          </button>
        </motion.div>
      )}
    </div>
  );
}

function ScannerView({ onBack, isMagic }: { onBack: () => void, isMagic: boolean }) {
  const [scanResult, setScanResult] = useState<string | null>(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (result) => {
        setScanResult(result);
        scanner.clear().catch(err => console.error("Failed to clear scanner", err));
      },
      (error) => {
        // console.warn(error);
      }
    );

    return () => {
      scanner.clear().catch(error => console.error("Failed to clear scanner on unmount", error));
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-stone-900 z-[100] flex flex-col p-6 text-white dark:bg-black">
      <div className="w-full max-w-md mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold">Escanear Código</h2>
          <div className="w-10"></div>
        </div>

        {!scanResult ? (
          <div className="relative">
            <div id="reader" className="overflow-hidden rounded-3xl border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 bg-stone-800 aspect-square dark:shadow-none"></div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-white/30 rounded-2xl"></div>
            </div>
            <UXNote isMagic={isMagic} text="Feedback en Tiempo Real: El recuadro visual ayuda al usuario a encuadrar el código correctamente." position="top-full left-1/2 -translate-x-1/2 mt-4" />
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white text-stone-900 p-8 rounded-[2.5rem] text-center space-y-6 dark:bg-stone-900 dark:text-white"
          >
            <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center text-emerald-600 mx-auto dark:bg-emerald-900/20 dark:text-emerald-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">¡Código Escaneado!</h3>
              <p className="text-stone-500 mt-2 dark:text-stone-400">Contenido detectado:</p>
              <div className="mt-4 p-4 bg-stone-50 rounded-2xl font-mono text-sm break-all border border-stone-100 dark:bg-stone-800 dark:border-stone-700 dark:text-emerald-400">
                {scanResult}
              </div>
            </div>
            <button 
              onClick={onBack}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-colors dark:shadow-none"
            >
              Continuar
            </button>
          </motion.div>
        )}

        <div className="text-center text-stone-400 text-sm dark:text-stone-500">
          <p>Apunta tu cámara a un código QR o de barras</p>
          <p className="mt-2 text-xs">EcoTrama verificará el producto o acción automáticamente.</p>
        </div>
      </div>
    </div>
  );
}

function RecoveryView({ onBack, isMagic, isDarkMode }: { onBack: () => void, isMagic: boolean, isDarkMode: boolean }) {
  const [step, setStep] = useState(1);
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 relative dark:bg-stone-950 transition-colors duration-300">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-xl border border-stone-100 relative dark:bg-stone-900 dark:border-stone-800">
          <button onClick={onBack} className="mb-6 text-stone-400 hover:text-stone-600 flex items-center gap-1 text-sm font-bold dark:text-stone-500 dark:hover:text-stone-400">
            <ChevronRight className="w-4 h-4 rotate-180" /> Volver al login
          </button>
          
          {step === 1 ? (
            <div className="space-y-6 relative">
              <div className="bg-orange-50 w-16 h-16 rounded-3xl flex items-center justify-center text-orange-500 mb-4 dark:bg-orange-900/20 dark:text-orange-400">
                <RefreshCw className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white">Recuperar Acceso</h2>
              <p className="text-stone-500 text-sm dark:text-stone-400">Ingresa tu correo y te enviaremos un código de seguridad para restablecer tu contraseña.</p>
              <div className="space-y-2">
                <input type="email" placeholder="tu@correo.com" className="w-full px-6 py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-emerald-500 outline-none transition-all dark:bg-stone-800 dark:border-stone-700 dark:text-white dark:focus:border-emerald-500" />
              </div>
              <button onClick={() => setStep(2)} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 dark:shadow-none">Enviar Código</button>
              <UXNote isMagic={isMagic} text="Reducción de Estrés: Instrucciones claras y un solo campo para no abrumar en un momento crítico." position="top-full left-0 mt-2" />
            </div>
          ) : (
            <div className="space-y-6 text-center relative">
              <div className="bg-emerald-50 w-16 h-16 rounded-3xl flex items-center justify-center text-emerald-500 mx-auto mb-4 dark:bg-emerald-900/20 dark:text-emerald-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-stone-800 dark:text-white">¡Correo Enviado!</h2>
              <p className="text-stone-500 text-sm dark:text-stone-400">Revisa tu bandeja de entrada. Hemos enviado las instrucciones para recuperar tu cuenta.</p>
              <button onClick={onBack} className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold dark:bg-stone-800">Volver al Inicio</button>
              <UXNote isMagic={isMagic} text="Feedback de Éxito: Icono de check y color verde para confirmar que la acción fue procesada." position="bottom-full left-1/2 -translate-x-1/2 mb-4" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
