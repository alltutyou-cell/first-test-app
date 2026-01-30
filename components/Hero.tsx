
import React from 'react';

interface HeroProps {
  onStart: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="px-8 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="relative mb-12">
        <h1 className="text-7xl font-bold leading-[0.9] text-left mb-8 tracking-tighter">
          CONTENT<br />MADE<br />FOR <span className="relative">YOU<svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="#E66432" strokeWidth="4" fill="none"/></svg></span>
        </h1>
        
        {/* Abstract Product Representation - Floating Cards */}
        <div className="relative w-full h-64 mt-12">
          <div className="absolute top-0 left-4 w-48 h-64 bg-white rounded-[32px] shadow-2xl rotate-[-6deg] overflow-hidden p-4 border border-gray-100">
            <div className="w-full h-32 bg-indigo-50 rounded-2xl mb-3 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </div>
            <div className="h-3 w-3/4 bg-gray-200 rounded-full mb-2"></div>
            <div className="h-2 w-full bg-gray-100 rounded-full mb-1"></div>
            <div className="h-2 w-1/2 bg-gray-100 rounded-full"></div>
          </div>
          <div className="absolute top-8 right-4 w-48 h-64 bg-[#E66432] rounded-[32px] shadow-2xl rotate-[6deg] overflow-hidden p-6 text-white">
            <div className="serif-font text-3xl mb-4 italic">Social AI</div>
            <p className="text-sm opacity-90 leading-relaxed">Turn thoughts into high-performing carousels instantly.</p>
            <div className="mt-8 flex gap-2">
               {[1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/40"></div>)}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             14 new drafts ready
          </div>
          
          <button 
            onClick={onStart}
            className="w-full max-w-xs bg-black text-white py-6 rounded-[32px] text-lg font-bold hover:scale-105 transition-transform active:scale-95 shadow-xl"
          >
            Discover More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
