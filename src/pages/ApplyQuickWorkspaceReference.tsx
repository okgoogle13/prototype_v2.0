/**
 * CLASSIFICATION: Support-Reference Page
 * Prototype-only reference page.
 */
import React, { useState } from "react";
import { motion } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { LayeredHero } from "../components/layout/LayeredHero";
import { JobInputPanel } from "../components/feature/JobInputPanel";
import { StudioMatchPanel } from "../../components/StudioMatchPanel";
import { SaveApplicationBar } from "../components/feature/SaveApplicationBar";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { extractJobOpportunity, generateMatchAnalysis } from "../../services/geminiService";
import { mockCareerData } from "../utils/mockData";
import { JobOpportunity, CareerDatabase, MatchAnalysis } from "../../types";

interface Props {
  initialJobData?: { title: string; company: string; text: string } | null;
}

export function ApplyQuickWorkspaceReference({ initialJobData }: Props) {
  const [careerData, setCareerData] = useState<CareerDatabase | null>(null);
  const [job, setJob] = useState<JobOpportunity | null>(null);
  const [isAnalyzingJob, setIsAnalyzingJob] = useState(false);

  // Automatically process initial job data
  React.useEffect(() => {
    if (initialJobData && !job && !isAnalyzingJob) {
      // Load sample profile automatically if none exists
      const dataToUse = careerData || mockCareerData;
      if (!careerData) {
        setCareerData(mockCareerData);
      }
      
      setIsAnalyzingJob(true);
      extractJobOpportunity('text', `Title: ${initialJobData.title}\nCompany: ${initialJobData.company}\n\n${initialJobData.text}`, dataToUse)
        .then(extractedJob => setJob(extractedJob))
        .catch(err => {
          console.error("Failed to analyze initial job:", err);
          alert("Failed to analyze job. See console for details.");
        })
        .finally(() => setIsAnalyzingJob(false));
    }
  }, [initialJobData, job, isAnalyzingJob, careerData]);

  const handleLoadSampleProfile = () => {
    setCareerData(mockCareerData);
    alert("Profile loaded (Prototype only)");
  };

  const handleAnalyzeJob = async (jobTitle: string, companyName: string, rawText: string) => {
    if (!careerData) {
      alert("Please load a profile first.");
      return;
    }
    setIsAnalyzingJob(true);
    try {
      const extractedJob = await extractJobOpportunity('text', `Title: ${jobTitle}\nCompany: ${companyName}\n\n${rawText}`, careerData);
      setJob(extractedJob);
    } catch (err) {
      console.error("Failed to analyze job:", err);
      alert("Failed to analyze job. See console for details.");
    } finally {
      setIsAnalyzingJob(false);
    }
  };

  const handleUpdateCareerData = (data: CareerDatabase) => {
    setCareerData(data);
  };

  const handleSave = async (userId: string, data: CareerDatabase) => {
    console.log("Saving data for user", userId, data);
    // Mock save
  };

  return (
    <SolidarityPageLayout
      heroNode={
        <LayeredHero 
          imageUrl="https://picsum.photos/seed/workspace/1920/1080?blur=2" 
          altText="Workspace Hero" 
        />
      }
    >
      <WorkspaceLayout>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-16">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1">
                <h1 className="text-7xl md:text-8xl type-extremeVariableContrast text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-6">
                  Application <br/><span className="text-[var(--sys-color-solidarityRed-base)]">Workspace</span>
                </h1>
                <p className="text-xl type-laborExploitationPressure text-[var(--sys-color-stencilYellow-base)] uppercase tracking-widest mb-8">
                  NO NEUTRAL CANVAS. TAILOR YOUR RESPONSE.
                </p>
                <PrimaryButton label="Load Sample Profile" onClick={handleLoadSampleProfile} variant="tonal" />
              </div>
              <div className="flex-1 w-full">
                <div 
                  className="w-full aspect-video border flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
                  style={{ 
                    borderRadius: 'var(--sys-shape-blockRiot03)',
                    background: 'var(--sys-color-charcoalBackground-steps-2)',
                    borderColor: 'var(--sys-color-outline-variant)'
                  }}
                >
                  <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                  <h3 className="text-2xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-widest mb-4 relative z-10">
                    Hero Illustration Placeholder
                  </h3>
                  <p className="text-sm type-melancholyLonging text-[var(--sys-color-worker-ash-base)] max-w-md relative z-10">
                    Archetype: Placard / Scaffold. Hard architectural lines. Asymmetric radii.
                    <br/><br/>
                    <strong className="text-[var(--sys-color-solidarityRed-base)] uppercase tracking-widest">CRITICAL RULE: Zero-Flora lockdown.</strong>
                    <br/>
                    Absolutely NO Australian flora, eucalyptus, or wattle concepts permitted in the ultimate imagery.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div className="space-y-12">
            {!job ? (
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <JobInputPanel onAnalyze={handleAnalyzeJob} isAnalyzing={isAnalyzingJob} />
              </motion.div>
            ) : (
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                {careerData && (
                  <StudioMatchPanel 
                    careerData={careerData} 
                    job={job} 
                    onUpdate={handleUpdateCareerData}
                    userId="prototype-user"
                    onAnalyze={generateMatchAnalysis}
                    onSave={handleSave}
                  />
                )}
              </motion.div>
            )}
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SaveApplicationBar />
            </motion.div>
          </div>
        </motion.div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}
