
import React, { useState } from 'react';
import { Draft, Platform, ContentType } from './types';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Creator from './components/Creator';
import Header from './components/Header';

const App: React.FC = () => {
  const [view, setView] = useState<'hero' | 'dashboard' | 'creator'>('hero');
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const handleStart = () => setView('dashboard');
  const handleCreateNew = () => setView('creator');
  const handleBackToDashboard = () => setView('dashboard');

  const addDraft = (draft: Draft) => {
    setDrafts(prev => [draft, ...prev]);
    setView('dashboard');
  };

  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  return (
    <div className="min-h-screen max-w-md mx-auto bg-[#F5F2ED] relative overflow-hidden shadow-2xl md:max-w-lg lg:max-w-xl">
      <Header 
        onLogoClick={() => setView('hero')} 
        showBack={view !== 'hero'} 
        onBack={handleBackToDashboard}
      />
      
      <main className="pb-24">
        {view === 'hero' && <Hero onStart={handleStart} />}
        {view === 'dashboard' && (
          <Dashboard 
            drafts={drafts} 
            onCreateNew={handleCreateNew} 
            onDeleteDraft={deleteDraft}
          />
        )}
        {view === 'creator' && <Creator onSave={addDraft} onCancel={handleBackToDashboard} />}
      </main>

      {/* Persistence Bar mimicking mobile UI */}
      {view !== 'hero' && (
        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto md:max-w-lg lg:max-w-xl bg-white/80 backdrop-blur-md p-6 rounded-t-[40px] border-t border-gray-100 flex justify-around items-center z-50">
           <button 
             onClick={() => setView('dashboard')}
             className={`p-2 transition-colors ${view === 'dashboard' ? 'text-black' : 'text-gray-400'}`}
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
           </button>
           <button 
             onClick={() => setView('creator')}
             className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform active:scale-95"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
           </button>
           <button className="p-2 text-gray-400">
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
           </button>
        </div>
      )}
    </div>
  );
};

export default App;
