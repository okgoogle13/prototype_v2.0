import React from 'react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onLogin: () => void;
  onGuestLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin, onGuestLogin }) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
    >
      {/* Grit Particle Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="max-w-7xl w-full flex flex-col md:flex-row gap-16 items-center relative z-10">
        {/* Primary Content: 7-8 columns on desktop */}
        <div className="w-full md:w-2/3 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <h1 className="text-7xl md:text-9xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-4">
              Career<br/><span className="text-[var(--sys-color-solidarityRed-base)]">Copilot</span>
            </h1>
            <p className="text-2xl md:text-3xl type-melancholyLonging text-[var(--sys-color-worker-ash-base)] mb-6">
              Your career. Precisely targeted.
            </p>
            
            <div className="max-w-xl mb-12">
              <p className="text-lg text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                An asymmetric advantage in the modern hiring landscape. We use advanced AI to audit your resume, 
                tailor your applications, and scout opportunities with surgical precision.
              </p>
            </div>

            <div className="flex flex-col gap-6 w-full max-w-md">
              <button 
                onClick={onLogin}
                className="w-full px-8 py-5 text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-xl hover:text-[var(--sys-color-solidarityRed-base)] border transition-all shadow-2xl"
                style={{ 
                  borderRadius: 'var(--sys-shape-blockRiot01)',
                  background: 'var(--sys-color-solidarityRed-base)',
                  borderColor: 'var(--sys-color-solidarityRed-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--sys-color-charcoalBackground-steps-1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--sys-color-solidarityRed-base)';
                }}
              >
                Sign In with Google
              </button>

              <div className="flex flex-col items-center gap-4">
                <button 
                  onClick={onGuestLogin}
                  className="w-full px-8 py-4 text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-lg hover:text-[var(--sys-color-solidarityRed-base)] border transition-all"
                  style={{ 
                    borderRadius: 'var(--sys-shape-blockRiot01)',
                    background: 'transparent',
                    borderColor: 'var(--sys-color-outline-variant)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--sys-color-paperWhite-base)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--sys-color-outline-variant)';
                  }}
                >
                  Explore as Guest
                </button>
                
                <button 
                  className="text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] text-sm font-bold uppercase tracking-widest transition-colors"
                >
                  Create Account / Register
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Decorative Panel: 4-5 columns on desktop, hidden on mobile */}
        <div className="hidden md:flex md:w-1/3 h-full items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full aspect-[3/4] flex items-center justify-center relative overflow-hidden"
            style={{ 
              borderRadius: '48px',
              background: 'var(--sys-color-charcoalBackground-steps-2)',
              border: '1px solid var(--sys-color-outline-variant)'
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 400 600" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-landing" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--sys-color-outline-variant)" strokeWidth="1" opacity="0.2"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-landing)" />
              <circle cx="100" cy="150" r="120" fill="var(--sys-color-solidarityRed-base)" opacity="0.05" />
              <rect x="150" y="300" width="200" height="200" rx="48" fill="var(--sys-color-inkGold-base)" opacity="0.03" transform="rotate(-15 250 400)" />
              <path d="M 0 500 Q 200 300 400 500" fill="none" stroke="var(--sys-color-metalBlue-base)" strokeWidth="4" opacity="0.1" />
              <path d="M 50 50 L 350 550" fill="none" stroke="var(--sys-color-solidarityRed-base)" strokeWidth="1" opacity="0.1" strokeDasharray="10 10" />
            </svg>
            
            {/* Floating UI Elements */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 p-12">
              <div className="w-full h-12 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-full border border-white/5 opacity-40" />
              <div className="w-3/4 h-12 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-full border border-white/5 opacity-20 self-start" />
              <div className="w-1/2 h-12 bg-[var(--sys-color-solidarityRed-base)] rounded-full opacity-10 self-end" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
