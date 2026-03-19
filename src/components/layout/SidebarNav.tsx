import React from "react";
import { motion } from "motion/react";
import { Briefcase, User, History, LogOut, Library, Image } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

type Props = {
  onLogout: () => void;
};

export function SidebarNav({ onLogout }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  return (
    <nav 
      className="w-80 h-[calc(100vh-80px)] fixed left-0 top-[80px] flex flex-col z-40 border-r-2"
      style={{
        background: 'var(--sys-color-charcoalBackground-steps-1)',
        borderColor: 'var(--sys-color-concreteGrey-steps-0)'
      }}
    >
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <NavItem icon={<Briefcase size={20} />} label="Workspace" active={activePath === '/workspace'} onClick={() => navigate('/workspace')} />
        <NavItem icon={<User size={20} />} label="Master Profile" active={activePath === '/profile'} onClick={() => navigate('/profile')} />
        <NavItem icon={<History size={20} />} label="Past Applications" active={activePath === '/past'} onClick={() => navigate('/past')} />
        <NavItem icon={<Image size={20} />} label="Image Studio" active={activePath === '/studio'} onClick={() => navigate('/studio')} />
        <NavItem icon={<Library size={20} />} label="Component Library" active={activePath === '/components'} onClick={() => navigate('/components')} />
      </div>

      <div 
        className="p-6 border-t-2"
        style={{ borderColor: 'var(--sys-color-concreteGrey-steps-0)' }}
      >
        <motion.button 
          onClick={onLogout} 
          whileHover={{ x: 5, color: 'var(--sys-color-solidarityRed-base)' }}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center gap-3 text-left p-4 text-[var(--sys-color-worker-ash-base)] font-bold uppercase tracking-wider transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </motion.button>
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02, x: 4, rotate: active ? 0 : 1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`w-full flex items-center gap-3 text-left p-4 transition-colors border-2 font-bold uppercase tracking-wider text-sm ${
        active 
          ? 'text-[var(--sys-color-paperWhite-base)] shadow-[var(--sys-shadow-elevation2Placard)]' 
          : 'text-[var(--sys-color-worker-ash-base)] hover:bg-[var(--sys-color-charcoalBackground-steps-2)] hover:border-[var(--sys-color-concreteGrey-steps-0)]'
      }`}
      style={{ 
        borderRadius: active ? 'var(--sys-shape-blockRiot02)' : 'var(--sys-shape-radius-none)',
        background: active ? 'var(--sys-color-solidarityRed-base)' : 'transparent',
        borderColor: active ? 'var(--sys-color-solidarityRed-base)' : 'transparent'
      }}
    >
      {icon}
      {label}
    </motion.button>
  );
}
