import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Briefcase,
  SearchCheck,
  History,
  Files,
  FileUser,
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';

type TabType = 'DASHBOARD' | 'JOBS' | 'ATS_CHECK' | 'APPLICATIONS' | 'SUBMITTED_DOCS' | 'PROFILE' | 'SETTINGS';

interface AppNavDrawerProps {
  user: User | null;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

export const AppNavDrawer: React.FC<AppNavDrawerProps> = ({ user, activeTab, onTabChange, onLogout }) => {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 900);

  React.useEffect(() => {
    const handleResize = () => setIsLarge(window.innerWidth >= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { id: 'DASHBOARD' as TabType, label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
    { id: 'JOBS' as TabType, label: 'Jobs', icon: <Briefcase size={24} /> },
    { id: 'ATS_CHECK' as TabType, label: 'ATS check', icon: <SearchCheck size={24} /> },
    { id: 'APPLICATIONS' as TabType, label: 'Applications', icon: <History size={24} /> },
    { id: 'SUBMITTED_DOCS' as TabType, label: 'Submitted docs', icon: <Files size={24} /> },
    { id: 'PROFILE' as TabType, label: 'Profile', icon: <FileUser size={24} /> },
  ];

  const RailContent = () => (
    <div className="flex flex-col h-full py-4 items-center">
      <div className="mb-8">
        <div className="w-10 h-10 bg-[var(--sys-color-signalGreen-base)] rounded-xl flex items-center justify-center text-[var(--sys-color-charcoalBackground-base)] font-bold">
          CC
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 w-full px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`group relative flex flex-col items-center justify-center w-full py-2 transition-all duration-200 ${
              activeTab === item.id 
                ? 'text-[var(--sys-color-paperWhite-base)]' 
                : 'text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'
            }`}
          >
            <div className="relative flex items-center justify-center w-12 h-8">
              {activeTab === item.id && (
                <motion.div 
                  layoutId="railPill"
                  className="absolute inset-0 bg-[var(--sys-color-signalGreen-base)] rounded-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <div className={`relative z-10 ${activeTab === item.id ? 'text-[var(--sys-color-charcoalBackground-base)]' : ''}`}>
                {item.icon}
              </div>
            </div>
            <span className="mt-1 text-[10px] font-medium text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto flex flex-col items-center gap-4 pt-4 border-t border-[var(--sys-color-outline-variant)] w-full">
        <button 
          onClick={() => onTabChange('SETTINGS')}
          className={`p-2 rounded-full transition-all ${activeTab === 'SETTINGS' ? 'bg-[var(--sys-color-signalGreen-base)] text-[var(--sys-color-charcoalBackground-base)]' : 'text-[var(--sys-color-worker-ash-base)] hover:bg-white/5'}`}
        >
          <Settings size={24} />
        </button>
        <button 
          onClick={onLogout}
          className="p-2 rounded-full text-[var(--sys-color-kr-charcoalRed-base)] hover:bg-red-500/10 transition-all"
        >
          <LogOut size={24} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Navigation Rail for Desktop (>= 900px) */}
      {isLarge && (
        <aside 
          className="fixed top-0 left-0 h-screen w-[64px] border-r z-50"
          style={{ 
            background: 'var(--sys-color-charcoalBackground-base)',
            borderColor: 'var(--sys-color-outline-variant)'
          }}
        >
          <RailContent />
        </aside>
      )}

      {/* Mobile Top App Bar (Only visible if < 900px) */}
      {!isLarge && (
        <div className="fixed top-0 left-0 right-0 h-[64px] px-4 flex items-center justify-between z-40 border-b"
          style={{ 
            background: 'var(--sys-color-charcoalBackground-base)',
            borderColor: 'var(--sys-color-outline-variant)'
          }}
        >
          <h1 className="type-solidarityProtest text-[var(--sys-color-paperWhite-base)] text-xl">
            Career<span className="text-[var(--sys-color-signalGreen-base)]">Copilot</span>
          </h1>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--sys-color-outline-variant)]">
            <img 
              src={user?.photoURL || "https://picsum.photos/seed/worker/100/100"} 
              alt="Avatar" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}
    </>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  isRail?: boolean;
  variant?: 'default' | 'danger';
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick, isRail, variant = 'default' }) => {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-3 w-full transition-all duration-200 ${
        isRail ? 'flex-col justify-center py-4' : 'px-4 py-3'
      } ${
        active 
          ? 'text-[var(--sys-color-paperWhite-base)]' 
          : variant === 'danger' 
            ? 'text-[var(--sys-color-solidarityRed-base)]/60 hover:text-[var(--sys-color-solidarityRed-base)]'
            : 'text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'
      }`}
    >
      {/* MD3 Expressive Active Indicator Pill */}
      {active && (
        <motion.div 
          layoutId="navPill"
          className="absolute inset-0 bg-[var(--sys-color-solidarityRed-base)] -z-10"
          style={{ 
            borderRadius: isRail ? '16px' : 'var(--sys-shape-radius-full)',
            margin: isRail ? '4px 8px' : '0'
          }}
          initial={false}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}

      <div className={`relative z-10 ${isRail ? 'mb-1' : ''}`}>
        {icon}
      </div>
      
      {!isRail && (
        <span className="relative z-10 font-bold text-xs">
          {label}
        </span>
      )}
      
      {isRail && (
        <span className="relative z-10 text-[8px] font-bold opacity-60">
          {label}
        </span>
      )}
    </button>
  );
};
