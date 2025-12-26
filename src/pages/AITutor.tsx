import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ChatMessage } from '../types';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || '');

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '안녕하세요! 일본군 위안부 문제와 관련된 역사에 대해 궁금한 점을 물어보세요. 정확하고 존중하는 태도로 답변 드릴께요.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `당신은 일본군 위안부 문제 전문 역사 튜터입니다. 사용자의 질문에 정확한 역사적 사실에 기반하여 존중하고 공정하게 답변해 주세요. 한국어로 답변하세요.\n\n질문: ${input}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const botMessage: ChatMessage = { role: 'model', text };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = { role: 'model', text: '죄송해요, 답변을 생성하는 중 오류가 발생했습니다. 다시 시도해 주세요.', isError: true };
      setMessages(prev => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full pb-20">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-serif font-bold text-wccw-purple text-center">AI 역사 튜터</h1>
        <p className="text-sm text-gray-600 text-center mt-2">위안부 문제에 대해 궁금한 점을 물어보세요</p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-wccw-purple text-white' 
                : 'bg-gray-100 text-gray-900'
            } ${msg.isError ? 'bg-red-100' : ''}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 px-4 py-3 rounded-2xl">
              <p className="text-gray-500">생각 중...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="fixed bottom-20 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-md mx-auto flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="질문을 입력하세요..."
            className="flex-1 border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:border-wccw-purple"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-wccw-purple text-white px-6 py-3 rounded-full font-bold disabled:opacity-50"
          >
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default AITutor;