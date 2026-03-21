/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { TextInput } from "../ui/TextInput";
import { PrimaryButton } from "../ui/PrimaryButton";
import { DocumentInput } from "../../../components/DocumentInput";
import { StatusSpecificLoadingState } from "../ui/StatusSpecificLoadingState";
import { useJobInput } from "../../hooks/useJobInput";
import { JobOpportunity } from "../../../types";

interface Props {
  onAnalyze: (jobTitle: string, companyName: string, rawText: string) => Promise<JobOpportunity | null | void>;
  isAnalyzing: boolean;
}

export function JobInputPanel({ onAnalyze, isAnalyzing }: Props) {
  const {
    jobUrl,
    setJobUrl,
    setRawText,
    isManualExpanded,
    setIsManualExpanded,
    extractedRole,
    setExtractedRole,
    extractedCompany,
    setExtractedCompany,
    isEditingChips,
    setIsEditingChips,
    isExtracting,
    isInstalled,
    handleUrlBlur,
    handleTextProcess,
    handleFileProcess,
    handleAnalyze,
  } = useJobInput({ onAnalyze });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40, rotate: 1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="p-10 bg-[var(--sys-color-charcoalBackground-steps-1)] border border-[var(--sys-color-outline-variant)] shadow-[var(--sys-shadow-elevation2Placard)] relative overflow-hidden" 
      style={{ borderRadius: 'var(--sys-shape-block-main)' }}
    >
      {/* Wheat-paste noise background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')]" />
      
      <div className="relative z-10">
        {isAnalyzing ? (
          <StatusSpecificLoadingState />
        ) : (
          <div className="flex flex-col gap-6">
            <SectionHeader 
              title="Target Job" 
              subtitle="Drop in a URL. We'll handle the rest."
            />
            <div className="flex flex-col gap-4">
              <TextInput 
                label="Paste job posting URL" 
                placeholder="https://linkedin.com/jobs/..." 
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                onBlur={handleUrlBlur}
              />
              
              {isExtracting && (
                <div className="text-sm text-[var(--sys-color-worker-ash-base)] animate-pulse mt-2">
                  Extracting job details...
                </div>
              )}

              {(extractedRole || extractedCompany) && !isExtracting && (
                <div className="mt-2">
                  {isEditingChips ? (
                    <div className="flex gap-2 items-center">
                      <input 
                        className="bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] px-3 py-1 rounded text-sm focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)]"
                        value={extractedRole}
                        onChange={(e) => setExtractedRole(e.target.value)}
                        placeholder="Role Title"
                      />
                      <span className="text-[var(--sys-color-worker-ash-base)]">·</span>
                      <input 
                        className="bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] px-3 py-1 rounded text-sm focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)]"
                        value={extractedCompany}
                        onChange={(e) => setExtractedCompany(e.target.value)}
                        placeholder="Company Name"
                      />
                      <button 
                        onClick={() => setIsEditingChips(false)}
                        className="text-sm text-[var(--sys-color-solidarityRed-base)] hover:underline ml-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-full text-sm text-[var(--sys-color-paperWhite-base)] cursor-pointer hover:border-[var(--sys-color-solidarityRed-base)] transition-colors"
                      onClick={() => setIsEditingChips(true)}
                    >
                      <span className="text-[var(--sys-color-solidarityRed-base)]">✓</span>
                      <span className="font-medium">{extractedRole || 'Unknown Role'}</span>
                      <span className="text-[var(--sys-color-worker-ash-base)]">·</span>
                      <span className="text-[var(--sys-color-worker-ash-base)]">{extractedCompany || 'Unknown Company'}</span>
                    </div>
                  )}
                </div>
              )}

              {!isManualExpanded && (
                <button 
                  onClick={() => setIsManualExpanded(true)}
                  className="text-left text-sm text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-colors mt-2"
                >
                  Don't have a URL? Add description manually →
                </button>
              )}

              <AnimatePresence>
                {isManualExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-[var(--sys-color-outline-variant)] mt-2">
                      <button 
                        onClick={() => setIsManualExpanded(false)}
                        className="text-sm text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-colors mb-4"
                      >
                        ← Back
                      </button>
                      <DocumentInput 
                        onProcess={handleFileProcess} 
                        isLoading={isExtracting} 
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isInstalled && (
                <div className="bg-[var(--sys-color-protestMetalBlue-steps-0)] border border-[var(--sys-color-protestMetalBlue-steps-1)] p-4 rounded-[var(--sys-shape-radius-lg)] flex items-center justify-between mt-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-[var(--sys-color-protestMetalBlue-steps-4)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <h4 className="font-bold text-[var(--sys-color-protestMetalBlue-steps-5)]">One click import.</h4>
                      <p className="text-sm text-[var(--sys-color-protestMetalBlue-steps-4)] opacity-80">Install our extension to import jobs in one click.</p>
                    </div>
                  </div>
                  <button className="bg-[var(--sys-color-charcoalBackground-steps-3)] hover:opacity-90 text-[var(--sys-color-worker-ash-base)] px-4 py-2 rounded font-bold text-sm transition-colors">
                    Install Extension
                  </button>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  <PrimaryButton label="Analyze Requirements" onClick={handleAnalyze} variant="strike" />
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
