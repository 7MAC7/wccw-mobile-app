import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import { 
  Home, 
  MessageSquare, 
  BarChart2, 
  Settings, 
  Send, 
  User, 
  Zap, 
  Trophy,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  X
} from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';

// --- Utility Functions for Audio ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- Components ---

const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  const tabs = [
    { id: 'home', icon: Home, label: '홈' },
    { id: 'chat', icon: MessageSquare, label: '코치' },
    { id: 'stats', icon: BarChart2, label: '분석' },
    { id: 'settings', icon: Settings, label: '설정' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass border-t border-white/10 px-6 py-3 z-50 rounded-t-3xl">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-all duration-300 ${
              activeTab === tab.id ? 'text-blue-400 scale-110' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span className="text-[10px] font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const Dashboard = () => (
  <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <header className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-black italic tracking-tighter bg-gradient-to-br from-white via-white to-blue-500 bg-clip-text text-transparent">
          WCCW CHAMP
        </h1>
        <p className="text-gray-400 text-xs font-medium tracking-widest uppercase">Elite Performance Workspace</p>
      </div>
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 blur-md opacity-20 rounded-full animate-pulse"></div>
        <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-black flex items-center justify-center border border-white/10 overflow-hidden">
          <User size={24} className="text-blue-400" />
        </div>
      </div>
    </header>

    <div className="grid grid-cols-2 gap-4">
      <div className="glass p-5 rounded-[2rem] flex flex-col gap-3 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
           <Zap size={48} className="text-yellow-400" />
        </div>
        <Zap className="text-yellow-400" size={24} />
        <div>
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Energy Core</span>
          <div className="text-3xl font-black">92%</div>
        </div>
      </div>
      <div className="glass p-5 rounded-[2rem] flex flex-col gap-3 relative overflow-hidden group text-blue-400">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
           <Trophy size={48} />
        </div>
        <Trophy size={24} />
        <div>
          <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Current Rank</span>
          <div className="text-3xl font-black text-white">#04</div>
        </div>
      </div>
    </div>

    <div className="relative p-6 rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-blue-900 overflow-hidden shadow-2xl shadow-blue-500/20">
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <div className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest">Active Routine</div>
        </div>
        <h3 className="text-xl font-bold mb-1">한계 돌파 세션</h3>
        <p className="text-blue-100/70 text-sm mb-6 leading-tight">오늘의 고강도 인터벌 훈련이<br/>준비되었습니다.</p>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-2xl text-sm font-black transition-all active:scale-95 shadow-xl">
          CHALLENGE START
        </button>
      </div>
      <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-white/10 blur-3xl rounded-full"></div>
    </div>

    <section>
      <div className="flex justify-between items-end mb-4 px-1">
        <h3 className="text-lg font-bold">Timeline</h3>
        <span className="text-blue-400 text-xs font-bold uppercase">View All</span>
      </div>
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-3xl glass hover:bg-white/5 transition-all cursor-pointer border border-white/5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border border-white/10">
              <Zap size={20} className={i === 1 ? 'text-yellow-400' : 'text-blue-400'} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold">{i === 1 ? 'Morning Meditation' : 'Core Training'}</h4>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Completed • 08:30 AM</p>
            </div>
            <div className="text-right">
              <div className="text-blue-400 text-sm font-black">+450</div>
              <div className="text-[8px] text-gray-500 font-bold uppercase tracking-tighter">PTS</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: '챔피언, 오늘 무엇을 도와드릴까요? 당신의 잠재력을 깨울 준비가 되었습니다.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Live API Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const liveSessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleLive = async () => {
    if (isLive) {
      setIsLive(false);
      if (liveSessionRef.current) {
        liveSessionRef.current = null;
      }
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setIsLive(true);
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = outputCtx;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (msg) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(outputCtx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }
            if (msg.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: "당신은 세계적인 챔피언 코치입니다. 사용자를 격려하고 최고의 성과를 내도록 돕습니다. 짧고 간결하며 힘 있는 목소리로 대답하세요."
        }
      });

      liveSessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsLive(false);
      alert("마이크 접근 권한이 필요하거나 API 설정에 문제가 있습니다.");
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: "당신은 세계적인 스포츠 및 마인드셋 코치입니다. 이름은 WCCW AI입니다. 사용자의 성장을 돕기 위해 친절하고 전문적이며 열정적으로 대답하세요. 한국어를 사용하세요."
        }
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || '알겠습니다. 계속 전진하세요!' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: '오류가 발생했습니다. 하지만 포기하지 마세요. 다시 시도해 봅시다!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] animate-in slide-in-from-right duration-500 bg-black">
      <div className="p-5 border-b border-white/10 glass flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-lg font-black italic shadow-lg shadow-blue-500/20">W</div>
          <div>
            <h2 className="font-bold text-sm tracking-tight">CHAMPION COACH</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Ready to Action</span>
            </div>
          </div>
        </div>
        <button 
          onClick={toggleLive}
          className={`px-4 py-2 rounded-2xl flex items-center gap-2 transition-all active:scale-95 ${
            isLive ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-blue-600 text-white'
          }`}
        >
          {isLive ? <MicOff size={18} /> : <Mic size={18} />}
          <span className="text-xs font-black uppercase tracking-tighter">{isLive ? 'End Voice' : 'Voice Mode'}</span>
        </button>
      </div>
      
      {isLive ? (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-300">
          <div className="relative">
             <div className="absolute inset-0 bg-blue-500 blur-[80px] opacity-20 animate-pulse"></div>
             <div className="w-48 h-48 rounded-full border-2 border-white/5 flex items-center justify-center relative">
                <div className="absolute inset-2 rounded-full border border-blue-500/20 animate-ping"></div>
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center shadow-2xl">
                   <Volume2 size={48} className="text-white animate-bounce" />
                </div>
             </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-black italic mb-2 tracking-tight">AI 코치가 듣고 있습니다</h3>
            <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">실시간 음성 트레이닝 중...</p>
          </div>
          <div className="flex gap-1 justify-center">
             {[1,2,3,4,5].map(i => (
               <div key={i} className={`w-1 bg-blue-500 rounded-full animate-bounce`} style={{ height: `${20 + Math.random() * 40}px`, animationDelay: `${i * 0.1}s` }}></div>
             ))}
          </div>
        </div>
      ) : (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] px-5 py-3 rounded-[1.5rem] text-sm leading-relaxed ${
                m.role === 'user' ? 'bg-blue-600 text-white font-medium rounded-tr-none' : 'glass text-gray-200 rounded-tl-none border border-white/5'
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="glass px-5 py-3 rounded-2xl rounded-tl-none flex gap-2 items-center">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
      )}

      {!isLive && (
        <div className="p-5 bg-gradient-to-t from-black via-black to-transparent">
          <div className="flex gap-2 max-w-md mx-auto items-center">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="코치에게 보고하세요..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600 font-medium"
              />
            </div>
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-500 transition-all active:scale-90 disabled:opacity-50 shadow-lg shadow-blue-500/20"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[calc(100vh-160px)] text-gray-500 space-y-6 p-8 text-center animate-in zoom-in duration-500">
    <div className="relative">
      <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-10 rounded-full"></div>
      <div className="relative w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center border border-white/10">
        <BarChart2 size={40} className="text-blue-400" />
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-black italic text-white mb-2">{title}</h2>
      <p className="text-sm font-medium leading-relaxed">이 기능은 현재 정밀 분석 중입니다.<br/>당신의 최고 기록을 위해 준비 중입니다.</p>
    </div>
    <button className="px-6 py-2 rounded-xl border border-white/10 text-xs font-bold tracking-widest uppercase hover:bg-white/5 transition-colors">Notify Me</button>
  </div>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="max-w-md mx-auto min-h-screen bg-black pb-20 shadow-2xl shadow-blue-900/10 overflow-x-hidden border-x border-white/5">
      {activeTab === 'home' && <Dashboard />}
      {activeTab === 'chat' && <ChatInterface />}
      {activeTab === 'stats' && <Placeholder title="DATA ANALYSIS" />}
      {activeTab === 'settings' && <Placeholder title="PREFERENCES" />}
      
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);