import React, { useState, useEffect } from 'react';
import { View } from './types';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import About from './pages/About';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [isAppLoading, setIsAppLoading] = useState(true);

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
      case View.DONATE:
        return <Donate />;
      default:
        return <Home onNavigate={setCurrentView} />;
    }
  };

  if (isAppLoading) {
    return (
      <div className="h-screen w-full bg-wccw-purple flex flex-col items-center justify-center text-white p-10 text-center overflow-hidden">
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl animate-pulse">
            <img src="https://wccw.org/wp-content/uploads/2019/12/logo.png" alt="WCCW Logo" className="w-16 h-16 object-contain" />
          </div>
          <div className="absolute -top-4 -right-4 w-10 h-10 text-wccw-yellow animate-bounce">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z"/></svg>
          </div>
        </div>
        <h1 className="text-3xl font-serif font-bold tracking-[0.2em] mb-2 animate-fade-in">WCCW</h1>
        <p className="text-purple-200 text-sm font-light tracking-widest uppercase opacity-80">Justice & Peace</p>
        <div className="mt-16 flex space-x-3">
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
          <img src="https://wccw.org/wp-content/uploads/2019/12/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
          <span className="font-serif font-bold text-xl text-wccw-purple tracking-tight">WCCW</span>
        </div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
        <div className="animate-fade-in">
          {renderView()}   {/* ← 여기서 페이지 전환! */}
        </div>
      </main>

      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
    </div>
  );
};

export default App;