import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { Card } from "../components/ui/Card";

export function LibraryReferencePage() {
  const [activeTab, setActiveTab] = useState("resume");

  const tabs = [
    { id: "resume", label: "Resume Builder", icon: "FileText" },
    { id: "cover", label: "Cover Letter", icon: "Mail" },
    { id: "ksc", label: "KSC Responses", icon: "CheckSquare" },
    { id: "interview", label: "Interview Prep", icon: "MessageSquare" },
    { id: "network", label: "Networking", icon: "Users" },
  ];

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
          {/* LEFT PANE: Navigation */}
          <div className="w-full md:w-[260px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-8 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none">
            <h2 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Library</h2>
            
            <nav className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all ${
                    activeTab === tab.id
                      ? "bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-paperWhite-base)] font-bold"
                      : "text-[var(--sys-color-worker-ash-base)] hover:bg-[var(--sys-color-charcoalBackground-steps-3)]/50"
                  }`}
                >
                  <span className="uppercase tracking-wider text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--sys-color-outline-variant)]">
              <div className="p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-2xl border border-[var(--sys-color-inkGold-base)]/20">
                <p className="text-[10px] text-[var(--sys-color-inkGold-base)] font-bold uppercase tracking-widest mb-2">Pro Tip</p>
                <p className="text-xs text-[var(--sys-color-worker-ash-base)] leading-relaxed">AI-powered career tools help you stand out in the competitive job market.</p>
              </div>
            </div>
          </div>

          {/* RIGHT PANE: Content */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-hidden rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none">
            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-4xl mx-auto"
                >
                  <h1 className="text-4xl font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter mb-8">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h1>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="p-8">
                      <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-4">Template Gallery</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-6">Choose from our curated collection of professional templates designed for maximum impact.</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="aspect-[3/4] bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-lg border border-[var(--sys-color-outline-variant)] hover:border-[var(--sys-color-inkGold-base)] transition-colors cursor-pointer" />
                        ))}
                      </div>
                    </Card>

                    <Card className="p-8">
                      <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase mb-4">AI Optimization</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-6">Let our AI analyze your content and suggest improvements based on industry standards.</p>
                      <div className="space-y-4">
                        {[
                          "Keyword Optimization",
                          "Action Verb Enhancement",
                          "Quantifiable Results",
                          "Formatting Check"
                        ].map(item => (
                          <div key={item} className="flex items-center gap-3 text-sm text-[var(--sys-color-worker-ash-base)] font-bold uppercase tracking-wider">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--sys-color-signalGreen-base)]">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}
