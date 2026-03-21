import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { KanbanTracker, ApplicationDetailWorkspace } from "../components/feature/KanbanTracker";

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
  const [selectedId, setSelectedId] = useState<string | null>(mockApplications[0].id);

  const selectedApp = mockApplications.find(app => app.id === selectedId);

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
          {/* LEFT PANE: Application List */}
          <div className="w-full md:w-[360px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-6 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none">
            <h2 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">History</h2>
            <KanbanTracker onSelectApp={setSelectedId} selectedId={selectedId} />
          </div>

          {/* RIGHT PANE: Detail View */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-hidden rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none">
            <AnimatePresence mode="wait">
              {selectedApp ? (
                <motion.div
                  key={selectedApp.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 overflow-y-auto p-8"
                >
                  <ApplicationDetailWorkspace app={selectedApp} />
                </motion.div>
              ) : (
                <div className="flex-1 flex items-center justify-center p-8 text-center">
                  <div className="max-w-md">
                    <div className="w-24 h-24 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-worker-ash-base)]">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-2">No Application Selected</h2>
                    <p className="text-[var(--sys-color-worker-ash-base)]">Select an application from the history list to view details and assets.</p>
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
