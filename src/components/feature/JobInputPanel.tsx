/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { SectionHeader } from "../ui/SectionHeader";
import { TextInput } from "../ui/TextInput";
import { M3Button } from "../ui/M3Button";
import { M3Card } from "../ui/M3Card";
import { M3Type } from "../../theme/typography";
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
    rawText,
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
    >
      <M3Card variant="elevated" className="p-10 relative overflow-hidden">
        {/* Wheat-paste noise background */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')]" />
        
        <div className="relative z-10">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-12 gap-6">
            <StatusSpecificLoadingState />
            <div className="text-center">
              <p style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }} className="animate-pulse">
                Analyzing job...
              </p>
              <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }} className="opacity-60">
                Tailoring your application workspace...
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <SectionHeader 
              title="Apply now" 
              subtitle="Drop in a job URL and we'll prep your full application in seconds."
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
                <div style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }} className="animate-pulse mt-2">
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
                        placeholder="Role title"
                      />
                      <span className="text-[var(--sys-color-worker-ash-base)]">·</span>
                      <input 
                        className="bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] px-3 py-1 rounded text-sm focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)]"
                        value={extractedCompany}
                        onChange={(e) => setExtractedCompany(e.target.value)}
                        placeholder="Company name"
                      />
                      <M3Button 
                        variant="text"
                        onClick={() => setIsEditingChips(false)}
                        style={{ padding: '0 8px', minHeight: '32px' }}
                      >
                        Save
                      </M3Button>
                    </div>
                  ) : (
                    <div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-full cursor-pointer hover:border-[var(--sys-color-solidarityRed-base)] transition-colors"
                      onClick={() => setIsEditingChips(true)}
                    >
                      <span className="text-[var(--sys-color-solidarityRed-base)]">✓</span>
                      <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-paperWhite-base)' }}>{extractedRole || 'Unknown role'}</span>
                      <span className="text-[var(--sys-color-worker-ash-base)]">·</span>
                      <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>{extractedCompany || 'Unknown company'}</span>
                    </div>
                  )}
                </div>
              )}

              {!isManualExpanded && (
                <M3Button 
                  variant="text"
                  onClick={() => setIsManualExpanded(true)}
                  style={{ justifyContent: 'flex-start', padding: 0 }}
                >
                  No URL? Describe the role instead
                </M3Button>
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
                      <M3Button 
                        variant="text"
                        onClick={() => setIsManualExpanded(false)}
                        style={{ justifyContent: 'flex-start', padding: 0, marginBottom: '16px' }}
                      >
                        Back
                      </M3Button>
                      <DocumentInput 
                        onProcess={handleFileProcess} 
                        isLoading={isExtracting} 
                        onRawTextChange={setRawText}
                        initialRawText={rawText}
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
                      <h4 style={{ ...M3Type.titleMedium, color: 'var(--sys-color-protestMetalBlue-steps-5)' }}>Apply faster</h4>
                      <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-protestMetalBlue-steps-4)' }} className="opacity-80">Import directly from job boards.</p>
                    </div>
                  </div>
                  <M3Button variant="outlined" onClick={() => {}}>Install extension</M3Button>
                </div>
              )}
              
              <div className="flex justify-end mt-4">
                <motion.div whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
                  <M3Button variant="filled" onClick={handleAnalyze}>Start my application</M3Button>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
      </M3Card>
    </motion.div>
  );
}
