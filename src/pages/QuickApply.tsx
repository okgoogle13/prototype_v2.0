import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { JobInputPanel } from '../components/feature/JobInputPanel';
import { useUserStore } from '../hooks/useUserStore';

interface QuickApplyProps {
  onAnalyze: (title: string, company: string, text: string) => Promise<void>;
  onGoToDashboard?: () => void;
}

export const QuickApply: React.FC<QuickApplyProps> = ({ onAnalyze, onGoToDashboard }) => {
  const { setHasSetJobTarget } = useUserStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async (title: string, company: string, text: string) => {
    setIsAnalyzing(true);
    try {
      await onAnalyze(title, company, text);
      setHasSetJobTarget(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
    >
      {/* Grit Particle Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="max-w-4xl w-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-7xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter mb-4">
            Apply <span className="text-[var(--sys-color-solidarityRed-base)]">Now</span>
          </h1>
          <p className="text-xl type-melancholyLonging text-[var(--sys-color-worker-ash-base)]">
            Drop in a job URL and we'll prep your full application in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <JobInputPanel 
            onAnalyze={handleAnalyze} 
            isAnalyzing={isAnalyzing} 
          />
        </motion.div>
        
        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              setHasSetJobTarget(true);
              if (onGoToDashboard) onGoToDashboard();
            }}
            className="text-[var(--sys-color-worker-ash-base)] opacity-60 hover:opacity-100 hover:text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-sm transition-all"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
