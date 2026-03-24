import React from "react";
import { AppNavDrawer } from "./AppNavDrawer";
import { motion } from "motion/react";
import { User } from "firebase/auth";

type Props = {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  activeTab: 'DASHBOARD' | 'JOBS' | 'ATS_CHECK' | 'APPLICATIONS' | 'SUBMITTED_DOCS' | 'PROFILE' | 'SETTINGS';
  onTabChange: (tab: 'DASHBOARD' | 'JOBS' | 'ATS_CHECK' | 'APPLICATIONS' | 'SUBMITTED_DOCS' | 'PROFILE' | 'SETTINGS') => void;
};

import { LayoutDashboard, Briefcase, Target, FolderOpen, UserCircle, Settings } from "lucide-react";

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

        {/* Mobile Bottom Navigation Bar */}
        <div className="min-[600px]:hidden fixed bottom-0 left-0 right-0 h-[72px] bg-[var(--sys-color-charcoalBackground-steps-2)] border-t border-[var(--sys-color-outline-variant)] z-[100] flex items-center justify-around px-4 pb-safe">
          <MobileNavItem 
            icon={<LayoutDashboard size={20} />} 
            active={activeTab === 'DASHBOARD'} 
            onClick={() => onTabChange('DASHBOARD')} 
          />
          <MobileNavItem 
            icon={<Briefcase size={20} />} 
            active={activeTab === 'JOBS'} 
            onClick={() => onTabChange('JOBS')} 
          />
          <MobileNavItem 
            icon={<Target size={20} />} 
            active={activeTab === 'ATS_CHECK'} 
            onClick={() => onTabChange('ATS_CHECK')} 
          />
          <MobileNavItem 
            icon={<FolderOpen size={20} />} 
            active={activeTab === 'SUBMITTED_DOCS'} 
            onClick={() => onTabChange('SUBMITTED_DOCS')} 
          />
          <MobileNavItem 
            icon={<UserCircle size={20} />} 
            active={activeTab === 'PROFILE'} 
            onClick={() => onTabChange('PROFILE')} 
          />
        </div>
      </main>
    </div>
  );
}

function MobileNavItem({ icon, active, onClick }: { icon: React.ReactNode, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all ${active ? 'text-[var(--sys-color-inkGold-base)]' : 'text-[var(--sys-color-worker-ash-base)]'}`}
    >
      {icon}
      {active && (
        <motion.div 
          layoutId="mobile-nav-indicator"
          className="absolute -bottom-1 w-1 h-1 rounded-full bg-[var(--sys-color-inkGold-base)]" 
        />
      )}
    </button>
  );
}
