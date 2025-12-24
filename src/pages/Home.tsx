import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-center overflow-hidden">
      {/* 나비 배경 */}
      <img 
        src="/butterfly.png"  // ← 너 파일 이름으로 바꿔! (예: /splash.png)
        alt="Butterfly - Symbol of freedom"
        className="absolute inset-0 w-full h-full object-contain opacity-80"
      />

      {/* 내용 앞으로 + 약간 투명 배경으로 가독성 높임 */}
      <div className="relative z-10 px-8">
        <h1 className="text-4xl font-serif font-bold text-wccw-purple mb-12 tracking-wider">
          WCCW에 오신 것을 환영합니다
        </h1>

        <div className="bg-white/85 backdrop-blur-md rounded-3xl p-12 shadow-2xl max-w-lg mx-auto">
          <p className="text-3xl font-serif text-wccw-purple italic leading-relaxed">
            Justice & Peace
          </p>
          <p className="text-gray-700 mt-8 text-lg leading-relaxed">
            우리는 일본군 위안부 피해자 할머니들의 명예 회복과<br />
            올바른 역사 교육을 위해 함께합니다.
          </p>
        </div>

        <p className="text-gray-600 mt-12 text-sm">
          아래 메뉴를 선택해 주세요
        </p>
      </div>
    </div>
  );
};

export default Home;