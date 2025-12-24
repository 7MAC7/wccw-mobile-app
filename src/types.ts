import React from 'react';

export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  HISTORY = 'HISTORY',
  DONATE = 'DONATE',
  COMMUNITY = 'COMMUNITY'
}

export interface NavItem {
  id: View;
  label: string;
  icon: React.ReactNode;
}

export interface HistoryEvent {
  year: string;
  title: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface User {
  username: string;
  isAdmin: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  createdAt?: number;
}