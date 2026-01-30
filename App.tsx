
import React, { useState } from 'react';
import { Draft } from './types';
import Dashboard from './components/Dashboard';
import Creator from './components/Creator';
import Onboarding from './components/Onboarding';

const App: React.FC = () => {
  const [view, setView] = useState<'onboarding' | 'dashboard' | 'creator'>('onboarding');
  const [drafts, setDrafts] = useState<Draft[]>([]);

  const addDraft = (draft: Draft) => {
    setDrafts(prev => [draft, ...prev]);
    setView('dashboard');
  };

  const deleteDraft = (id: string) => {
    setDrafts(prev => prev.filter(d => d.id !== id));
  };

  if (view === 'onboarding') {
    return <Onboarding onFinish={() => setView('dashboard')} />;
  }

  return (
    <div className="bg-[#EBEBEB] w-[98vw] h-[96vh] flex flex-col border border-black relative technical-grid overflow-hidden">
      <div className="scan-line"></div>
      
      {/* Top Navigation Header */}
      <header className="flex justify-between items-center border-b border-black h-14 px-6 bg-white/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-8 h-full">
           <button onClick={() => setView('dashboard')} className="flex items-center gap-2 h-full border-r border-black pr-8">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="mono-font font-bold">Menu</span>
           </button>
           <span className="mono-font text-gray-400">08 : 26 . LM_V2</span>
        </div>
        
        <div className="serif-font text-xl font-black uppercase tracking-widest flex items-center gap-2">
           Lumina <span className="text-sm border border-black px-1 leading-none">AI</span>
        </div>

        <div className="flex items-center gap-8 h-full">
           <div className="mono-font border-l border-black pl-8 flex items-center h-full">Share</div>
           <div className="mono-font border-l border-black pl-8 flex items-center h-full gap-2">
              Socials <span className="text-[8px]">▼</span>
           </div>
           <div className="mono-font border-l border-black pl-8 flex items-center h-full gap-4">
              <span className="text-gray-400">Library</span>
              <span className="bg-black text-white px-2 py-0.5 rounded-sm">[{drafts.length}]</span>
           </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Versioning */}
        <aside className="w-14 border-r border-black flex flex-col items-center py-8 gap-12 bg-white/30">
           <div className="rotate-[-90deg] whitespace-nowrap mono-font text-gray-400 origin-center translate-y-24">
              Lumina_Studio . 2025
           </div>
           <div className="mt-auto flex flex-col gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-1.5 h-1.5 bg-black rotate-45"></div>
              ))}
           </div>
        </aside>

        <main className="flex-1 overflow-y-auto no-scrollbar relative p-8">
          {view === 'dashboard' && (
            <Dashboard 
              drafts={drafts} 
              onCreateNew={() => setView('creator')} 
              onDeleteDraft={deleteDraft}
            />
          )}
          {view === 'creator' && (
            <Creator onSave={addDraft} onCancel={() => setView('dashboard')} />
          )}
        </main>
      </div>
      
      {/* Footer Info */}
      <footer className="h-10 border-t border-black bg-white/50 backdrop-blur-sm px-6 flex items-center justify-between z-10">
        <div className="flex gap-4">
           {Array.from({length: 7}).map((_, i) => (
             <span key={i} className={`mono-font text-[9px] ${i === 0 ? 'text-black font-bold' : 'text-gray-300'}`}>{i + 1}</span>
           ))}
        </div>
        <div className="mono-font text-[9px]">Status: Ready for generation</div>
      </footer>
    </div>
  );
};

export default App;
