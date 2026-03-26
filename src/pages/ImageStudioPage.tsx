/**
 * CLASSIFICATION: Support-Reference Page
 * ATS Resume Optimiser Page
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { M3Button } from "../components/ui/M3Button";
import { M3Type } from "../theme/typography";
import { 
  Search, 
  Target, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  FileText, 
  Loader2, 
  Info,
  TrendingUp,
  AlertTriangle,
  Check,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { useUserStore } from "../hooks/useUserStore";
import { Placard, StatusBadge, Valve, ScaffoldInput } from "../components/ui/Primitives";
import { cn } from "../lib/utils";

import { User } from 'firebase/auth';

interface Props {
  user?: User | null;
}

export function OptimisePage({ user }: Props) {
  const { pendingJobUrl, setPendingJobUrl, setIsGovernmentJob } = useUserStore();
  const [activeSubTab, setActiveSubTab] = useState<'ANALYSIS' | 'IMAGE_STUDIO'>('ANALYSIS');
  const [isScanned, setIsScanned] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [selectedResume, setSelectedResume] = useState("Software Engineer Resume");

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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsScanned(true);
      setPendingJobUrl(null);
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
            <h1 className="text-7xl font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] leading-none mb-2">
              {activeSubTab === 'ANALYSIS' ? 'Analysis' : 'Image studio'}
            </h1>
            <p className="text-4xl font-bold text-[var(--sys-color-inkGold-base)] tracking-tight mb-4">
              {activeSubTab === 'ANALYSIS' ? 'Beat the bots.' : 'Visual authority.'}
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
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                activeSubTab === 'ANALYSIS' ? "bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)]" : "text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]"
              )}
            >
              ATS analysis
            </button>
            <button 
              onClick={() => setActiveSubTab('IMAGE_STUDIO')}
              className={cn(
                "px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all",
                activeSubTab === 'IMAGE_STUDIO' ? "bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)]" : "text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]"
              )}
            >
              Image studio
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
                  <h2 className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-wider mb-4">Your resume</h2>
                  <select 
                    value={selectedResume}
                    onChange={(e) => setSelectedResume(e.target.value)}
                    className="w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] rounded-xl focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors mb-4 text-sm font-bold"
                  >
                    <option>Software engineer resume</option>
                    <option>Full stack resume</option>
                    <option>Current profile resume</option>
                  </select>

                  <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-xl border border-[var(--sys-color-outline-variant)]">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-[var(--sys-color-solidarityRed-base)] flex items-center justify-center text-white font-bold">AJ</div>
                      <div>
                        <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)]">Alex Johnson</p>
                        <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] font-bold">Senior frontend engineer</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-px bg-[var(--sys-color-outline-variant)] w-full" />

                <div className="flex-1 flex flex-col">
                  <h2 className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-wider mb-4">Target job</h2>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste job description here or load from Workspace..."
                    className="flex-1 w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] rounded-xl focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors resize-none mb-6 min-h-[200px] text-sm font-medium leading-relaxed"
                  />
                  
                  <M3Button 
                    variant="filled"
                    onClick={handleScan}
                    disabled={isAnalyzing || !jobDescription}
                    className="h-14"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Analyzing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>Scan & score</span>
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </M3Button>
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
                      className="flex-1 flex flex-col items-center justify-center text-center max-w-2xl mx-auto"
                    >
                      <div className="w-24 h-24 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-[32px] border-2 border-dashed border-[var(--sys-color-outline-variant)] flex items-center justify-center mb-8">
                        <Search size={40} className="text-[var(--sys-color-worker-ash-base)] opacity-20" />
                      </div>
                      <h3 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] mb-4 tracking-tight">Run a scan to see your match score</h3>
                      <p className="text-sm text-[var(--sys-color-worker-ash-base)] mb-12 max-w-md mx-auto">
                        Our asymmetric pre-processor will analyze your resume against the job requirements to identify critical gaps.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                        <FeatureCard 
                          icon={<Target className="text-[var(--sys-color-inkGold-base)]" />}
                          title="Keyword match"
                          desc="Identify critical missing industry terms."
                        />
                        <FeatureCard 
                          icon={<Zap className="text-[var(--sys-color-solidarityRed-base)]" />}
                          title="Skills gap"
                          desc="Bridge the divide between you and the role."
                        />
                        <FeatureCard 
                          icon={<ShieldCheck className="text-[var(--sys-color-signalGreen-base)]" />}
                          title="ATS check"
                          desc="Ensure your formatting is readable by bots."
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="post-scan"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-12 max-w-5xl mx-auto w-full"
                    >
                      <Placard className="p-8 flex flex-col md:flex-row items-center gap-12">
                        <div className="relative w-[160px] h-[160px]">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="var(--sys-color-outline-variant)" 
                              strokeWidth="6" 
                            />
                            <circle 
                              cx="50" cy="50" r="45" 
                              fill="none" 
                              stroke="var(--sys-color-signalGreen-base)" 
                              strokeWidth="6" 
                              strokeDasharray="282.7"
                              strokeDashoffset={282.7 * (1 - 0.73)}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-[var(--sys-color-paperWhite-base)]">73</span>
                            <span className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">Match</span>
                          </div>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <StatusBadge variant="success">Good Match</StatusBadge>
                            <StatusBadge variant="default">ATS Friendly</StatusBadge>
                          </div>
                          <h2 className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)] mb-4">You're close, Alex.</h2>
                          <p className="text-sm text-[var(--sys-color-worker-ash-base)] leading-relaxed max-w-md">
                            Your profile matches 73% of the core requirements. Adding 3 specific keywords and quantifying your impact could push you over 90%.
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 w-full md:w-auto">
                          <M3Button variant="filled">Apply Fixes</M3Button>
                          <M3Button variant="outlined">Download PDF</M3Button>
                        </div>
                      </Placard>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="space-y-4">
                          <h3 className="text-sm font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-wider">Gap Analysis</h3>
                          <div className="space-y-3">
                            <GapItem 
                              title="Missing Hard Skill: React Testing Library" 
                              desc="The job description explicitly mentions RTL for unit testing."
                              severity="high"
                            />
                            <GapItem 
                              title="Quantifiable Metrics" 
                              desc="Your Senior Frontend role lacks percentage-based impact metrics."
                              severity="medium"
                            />
                            <GapItem 
                              title="Missing Keyword: GraphQL" 
                              desc="GraphQL is listed as a preferred skill."
                              severity="low"
                            />
                          </div>
                        </section>

                        <section className="space-y-4">
                          <h3 className="text-sm font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-wider">Keyword Cloud</h3>
                          <Placard className="p-6">
                            <div className="flex flex-wrap gap-2">
                              <KeywordTag label="React" status="found" />
                              <KeywordTag label="TypeScript" status="found" />
                              <KeywordTag label="Node.js" status="found" />
                              <KeywordTag label="AWS" status="found" />
                              <KeywordTag label="Tailwind" status="found" />
                              <KeywordTag label="GraphQL" status="missing" />
                              <KeywordTag label="Agile" status="missing" />
                              <KeywordTag label="Leadership" status="missing" />
                              <KeywordTag label="Testing" status="missing" />
                              <KeywordTag label="CI/CD" status="found" />
                              <KeywordTag label="Docker" status="found" />
                            </div>
                          </Placard>
                        </section>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <AnalysisMetric title="Hard Skills" score={85} icon={<Zap size={18} />} />
                        <AnalysisMetric title="Soft Skills" score={60} icon={<ShieldCheck size={18} />} />
                        <AnalysisMetric title="Readability" score={95} icon={<FileText size={18} />} />
                      </div>

                      <section className="space-y-4">
                        <h3 className="text-sm font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-wider">Detailed Recommendations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <RecommendationCard 
                            icon={<AlertCircle className="text-[var(--sys-color-inkGold-base)]" />}
                            text="Add 'React Testing Library' to your skills section to match the job requirement."
                          />
                          <RecommendationCard 
                            icon={<TrendingUp className="text-[var(--sys-color-signalGreen-base)]" />}
                            text="Quantify your impact in your Senior Frontend Engineer role with metrics (e.g., 'Improved performance by 30%')."
                          />
                          <RecommendationCard 
                            icon={<FileText className="text-[var(--sys-color-worker-ash-base)]" />}
                            text="Ensure your resume is in PDF format for optimal ATS parsing."
                          />
                          <RecommendationCard 
                            icon={<Sparkles className="text-[var(--sys-color-stencilYellow-base)]" />}
                            text="Use your calibrated Voice Profile to rewrite your summary for a more 'Reflective' tone."
                          />
                        </div>
                      </section>
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
                <h2 className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)] tracking-tight">Image studio sandbox</h2>
                <p className="text-xl text-[var(--sys-color-worker-ash-base)] leading-relaxed">
                  The Image Studio is currently in development. Soon you'll be able to generate professional headshots, LinkedIn banners, and personal branding assets using your Voice Profile as a stylistic guide.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
                  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-2xl text-left">
                    <h4 className="text-[10px] font-bold text-[var(--sys-color-inkGold-base)] mb-2 uppercase tracking-wider">Coming soon</h4>
                    <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] mb-1">AI headshot gen</p>
                    <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] font-medium">Professional studio-quality photos from casual selfies.</p>
                  </div>
                  <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-2xl text-left">
                    <h4 className="text-[10px] font-bold text-[var(--sys-color-inkGold-base)] mb-2 uppercase tracking-wider">Coming soon</h4>
                    <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] mb-1">Brand kit builder</p>
                    <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] font-medium">Consistent visual identity across all your professional platforms.</p>
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

function GapItem({ title, desc, severity }: { title: string, desc: string, severity: 'high' | 'medium' | 'low' }) {
  const severityColors = {
    high: 'text-[var(--sys-color-solidarityRed-base)]',
    medium: 'text-[var(--sys-color-inkGold-base)]',
    low: 'text-[var(--sys-color-stencilYellow-base)]',
  };

  return (
    <Valve className="p-4 flex items-start gap-4">
      <div className={cn("mt-1", severityColors[severity])}>
        <AlertTriangle size={18} />
      </div>
      <div>
        <h4 className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] mb-1">{title}</h4>
        <p className="text-xs text-[var(--sys-color-worker-ash-base)] font-medium leading-relaxed">{desc}</p>
      </div>
    </Valve>
  );
}

function KeywordTag({ label, status }: { label: string, status: 'found' | 'missing' }) {
  return (
    <div className={cn(
      "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all",
      status === 'found' 
        ? "bg-[var(--sys-color-signalGreen-base)]/10 border-[var(--sys-color-signalGreen-base)]/30 text-[var(--sys-color-signalGreen-base)]"
        : "bg-[var(--sys-color-charcoalBackground-steps-3)] border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] opacity-50"
    )}>
      {label}
    </div>
  );
}

function AnalysisMetric({ title, score, icon }: { title: string, score: number, icon: React.ReactNode }) {
  return (
    <Placard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-[var(--sys-color-worker-ash-base)]">
          {icon}
          <span className="text-[10px] font-bold uppercase tracking-wider">{title}</span>
        </div>
        <span className="text-sm font-bold text-[var(--sys-color-paperWhite-base)]">{score}%</span>
      </div>
      <div className="w-full bg-[var(--sys-color-charcoalBackground-steps-3)] h-1.5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[var(--sys-color-inkGold-base)]" 
          style={{ width: `${score}%` }} 
        />
      </div>
    </Placard>
  );
}

function RecommendationCard({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-xl flex gap-4 items-start">
      <div className="mt-0.5">{icon}</div>
      <p className="text-xs text-[var(--sys-color-worker-ash-base)] font-medium leading-relaxed">{text}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-2xl border border-[var(--sys-color-outline-variant)] text-left hover:border-[var(--sys-color-worker-ash-base)] transition-colors">
      <div className="mb-4">{icon}</div>
      <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] mb-2">{title}</h4>
      <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed">{desc}</p>
    </div>
  );
}
