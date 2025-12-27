import React from 'react';
import { NAV_ITEMS } from '../constants';
import { View } from '../types';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate }) => {
  return (
    <nav className="sticky bottom-0 z-50 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all ${
              currentView === item.id
                ? 'text-wccw-purple'
                : 'text-gray-500'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1 font-medium">{item.label.split('\n')[0]}</span>
            <span className="text-[10px] text-gray-400">{item.label.split('\n')[1]}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;