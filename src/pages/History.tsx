import React from 'react';
import { HISTORY_TIMELINE } from '../../constants';  // constants.tsx에서 불러옴
import { HistoryEvent } from '../types';

const History: React.FC = () => {
  return (
    <div className="p-6 pb-20">
      <h1 className="text-3xl font-serif font-bold text-wccw-purple mb-8 tracking-wide text-center">역사 타임라인</h1>
      
      <div className="relative border-l-4 border-wccw-purple ml-4 space-y-10">
        {HISTORY_TIMELINE.map((event, index) => (
          <div key={index} className="relative pl-10">
            {/* 타임라인 점 */}
            <div className="absolute left-[-2rem] top-1 w-5 h-5 bg-wccw-purple rounded-full border-4 border-white shadow-md"></div>
            
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold text-wccw-purple mb-2">{event.year}</h3>
              <h4 className="text-lg font-semibold mb-3">{event.title}</h4>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;