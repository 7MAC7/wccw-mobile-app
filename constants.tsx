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