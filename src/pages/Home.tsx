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

      {/* 박스 없이 글씨만 배경 위에 (그림자 추가해서 가독성 확보) */}
      <div className="relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-wccw-purple mb-12 tracking-wider drop-shadow-2xl">
          WCCW에 오신 것을 환영합니다
        </h1>

        <p className="text-4xl md:text-5xl font-serif text-wccw-purple italic leading-relaxed drop-shadow-2xl">
          Justice & Peace
        </p>

        <p className="text-gray-700 text-lg leading-relaxed mt-8 drop-shadow-lg">
          우리는 일본군 위안부 피해자 할머니들의 명예 회복과<br />
          올바른 역사 교육을 위해 함께합니다.
        </p>

        <p className="text-gray-600 mt-16 text-sm opacity-90">
          아래 메뉴를 선택해 주세요
        </p>
      </div>
    </div>
  );
};

export default Home;