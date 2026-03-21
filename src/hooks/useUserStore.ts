import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
  onboardingPath: 'PROFILE' | 'WORKSPACE' | null;
  setOnboardingPath: (path: 'PROFILE' | 'WORKSPACE' | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      onboardingPath: null,
      setOnboardingPath: (path) => set({ onboardingPath: path }),
    }),
    {
      name: 'user-storage',
    }
  )
);
