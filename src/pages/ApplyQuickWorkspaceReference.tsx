/**
 * CLASSIFICATION: Support-Reference Page
 * Prototype-only reference page.
 */
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { JobInputPanel } from "../components/feature/JobInputPanel";
import { StudioMatchPanel } from "../../components/StudioMatchPanel";
import { SaveApplicationBar } from "../components/feature/SaveApplicationBar";
import { generateMatchAnalysis } from "../../services/geminiService";
import { useApplyWorkspace } from "../hooks/useApplyWorkspace";
import { Link, Target, Sparkles, LayoutDashboard, CheckCircle2, Circle, X } from "lucide-react";
import { DashboardOverview } from "../components/feature/DashboardOverview";
import { useUserStore } from "../hooks/useUserStore";

import { User } from 'firebase/auth';

interface Props {
  initialJobData?: { title: string; company: string; text: string } | null;
  user?: User | null;
  onTabChange?: (tab: 'DASHBOARD' | 'JOBS' | 'ATS_CHECK' | 'APPLICATIONS' | 'SUBMITTED_DOCS' | 'PROFILE' | 'SETTINGS') => void;
}

const ChecklistItem = ({ label, completed }: { label: string; completed: boolean }) => (
  <div className="flex items-center gap-3 py-2">
    {completed ? (
      <CheckCircle2 size={18} className="text-[var(--sys-color-signalGreen-base)]" />
    ) : (
      <Circle size={18} className="text-[var(--sys-color-worker-ash-base)]" />
    )}
    <span className={`text-sm font-medium ${completed ? 'text-[var(--sys-color-worker-ash-base)] line-through opacity-60' : 'text-[var(--sys-color-paperWhite-base)]'}`}>
      {label}
    </span>
  </div>
);

const StepCard = ({ number, icon: Icon, label, desc }: any) => (
  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderRadius: '16px' }}>
    <div className="w-10 h-10 rounded-full bg-[var(--sys-color-solidarityRed-base)] flex items-center justify-center text-[var(--sys-color-paperWhite-base)] font-bold shrink-0">
      {number}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={18} className="text-[var(--sys-color-inkGold-base)]" />
        <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] tracking-tight">{label}</h4>
      </div>
      <p className="text-sm text-[var(--sys-color-worker-ash-base)] leading-relaxed">{desc}</p>
    </div>
  </div>
);

export function ApplyQuickWorkspaceReference({ initialJobData, user, onTabChange }: Props) {
  const {
    careerData,
    job,
    isAnalyzingJob,
    isLoadingProfile,
    handleAnalyzeJob,
    handleUpdateCareerData,
    handleSave
  } = useApplyWorkspace({ initialJobData, user });

  const { dismissedChecklist, setDismissedChecklist } = useUserStore();
  const [showDashboard, setShowDashboard] = React.useState(true);

  // Stub boolean for missing profile data
  const isProfileMissing = true;

  if (isLoadingProfile) {
    return (
      <SolidarityPageLayout>
        <WorkspaceLayout>
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-t-transparent animate-spin" style={{ borderColor: 'var(--sys-color-solidarityRed-base) transparent var(--sys-color-solidarityRed-base) var(--sys-color-solidarityRed-base)', borderRadius: 'var(--sys-shape-cutoutRiot01)' }} />
          </div>
        </WorkspaceLayout>
      </SolidarityPageLayout>
    );
  }

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
          {/* LEFT PANE: Target Job Input */}
          <div 
            className="w-full md:w-[440px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-4 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none"
          >
            <div className="mb-2">
              <h1 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] tracking-tight">
                Target <span className="text-[var(--sys-color-solidarityRed-base)]">job</span>
              </h1>
              <p className="text-[clamp(20px,5vw,28px)] leading-[clamp(28px,6vw,36px)] type-laborExploitationPressure text-[var(--sys-color-stencilYellow-base)]">
                No neutral canvas.
              </p>
            </div>

            <JobInputPanel onAnalyze={handleAnalyzeJob} isAnalyzing={isAnalyzingJob} />
            
            <div className="mt-auto pt-4">
              <SaveApplicationBar />
            </div>
          </div>

          {/* RIGHT PANE: Analysis / How It Works / Dashboard */}
          <div 
            className="flex-1 min-width-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-y-auto rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none"
          >
            <AnimatePresence mode="wait">
              {!job ? (
                <motion.div 
                  key={showDashboard ? "dashboard" : "how-it-works"}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-full max-w-4xl mx-auto flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-[clamp(22px,6vw,28px)] leading-[clamp(30px,7vw,36px)] type-solidarityProtest text-[var(--sys-color-paperWhite-base)]">
                      {showDashboard ? "Dashboard" : "How it works"}
                    </h2>
                    <button 
                      onClick={() => setShowDashboard(!showDashboard)}
                      className="px-4 h-9 border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] font-medium text-xs hover:text-[var(--sys-color-paperWhite-base)] hover:bg-[var(--sys-color-paperWhite-base)]/5 transition-all rounded-full flex items-center gap-2"
                    >
                      {showDashboard ? <Sparkles size={14} /> : <LayoutDashboard size={14} />}
                      {showDashboard ? "View guide" : "View dashboard"}
                    </button>
                  </div>

                  {showDashboard ? (
                    <>
                      {!dismissedChecklist && isProfileMissing && (
                        <motion.div 
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-8 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] relative"
                          style={{ borderRadius: 'var(--sys-shape-radius-lg)' }}
                        >
                          <button 
                            onClick={() => setDismissedChecklist(true)}
                            className="absolute top-4 right-4 text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-colors"
                          >
                            <X size={18} />
                          </button>
                          <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] tracking-tight mb-4">
                            Getting started
                          </h3>
                          <div className="space-y-1">
                            <ChecklistItem label="Upload master resume" completed={false} />
                            <ChecklistItem label="Paste a job URL" completed={false} />
                            <ChecklistItem label="Browse jobs" completed={false} />
                          </div>
                          <button 
                            onClick={() => setDismissedChecklist(true)}
                            className="mt-4 text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-colors underline underline-offset-4"
                          >
                            Dismiss for now
                          </button>
                        </motion.div>
                      )}
                      <DashboardOverview onTabChange={onTabChange} />
                    </>
                  ) : (
                    <div className="grid grid-cols-1 gap-4 max-w-2xl mx-auto w-full">
                      <StepCard 
                        number="1" 
                        icon={Link} 
                        label="Drop a URL" 
                        desc="AI reads the job posting and extracts key requirements automatically." 
                      />
                      <StepCard 
                        number="2" 
                        icon={Target} 
                        label="Match scored" 
                        desc="See exactly where you fit and identify critical skill gaps instantly." 
                      />
                      <StepCard 
                        number="3" 
                        icon={Sparkles} 
                        label="Tailored response" 
                        desc="Resume + cover letter generated in seconds, optimized for this specific role." 
                      />
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="analysis-result"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-full"
                >
                  {careerData && (
                    <StudioMatchPanel 
                      careerData={careerData} 
                      job={job} 
                      onUpdate={handleUpdateCareerData}
                      userId={user?.uid || "prototype-user"}
                      onAnalyze={generateMatchAnalysis}
                      onSave={handleSave}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}
