import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { KanbanTracker, ApplicationDetailWorkspace } from "../components/feature/KanbanTracker";
import { Mail, Calendar, History, Target } from "lucide-react";

interface Application {
  id: string;
  company: string;
  role: string;
  date: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  atsScore: number;
  location: string;
  resumeVersion: string;
  coverLetterId: string;
}

const mockApplications: Application[] = [
  { id: "1", company: "TechCorp", role: "Senior Frontend Engineer", date: "2024-03-15", status: "interviewing", atsScore: 92, location: "Remote", resumeVersion: "v2.1-SoftwareEngineer", coverLetterId: "CL-9921" },
  { id: "2", company: "InnoSoft", role: "Product Designer", date: "2024-03-10", status: "applied", atsScore: 85, location: "San Francisco, CA", resumeVersion: "v1.8-Designer", coverLetterId: "CL-8812" },
  { id: "3", company: "GlobalData", role: "Full Stack Developer", date: "2024-02-28", status: "rejected", atsScore: 78, location: "London, UK", resumeVersion: "v1.5-FullStack", coverLetterId: "CL-7731" },
  { id: "4", company: "FutureAI", role: "Machine Learning Engineer", date: "2024-02-15", status: "offered", atsScore: 95, location: "Austin, TX", resumeVersion: "v3.0-MLE", coverLetterId: "CL-9955" },
];

export function PastApplicationsReference() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedApp = mockApplications.find(app => app.id === selectedId);

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col w-full h-full overflow-hidden">
          {/* TOP SECTION: Kanban Board */}
          <div className="h-[400px] flex-shrink-0 p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] overflow-hidden rounded-t-[28px] border-b border-[var(--sys-color-outline-variant)]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight type-solidarityProtest">Applications Pipeline</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[10px] font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] rounded-xl hover:text-[var(--sys-color-paperWhite-base)] transition-colors">Filter</button>
                <button className="px-4 py-2 bg-[var(--sys-color-solidarityRed-base)] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl">Add New</button>
              </div>
            </div>
            <KanbanTracker onSelectApp={setSelectedId} selectedId={selectedId} />
          </div>

          {/* BOTTOM SECTION: Detail Workspace */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-hidden rounded-b-[28px]">
            <AnimatePresence mode="wait">
              {selectedApp ? (
                <motion.div
                  key={selectedApp.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex-1 overflow-y-auto p-8"
                >
                  <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
                    <div className="flex-1">
                      <ApplicationDetailWorkspace app={selectedApp} />
                    </div>
                    
                    {/* Workspace Sidebar */}
                    <div className="w-full lg:w-[320px] space-y-6">
                      <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-[28px]">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sys-color-worker-ash-base)] mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                          <WorkspaceAction icon={<Mail size={16} />} label="Send Follow-up" />
                          <WorkspaceAction icon={<Calendar size={16} />} label="Log Interview" />
                          <WorkspaceAction icon={<History size={16} />} label="View History" />
                        </div>
                      </div>
                      
                      <div className="p-6 bg-[var(--sys-color-inkGold-base)]/5 border border-[var(--sys-color-inkGold-base)]/20 rounded-[28px]">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--sys-color-inkGold-base)] mb-4">AI Insight</h3>
                        <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed italic">
                          "This company values 'Scalability' highly. Ensure your interview responses highlight your experience with high-traffic systems."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md">
                    <div className="w-24 h-24 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-full flex items-center justify-center mx-auto mb-6 border border-[var(--sys-color-outline-variant)]">
                      <Target size={48} className="text-[var(--sys-color-worker-ash-base)] opacity-20" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-2">Select an Application</h2>
                    <p className="text-[var(--sys-color-worker-ash-base)]">Click on a card in the pipeline above to open the detail workspace.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}

function WorkspaceAction({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center gap-3 p-3 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-xl text-xs font-bold text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] hover:border-[var(--sys-color-worker-ash-base)] transition-all uppercase tracking-widest">
      {icon}
      {label}
    </button>
  );
}
