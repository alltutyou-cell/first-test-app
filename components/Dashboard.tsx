
import React from 'react';
import { Draft, Platform } from '../types';

interface DashboardProps {
  drafts: Draft[];
  onCreateNew: () => void;
  onDeleteDraft: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ drafts, onCreateNew, onDeleteDraft }) => {
  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-end border-b border-black/10 pb-8">
        <div>
          <span className="mono-font text-gray-400 block mb-2">Workspace_V.01</span>
          <h1 className="serif-font text-8xl leading-none">Brand Hub</h1>
        </div>
        <div className="flex flex-col items-end gap-2">
           <span className="mono-font">CL:QT</span>
           <button 
             onClick={onCreateNew} 
             className="bg-black text-white mono-font px-8 py-4 hover:bg-white hover:text-black border border-black transition-all flex items-center gap-4"
           >
             Initialize Generation <span className="text-lg">+</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-black border border-black overflow-hidden">
         {/* Metric Blocks - Technical Style */}
         <div className="bg-[#EBEBEB] p-8 flex flex-col gap-6">
            <span className="mono-font font-bold">Metric: Authority</span>
            <div className="flex items-baseline gap-2">
               <span className="text-6xl serif-font italic">780</span>
               <span className="mono-font text-gray-400">/ 1k</span>
            </div>
            <div className="w-full h-1 border border-black/20 relative">
               <div className="absolute top-0 left-0 h-full bg-black" style={{width: '78%'}}></div>
            </div>
         </div>
         <div className="bg-[#EBEBEB] p-8 flex flex-col gap-6">
            <span className="mono-font font-bold">Metric: Velocity</span>
            <div className="flex items-baseline gap-2">
               <span className="text-6xl serif-font italic">163</span>
               <span className="mono-font text-gray-400">Hr</span>
            </div>
            <div className="w-full h-1 border border-black/20 relative">
               <div className="absolute top-0 left-0 h-full bg-black" style={{width: '45%'}}></div>
            </div>
         </div>
         <div className="lg:col-span-2 bg-black text-white p-8 flex flex-col justify-between">
            <div>
               <h3 className="serif-font text-4xl mb-2">Lumina Pro_</h3>
               <p className="mono-font text-[9px] text-gray-400">Unlock advanced tactical reasoning & bulk processing</p>
            </div>
            <button className="mono-font text-black bg-[#E1FF6B] px-6 py-2 w-fit mt-4 hover:bg-white transition-colors">
               Upgrade Sequence [->]
            </button>
         </div>
      </div>

      <div className="mt-8">
         <div className="flex justify-between items-center mb-6">
            <span className="mono-font font-bold">Library catalog: drafts</span>
            <div className="flex gap-4">
               <div className="w-4 h-4 border border-black bg-black"></div>
               <div className="w-4 h-4 border border-black"></div>
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drafts.length === 0 ? (
               <div className="col-span-full py-32 border border-black border-dashed flex flex-col items-center justify-center gap-6 opacity-30">
                  <span className="serif-font text-4xl italic">Archive is empty</span>
                  <button onClick={onCreateNew} className="mono-font border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">Start new project</button>
               </div>
            ) : (
               drafts.map(draft => (
                  <div key={draft.id} className="border border-black bg-white p-8 flex flex-col gap-8 group hover:bg-[#F5F5F5] transition-all relative">
                     <div className="flex justify-between">
                        <span className="mono-font text-gray-400">{draft.platform}</span>
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 bg-black"></div>
                           <div className="w-1.5 h-1.5 bg-black/20"></div>
                        </div>
                     </div>
                     <div>
                        <h4 className="serif-font text-3xl mb-4 leading-tight">{draft.title}</h4>
                        <div className="flex flex-col gap-1">
                           <div className="flex justify-between items-center border-b border-black/5 pb-1">
                              <span className="mono-font text-[8px]">Type</span>
                              <span className="mono-font text-[8px] font-bold">{draft.type}</span>
                           </div>
                           <div className="flex justify-between items-center border-b border-black/5 pb-1">
                              <span className="mono-font text-[8px]">Index</span>
                              <span className="mono-font text-[8px] font-bold">{draft.engagementScore}%</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex justify-between items-end">
                        <button 
                          onClick={() => onDeleteDraft(draft.id)}
                          className="mono-font text-[8px] text-gray-300 hover:text-black"
                        >
                           [ Delete ]
                        </button>
                        <button className="bg-black text-white w-12 h-12 flex items-center justify-center hover:bg-[#E1FF6B] hover:text-black transition-all">
                           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                        </button>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
    </div>
  );
};

export default Dashboard;
