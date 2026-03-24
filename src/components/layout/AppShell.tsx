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

import { LayoutDashboard, Briefcase, Target, FolderOpen, UserCircle, Settings, SearchCheck, History, Files, FileUser, LogOut } from "lucide-react";

export function AppShell({ children, user, onLogout, activeTab, onTabChange }: Props) {
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 900;

  const navItems = [
    { id: 'DASHBOARD' as const, label: 'Dashboard', icon: <LayoutDashboard size={24} /> },
    { id: 'JOBS' as const, label: 'Jobs', icon: <Briefcase size={24} /> },
    { id: 'ATS_CHECK' as const, label: 'ATS check', icon: <SearchCheck size={24} /> },
    { id: 'APPLICATIONS' as const, label: 'Applications', icon: <History size={24} /> },
    { id: 'SUBMITTED_DOCS' as const, label: 'Docs', icon: <Files size={24} /> },
    { id: 'PROFILE' as const, label: 'Profile', icon: <FileUser size={24} /> },
  ];

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

      {isDesktop && (
        <nav style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '72px',
          background: '#1A2526',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '16px',
          gap: '4px',
          zIndex: 100
        }}>
          {navItems.map(item => {
            const isActive = activeTab === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onTabChange(item.id)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '16px 0',
                  width: '72px',
                  cursor: 'pointer',
                  borderRadius: '16px',
                  background: isActive ? 'rgba(0,188,212,0.15)' : 'transparent',
                  color: isActive ? '#00BCD4' : 'inherit'
                }}
              >
                {item.icon}
                <span style={{ fontSize: '11px', marginTop: '4px' }}>{item.label}</span>
              </div>
            );
          })}
          <div style={{ flex: 1 }} />
          <div
            onClick={() => onTabChange('SETTINGS')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 0',
              width: '72px',
              cursor: 'pointer',
              borderRadius: '16px',
              background: activeTab === 'SETTINGS' ? 'rgba(0,188,212,0.15)' : 'transparent',
              color: activeTab === 'SETTINGS' ? '#00BCD4' : 'inherit'
            }}
          >
            <Settings size={24} />
            <span style={{ fontSize: '11px', marginTop: '4px' }}>Settings</span>
          </div>
          <div
            onClick={onLogout}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '16px 0',
              width: '72px',
              cursor: 'pointer',
              borderRadius: '16px',
              color: 'inherit',
              marginBottom: '16px'
            }}
          >
            <LogOut size={24} />
            <span style={{ fontSize: '11px', marginTop: '4px' }}>Logout</span>
          </div>
        </nav>
      )}

      <main 
        className="flex-1 relative flex flex-col overflow-hidden"
        style={{
          marginLeft: isDesktop ? '72px' : '0',
          marginBottom: isDesktop ? '0' : '0'
        }}
      >
        {/* Grit Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <div className={`relative z-10 flex-1 flex flex-col overflow-hidden ${!isDesktop ? 'pb-[72px]' : ''}`}>
          {children}
        </div>

        {/* Mobile Bottom Navigation Bar */}
        {!isDesktop && (
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
