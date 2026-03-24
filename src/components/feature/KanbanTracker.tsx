import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '../ui/Badge';
import { M3Card } from '../ui/M3Card';
import { M3Type } from '../../theme/typography';
import { FileText, Mail, Link, ExternalLink, History, Target, ChevronRight, MoreVertical, Calendar, MapPin } from 'lucide-react';

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

const columns = [
  { id: 'applied', label: 'Applied', color: 'var(--sys-color-worker-ash-base)' },
  { id: 'interviewing', label: 'Interviewing', color: 'var(--sys-color-inkGold-base)' },
  { id: 'offered', label: 'Offered', color: 'var(--sys-color-signalGreen-base)' },
  { id: 'rejected', label: 'Archived', color: 'var(--sys-color-solidarityRed-base)' },
];

export function KanbanTracker({ onSelectApp, selectedId }: { onSelectApp: (id: string) => void, selectedId: string | null }) {
  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4 scrollbar-hide">
      {columns.map((column) => (
        <div key={column.id} className="w-[300px] flex-shrink-0 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color }} />
              <h3 style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>{column.label}</h3>
            </div>
            <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }} className="opacity-40">
              {mockApplications.filter(app => app.status === column.id).length}
            </span>
          </div>

          <div className="flex-1 flex flex-col gap-3 p-2 bg-[var(--sys-color-charcoalBackground-steps-3)]/30 rounded-[24px] border border-[var(--sys-color-outline-variant)]/30">
            {mockApplications
              .filter(app => app.status === column.id)
              .map((app) => (
                <motion.button
                  layoutId={app.id}
                  key={app.id}
                  onClick={() => onSelectApp(app.id)}
                  className={`p-4 rounded-2xl text-left transition-all border group relative overflow-hidden ${
                    selectedId === app.id
                      ? "bg-[var(--sys-color-charcoalBackground-steps-3)] border-[var(--sys-color-inkGold-base)]/50 shadow-xl"
                      : "bg-[var(--sys-color-charcoalBackground-steps-2)] border-[var(--sys-color-outline-variant)] hover:border-[var(--sys-color-worker-ash-base)]"
                  }`}
                >
                  {selectedId === app.id && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-[var(--sys-color-inkGold-base)]" />
                  )}
                  
                  <div className="flex justify-between items-start mb-2">
                    <h4 style={{ ...M3Type.labelMedium, color: 'var(--sys-color-paperWhite-base)' }} className="truncate max-w-[180px]">
                      {app.company}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Target size={10} className="text-[var(--sys-color-inkGold-base)]" />
                      <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-paperWhite-base)' }}>{app.atsScore}%</span>
                    </div>
                  </div>
                  
                  <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }} className="mb-4 line-clamp-1">{app.role}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }} className="flex items-center gap-2">
                      <Calendar size={10} />
                      {app.date}
                    </div>
                    <div className="w-6 h-6 rounded-full bg-[var(--sys-color-charcoalBackground-steps-4)] flex items-center justify-center text-[var(--sys-color-worker-ash-base)] group-hover:text-[var(--sys-color-paperWhite-base)] transition-colors">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </motion.button>
              ))}
            
            {mockApplications.filter(app => app.status === column.id).length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center opacity-20">
                <div className="w-12 h-12 border-2 border-dashed border-[var(--sys-color-worker-ash-base)] rounded-full mb-4" />
                <p style={M3Type.labelMedium}>Empty column</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function ApplicationDetailWorkspace({ app }: { app: Application }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <div>
          <h1 style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)' }} className="mb-2">
            {app.role}
          </h1>
          <p style={{ ...M3Type.titleLarge, color: 'var(--sys-color-inkGold-base)' }}>
            {app.company} • {app.location}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)' }}>
            {app.atsScore}<span style={{ ...M3Type.titleMedium, color: 'var(--sys-color-worker-ash-base)' }}>/100</span>
          </div>
          <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>ATS match score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <M3Card variant="outlined" className="p-6">
          <h3 style={{ ...M3Type.titleSmall, color: 'var(--sys-color-worker-ash-base)' }} className="mb-4">Application status</h3>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${
              app.status === "offered" ? "bg-[var(--sys-color-signalGreen-base)]" :
              app.status === "rejected" ? "bg-[var(--sys-color-solidarityRed-base)]" :
              "bg-[var(--sys-color-inkGold-base)]"
            }`} />
            <span style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }} className="capitalize">{app.status}</span>
          </div>
        </M3Card>
        <M3Card variant="outlined" className="p-6">
          <h3 style={{ ...M3Type.titleSmall, color: 'var(--sys-color-worker-ash-base)' }} className="mb-4">Submitted on</h3>
          <p style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }}>{app.date}</p>
        </M3Card>
      </div>

      <div className="space-y-8">
        <section>
          <h3 style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }} className="mb-4 border-l-4 border-[var(--sys-color-solidarityRed-base)] pl-4">Source documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AssetCard 
              icon={<FileText size={24} />} 
              label="Resume version" 
              value={app.resumeVersion} 
              action="View version"
            />
            <AssetCard 
              icon={<Mail size={24} />} 
              label="Cover letter" 
              value={app.coverLetterId} 
              action="View draft"
            />
          </div>
        </section>

        <section>
          <h3 style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }} className="mb-4 border-l-4 border-[var(--sys-color-metalBlue-base)] pl-4">Application timeline</h3>
          <div className="space-y-4">
            <TimelineItem date="2024-03-15" event="Interview scheduled" desc="Round 1 with hiring manager" />
            <TimelineItem date="2024-03-10" event="Application submitted" desc="Tailored via CareerCopilot" />
            <TimelineItem date="2024-03-09" event="Job clipped" desc="Found via LinkedIn" />
          </div>
        </section>
      </div>
    </div>
  );
}

function AssetCard({ icon, label, value, action }: any) {
  return (
    <M3Card variant="outlined" className="p-6 flex flex-col gap-4 hover:bg-[var(--sys-color-charcoalBackground-steps-3)] transition-all cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="text-[var(--sys-color-inkGold-base)]">{icon}</div>
        <ExternalLink size={16} className="text-[var(--sys-color-worker-ash-base)] group-hover:text-[var(--sys-color-paperWhite-base)] transition-colors" />
      </div>
      <div>
        <h4 style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }} className="mb-1">{label}</h4>
        <p style={{ ...M3Type.titleSmall, color: 'var(--sys-color-paperWhite-base)' }} className="truncate">{value}</p>
      </div>
      <div className="pt-2 border-t border-[var(--sys-color-outline-variant)]">
        <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-solidarityRed-base)' }}>{action}</span>
      </div>
    </M3Card>
  );
}

function TimelineItem({ date, event, desc }: any) {
  return (
    <div className="flex gap-6">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-[var(--sys-color-solidarityRed-base)]" />
        <div className="w-0.5 h-full bg-[var(--sys-color-outline-variant)] opacity-30" />
      </div>
      <div className="pb-6">
        <div className="flex items-center gap-3 mb-1">
          <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>{date}</span>
          <span style={{ ...M3Type.titleSmall, color: 'var(--sys-color-paperWhite-base)' }}>{event}</span>
        </div>
        <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>{desc}</p>
      </div>
    </div>
  );
}
