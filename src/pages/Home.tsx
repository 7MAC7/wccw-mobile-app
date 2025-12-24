import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center text-center p-6 overflow-hidden">
      {/* 나비 배경 */}
      <img 
        src="/butterfly.png" 
        alt="Butterfly - Symbol of freedom and hope"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* 내용 앞으로 + 가독성 위해 반투명 배경 */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-wccw-purple mb-12 tracking-wider drop-shadow-lg">
          WCCW에 오신 것을 환영합니다
        </h1>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl p-12 shadow-2xl">
          <p className="text-3xl md:text-4xl font-serif text-wccw-purple italic leading-relaxed mb-6">
            Justice & Peace
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            우리는 일본군 위안부 피해자 할머니들의 명예 회복과<br />
            올바른 역사 교육을 위해 함께합니다.
          </p>
        </div>

        <p className="text-gray-600 mt-12 text-sm opacity-90">
          아래 메뉴를 선택해 주세요
        </p>
      </div>
    </div>
  );
};

export default Home;