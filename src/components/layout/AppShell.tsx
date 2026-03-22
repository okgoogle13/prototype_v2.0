import React from "react";
import { AppNavDrawer } from "./AppNavDrawer";
import { User } from "firebase/auth";

type Props = {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  activeTab: 'WORKSPACE' | 'PROFILE' | 'PAST' | 'OPTIMISE' | 'LIBRARY' | 'LOOKOUT' | 'PREP' | 'QUICK_APPLY';
  onTabChange: (tab: 'WORKSPACE' | 'PROFILE' | 'PAST' | 'OPTIMISE' | 'LIBRARY' | 'LOOKOUT' | 'PREP' | 'QUICK_APPLY') => void;
};

export function AppShell({ children, user, onLogout, activeTab, onTabChange }: Props) {
  return (
    <div 
      className="h-screen flex text-[var(--sys-color-worker-ash-base)] font-sans overflow-hidden"
      style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
    >
      <AppNavDrawer 
        user={user}
        activeTab={activeTab}
        onTabChange={onTabChange}
        onLogout={onLogout}
      />

      <main className="flex-1 min-[600px]:ml-[80px] min-[1200px]:ml-[260px] relative flex flex-col overflow-hidden pt-[64px] min-[600px]:pt-0">
        {/* Grit Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}
