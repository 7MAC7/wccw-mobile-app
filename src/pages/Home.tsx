import React from 'react';
import { View } from '../types';

interface HomeProps {
  onNavigate: (view: View) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-wccw-purple mb-4">WCCW에 오신 것을 환영합니다</h1>
      <p className="text-gray-700 mb-8">워싱턴 정신대대책위원회 앱입니다.</p>
      <div className="bg-purple-50 rounded-2xl p-6 text-center">
        <p className="text-wccw-purple font-serif text-xl">Justice & Peace</p>
      </div>
    </div>
  );
};

export default Home;