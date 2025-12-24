import React from 'react';
import { View } from './src/types';
import { Home, Info, BookOpen, Heart, MessageSquare } from 'lucide-react';

export const NAV_ITEMS = [
  { id: View.HOME, label: '홈\nHome', icon: <Home size={24} /> },
  { id: View.ABOUT, label: '소개\nAbout', icon: <Info size={24} /> },
  { id: View.HISTORY, label: '역사\nHistory', icon: <BookOpen size={24} /> },
  { id: View.COMMUNITY, label: '나눔\nBoard', icon: <MessageSquare size={24} /> },
  { id: View.DONATE, label: '후원\nDonate', icon: <Heart size={24} /> },
];

export const HISTORY_TIMELINE: HistoryEvent[] = [
  {
    year: '1930s-1945',
    title: '제도화된 성노예제\n(Institutionalized Sexual Slavery)',
    description: '일본 제국주의 군대가 아시아 전역에서 수십만 명의 여성들을 조직적으로 동원하여 성노예로 삼았습니다. 이는 명백한 전시 성폭력 범죄였습니다.\nThe Japanese Imperial Army systematically mobilized hundreds of thousands of women across Asia into sexual slavery. It was a clear wartime sexual violence crime.'
  },
  {
    year: '1991',
    title: '김학순 할머니의 최초 공개 증언\n(First Public Testimony)',
    description: '8월 14일, 故 김학순 할머니께서 자신이 일본군 위안부 피해자였음을 실명으로 공개 증언하며 반세기의 침묵을 깼습니다.\nOn August 14, the late Hak-soon Kim broke half a century of silence by publicly testifying as a victim under her real name.'
  },
  // ... 나머지 너가 올려준 타임라인 데이터 그대로
  {
    year: '현재',
    title: '정의를 향한 계속된 여정\n(Continuing Journey for Justice)',
    description: '워싱턴 DC를 중심으로 기림비 건립, 차세대 교육, 국제 연대 활동을 통해 정의 실현과 인권 회복을 위해 노력하고 있습니다.\nCentered in DC, we strive for justice and human rights through memorials, education, and international solidarity.'
  }
];

export const DONATION_DATA = [
  { name: '1월 Jan', amount: 4200 },
  { name: '2월 Feb', amount: 3100 },
  { name: '3월 Mar', amount: 2500 },
  { name: '4월 Apr', amount: 2780 },
  { name: '5월 May', amount: 4890 },
  { name: '6월 Jun', amount: 3390 },
  { name: '7월 Jul', amount: 3490 },
];