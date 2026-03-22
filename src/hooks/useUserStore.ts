import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (value: boolean) => void;
  hasSetJobTarget: boolean;
  setHasSetJobTarget: (value: boolean) => void;
  onboardingPath: 'PROFILE' | 'WORKSPACE' | null;
  setOnboardingPath: (path: 'PROFILE' | 'WORKSPACE' | null) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hasCompletedOnboarding: false,
      setHasCompletedOnboarding: (value) => set({ hasCompletedOnboarding: value }),
      hasSetJobTarget: false,
      setHasSetJobTarget: (value) => set({ hasSetJobTarget: value }),
      onboardingPath: null,
      setOnboardingPath: (path) => set({ onboardingPath: path }),
    }),
    {
      name: 'user-storage',
    }
  )
);
