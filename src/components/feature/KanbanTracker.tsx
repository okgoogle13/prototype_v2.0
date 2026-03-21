import React from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { FileText, Mail, Link, ExternalLink, History, Target } from 'lucide-react';

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

export function KanbanTracker({ onSelectApp, selectedId }: { onSelectApp: (id: string) => void, selectedId: string | null }) {
  return (
    <div className="flex flex-col gap-3">
      {mockApplications.map((app) => (
        <button
          key={app.id}
          onClick={() => onSelectApp(app.id)}
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
          <div className="flex items-center justify-between">
            <Badge 
              label={app.status} 
              variant={app.status === "offered" ? "success" : app.status === "rejected" ? "danger" : "warning"} 
            />
            <div className="flex items-center gap-1">
              <Target size={12} className="text-[var(--sys-color-inkGold-base)]" />
              <span className="text-[10px] font-bold text-[var(--sys-color-paperWhite-base)]">{app.atsScore}%</span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export function ApplicationDetailWorkspace({ app }: { app: Application }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter mb-2">
            {app.role}
          </h1>
          <p className="text-xl text-[var(--sys-color-inkGold-base)] font-bold uppercase tracking-widest">
            {app.company} • {app.location}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)]">
            {app.atsScore}<span className="text-lg text-[var(--sys-color-worker-ash-base)]">/100</span>
          </div>
          <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest font-bold">ATS Match Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-6 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Application Status</h3>
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full ${
              app.status === "offered" ? "bg-[var(--sys-color-signalGreen-base)]" :
              app.status === "rejected" ? "bg-[var(--sys-color-solidarityRed-base)]" :
              "bg-[var(--sys-color-inkGold-base)]"
            }`} />
            <span className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase">{app.status}</span>
          </div>
        </div>
        <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-6 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-worker-ash-base)] mb-4">Submitted On</h3>
          <p className="text-xl font-bold text-[var(--sys-color-paperWhite-base)]">{app.date}</p>
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider mb-4 border-l-4 border-[var(--sys-color-solidarityRed-base)] pl-4">Source Documents</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AssetCard 
              icon={<FileText size={24} />} 
              label="Resume Version" 
              value={app.resumeVersion} 
              action="View Version"
            />
            <AssetCard 
              icon={<Mail size={24} />} 
              label="Cover Letter" 
              value={app.coverLetterId} 
              action="View Draft"
            />
          </div>
        </section>

        <section>
          <h3 className="text-lg font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider mb-4 border-l-4 border-[var(--sys-color-metalBlue-base)] pl-4">Application Timeline</h3>
          <div className="space-y-4">
            <TimelineItem date="2024-03-15" event="Interview Scheduled" desc="Round 1 with Hiring Manager" />
            <TimelineItem date="2024-03-10" event="Application Submitted" desc="Tailored via CareerCopilot" />
            <TimelineItem date="2024-03-09" event="Job Clipped" desc="Found via LinkedIn" />
          </div>
        </section>
      </div>
    </div>
  );
}

function AssetCard({ icon, label, value, action }: any) {
  return (
    <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-2xl flex flex-col gap-4 hover:bg-[var(--sys-color-charcoalBackground-steps-3)] transition-all cursor-pointer group">
      <div className="flex items-center justify-between">
        <div className="text-[var(--sys-color-inkGold-base)]">{icon}</div>
        <ExternalLink size={16} className="text-[var(--sys-color-worker-ash-base)] group-hover:text-[var(--sys-color-paperWhite-base)] transition-colors" />
      </div>
      <div>
        <h4 className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest mb-1">{label}</h4>
        <p className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase truncate">{value}</p>
      </div>
      <div className="pt-2 border-t border-[var(--sys-color-outline-variant)]">
        <span className="text-[10px] font-bold text-[var(--sys-color-solidarityRed-base)] uppercase tracking-widest">{action}</span>
      </div>
    </div>
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
          <span className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">{date}</span>
          <span className="text-sm font-bold text-[var(--sys-color-paperWhite-base)] uppercase">{event}</span>
        </div>
        <p className="text-xs text-[var(--sys-color-worker-ash-base)]">{desc}</p>
      </div>
    </div>
  );
}
