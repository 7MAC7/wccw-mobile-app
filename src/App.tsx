import React, { useState, useEffect } from 'react';
import { View } from './types';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import About from './pages/About';
import History from './pages/History';
import Community from './pages/Community';
import Donate from './pages/Donate';
import AITutor from './pages/AITutor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isAppLoading, setIsAppLoading] = useState(true);

  const [user, setUser] = useState<{ username: string } | null>({ username: '테스트유저' });  
  const handleLogin = () => setUser({ username: '테스트유저' });
  const handleLogout = () => setUser(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return <Home onNavigate={setCurrentView} />;
      case View.ABOUT:
        return <About />;
      case View.HISTORY:
        return <History />;
      case View.COMMUNITY:
        return <Community user={user} onLogin={handleLogin} onLogout={handleLogout} />;
      case View.DONATE:
        return <Donate />;
      case View.AITUTOR:
        return <AITutor />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  if (isAppLoading) {
    return (
      <div className="h-screen w-full bg-wccw-purple flex flex-col items-center justify-center text-white p-10 text-center overflow-hidden relative">
        <img
          src="/splash.png"
          alt="Butterflies - In memory of Comfort Women victims"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 mb-8">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
            <span className="text-3xl font-serif font-bold text-wccw-purple">WCCW</span>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-[0.2em] mb-2 animate-fade-in relative z-10">WCCW</h1>
        <p className="text-purple-200 text-sm font-light tracking-widest uppercase opacity-80 relative z-10">Justice & Peace</p>
        <div className="mt-16 flex space-x-3 relative z-10">
          <div className="w-2 h-2 bg-wccw-yellow rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-wccw-yellow rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-wccw-yellow rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased max-w-md mx-auto relative shadow-2xl flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://wccw.org/wp-content/uploads/2020/01/wccw-logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="font-serif font-bold text-xl text-wccw-purple tracking-tight">WCCW</span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      </header>
      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        <div className="animate-fade-in">
          {renderView()}
        </div>
      </main>
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;