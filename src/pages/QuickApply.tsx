import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { JobInputPanel } from '../components/feature/JobInputPanel';
import { useUserStore } from '../hooks/useUserStore';
import { M3Card } from '../components/ui/M3Card';
import { M3Button } from '../components/ui/M3Button';
import { M3Type } from '../theme/typography';

interface QuickApplyProps {
  onAnalyze: (title: string, company: string, text: string) => Promise<void>;
  onGoToDashboard?: () => void;
}

const MOCK_JOBS = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'TechCorp', location: 'Remote' },
  { id: '2', title: 'Product Designer', company: 'DesignStudio', location: 'New York, NY' },
  { id: '3', title: 'Full Stack Developer', company: 'StartupInc', location: 'San Francisco, CA' },
];

export const QuickApply: React.FC<QuickApplyProps> = ({ onAnalyze, onGoToDashboard }) => {
  const { setHasSetJobTarget } = useUserStore();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string>(MOCK_JOBS[0].id);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [hoveredJobId, setHoveredJobId] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isDesktop = windowWidth >= 900;

  const handleAnalyze = async (title: string, company: string, text: string) => {
    setIsAnalyzing(true);
    try {
      await onAnalyze(title, company, text);
      setHasSetJobTarget(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const jobListContent = (
    <div className="flex flex-col gap-4 overflow-y-auto h-full pr-2">
      <h2 style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)', marginBottom: '8px' }}>Saved opportunities</h2>
      {MOCK_JOBS.map(job => {
        const isActive = job.id === activeJobId;
        const isHovered = job.id === hoveredJobId;
        return (
          <M3Card
            key={job.id}
            variant={isHovered ? 'filled' : 'elevated'}
            onClick={() => setActiveJobId(job.id)}
            onMouseEnter={() => setHoveredJobId(job.id)}
            onMouseLeave={() => setHoveredJobId(null)}
            className="cursor-pointer transition-all"
            style={{
              borderLeft: isActive ? '3px solid #00BCD4' : '3px solid transparent',
            }}
          >
            <h3 style={{ ...M3Type.titleMedium, color: 'var(--sys-color-paperWhite-base)' }}>{job.title}</h3>
            <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>{job.company}</p>
            <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)', opacity: 0.7, marginTop: '4px' }}>{job.location}</p>
          </M3Card>
        );
      })}
    </div>
  );

  const quickApplyContent = (
    <div className="flex flex-col w-full">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)', marginBottom: '16px' }}>
          Quick apply
        </h1>
        <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>
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
      
      <div className="mt-8 text-center">
        <M3Button 
          variant="text"
          onClick={() => {
            setHasSetJobTarget(true);
            if (onGoToDashboard) onGoToDashboard();
          }}
        >
          Go to dashboard →
        </M3Button>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen flex flex-col p-4 md:p-8 relative overflow-hidden"
      style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
    >
      {/* Grit Particle Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      <div className="w-full max-w-7xl mx-auto relative z-10 flex-1 flex flex-col">
        {isDesktop ? (
          <div className="flex flex-row gap-8 h-full flex-1">
            <div className="w-[40%] h-full">
              {jobListContent}
            </div>
            <div className="w-[60%] h-full flex items-center justify-center">
              {quickApplyContent}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8 h-full">
            <div className="w-full">
              {jobListContent}
            </div>
            <div className="w-full flex items-center justify-center">
              {quickApplyContent}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
