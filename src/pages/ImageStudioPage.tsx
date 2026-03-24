/**
 * CLASSIFICATION: Support-Reference Page
 * ATS Resume Optimiser Page
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Search, Target, Zap, ShieldCheck, CheckCircle2, XCircle, AlertCircle, ArrowRight, Download, FileText, Loader2, Info } from "lucide-react";
import { GoogleGenAI, Type } from "@google/genai";
import { useUserStore } from "../hooks/useUserStore";

import { User } from 'firebase/auth';

interface Props {
  user?: User | null;
}

export function OptimisePage({ user }: Props) {
  const { pendingJobUrl, setPendingJobUrl, isGovernmentJob, setIsGovernmentJob } = useUserStore();
  const [activeSubTab, setActiveSubTab] = useState<'ANALYSIS' | 'IMAGE_STUDIO'>('ANALYSIS');
  const [isScanned, setIsScanned] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasGeneratedKSC, setHasGeneratedKSC] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("Software Engineer Resume");
  const [recommendations, setRecommendations] = useState<string[]>([
    "Add \"React Testing Library\" to your skills section to match the job requirement.",
    "Quantify your impact in your Senior Frontend Engineer role with metrics.",
    "Ensure your resume is in PDF format for optimal ATS parsing."
  ]);

  // If pendingJobUrl exists, we could use it to fetch or just display it
  useEffect(() => {
    if (pendingJobUrl && !jobDescription) {
      setJobDescription(`Analyzing job from: ${pendingJobUrl}\n\n[Job content would be fetched here in a real app]`);
    }
  }, [pendingJobUrl]);

  const handleScan = async () => {
    if (!jobDescription) return;
    
    setIsAnalyzing(true);
    const isGov = jobDescription.toLowerCase().includes("government") || 
                  jobDescription.toLowerCase().includes("selection criteria") ||
                  jobDescription.toLowerCase().includes("ksc");
    
    setIsGovernmentJob(isGov);
    setHasGeneratedKSC(false);
    
    try {
      // Stub analysis delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsScanned(true);
      setPendingJobUrl(null); // Clear after scan
    } catch (error) {
      console.error("Analysis failed:", error);
      setIsScanned(true);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SolidarityPageLayout>
      <div className="w-full p-10 bg-[var(--sys-color-charcoalBackground-steps-1)] border-b border-[var(--sys-color-outline-variant)]">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h1 className="text-7xl font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-2">
              {activeSubTab === 'ANALYSIS' ? 'Analysis' : 'Image Studio'}
            </h1>
            <p className="text-4xl font-bold text-[var(--sys-color-inkGold-base)] uppercase tracking-tight mb-4">
              {activeSubTab === 'ANALYSIS' ? 'BEAT THE BOTS.' : 'VISUAL AUTHORITY.'}
            </p>
            <p className="text-xl text-[var(--sys-color-worker-ash-base)] font-medium">
              {activeSubTab === 'ANALYSIS' 
                ? 'Match your resume to the job. See your score, fix the gaps.'
                : 'Generate professional headshots and personal branding assets.'}
            </p>
          </div>

          <div className="flex bg-[var(--sys-color-charcoalBackground-steps-2)] p-1 rounded-2xl border border-[var(--sys-color-outline-variant)]">
            <button 
              onClick={() => setActiveSubTab('ANALYSIS')}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeSubTab === 'ANALYSIS' ? 'bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)]' : 'text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'}`}
            >
              ATS Analysis
            </button>
            <button 
              onClick={() => setActiveSubTab('IMAGE_STUDIO')}
              className={`px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeSubTab === 'IMAGE_STUDIO' ? 'bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)]' : 'text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'}`}
            >
              Image Studio
            </button>
          </div>
        </motion.div>
      </div>

      <WorkspaceLayout>
        <AnimatePresence mode="wait">
          {activeSubTab === 'ANALYSIS' ? (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col md:flex-row w-full h-[calc(100vh-320px)] overflow-hidden"
            >
          {/* LEFT PANE: Inputs */}
          <div className="w-full md:w-[400px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-6 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none border-r border-[var(--sys-color-outline-variant)]">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Your Resume</h2>
              <select 
                value={selectedResume}
                onChange={(e) => setSelectedResume(e.target.value)}
                className="w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] rounded-xl focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors mb-4"
              >
                <option>Software Engineer Resume</option>
                <option>Full Stack Resume</option>
                <option>Current Profile Resume</option>
              </select>

              <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-xl border border-[var(--sys-color-outline-variant)]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-[var(--sys-color-solidarityRed-base)] flex items-center justify-center text-white font-bold">AJ</div>
                  <div>
                    <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)]">Alex Johnson</p>
                    <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] uppercase font-bold">Senior Frontend Engineer</p>
                  </div>
                </div>
                <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                  <span className="font-bold text-[var(--sys-color-inkGold-base)]">SKILLS:</span> React, TypeScript, Node.js, GraphQL, Tailwind CSS, AWS...
                </p>
              </div>
            </div>

            <div className="h-px bg-[var(--sys-color-outline-variant)] w-full" />

            <div className="flex-1 flex flex-col">
              <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Target Job</h2>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste job description here or load from Workspace..."
                className="flex-1 w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] rounded-xl focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors resize-none mb-6 min-h-[200px]"
              />
              
              <PrimaryButton 
                label={isAnalyzing ? "ANALYZING..." : "SCAN & SCORE →"} 
                onClick={handleScan}
                variant="strike"
                disabled={isAnalyzing || !jobDescription}
              />
            </div>
          </div>

          {/* RIGHT PANE: Results */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-y-auto rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none p-8">
            <AnimatePresence mode="wait">
              {!isScanned ? (
                <motion.div 
                  key="pre-scan"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center text-center"
                >
                  <div className="relative w-[120px] h-[120px] mb-6">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" cy="50" r="45" 
                        fill="none" 
                        stroke="var(--sys-color-outline-variant)" 
                        strokeWidth="8" 
                        strokeDasharray="10 5"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[var(--sys-color-worker-ash-base)]">
                      --
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-12">Run a scan to see your match score</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
                    <FeatureCard 
                      icon={<Target className="text-[var(--sys-color-inkGold-base)]" />}
                      title="Keyword Match"
                      desc="Identify critical missing industry terms."
                    />
                    <FeatureCard 
                      icon={<Zap className="text-[var(--sys-color-solidarityRed-base)]" />}
                      title="Skills Gap"
                      desc="Bridge the divide between you and the role."
                    />
                    <FeatureCard 
                      icon={<ShieldCheck className="text-[var(--sys-color-signalGreen-base)]" />}
                      title="ATS Check"
                      desc="Ensure your formatting is readable by bots."
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="post-scan"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-12"
                >
                  <div className="flex flex-col md:flex-row items-center gap-12 bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                    <div className="relative w-[140px] h-[140px]">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="var(--sys-color-outline-variant)" 
                          strokeWidth="8" 
                        />
                        <circle 
                          cx="50" cy="50" r="45" 
                          fill="none" 
                          stroke="var(--sys-color-signalGreen-base)" 
                          strokeWidth="8" 
                          strokeDasharray="282.7"
                          strokeDashoffset={282.7 * (1 - 0.73)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold text-[var(--sys-color-paperWhite-base)]">
                        73
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-sm font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest mb-2">Match Score</p>
                      <h2 className="text-6xl font-bold text-[var(--sys-color-paperWhite-base)] mb-6">73 <span className="text-2xl text-[var(--sys-color-worker-ash-base)]">/ 100</span></h2>
                      <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        <StatChip label="12 Keywords Found" color="green" />
                        <StatChip label="8 Missing" color="orange" />
                        <StatChip label="ATS Friendly ✓" color="green" />
                      </div>
                    </div>
                  </div>

                  {isGovernmentJob && (
                    <section className="bg-[var(--sys-color-solidarityRed-base)]/10 p-6 rounded-[28px] border border-[var(--sys-color-solidarityRed-base)]/30">
                      <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider">Key Selection Criteria (KSC) — Government Applications</h3>
                        <div className="group relative">
                          <Info size={16} className="text-[var(--sys-color-worker-ash-base)] cursor-help" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[var(--sys-color-charcoalBackground-steps-3)] text-[10px] text-[var(--sys-color-worker-ash-base)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[var(--sys-color-outline-variant)] shadow-xl z-50">
                            AU/NZ government roles require specific responses to selection criteria. This tool helps you draft STAR-method responses.
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--sys-color-worker-ash-base)] mb-6">We've detected that this is a government role. Would you like to generate draft responses for the selection criteria?</p>
                      <PrimaryButton 
                        label="GENERATE KSC RESPONSES →" 
                        onClick={() => setHasGeneratedKSC(true)} 
                        variant="strike" 
                      />
                    </section>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnalysisCard title="Hard Skills" score={85} icon={<Zap size={20} />}>
                      <div className="space-y-2">
                        <KeywordChip label="React" status="found" />
                        <KeywordChip label="TypeScript" status="missing" />
                        <KeywordChip label="Node.js" status="found" />
                        <KeywordChip label="AWS" status="found" />
                      </div>
                    </AnalysisCard>
                    
                    <AnalysisCard title="Soft Skills" score={60} icon={<ShieldCheck size={20} />}>
                      <div className="space-y-2">
                        <KeywordChip label="Leadership" status="missing" />
                        <KeywordChip label="Communication" status="found" />
                        <KeywordChip label="Agile" status="missing" />
                      </div>
                    </AnalysisCard>

                    <AnalysisCard title="Impact" score={45} icon={<Target size={20} />}>
                      <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                        Your resume lacks quantifiable metrics. AI suggests adding percentage-based improvements to your recent roles.
                      </p>
                    </AnalysisCard>

                    <AnalysisCard title="Readability" score={95} icon={<FileText size={20} />}>
                      <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                        Excellent structure. Your resume is highly readable by both humans and ATS bots.
                      </p>
                    </AnalysisCard>
                  </div>

                  <section>
                    <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider mb-6">AI Recommendations</h3>
                    <Card className="p-6 border-[var(--sys-color-inkGold-base)]/30">
                      <ul className="space-y-4">
                        {recommendations.map((rec, idx) => (
                          <li key={idx} className="flex gap-3">
                            <AlertCircle size={18} className="text-[var(--sys-color-inkGold-base)] flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-[var(--sys-color-worker-ash-base)]">
                              {rec}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </section>

                  {hasGeneratedKSC && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[var(--sys-color-inkGold-base)]/10 p-6 rounded-[28px] border border-[var(--sys-color-inkGold-base)]/30"
                    >
                      <h4 className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-2">Teach the AI your voice</h4>
                      <p className="text-xs text-[var(--sys-color-worker-ash-base)] mb-4">Your KSC responses have been generated. To make them sound more like you, set up your Voice Profile in Settings.</p>
                      <button className="text-xs font-bold text-[var(--sys-color-inkGold-base)] uppercase hover:underline">Go to Voice Profile →</button>
                    </motion.div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4 pt-8">
                    <PrimaryButton 
                      label="APPLY SUGGESTIONS →" 
                      onClick={() => {}} 
                      variant="strike" 
                    />
                    <button className="flex-1 px-8 py-4 border border-[var(--sys-color-outline-variant)] rounded-xl font-bold uppercase tracking-widest text-[var(--sys-color-paperWhite-base)] hover:bg-[var(--sys-color-charcoalBackground-steps-2)] transition-colors flex items-center justify-center gap-2">
                      <Download size={20} />
                      Export Resume
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </motion.div>
          ) : (
            <motion.div 
              key="image-studio"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 p-12 flex flex-col items-center justify-center text-center"
            >
              <div className="max-w-2xl space-y-8">
                <div className="w-32 h-32 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-[40px] border-2 border-dashed border-[var(--sys-color-outline-variant)] flex items-center justify-center mx-auto mb-8">
                  <Zap size={48} className="text-[var(--sys-color-worker-ash-base)] opacity-20" />
                </div>
                <h2 className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Image Studio Sandbox</h2>
                <p className="text-xl text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                  The Image Studio is currently in development. Soon you'll be able to generate professional headshots, LinkedIn banners, and personal branding assets using your Voice Profile as a stylistic guide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-2xl text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-inkGold-base)] mb-2">Coming Soon</h4>
                    <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-1">AI Headshot Gen</p>
                    <p className="text-[10px] text-[var(--sys-color-worker-ash-base)]">Professional studio-quality photos from casual selfies.</p>
                  </div>
                  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-2xl text-left">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-inkGold-base)] mb-2">Coming Soon</h4>
                    <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-1">Brand Kit Builder</p>
                    <p className="text-[10px] text-[var(--sys-color-worker-ash-base)]">Consistent visual identity across all your professional platforms.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}

function AnalysisCard({ title, score, icon, children }: { title: string, score: number, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <Card className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="text-[var(--sys-color-inkGold-base)]">{icon}</div>
          <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">{title}</h4>
        </div>
        <div className={`text-sm font-bold ${score > 80 ? 'text-[var(--sys-color-signalGreen-base)]' : score > 50 ? 'text-[var(--sys-color-inkGold-base)]' : 'text-[var(--sys-color-solidarityRed-base)]'}`}>
          {score}%
        </div>
      </div>
      <div className="w-full bg-[var(--sys-color-charcoalBackground-steps-3)] h-1 rounded-full mb-4 overflow-hidden">
        <div className={`h-full ${score > 80 ? 'bg-[var(--sys-color-signalGreen-base)]' : score > 50 ? 'bg-[var(--sys-color-inkGold-base)]' : 'bg-[var(--sys-color-solidarityRed-base)]'}`} style={{ width: `${score}%` }} />
      </div>
      {children}
    </Card>
  );
}


function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-2xl border border-[var(--sys-color-outline-variant)] text-left hover:border-[var(--sys-color-worker-ash-base)] transition-colors">
      <div className="mb-4">{icon}</div>
      <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-2">{title}</h4>
      <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed">{desc}</p>
    </div>
  );
}

function StatChip({ label, color }: { label: string, color: 'green' | 'orange' }) {
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
      color === 'green' 
        ? 'bg-[var(--sys-color-signalGreen-base)]/10 border-[var(--sys-color-signalGreen-base)] text-[var(--sys-color-signalGreen-base)]'
        : 'bg-[var(--sys-color-inkGold-base)]/10 border-[var(--sys-color-inkGold-base)] text-[var(--sys-color-inkGold-base)]'
    }`}>
      {label}
    </div>
  );
}

function KeywordChip({ label, status }: { label: string, status: 'found' | 'missing' }) {
  return (
    <div className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
      status === 'found'
        ? 'bg-[var(--sys-color-signalGreen-base)]/20 border-[var(--sys-color-signalGreen-base)] text-[var(--sys-color-signalGreen-base)]'
        : 'bg-transparent border-[var(--sys-color-inkGold-base)] text-[var(--sys-color-inkGold-base)] hover:bg-[var(--sys-color-inkGold-base)]/10'
    }`}>
      {label}
    </div>
  );
}

function SkillRow({ label, has }: { label: string, has: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-bold text-[var(--sys-color-paperWhite-base)]">{label}</span>
      {has ? (
        <CheckCircle2 size={18} className="text-[var(--sys-color-signalGreen-base)]" />
      ) : (
        <XCircle size={18} className="text-[var(--sys-color-solidarityRed-base)]" />
      )}
    </div>
  );
}
