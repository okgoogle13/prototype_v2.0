import React from 'react';
import { Card } from './Card';
import { AuditDial } from './AuditDial';

interface MetricCardProps {
  label: string;
  value: number;
  tooltip: string;
  color?: string;
  desc?: string;
}

export function MetricCard({ label, value, tooltip, color, desc }: MetricCardProps) {
  return (
    <Card 
      className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] flex flex-col items-center gap-4 text-center"
      style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
    >
      <AuditDial score={value} size={100} strokeWidth={10} color={color} />
      <div>
        <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] text-xs mb-1">
          {label}
        </h4>
        {desc && (
          <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] leading-tight">
            {desc}
          </p>
        )}
      </div>
    </Card>
  );
}
