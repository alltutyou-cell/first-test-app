
import React, { useState } from 'react';

interface OnboardingProps {
  onFinish: () => void;
}

const slides = [
  {
    title: "Lumina Studio",
    description: "Initialize your content creation sequence with tactical AI reasoning",
    button: "Initialize_V1",
    image: (
      <div className="w-full h-80 border border-black bg-white flex items-center justify-center relative p-12 overflow-hidden">
        <div className="technical-grid absolute inset-0 opacity-10"></div>
        <div className="w-32 h-32 border-2 border-black rotate-45 flex items-center justify-center animate-pulse">
           <div className="w-20 h-20 border border-black bg-black"></div>
        </div>
      </div>
    )
  },
  {
    title: "Voice Logic",
    description: "Convert unstructured audio data into high-converting social architecture",
    button: "Continue_Seq",
    image: (
      <div className="w-full h-80 border border-black bg-white p-10 flex flex-col gap-6 relative overflow-hidden">
        <div className="h-1 bg-black/5 w-full relative">
           <div className="absolute top-0 left-0 h-full bg-black animate-[scanline_3s_linear_infinite]" style={{width: '60%'}}></div>
        </div>
        <div className="flex gap-1 h-12 items-center">
           {Array.from({length: 30}).map((_, i) => (
             <div key={i} className="w-1 bg-black" style={{height: `${Math.random() * 100}%`}}></div>
           ))}
        </div>
        <div className="flex-1 border border-black/10 p-4">
           <div className="w-full h-2 bg-black/5 rounded-full mb-2"></div>
           <div className="w-full h-2 bg-black/5 rounded-full mb-2"></div>
           <div className="w-2/3 h-2 bg-black/5 rounded-full"></div>
        </div>
      </div>
    )
  },
  {
    title: "Asset Output",
    description: "Precision-engineered carousels and posts that reflect your tactical identity",
    button: "Enter_Workspace",
    image: (
      <div className="w-full h-80 grid grid-cols-2 border border-black bg-black overflow-hidden gap-px">
         <div className="bg-white flex flex-col p-6 items-start justify-between">
            <span className="mono-font text-[8px] text-gray-400">ASSET_01</span>
            <div className="w-full h-1 bg-black/10"></div>
            <div className="w-2/3 h-1 bg-black/10"></div>
            <div className="w-full h-24 border border-black/5 bg-[#F5F5F5]"></div>
         </div>
         <div className="bg-white flex flex-col p-6 items-start justify-between">
            <span className="mono-font text-[8px] text-gray-400">ASSET_02</span>
            <div className="w-full h-1 bg-black"></div>
            <div className="w-1/3 h-1 bg-black"></div>
            <div className="w-full h-24 border border-black bg-black"></div>
         </div>
      </div>
    )
  }
];

const Onboarding: React.FC<OnboardingProps> = ({ onFinish }) => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === slides.length - 1) onFinish();
    else setCurrent(current + 1);
  };

  const slide = slides[current];

  return (
    <div className="w-[500px] h-[800px] bg-[#EBEBEB] border border-black flex flex-col p-12 relative overflow-hidden technical-grid">
      <div className="scan-line"></div>
      
      <div className="flex justify-between items-center mb-16">
         <span className="mono-font">Lumina_Studio</span>
         <span className="mono-font">0{current + 1} / 03</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
         <div className="w-full mb-12 animate-in fade-in zoom-in duration-500">
            {slide.image}
         </div>

         <h1 className="serif-font text-6xl italic mb-6 leading-tight">{slide.title}</h1>
         <p className="mono-font text-[10px] text-gray-500 leading-relaxed px-8 lowercase">{slide.description}</p>
      </div>

      <div className="pt-12 flex flex-col items-center gap-6">
         <div className="flex gap-4 mb-4">
            {slides.map((_, i) => (
               <div key={i} className={`w-3 h-3 border border-black rotate-45 transition-all duration-500 ${i === current ? 'bg-black' : 'bg-transparent'}`}></div>
            ))}
         </div>
         <button 
           onClick={next}
           className="w-full bg-black text-white py-6 mono-font text-sm hover:bg-white hover:text-black border border-black transition-all"
         >
           [ {slide.button} ]
         </button>
      </div>
    </div>
  );
};

export default Onboarding;
