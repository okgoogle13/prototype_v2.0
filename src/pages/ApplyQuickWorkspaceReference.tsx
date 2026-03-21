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
import { Link, Target, Sparkles } from "lucide-react";

import { User } from 'firebase/auth';

interface Props {
  initialJobData?: { title: string; company: string; text: string } | null;
  user?: User | null;
}

const StepCard = ({ number, icon: Icon, label, desc }: any) => (
  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] flex items-start gap-4" style={{ borderRadius: 'var(--sys-shape-radius-lg)' }}>
    <div className="w-10 h-10 rounded-full bg-[var(--sys-color-solidarityRed-base)] flex items-center justify-center text-[var(--sys-color-paperWhite-base)] font-bold shrink-0">
      {number}
    </div>
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Icon size={18} className="text-[var(--sys-color-inkGold-base)]" />
        <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wide">{label}</h4>
      </div>
      <p className="text-sm text-[var(--sys-color-worker-ash-base)]">{desc}</p>
    </div>
  </div>
);

export function ApplyQuickWorkspaceReference({ initialJobData, user }: Props) {
  const {
    careerData,
    job,
    isAnalyzingJob,
    isLoadingProfile,
    handleAnalyzeJob,
    handleUpdateCareerData,
    handleSave
  } = useApplyWorkspace({ initialJobData, user });

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
              <h1 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">
                Target <span className="text-[var(--sys-color-solidarityRed-base)]">Job</span>
              </h1>
              <p className="text-[clamp(20px,5vw,28px)] leading-[clamp(28px,6vw,36px)] type-laborExploitationPressure text-[var(--sys-color-stencilYellow-base)] uppercase tracking-widest">
                NO NEUTRAL CANVAS.
              </p>
            </div>

            <JobInputPanel onAnalyze={handleAnalyzeJob} isAnalyzing={isAnalyzingJob} />
            
            <div className="mt-auto pt-4">
              <SaveApplicationBar />
            </div>
          </div>

          {/* RIGHT PANE: Analysis / How It Works */}
          <div 
            className="flex-1 min-width-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-y-auto rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none"
          >
            <AnimatePresence mode="wait">
              {!job ? (
                <motion.div 
                  key="how-it-works"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="w-full max-w-2xl mx-auto flex flex-col justify-center h-full"
                >
                  <h2 className="text-[clamp(22px,6vw,28px)] leading-[clamp(30px,7vw,36px)] type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6 text-center">How It Works</h2>
                  <div className="grid grid-cols-1 gap-4">
                    <StepCard 
                      number="1" 
                      icon={Link} 
                      label="Drop a URL" 
                      desc="AI reads the job posting and extracts key requirements automatically." 
                    />
                    <StepCard 
                      number="2" 
                      icon={Target} 
                      label="Match Scored" 
                      desc="See exactly where you fit and identify critical skill gaps instantly." 
                    />
                    <StepCard 
                      number="3" 
                      icon={Sparkles} 
                      label="Tailored Response" 
                      desc="Resume + cover letter generated in seconds, optimized for this specific role." 
                    />
                  </div>
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
