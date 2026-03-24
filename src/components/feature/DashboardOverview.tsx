import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { M3Card } from '../ui/M3Card';
import { M3Button } from '../ui/M3Button';
import { M3Type } from '../../theme/typography';
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
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const isDesktop = windowWidth >= 900;
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  const handlePasteJob = () => {
    if (jobUrl.trim()) {
      setPendingJobUrl(jobUrl);
      onTabChange?.('ATS_CHECK');
    }
  };

  return (
    <div className="space-y-8">
      {isDesktop && (
        <div className="mb-6">
          <h1 style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)' }}>Good morning</h1>
          <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>{currentDate}</p>
        </div>
      )}

      {isDesktop ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <StatCard label="Total applications" value="42" change="+12% this month" />
            <StatCard label="Interview rate" value="24%" change="+5% from last month" />
            <StatCard label="Avg. ATS score" value="88" change="+3 pts improvement" />
          </div>
          <div style={{ width: '100%' }}>
            <GettingStartedChecklist />
          </div>
        </>
      ) : (
        <>
          <GettingStartedChecklist />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard label="Total applications" value="42" change="+12% this month" />
            <StatCard label="Interview rate" value="24%" change="+5% from last month" />
            <StatCard label="Avg. ATS score" value="88" change="+3 pts improvement" />
          </div>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <M3Card variant="elevated" className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 style={{ ...M3Type.titleMedium, color: 'var(--sys-color-paperWhite-base)' }}>ATS score trend</h3>
              <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)' }}>Performance across your last 5 applications</p>
            </div>
            <div className="px-4 py-1 bg-[var(--sys-color-solidarityRed-base)]/10 border border-[var(--sys-color-solidarityRed-base)]/30 rounded-full">
              <span style={{ ...M3Type.labelMedium, color: 'var(--sys-color-solidarityRed-base)' }}>Live tracking</span>
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
        </M3Card>

        <div className="space-y-6">
          <M3Card variant="elevated" className="p-8 relative overflow-hidden" style={{ border: '2px solid rgba(255,193,7,0.3)' }}>
            <div className="flex items-center gap-3 mb-4">
              <Link className="text-[var(--sys-color-inkGold-base)]" size={24} />
              <h3 style={{ ...M3Type.titleMedium, color: 'var(--sys-color-paperWhite-base)' }}>Paste job URL</h3>
            </div>
            <p style={{ ...M3Type.bodyMedium, color: 'var(--sys-color-worker-ash-base)', marginBottom: '24px' }}>
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
              <M3Button variant="filled" onClick={handlePasteJob} style={{ padding: '0 16px' }}>
                <ArrowRight size={24} />
              </M3Button>
            </div>
          </M3Card>

          <YourDocumentsWidget />
        </div>
      </div>
    </div>
  );
}

function YourDocumentsWidget() {
  return (
    <M3Card variant="elevated" className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="text-[var(--sys-color-solidarityRed-base)]" size={24} />
          <h3 style={{ ...M3Type.titleMedium, color: 'var(--sys-color-paperWhite-base)' }}>Your documents</h3>
        </div>
        <M3Button variant="text" style={{ padding: '0 8px', minHeight: '32px' }}>View all</M3Button>
      </div>
      <div className="space-y-3">
        <DocumentItem name="Master_Resume_2026.pdf" type="Resume" date="Mar 20" />
        <DocumentItem name="Cover_Letter_Generic.docx" type="Cover letter" date="Mar 18" />
        <DocumentItem name="Portfolio_Case_Studies.pdf" type="Portfolio" date="Mar 15" />
      </div>
    </M3Card>
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
          <p style={{ ...M3Type.labelLarge, color: 'var(--sys-color-paperWhite-base)' }} className="truncate max-w-[140px]">{name}</p>
          <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>{type}</p>
        </div>
      </div>
      <div style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)' }}>{date}</div>
    </div>
  );
}

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
  return (
    <M3Card variant="elevated" className="p-6">
      <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-worker-ash-base)', marginBottom: '8px' }}>{label}</p>
      <h4 style={{ ...M3Type.headlineSmall, color: 'var(--sys-color-paperWhite-base)', marginBottom: '8px' }}>{value}</h4>
      <p style={{ ...M3Type.labelMedium, color: 'var(--sys-color-kr-activistSmokeGreen-base)' }}>{change}</p>
    </M3Card>
  );
}
