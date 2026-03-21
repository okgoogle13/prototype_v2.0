import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../ui/Card';
import { GettingStartedChecklist } from './GettingStartedChecklist';

const data = [
  { name: 'App 1', score: 78 },
  { name: 'App 2', score: 85 },
  { name: 'App 3', score: 92 },
  { name: 'App 4', score: 88 },
  { name: 'App 5', score: 95 },
];

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      <GettingStartedChecklist />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Applications" value="42" change="+12% this month" />
        <StatCard label="Interview Rate" value="24%" change="+5% from last month" />
        <StatCard label="Avg. ATS Score" value="88" change="+3 pts improvement" />
      </div>

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

        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--sys-color-outline-variant)" opacity={0.2} vertical={false} />
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
                  color: 'var(--sys-color-paperWhite-base)'
                }}
                itemStyle={{ color: 'var(--sys-color-inkGold-base)' }}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="var(--sys-color-solidarityRed-base)" 
                strokeWidth={4} 
                dot={{ fill: 'var(--sys-color-solidarityRed-base)', r: 6, strokeWidth: 2, stroke: 'var(--sys-color-paperWhite-base)' }}
                activeDot={{ r: 8, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
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
