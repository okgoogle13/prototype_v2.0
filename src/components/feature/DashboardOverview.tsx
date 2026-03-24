import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { GettingStartedChecklist } from './GettingStartedChecklist';
import { useUserStore } from '../../hooks/useUserStore';
import { Link, ArrowRight, FileText, LayoutDashboard, History, Files, FileUser } from 'lucide-react';

const data = [
  { name: 'App 1', score: 78 },
  { name: 'App 2', score: 85 },
  { name: 'App 3', score: 92 },
  { name: 'App 4', score: 88 },
  { name: 'App 5', score: 95 },
];

interface DashboardOverviewProps {
  onTabChange?: (tab: 'DASHBOARD' | 'JOBS' | 'ATS_CHECK' | 'APPLICATIONS' | 'SUBMITTED_DOCS' | 'PROFILE' | 'SETTINGS') => void;
}

export function DashboardOverview({ onTabChange }: DashboardOverviewProps) {
  const { setPendingJobUrl } = useUserStore();
  const [jobUrl, setJobUrl] = useState('');

  const handlePasteJob = () => {
    if (jobUrl.trim()) {
      setPendingJobUrl(jobUrl);
      onTabChange?.('ATS_CHECK');
    }
  };

  return (
    <div className="space-y-8">
      <GettingStartedChecklist />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Applications" value="42" change="+12% this month" />
        <StatCard label="Interview Rate" value="24%" change="+5% from last month" />
        <StatCard label="Avg. ATS Score" value="88" change="+3 pts improvement" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">ATS Score Trend</h3>
              <p className="text-sm text-[var(--sys-color-worker-ash-base)]">Performance across your last 5 applications</p>
            </div>
            <div className="px-4 py-1 bg-[var(--sys-color-solidarityRed-base)]/10 border border-[var(--sys-color-solidarityRed-base)]/30 rounded-full">
              <span className="text-[10px] font-bold text-[var(--sys-color-solidarityRed-base)] uppercase tracking-widest">Live Tracking</span>
            </div>
          </div>

          <div className="h-[240px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--sys-color-outline-variant)" opacity={0.1} vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--sys-color-worker-ash-base)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  stroke="var(--sys-color-worker-ash-base)" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  domain={[0, 100]}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--sys-color-charcoalBackground-steps-3)', 
                    borderColor: 'var(--sys-color-outline-variant)',
                    borderRadius: '12px',
                    color: 'var(--sys-color-paperWhite-base)',
                    border: '1px solid var(--sys-color-outline-variant)'
                  }}
                  itemStyle={{ color: 'var(--sys-color-inkGold-base)', fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--sys-color-inkGold-base)" 
                  strokeWidth={4} 
                  dot={{ fill: 'var(--sys-color-inkGold-base)', r: 6, strokeWidth: 2, stroke: 'var(--sys-color-charcoalBackground-steps-2)' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border-2 border-[var(--sys-color-inkGold-base)]/30 relative overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <Link className="text-[var(--sys-color-inkGold-base)]" size={24} />
              <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Paste Job URL</h3>
            </div>
            <p className="text-sm text-[var(--sys-color-worker-ash-base)] mb-6">
              Ready to analyze a new role? Drop the link here to start the asymmetric pre-processor.
            </p>
            <div className="flex gap-2">
              <input 
                type="text"
                placeholder="https://linkedin.com/jobs/..."
                value={jobUrl}
                onChange={(e) => setJobUrl(e.target.value)}
                className="flex-1 px-4 py-3 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-xl text-sm text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-inkGold-base)] transition-colors"
              />
              <button 
                onClick={handlePasteJob}
                className="p-3 bg-[var(--sys-color-inkGold-base)] text-[var(--sys-color-charcoalBackground-base)] rounded-xl hover:bg-[var(--sys-color-inkGold-steps-2)] transition-colors"
              >
                <ArrowRight size={24} />
              </button>
            </div>
          </Card>

          <YourDocumentsWidget />
        </div>
      </div>
    </div>
  );
}

function YourDocumentsWidget() {
  return (
    <Card className="p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="text-[var(--sys-color-solidarityRed-base)]" size={24} />
          <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Your Documents</h3>
        </div>
        <button className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest hover:text-[var(--sys-color-paperWhite-base)] transition-colors">View All</button>
      </div>
      <div className="space-y-3">
        <DocumentItem name="Master_Resume_2026.pdf" type="Resume" date="Mar 20" />
        <DocumentItem name="Cover_Letter_Generic.docx" type="Cover Letter" date="Mar 18" />
        <DocumentItem name="Portfolio_Case_Studies.pdf" type="Portfolio" date="Mar 15" />
      </div>
    </Card>
  );
}

function DocumentItem({ name, type, date }: { name: string, type: string, date: string }) {
  return (
    <div className="p-3 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)]/30 rounded-xl flex items-center justify-between group hover:border-[var(--sys-color-solidarityRed-base)]/50 transition-all cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[var(--sys-color-charcoalBackground-steps-4)] rounded-lg flex items-center justify-center text-[var(--sys-color-worker-ash-base)]">
          <FileText size={16} />
        </div>
        <div>
          <p className="text-xs font-bold text-[var(--sys-color-paperWhite-base)] truncate max-w-[140px]">{name}</p>
          <p className="text-[8px] text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">{type}</p>
        </div>
      </div>
      <div className="text-[8px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">{date}</div>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
  return (
    <Card className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)]" style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}>
      <p className="text-[10px] font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-[0.2em] mb-2">{label}</p>
      <h4 className="text-4xl font-bold text-[var(--sys-color-paperWhite-base)] mb-2">{value}</h4>
      <p className="text-[10px] text-[var(--sys-color-kr-activistSmokeGreen-base)] font-bold uppercase tracking-widest">{change}</p>
    </Card>
  );
}
