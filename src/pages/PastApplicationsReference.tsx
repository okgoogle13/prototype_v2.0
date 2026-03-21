import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { Badge } from "../components/ui/Badge";

interface Application {
  id: string;
  company: string;
  role: string;
  date: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  atsScore: number;
  location: string;
}

const mockApplications: Application[] = [
  { id: "1", company: "TechCorp", role: "Senior Frontend Engineer", date: "2024-03-15", status: "interviewing", atsScore: 92, location: "Remote" },
  { id: "2", company: "InnoSoft", role: "Product Designer", date: "2024-03-10", status: "applied", atsScore: 85, location: "San Francisco, CA" },
  { id: "3", company: "GlobalData", role: "Full Stack Developer", date: "2024-02-28", status: "rejected", atsScore: 78, location: "London, UK" },
  { id: "4", company: "FutureAI", role: "Machine Learning Engineer", date: "2024-02-15", status: "offered", atsScore: 95, location: "Austin, TX" },
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
            <div className="flex flex-col gap-3">
              {mockApplications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedId(app.id)}
                  className={`p-4 rounded-2xl text-left transition-all border ${
                    selectedId === app.id
                      ? "bg-[var(--sys-color-charcoalBackground-steps-3)] border-[var(--sys-color-outline-variant)] shadow-lg"
                      : "bg-transparent border-transparent hover:bg-[var(--sys-color-charcoalBackground-steps-3)]/30"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-bold uppercase tracking-tight ${selectedId === app.id ? "text-[var(--sys-color-paperWhite-base)]" : "text-[var(--sys-color-worker-ash-base)]"}`}>
                      {app.company}
                    </h3>
                    <span className="text-[10px] text-[var(--sys-color-worker-ash-base)] font-bold">{app.date}</span>
                  </div>
                  <p className="text-sm text-[var(--sys-color-worker-ash-base)] mb-3">{app.role}</p>
                  <Badge 
                    label={app.status} 
                    variant={app.status === "offered" ? "success" : app.status === "rejected" ? "danger" : "warning"} 
                  />
                </button>
              ))}
            </div>
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
                  <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                      <div>
                        <h1 className="text-4xl md:text-5xl font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter mb-2">
                          {selectedApp.role}
                        </h1>
                        <p className="text-xl text-[var(--sys-color-inkGold-base)] font-bold uppercase tracking-widest">
                          {selectedApp.company} • {selectedApp.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)]">
                          {selectedApp.atsScore}<span className="text-lg text-[var(--sys-color-worker-ash-base)]">/100</span>
                        </div>
                        <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest font-bold">ATS Match Score</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-6 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Application Status</h3>
                        <div className="flex items-center gap-4">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedApp.status === "offered" ? "bg-[var(--sys-color-signalGreen-base)]" :
                            selectedApp.status === "rejected" ? "bg-[var(--sys-color-solidarityRed-base)]" :
                            "bg-[var(--sys-color-inkGold-base)]"
                          }`} />
                          <span className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase">{selectedApp.status}</span>
                        </div>
                      </div>
                      <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-6 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Submitted On</h3>
                        <p className="text-xl font-bold text-[var(--sys-color-paperWhite-base)]">{selectedApp.date}</p>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <section>
                        <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider mb-4 border-l-4 border-[var(--sys-color-solidarityRed-base)] pl-4">Generated Assets</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-xl flex items-center justify-between hover:bg-[var(--sys-color-charcoalBackground-steps-3)] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-worker-ash-base)]">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                <polyline points="14 2 14 8 20 8"></polyline>
                                <line x1="16" y1="13" x2="8" y2="13"></line>
                                <line x1="16" y1="17" x2="8" y2="17"></line>
                                <polyline points="10 9 9 9 8 9"></polyline>
                              </svg>
                              <span className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase">Tailored Resume</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-worker-ash-base)] group-hover:translate-x-1 transition-transform">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                          <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-xl flex items-center justify-between hover:bg-[var(--sys-color-charcoalBackground-steps-3)] transition-colors cursor-pointer group">
                            <div className="flex items-center gap-3">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-worker-ash-base)]">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                              </svg>
                              <span className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase">Cover Letter</span>
                            </div>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-worker-ash-base)] group-hover:translate-x-1 transition-transform">
                              <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
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
