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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'DASHBOARD' as TabType, label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
    { id: 'JOBS' as TabType, label: 'JOBS', icon: <Briefcase size={24} /> },
    { id: 'ATS_CHECK' as TabType, label: 'ATS CHECK', icon: <SearchCheck size={24} /> },
    { id: 'APPLICATIONS' as TabType, label: 'APPLICATIONS', icon: <History size={24} /> },
    { id: 'SUBMITTED_DOCS' as TabType, label: 'SUBMITTED DOCS', icon: <Files size={24} /> },
    { id: 'PROFILE' as TabType, label: 'Profile', icon: <FileUser size={24} /> },
  ];

  const bottomItems: { id: TabType, label: string, icon: React.ReactNode }[] = [];

  const DrawerContent = ({ isRail = false }: { isRail?: boolean }) => (
    <div className="flex flex-col h-full py-6 px-3">
      {/* Logo Section */}
      <div className={`mb-8 px-3 ${isRail ? 'flex justify-center' : ''}`}>
        <h1 className={`type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none ${isRail ? 'text-xs text-center' : 'text-2xl'}`}>
          Career<br/><span className="text-[var(--sys-color-solidarityRed-base)]">Copilot</span>
        </h1>
      </div>

      {/* Identity Block */}
      {!isRail && user && (
        <div className="mb-8 px-3 py-4 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-2xl border border-[var(--sys-color-outline-variant)] flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--sys-color-outline-variant)] bg-[var(--sys-color-charcoalBackground-steps-3)]">
              <img 
                src={user.photoURL || "https://picsum.photos/seed/worker/100/100"} 
                alt="Avatar" 
                className="w-full h-full object-cover grayscale"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] truncate uppercase tracking-tight">
                {user.displayName || 'User'}
              </p>
              <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] truncate opacity-60">
                {user.email}
              </p>
            </div>
          </div>
          <button 
            onClick={() => onTabChange('SETTINGS')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeTab === 'SETTINGS' 
                ? 'bg-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-paperWhite-base)]' 
                : 'bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'
            }`}
          >
            <Settings size={14} />
            Settings
          </button>
        </div>
      )}

      {/* Identity Block for Rail */}
      {isRail && user && (
        <div className="mb-8 flex flex-col items-center gap-2">
          <div 
            onClick={() => onTabChange('SETTINGS')}
            className={`w-10 h-10 rounded-full overflow-hidden border cursor-pointer transition-all ${
              activeTab === 'SETTINGS' ? 'border-[var(--sys-color-solidarityRed-base)] ring-2 ring-[var(--sys-color-solidarityRed-base)]' : 'border-[var(--sys-color-outline-variant)]'
            } bg-[var(--sys-color-charcoalBackground-steps-3)]`}
          >
            <img 
              src={user.photoURL || "https://picsum.photos/seed/worker/100/100"} 
              alt="Avatar" 
              className="w-full h-full object-cover grayscale"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <div className="flex-1 flex flex-col gap-1">
        {navItems.map((item) => (
          <NavItem 
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => {
              onTabChange(item.id);
              setIsMobileMenuOpen(false);
            }}
            isRail={isRail}
          />
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="mt-auto flex flex-col gap-1 pt-4 border-t border-[var(--sys-color-outline-variant)]">
        {bottomItems.map((item) => (
          <NavItem 
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeTab === item.id}
            onClick={() => {
              onTabChange(item.id);
              setIsMobileMenuOpen(false);
            }}
            isRail={isRail}
          />
        ))}
        <NavItem 
          icon={<LogOut size={24} />}
          label="Sign Out"
          onClick={onLogout}
          isRail={isRail}
          variant="danger"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Permanent Drawer (Large Breakpoint) */}
      <aside 
        className="hidden min-[1200px]:block fixed top-0 left-0 h-screen w-[260px] border-r z-50"
        style={{ 
          background: 'var(--sys-color-charcoalBackground-base)',
          borderColor: 'var(--sys-color-outline-variant)'
        }}
      >
        <DrawerContent />
      </aside>

      {/* Tablet Navigation Rail (Medium Breakpoint) */}
      <aside 
        className="hidden min-[600px]:block min-[1200px]:hidden fixed top-0 left-0 h-screen w-[80px] border-r z-50"
        style={{ 
          background: 'var(--sys-color-charcoalBackground-base)',
          borderColor: 'var(--sys-color-outline-variant)'
        }}
      >
        <DrawerContent isRail />
      </aside>

      {/* Mobile Top App Bar & Modal Drawer (Compact Breakpoint) */}
      <div className="min-[600px]:hidden fixed top-0 left-0 right-0 h-[64px] px-4 flex items-center justify-between z-40 border-b"
        style={{ 
          background: 'var(--sys-color-charcoalBackground-base)',
          borderColor: 'var(--sys-color-outline-variant)'
        }}
      >
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-[var(--sys-color-paperWhite-base)]"
        >
          <Menu size={24} />
        </button>
        <h1 className="type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter text-xl">
          Career<span className="text-[var(--sys-color-solidarityRed-base)]">Copilot</span>
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

      {/* Mobile Modal Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] min-[600px]:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-[280px] z-[70] min-[600px]:hidden shadow-2xl"
              style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
            >
              <div className="absolute top-4 right-4">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-[var(--sys-color-worker-ash-base)]">
                  <X size={24} />
                </button>
              </div>
              <DrawerContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
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
        <span className="relative z-10 font-bold uppercase tracking-widest text-xs">
          {label}
        </span>
      )}
      
      {isRail && (
        <span className="relative z-10 text-[8px] font-bold uppercase tracking-widest opacity-60">
          {label}
        </span>
      )}
    </button>
  );
};
