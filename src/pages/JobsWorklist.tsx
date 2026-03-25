import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Plus, Briefcase, ExternalLink, Filter, Calendar } from 'lucide-react';
import { M3Card } from '../components/ui/M3Card';
import { M3Button } from '../components/ui/M3Button';
import { M3Type } from '../theme/typography';
import { calendarService } from '../services/calendarService';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  url: string;
}

const mockJobs: Job[] = [
  { id: '1', title: 'Senior Frontend Engineer', company: 'TechCorp', location: 'Remote', type: 'Full-time', posted: '2d ago', url: 'https://techcorp.com/jobs/1' },
  { id: '2', title: 'Product Designer', company: 'DesignStudio', location: 'Sydney, AU', type: 'Contract', posted: '5h ago', url: 'https://designstudio.com/jobs/2' },
  { id: '3', title: 'Full Stack Developer', company: 'StartupX', location: 'Melbourne, AU', type: 'Full-time', posted: '1d ago', url: 'https://startupx.com/jobs/3' },
];

export function JobsWorklist() {
  const [searchQuery, setSearchQuery] = useState('');
  const [pasteUrl, setPasteUrl] = useState('');
  const [jobs] = useState<Job[]>(mockJobs);
  const [syncingJobId, setSyncingJobId] = useState<string | null>(null);

  const handleSyncJob = async (e: React.MouseEvent, job: Job) => {
    e.stopPropagation();
    setSyncingJobId(job.id);
    try {
      const result = await calendarService.syncToCalendar({
        title: job.title,
        company: job.company,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Mock deadline
        description: `Application for ${job.title} at ${job.company}.`
      });
      if (result.success) {
        alert(`Synced ${job.title} to Google Calendar!`);
      }
    } catch (error) {
      console.error("Sync failed", error);
      alert("Failed to sync. Make sure Google is connected in Profile.");
    } finally {
      setSyncingJobId(null);
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)' }}>
            Jobs
          </h2>
          <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>Track and manage your target roles.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--sys-color-worker-ash-base)]" size={18} />
            <input 
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 h-10 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-full text-sm text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)] transition-colors w-64"
            />
          </div>
          <button className="w-10 h-10 flex items-center justify-center bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-full text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <M3Card variant="outlined" className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]" style={{ borderRadius: '24px' }}>
        <div className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            placeholder="Paste job URL to analyze..."
            value={pasteUrl}
            onChange={(e) => setPasteUrl(e.target.value)}
            className="flex-1 px-4 h-12 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-xl text-sm text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)] transition-colors"
          />
          <M3Button variant="filled" className="px-6 h-12">
            <Plus size={18} className="mr-2" />
            Add job
          </M3Button>
        </div>
      </M3Card>

      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <motion.div
              key={job.id}
              whileHover={{ y: -4 }}
              className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] rounded-[24px] flex flex-col gap-4 group shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-xl flex items-center justify-center text-[var(--sys-color-inkGold-base)]">
                  <Briefcase size={24} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)]">{job.posted}</span>
                  <button 
                    onClick={(e) => handleSyncJob(e, job)}
                    disabled={syncingJobId === job.id}
                    className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-all disabled:opacity-50"
                    title="Sync to Google Calendar"
                  >
                    {syncingJobId === job.id ? (
                      <div className="w-4 h-4 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
                    ) : (
                      <Calendar size={16} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-[var(--sys-color-paperWhite-base)] tracking-tight group-hover:text-[var(--sys-color-solidarityRed-base)] transition-colors">{job.title}</h3>
                <p className="text-sm text-[var(--sys-color-worker-ash-base)] font-medium">{job.company}</p>
              </div>
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-[var(--sys-color-outline-variant)]/30">
                <div className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)]">{job.location}</div>
                <div className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)]">{job.type}</div>
                <a href={job.url} target="_blank" rel="noopener noreferrer" className="ml-auto text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-colors">
                  <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-[var(--sys-color-charcoalBackground-steps-1)] rounded-[32px] border border-dashed border-[var(--sys-color-outline-variant)]">
          <div className="w-20 h-20 bg-[var(--sys-color-charcoalBackground-steps-2)] rounded-full flex items-center justify-center text-[var(--sys-color-worker-ash-base)] opacity-20">
            <Briefcase size={40} />
          </div>
          <div>
            <h3 style={{ ...M3Type.titleLarge, color: 'var(--sys-color-paperWhite-base)' }}>No jobs found</h3>
            <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }} className="max-w-xs mx-auto mt-2">Start by pasting a job URL above to begin your application journey.</p>
          </div>
        </div>
      )}
    </div>
  );
}
