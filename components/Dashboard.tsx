
import React from 'react';
import { Draft, Platform } from '../types';

interface DashboardProps {
  drafts: Draft[];
  onCreateNew: () => void;
  onDeleteDraft: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ drafts, onCreateNew, onDeleteDraft }) => {
  const categories = ["All", "LinkedIn", "Instagram", "X/Twitter"];
  const [activeCat, setActiveCat] = React.useState("All");

  const filteredDrafts = drafts.filter(d => {
    if (activeCat === "All") return true;
    if (activeCat === "LinkedIn") return d.platform === Platform.LINKEDIN;
    if (activeCat === "Instagram") return d.platform === Platform.INSTAGRAM;
    if (activeCat === "X/Twitter") return d.platform === Platform.TWITTER || d.platform === Platform.THREADS;
    return true;
  });

  return (
    <div className="px-6 pt-2 pb-12 overflow-y-auto max-h-[85vh] no-scrollbar">
      <div className="mb-10">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-5xl font-bold mb-3 tracking-tighter serif-font italic">Your Studio</h2>
            <p className="text-gray-400 text-sm max-w-[220px] leading-relaxed font-medium">
              Turn your whispers into world-class social authority.
            </p>
          </div>
          <div className="bg-white p-3 rounded-[24px] shadow-sm border border-gray-100">
             <div className="w-10 h-10 bg-[#E66432] rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20v-6M6 20V10M18 20V4"/></svg>
             </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCat(cat)}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
              activeCat === cat 
                ? 'bg-black text-white shadow-xl' 
                : 'bg-white text-gray-400 border border-gray-100 hover:border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        <button 
          onClick={onCreateNew}
          className="col-span-2 h-44 bg-white rounded-[44px] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center gap-4 group hover:border-black transition-all hover:bg-black/5"
        >
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center shadow-2xl transition-all group-hover:scale-110">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
          <div className="text-center">
            <span className="block font-black text-xs uppercase tracking-widest">New Session</span>
          </div>
        </button>

        {filteredDrafts.map(draft => (
          <div key={draft.id} className="bg-white p-6 rounded-[44px] shadow-sm flex flex-col justify-between h-72 relative overflow-hidden group hover:shadow-2xl transition-all border border-gray-100/50">
            {/* Platform indicator badge */}
            <div className="absolute top-0 right-0 p-6 flex flex-col items-end gap-2">
               <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                 draft.platform === Platform.LINKEDIN ? 'bg-blue-50 text-blue-600' : 
                 draft.platform === Platform.INSTAGRAM ? 'bg-pink-50 text-pink-600' : 'bg-gray-50 text-black'
               }`}>
                  {draft.platform === Platform.LINKEDIN && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>}
                  {draft.platform === Platform.INSTAGRAM && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>}
                  {(draft.platform === Platform.TWITTER || draft.platform === Platform.THREADS) && <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>}
               </div>
               <div className="bg-green-50 px-2 py-1 rounded-md text-[8px] font-black text-green-600 tracking-tighter shadow-sm border border-green-100">
                 {draft.engagementScore}% REACH
               </div>
            </div>

            <div className="mt-2">
              <button 
                onClick={() => onDeleteDraft(draft.id)}
                className="text-gray-200 hover:text-red-500 transition-colors mb-4 block"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
              <h3 className="font-bold text-lg leading-[1.2] line-clamp-2 pr-12 group-hover:text-[#E66432] transition-colors">{draft.title}</h3>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{draft.type}</span>
                <span className="w-1 h-1 rounded-full bg-gray-200"></span>
                <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{draft.persona.split(' ')[1]}</span>
              </div>
            </div>

            <div className="mt-auto flex justify-between items-end pt-4">
               <div className="flex flex-col">
                  <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest leading-none mb-1">Impact</span>
                  <span className="text-2xl font-black tracking-tighter text-black">A+</span>
               </div>
               <button className="w-14 h-14 bg-black text-white rounded-[24px] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform active:scale-95">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
