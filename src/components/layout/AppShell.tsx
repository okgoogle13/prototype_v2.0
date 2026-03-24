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
  const [isLarge, setIsLarge] = React.useState(window.innerWidth >= 900);

  React.useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

      <main className={`flex-1 relative flex flex-col overflow-hidden ${isLarge ? 'ml-[64px]' : 'pb-[72px]'}`}>
        {/* Grit Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        {!isLarge && (
          <div className="fixed bottom-0 left-0 right-0 h-[72px] bg-[var(--sys-color-charcoalBackground-steps-2)] border-t border-[var(--sys-color-outline-variant)] z-[100] flex items-center justify-around px-4 pb-safe">
            <MobileNavItem 
              icon={<LayoutDashboard size={24} />} 
              label="Dashboard"
              active={activeTab === 'DASHBOARD'} 
              onClick={() => onTabChange('DASHBOARD')} 
            />
            <MobileNavItem 
              icon={<Briefcase size={24} />} 
              label="Jobs"
              active={activeTab === 'JOBS'} 
              onClick={() => onTabChange('JOBS')} 
            />
            <MobileNavItem 
              icon={<Target size={24} />} 
              label="ATS check"
              active={activeTab === 'ATS_CHECK'} 
              onClick={() => onTabChange('ATS_CHECK')} 
            />
            <MobileNavItem 
              icon={<FolderOpen size={24} />} 
              label="Docs"
              active={activeTab === 'SUBMITTED_DOCS'} 
              onClick={() => onTabChange('SUBMITTED_DOCS')} 
            />
            <MobileNavItem 
              icon={<UserCircle size={24} />} 
              label="Profile"
              active={activeTab === 'PROFILE'} 
              onClick={() => onTabChange('PROFILE')} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

function MobileNavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1 flex-1 h-full transition-all ${active ? 'text-[var(--sys-color-signalGreen-base)]' : 'text-[var(--sys-color-worker-ash-base)]'}`}
    >
      <div className={`p-1 rounded-full transition-all ${active ? 'bg-[var(--sys-color-signalGreen-base)]/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
      {active && (
        <motion.div 
          layoutId="mobile-nav-indicator"
          className="absolute top-0 w-8 h-1 rounded-b-full bg-[var(--sys-color-signalGreen-base)]" 
        />
      )}
    </button>
  );
}
