import React from 'react';
import { View } from '../types';

interface AboutProps {
  onNavigate?: (view: View) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="p-6 pb-20">
      <h1 className="text-3xl font-serif font-bold text-wccw-purple mb-6 tracking-wide">About WCCW</h1>
      
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-wccw-purple mb-3">우리 미션</h2>
          <p>
            워싱턴 정신대문제 대책위원회(WCCW)는 일본군 위안부 피해자들의 정의와 인권 회복을 위해 1992년 설립된 비영리 단체입니다.
          </p>
          <p className="mt-3">
            우리는 피해 할머니들의 증언을 세상에 알리고, 올바른 역사 교육을 통해 다시는 이런 비극이 반복되지 않도록 노력합니다.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-wccw-purple mb-3">주요 활동</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>미국 의회 결의안 121호 통과 주도 (2007)</li>
            <li>워싱턴 DC 평화의 소녀상 건립 및 관리</li>
            <li>차세대 역사 교육 프로그램 운영</li>
            <li>국제 연대 및 증언 활동 지원</li>
            <li>피해자 기림 행사 및 추모 활동</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-wccw-purple mb-3">함께해 주세요</h2>
          <p>
            정의와 평화를 위한 여정은 아직 끝나지 않았습니다.
          </p>
          <p className="mt-3 font-serif text-lg text-wccw-purple italic">
            "역사는 잊지 않습니다. 우리는 기억합니다."
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;