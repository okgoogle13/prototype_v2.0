import React from "react";
import { SidebarNav } from "./SidebarNav";

type Props = {
  children: React.ReactNode;
  onLogout: () => void;
};

export function AppShell({ children, onLogout }: Props) {
  return (
    <div 
      className="min-h-screen flex flex-col text-[var(--sys-color-worker-ash-base)] font-sans"
      style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
    >
      {/* Top Navigation Bar */}
      <header 
        className="h-[80px] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 border-b-2"
        style={{ 
          background: 'var(--sys-color-charcoalBackground-steps-1)',
          borderColor: 'var(--sys-color-concreteGrey-steps-0)'
        }}
      >
        <div className="flex items-center">
          <h1 className="text-4xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none">
            Career<span className="text-[var(--sys-color-solidarityRed-base)]">Copilot</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div 
            className="w-12 h-12 bg-[var(--sys-color-charcoalBackground-steps-2)] border-2 border-[var(--sys-color-concreteGrey-steps-0)] overflow-hidden flex items-center justify-center"
            style={{ borderRadius: 'var(--sys-shape-cutoutRiot01)' }}
          >
            <img 
              src="https://picsum.photos/seed/worker/100/100" 
              alt="User Avatar" 
              className="w-full h-full object-cover grayscale opacity-80"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <div className="flex flex-1 pt-[80px]">
        <SidebarNav onLogout={onLogout} />
        <main className="flex-1 ml-80 relative min-h-[calc(100vh-80px)]">
          {/* Grit Particle Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          <div className="relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
