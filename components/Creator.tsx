
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
  const [duration, setDuration] = useState(0);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) transcript += event.results[i][0].transcript + ' ';
        }
        setPrompt(prev => prev + transcript);
      };
      recognitionRef.current.onend = () => setIsRecording(false);
    }
  }, []);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      setIsRecording(true);
      recognitionRef.current.start();
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const result = await generateSocialContent({ platform, type, persona, prompt });
      setAiResponse(result);
      setStep(2);
    } catch (err) {
      alert("Strategic generation failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex justify-between items-end border-b border-black pb-8">
        <div>
          <span className="mono-font text-gray-400 block mb-2">Input_Interface</span>
          <h1 className="serif-font text-7xl leading-none">Voice Capture</h1>
        </div>
        <button onClick={onCancel} className="mono-font border border-black px-6 py-2 hover:bg-black hover:text-white transition-all">
          [ Back ]
        </button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 overflow-hidden">
        {/* Input Pane */}
        <div className="flex flex-col gap-8 h-full">
           <div className="border border-black p-10 bg-white relative">
              <div className="absolute top-4 right-4 mono-font text-[9px] text-gray-400">STATUS: {isRecording ? 'LIVE' : 'STANDBY'}</div>
              
              <div className="flex items-center gap-8 mb-12">
                 <button 
                   onClick={toggleRecording}
                   className={`w-16 h-16 border border-black flex items-center justify-center transition-all ${
                     isRecording ? 'bg-black text-[#E1FF6B]' : 'bg-white text-black hover:bg-black hover:text-white'
                   }`}
                 >
                    {isRecording ? <div className="w-4 h-4 bg-[#E1FF6B]"></div> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>}
                 </button>
                 <div className="flex-1 h-12 flex items-center gap-1 overflow-hidden px-4 border-l border-black">
                    {Array.from({length: 40}).map((_, i) => (
                      <div key={i} className="w-1 bg-black" style={{height: isRecording ? `${Math.random() * 100}%` : '2px'}}></div>
                    ))}
                 </div>
                 <span className="mono-font text-xl tabular-nums">{formatTime(duration)}</span>
              </div>
              
              <span className="mono-font block mb-4 border-b border-black/10 pb-1">Raw_Text_Input</span>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium placeholder:text-gray-200 min-h-[200px]"
                placeholder="Initialize thoughts here..."
              />
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3">
                 <span className="mono-font">Target_Platform</span>
                 <select 
                   value={platform} 
                   onChange={(e) => setPlatform(e.target.value as Platform)}
                   className="border border-black bg-white p-4 mono-font text-[10px] outline-none appearance-none"
                 >
                    {Object.values(Platform).map(p => <option key={p} value={p}>{p}</option>)}
                 </select>
              </div>
              <div className="flex flex-col gap-3">
                 <span className="mono-font">Asset_Type</span>
                 <select 
                   value={type} 
                   onChange={(e) => setType(e.target.value as ContentType)}
                   className="border border-black bg-white p-4 mono-font text-[10px] outline-none appearance-none"
                 >
                    {Object.values(ContentType).map(t => <option key={t} value={t}>{t}</option>)}
                 </select>
              </div>
           </div>

           <button 
             onClick={handleGenerate}
             disabled={!prompt || isGenerating}
             className="bg-black text-white py-6 mono-font font-bold text-xl hover:bg-[#E1FF6B] hover:text-black border border-black transition-all disabled:opacity-20 mt-auto"
           >
             {isGenerating ? '[ PROCESSING... ]' : '[ INITIALIZE GENERATION ]'}
           </button>
        </div>

        {/* Output Pane */}
        <div className="border border-black bg-white p-10 overflow-y-auto no-scrollbar relative flex flex-col">
           <div className="absolute top-4 right-4 mono-font text-[9px] text-gray-400">OUTPUT_PREVIEW</div>
           
           {!aiResponse && !isGenerating ? (
             <div className="flex-1 flex flex-col items-center justify-center opacity-10 gap-4">
                <div className="w-32 h-32 border-2 border-dashed border-black rounded-full animate-spin flex items-center justify-center">
                   <div className="w-20 h-20 border border-black"></div>
                </div>
                <span className="mono-font">Awaiting stream...</span>
             </div>
           ) : isGenerating ? (
             <div className="flex-1 flex flex-col gap-8">
                <div className="w-full h-1 bg-gray-100 relative overflow-hidden">
                   <div className="absolute inset-0 bg-black animate-[scanline_2s_linear_infinite]"></div>
                </div>
                <div className="space-y-4">
                   {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-gray-50 rounded-sm w-full"></div>)}
                </div>
             </div>
           ) : (
             <div className="animate-in fade-in duration-700">
                <div className="mb-8 pb-4 border-b border-black/10">
                   <span className="mono-font block mb-1">Generated: {platform}</span>
                   <h3 className="serif-font text-4xl">{prompt.slice(0, 30)}...</h3>
                </div>

                {type === ContentType.CAROUSEL ? (
                   <div className="flex flex-col gap-6">
                      {aiResponse.slides?.map((slide: string, i: number) => (
                        <div key={i} className="border border-black p-8 bg-[#F5F5F5] relative">
                           <span className="absolute top-2 right-4 mono-font text-[9px]">0{i+1}</span>
                           <p className="serif-font text-2xl leading-tight">{slide}</p>
                        </div>
                      ))}
                   </div>
                ) : (
                   <div className="p-8 border border-black bg-white">
                      <p className="serif-font text-2xl leading-relaxed italic">"{aiResponse.body}"</p>
                   </div>
                )}

                <div className="mt-8 p-6 bg-black text-[#E1FF6B] mono-font text-[10px]">
                   <span className="block mb-2 font-bold">[ STRATEGY_REPORT ]</span>
                   {aiResponse.strategy}
                </div>

                <div className="flex gap-4 mt-12">
                   <button 
                     onClick={() => setStep(1)} 
                     className="flex-1 border border-black py-4 mono-font hover:bg-black hover:text-white transition-all"
                   >
                      [ Re-init ]
                   </button>
                   <button 
                     onClick={() => onSave({
                       id: Date.now().toString(),
                       platform, type, persona,
                       title: prompt.slice(0, 40) + "...",
                       content: type === ContentType.CAROUSEL ? aiResponse.slides : aiResponse.body,
                       engagementScore: 98,
                       strategyHint: aiResponse.strategy,
                       createdAt: new Date()
                     })} 
                     className="flex-1 bg-black text-white py-4 mono-font hover:bg-white hover:text-black border border-black transition-all"
                   >
                      [ Commit ]
                   </button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Creator;
