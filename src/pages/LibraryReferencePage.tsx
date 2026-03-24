import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { Card } from "../components/ui/Card";
import { 
  FileText, 
  Mail, 
  CheckSquare, 
  MessageSquare, 
  Users, 
  ChevronRight, 
  Sparkles, 
  CheckCircle2, 
  Info, 
  RefreshCw,
  ArrowRight,
  UserCircle,
  Target,
  Zap,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useUserStore } from "../hooks/useUserStore";

export function LibraryReferencePage() {
  const [activeTab, setActiveTab] = useState("resume");
  const [step, setStep] = useState(1);
  const [letterStyle, setLetterStyle] = useState("Professional");
  const { setHasGeneratedDocument } = useUserStore();

  const tabs = [
    { id: "resume", label: "Resume Builder", icon: <FileText size={18} /> },
    { id: "cover", label: "Cover Letter", icon: <Mail size={18} /> },
    { id: "ksc", label: "KSC Responses", icon: <CheckSquare size={18} /> },
    { id: "interview", label: "Interview Prep", icon: <MessageSquare size={18} /> },
    { id: "network", label: "Networking", icon: <Users size={18} /> },
  ];

  const styles = ["Professional", "Creative", "Concise", "Impact-Driven"];

  const handleGenerate = () => {
    setStep(3);
    setHasGeneratedDocument(true);
  };

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
          {/* LEFT PANE: Navigation */}
          <div className="w-full md:w-[260px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-8 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none border-r border-[var(--sys-color-outline-variant)]">
            <h2 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight type-solidarityProtest">Documents</h2>
            
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setStep(1);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-paperWhite-base)] font-bold border border-[var(--sys-color-outline-variant)]"
                      : "text-[var(--sys-color-worker-ash-base)] hover:bg-[var(--sys-color-charcoalBackground-steps-3)]/50"
                  }`}
                >
                  {tab.icon}
                  <span className="uppercase tracking-wider text-[10px] font-bold">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--sys-color-outline-variant)]">
              <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-2xl border border-[var(--sys-color-inkGold-base)]/20">
                <p className="text-[10px] text-[var(--sys-color-inkGold-base)] font-bold uppercase tracking-widest mb-2">Asymmetric Power</p>
                <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] leading-relaxed uppercase">Tailor every document to the job description for a 400% higher interview rate.</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: Content */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-hidden rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none">
            {/* STEPPER HEADER */}
            <div className="px-8 py-4 bg-[var(--sys-color-charcoalBackground-steps-2)] border-b border-[var(--sys-color-outline-variant)] flex items-center justify-between">
              <div className="flex items-center gap-8">
                <StepIndicator current={step} step={1} label="Tailor" />
                <ChevronRight size={16} className="text-[var(--sys-color-outline-variant)]" />
                <StepIndicator current={step} step={2} label="Generate" />
                <ChevronRight size={16} className="text-[var(--sys-color-outline-variant)]" />
                <StepIndicator current={step} step={3} label="Review" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">Status:</span>
                <span className="text-[10px] font-bold text-[var(--sys-color-signalGreen-base)] uppercase tracking-widest">Ready to Tailor</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeTab}-${step}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="max-w-5xl mx-auto"
                >
                  {activeTab === "resume" && (
                    <ResumeStepContent step={step} onNext={() => setStep(2)} onGenerate={handleGenerate} />
                  )}
                  {activeTab === "cover" && (
                    <CoverLetterStepContent 
                      step={step} 
                      onNext={() => setStep(2)} 
                      onGenerate={handleGenerate}
                      letterStyle={letterStyle}
                      setLetterStyle={setLetterStyle}
                      styles={styles}
                    />
                  )}
                  {activeTab === "ksc" && (
                    <KSCStepContent step={step} onNext={() => setStep(2)} onGenerate={handleGenerate} />
                  )}
                  {["interview", "network"].includes(activeTab) && (
                    <div className="py-20 text-center">
                      <Sparkles size={48} className="mx-auto text-[var(--sys-color-inkGold-base)] mb-4 opacity-20" />
                      <h2 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Coming Soon</h2>
                      <p className="text-[var(--sys-color-worker-ash-base)]">This feature is currently being optimized for maximum impact.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}

function StepIndicator({ current, step, label }: { current: number, step: number, label: string }) {
  const isActive = current === step;
  const isCompleted = current > step;

  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
        isActive 
          ? "bg-[var(--sys-color-solidarityRed-base)] border-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-paperWhite-base)]" 
          : isCompleted
          ? "bg-[var(--sys-color-signalGreen-base)] border-[var(--sys-color-signalGreen-base)] text-[var(--sys-color-paperWhite-base)]"
          : "bg-transparent border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)]"
      }`}>
        {isCompleted ? <CheckCircle2 size={12} /> : step}
      </div>
      <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? "text-[var(--sys-color-paperWhite-base)]" : "text-[var(--sys-color-worker-ash-base)]"}`}>
        {label}
      </span>
    </div>
  );
}

function ResumeStepContent({ step, onNext, onGenerate }: any) {
  if (step === 1) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Tailor Your Bullets</h2>
          <button onClick={onNext} className="px-6 py-2 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-colors">Next Step</button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <BulletItem 
            original="Led a team of 5 developers to build a new e-commerce platform."
            suggestion="Spearheaded a cross-functional team of 5 to architect a scalable e-commerce solution, improving checkout conversion by 15%."
          />
          <BulletItem 
            original="Optimized database queries for better performance."
            suggestion="Engineered advanced SQL optimizations reducing query latency by 40% and cutting server costs by $2k/month."
          />
          <BulletItem 
            original="Collaborated with designers to implement UI components."
            suggestion="Partnered with UX/UI designers to develop a reusable component library in React, accelerating frontend delivery by 30%."
          />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Generate Final Draft</h2>
        <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-3 py-1 bg-[var(--sys-color-signalGreen-base)]/10 border border-[var(--sys-color-signalGreen-base)]/30 rounded-full">
              <span className="text-[8px] font-bold text-[var(--sys-color-signalGreen-base)] uppercase tracking-widest">ATS Optimized</span>
            </div>
            <div className="px-3 py-1 bg-[var(--sys-color-inkGold-base)]/10 border border-[var(--sys-color-inkGold-base)]/30 rounded-full">
              <span className="text-[8px] font-bold text-[var(--sys-color-inkGold-base)] uppercase tracking-widest">High Impact</span>
            </div>
          </div>
          <div className="space-y-4 opacity-50">
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-3/4" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-5/6" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
          </div>
          <div className="mt-12 flex justify-center">
            <button onClick={onGenerate} className="px-12 py-4 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-all transform hover:scale-105 shadow-xl flex items-center gap-3">
              <Sparkles size={18} />
              Generate Final Resume
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return <FinalReviewContent />;
}

function BulletItem({ original, suggestion }: { original: string, suggestion: string }) {
  const [isApplied, setIsApplied] = useState(false);

  return (
    <Card className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] group">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <p className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest mb-2">Original</p>
          <p className="text-sm text-[var(--sys-color-worker-ash-base)] italic">{original}</p>
        </div>
        <div className="hidden md:block w-px bg-[var(--sys-color-outline-variant)] opacity-30" />
        <div className="flex-1 relative">
          <div className="absolute -top-2 -right-2">
            <div className="px-2 py-0.5 bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)] text-[8px] font-bold uppercase rounded-full flex items-center gap-1">
              <Sparkles size={8} /> AI Suggestion
            </div>
          </div>
          <p className="text-[10px] font-bold text-[var(--sys-color-inkGold-base)] uppercase tracking-widest mb-2">Optimized for Impact</p>
          <p className="text-sm text-[var(--sys-color-paperWhite-base)] font-medium">{suggestion}</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-[var(--sys-color-outline-variant)]/30 flex justify-end">
        <button 
          onClick={() => setIsApplied(!isApplied)}
          className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
            isApplied 
              ? "bg-[var(--sys-color-signalGreen-base)] text-white" 
              : "border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]"
          }`}
        >
          {isApplied ? "Applied ✓" : "Apply Suggestion"}
        </button>
      </div>
    </Card>
  );
}

function CoverLetterStepContent({ step, onNext, onGenerate, letterStyle, setLetterStyle, styles }: any) {
  if (step === 1) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Configure Style</h2>
          <button onClick={onNext} className="px-6 py-2 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-colors">Next Step</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {styles.map((s: string) => (
            <button 
              key={s}
              onClick={() => setLetterStyle(s)}
              className={`p-6 rounded-2xl border transition-all text-left group ${
                letterStyle === s 
                  ? "bg-[var(--sys-color-inkGold-base)]/10 border-[var(--sys-color-inkGold-base)]" 
                  : "bg-[var(--sys-color-charcoalBackground-steps-2)] border-[var(--sys-color-outline-variant)] hover:border-[var(--sys-color-worker-ash-base)]"
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                letterStyle === s ? "bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)]" : "bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-worker-ash-base)] group-hover:text-[var(--sys-color-paperWhite-base)]"
              }`}>
                <RefreshCw size={20} />
              </div>
              <h4 className={`text-sm font-bold uppercase tracking-tight ${letterStyle === s ? "text-[var(--sys-color-paperWhite-base)]" : "text-[var(--sys-color-worker-ash-base)]"}`}>{s}</h4>
              <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] mt-2">Optimized for {s.toLowerCase()} tone and structure.</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Generate Letter</h2>
        <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-3 py-1 bg-[var(--sys-color-inkGold-base)]/10 border border-[var(--sys-color-inkGold-base)]/30 rounded-full">
              <span className="text-[8px] font-bold text-[var(--sys-color-inkGold-base)] uppercase tracking-widest">{letterStyle} Style</span>
            </div>
            <div className="px-3 py-1 bg-[var(--sys-color-solidarityRed-base)]/10 border border-[var(--sys-color-solidarityRed-base)]/30 rounded-full">
              <span className="text-[8px] font-bold text-[var(--sys-color-solidarityRed-base)] uppercase tracking-widest">Tailored to Job</span>
            </div>
          </div>
          <div className="space-y-4 opacity-50">
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-1/4" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-3/4" />
          </div>
          <div className="mt-12 flex justify-center">
            <button onClick={onGenerate} className="px-12 py-4 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-all transform hover:scale-105 shadow-xl flex items-center gap-3">
              <Sparkles size={18} />
              Generate Cover Letter
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return <FinalReviewContent />;
}

function KSCStepContent({ step, onNext, onGenerate }: any) {
  if (step === 1) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Draft KSC Responses</h2>
          <button onClick={onNext} className="px-6 py-2 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-colors">Next Step</button>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <KSCItem 
            title="Demonstrated ability to lead technical teams."
            desc="Provide an example of when you led a team to achieve a specific outcome."
          />
          <KSCItem 
            title="Experience in cloud-native architecture."
            desc="Explain your experience with AWS, Azure, or GCP in a production environment."
          />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-8">
        <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Finalize KSC</h2>
        <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
          <div className="flex items-center gap-4 mb-8">
            <div className="px-3 py-1 bg-[var(--sys-color-signalGreen-base)]/10 border border-[var(--sys-color-signalGreen-base)]/30 rounded-full">
              <span className="text-[8px] font-bold text-[var(--sys-color-signalGreen-base)] uppercase tracking-widest">STAR Method Applied</span>
            </div>
          </div>
          <div className="space-y-4 opacity-50">
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
            <div className="h-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded w-full" />
          </div>
          <div className="mt-12 flex justify-center">
            <button onClick={onGenerate} className="px-12 py-4 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-all transform hover:scale-105 shadow-xl flex items-center gap-3">
              <Sparkles size={18} />
              Generate KSC Responses
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return <FinalReviewContent />;
}

function KSCItem({ title, desc }: { title: string, desc: string }) {
  return (
    <Card className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">{title}</h4>
        <div className="group relative">
          <div className="p-1.5 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-lg text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-inkGold-base)] cursor-help transition-colors">
            <Info size={14} />
          </div>
          <div className="absolute bottom-full right-0 mb-2 w-64 p-4 bg-[var(--sys-color-charcoalBackground-steps-4)] border border-[var(--sys-color-outline-variant)] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl z-50">
            <p className="text-[10px] font-bold text-[var(--sys-color-inkGold-base)] uppercase tracking-widest mb-2">STAR Method Guidance</p>
            <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] leading-relaxed">
              <span className="text-[var(--sys-color-paperWhite-base)] font-bold">S:</span> Situation<br/>
              <span className="text-[var(--sys-color-paperWhite-base)] font-bold">T:</span> Task<br/>
              <span className="text-[var(--sys-color-paperWhite-base)] font-bold">A:</span> Action<br/>
              <span className="text-[var(--sys-color-paperWhite-base)] font-bold">R:</span> Result
            </p>
          </div>
        </div>
      </div>
      <p className="text-xs text-[var(--sys-color-worker-ash-base)] mb-4">{desc}</p>
      <textarea 
        placeholder="Draft your response here..."
        className="w-full h-24 p-3 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-xl text-xs text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors resize-none"
      />
    </Card>
  );
}

function FinalReviewContent() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Review & Finalize</h2>
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] font-bold uppercase tracking-widest text-[10px] rounded-xl hover:text-[var(--sys-color-paperWhite-base)] transition-colors">Download PDF</button>
          <button className="px-6 py-2 bg-[var(--sys-color-solidarityRed-base)] text-white font-bold uppercase tracking-widest text-[10px] rounded-xl hover:bg-[var(--sys-color-solidarityRed-steps-3)] transition-colors">Save to Tracker</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Target size={14} className="text-[var(--sys-color-inkGold-base)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)]">Tone Match</span>
          </div>
          <div className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)]">98%</div>
          <div className="text-[8px] font-bold text-[var(--sys-color-signalGreen-base)] uppercase mt-1">Highly Authentic</div>
        </div>
        <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <FileText size={14} className="text-[var(--sys-color-inkGold-base)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)]">Keyword Density</span>
          </div>
          <div className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)]">4.2%</div>
          <div className="text-[8px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase mt-1">Optimal Range</div>
        </div>
        <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Mail size={14} className="text-[var(--sys-color-inkGold-base)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)]">Impact Score</span>
          </div>
          <div className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)]">89/100</div>
          <div className="text-[8px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase mt-1">Strong Narrative</div>
        </div>
      </div>

      <Card className="p-12 bg-white text-black min-h-[600px] shadow-2xl">
        <div className="max-w-2xl mx-auto space-y-6 font-serif">
          <div className="text-center border-b-2 border-black pb-6 mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-tighter">Alex Johnson</h1>
            <p className="text-sm">Senior Frontend Engineer | alex.j@example.com | +61 400 000 000</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase border-b border-black">Professional Summary</h2>
            <p className="text-sm leading-relaxed">Highly skilled Senior Frontend Engineer with 8+ years of experience in architecting scalable web applications using React, TypeScript, and Node.js. Proven track record of leading cross-functional teams to deliver high-impact solutions that drive user engagement and business growth.</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold uppercase border-b border-black">Key Achievements</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Spearheaded a cross-functional team of 5 to architect a scalable e-commerce solution, improving checkout conversion by 15%.</li>
              <li>Engineered advanced SQL optimizations reducing query latency by 40% and cutting server costs by $2k/month.</li>
              <li>Partnered with UX/UI designers to develop a reusable component library in React, accelerating frontend delivery by 30%.</li>
            </ul>
          </div>
        </div>
      </Card>
      
      <div className="bg-[var(--sys-color-inkGold-base)]/10 p-8 rounded-[32px] border border-[var(--sys-color-inkGold-base)]/30 flex flex-col md:flex-row items-center gap-6">
        <div className="w-16 h-16 bg-[var(--sys-color-inkGold-base)] rounded-full flex items-center justify-center text-[var(--sys-color-charcoalBackground-base)] shrink-0">
          <UserCircle size={32} />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Bridge to Profile Voice</h3>
          <p className="text-xs text-[var(--sys-color-worker-ash-base)] mt-1">Want these documents to sound even more like you? Update your Voice Profile in your account settings.</p>
        </div>
        <button className="px-8 py-3 bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)] font-bold uppercase tracking-widest text-[10px] rounded-2xl hover:bg-[var(--sys-color-inkGold-steps-2)] transition-colors flex items-center gap-2">
          Update Voice Profile <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

