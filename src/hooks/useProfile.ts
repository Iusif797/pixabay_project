import { useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  searchesCount: number;
  createdAt: string;
}

const DEFAULT_AVATARS = [
  '👤', '😊', '🎨', '📸', '🌟', '🎭', '🦄', '🚀', 
  '🎯', '💎', '🌈', '⚡', '🔥', '✨', '🌙', '☀️'
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest User',
  email: '',
  bio: '',
  avatar: '👤',
  searchesCount: 0,
  createdAt: new Date().toISOString(),
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('userProfile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const incrementSearchCount = () => {
    setProfile(prev => ({ ...prev, searchesCount: prev.searchesCount + 1 }));
  };

  const changeAvatar = (avatar: string) => {
    setProfile(prev => ({ ...prev, avatar }));
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
  };

  return {
    profile,
    updateProfile,
    incrementSearchCount,
    changeAvatar,
    resetProfile,
    availableAvatars: DEFAULT_AVATARS,
  };
}
