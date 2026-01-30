
import React, { useState, useEffect, useRef } from 'react';
import { Platform, ContentType, Draft, Persona } from '../types';
import { generateSocialContent } from '../services/geminiService';

interface CreatorProps {
  onSave: (draft: Draft) => void;
  onCancel: () => void;
}

const Creator: React.FC<CreatorProps> = ({ onSave, onCancel }) => {
  const [step, setStep] = useState(1);
  const [platform, setPlatform] = useState<Platform>(Platform.LINKEDIN);
  const [type, setType] = useState<ContentType>(ContentType.POST);
  const [persona, setPersona] = useState<Persona>(Persona.VISIONARY);
  const [prompt, setPrompt] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<any>(null);

  // Real Speech Recognition Setup
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setPrompt(prev => prev + event.results[i][0].transcript + ' ');
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
      };

      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateSocialContent({
        platform,
        type,
        persona,
        prompt
      });
      setAiResponse(result);
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Strategic generation failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = () => {
    const newDraft: Draft = {
      id: Date.now().toString(),
      platform,
      type,
      persona,
      title: prompt.slice(0, 40) + "...",
      content: type === ContentType.CAROUSEL ? aiResponse.slides : aiResponse.body,
      engagementScore: Math.floor(Math.random() * 15) + 82, // AI "predicted" score
      strategyHint: aiResponse.strategy,
      createdAt: new Date()
    };
    onSave(newDraft);
  };

  return (
    <div className="px-6 py-2 overflow-y-auto max-h-[85vh] no-scrollbar">
      {step === 1 ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
          <div className="mb-10">
            <h2 className="text-4xl font-bold mb-3 tracking-tight serif-font italic">Speak your mind</h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[280px]">
              Our AI strategist will refine your raw thoughts into a masterpiece.
            </p>
          </div>

          <div className="bg-white rounded-[44px] p-8 shadow-2xl mb-10 relative border border-gray-100">
             <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={toggleRecording} 
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 group ${
                    isRecording ? 'bg-red-500 scale-110 shadow-red-200' : 'bg-black text-white hover:scale-105'
                  }`}
                >
                   {isRecording ? (
                     <div className="flex gap-1 items-center">
                        <div className="w-1.5 h-6 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-1.5 h-8 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-1.5 h-6 bg-white rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                     </div>
                   ) : (
                     <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
                   )}
                </button>
                <div className="flex-1 px-6">
                   <div className="h-1 w-full bg-gray-50 rounded-full overflow-hidden">
                      <div className={`h-full bg-black transition-all duration-500 ${isRecording ? 'w-full opacity-100' : 'w-0 opacity-0'}`}></div>
                   </div>
                </div>
                <span className={`text-[10px] font-bold font-mono transition-colors ${isRecording ? 'text-red-500' : 'text-gray-300'}`}>
                  {isRecording ? 'REC' : 'IDLE'}
                </span>
             </div>

             <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Talk to me about your next big idea..."
                className="w-full min-h-[140px] bg-transparent resize-none border-none focus:ring-0 text-xl leading-relaxed placeholder:text-gray-200 font-medium"
             />
          </div>

          <div className="space-y-8">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">The Brand Persona</span>
               <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
                  {Object.values(Persona).map(p => (
                    <button 
                      key={p} 
                      onClick={() => setPersona(p)}
                      className={`px-6 py-4 rounded-[24px] text-xs font-bold transition-all whitespace-nowrap border-2 ${
                        persona === p ? 'bg-black text-white border-black shadow-xl' : 'bg-white text-gray-400 border-transparent shadow-sm'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Platform</span>
                  <select 
                    value={platform} 
                    onChange={(e) => setPlatform(e.target.value as Platform)}
                    className="bg-white border-none rounded-2xl p-4 text-xs font-bold shadow-sm focus:ring-1 focus:ring-black"
                  >
                    {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
               </div>
               <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">Format</span>
                  <select 
                    value={type} 
                    onChange={(e) => setType(e.target.value as ContentType)}
                    className="bg-white border-none rounded-2xl p-4 text-xs font-bold shadow-sm focus:ring-1 focus:ring-black"
                  >
                    {Object.values(ContentType).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
            </div>

            <button 
              disabled={isGenerating || !prompt}
              onClick={handleGenerate}
              className="w-full bg-black text-white py-7 rounded-[32px] font-bold text-xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] disabled:opacity-50 hover:scale-[1.02] transition-transform active:scale-95 flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <div className="w-6 h-6 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                  AI Strategizing...
                </>
              ) : (
                <>
                  Generate Content
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-24">
           <div className="mb-10 flex justify-between items-end">
             <div>
              <h2 className="text-4xl font-bold mb-2 tracking-tight serif-font italic">Review</h2>
              <p className="text-gray-400 text-sm">Strategic {type} by {persona}.</p>
             </div>
             <div className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                High Potential
             </div>
          </div>

          <div className="bg-black/5 rounded-[40px] p-6 mb-8 border border-black/5">
             <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-gray-400">The Strategy</h4>
             <p className="text-sm font-medium leading-relaxed italic text-gray-600">"{aiResponse.strategy}"</p>
          </div>

          {type === ContentType.CAROUSEL && aiResponse.slides ? (
            <div className="flex gap-5 overflow-x-auto pb-10 snap-x no-scrollbar">
               {aiResponse.slides.map((slide: string, idx: number) => (
                 <div 
                   key={idx} 
                   className={`flex-shrink-0 w-[300px] h-[480px] rounded-[48px] shadow-2xl p-10 flex flex-col snap-center relative overflow-hidden transition-all hover:scale-[1.02] ${
                     idx % 2 === 0 ? 'bg-white text-black' : 'bg-black text-white'
                   }`}
                 >
                    <div className={`absolute top-0 right-0 p-8 opacity-5 text-9xl font-black ${idx % 2 === 0 ? 'text-black' : 'text-white'}`}>
                       {idx + 1}
                    </div>
                    <div className="z-10 h-full flex flex-col">
                       <div className="serif-font text-3xl italic mb-10 opacity-60">Lumina</div>
                       <p className="text-2xl font-bold leading-[1.3] tracking-tight">{slide}</p>
                       <div className="mt-auto pt-8 flex justify-between items-center text-[10px] font-black uppercase tracking-widest opacity-40">
                          <span>Slide {idx + 1}</span>
                          <span>{platform} &bull; {idx === aiResponse.slides.length - 1 ? 'CTA' : 'Value'}</span>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
          ) : (
            <div className="bg-white rounded-[44px] p-10 shadow-2xl mb-10 border border-gray-50 relative">
               <div className="absolute top-0 left-0 w-full h-2 bg-[#E66432] rounded-t-[44px] opacity-20"></div>
               <p className="text-xl font-medium leading-relaxed whitespace-pre-wrap">{aiResponse.body}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
             <button 
               onClick={() => setStep(1)}
               className="bg-white text-black py-6 rounded-[32px] font-bold shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
             >
               Refine
             </button>
             <button 
               onClick={handleSaveDraft}
               className="bg-[#E66432] text-white py-6 rounded-[32px] font-bold shadow-xl shadow-orange-100 hover:scale-[1.02] transition-transform"
             >
               Save Draft
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Creator;
