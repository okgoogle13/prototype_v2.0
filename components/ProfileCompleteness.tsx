import React from 'react';

export const ProfileCompleteness = ({ completed, total }: { completed: number; total: number }) => {
  const percentage = (completed / total) * 100;
  return (
    <div className="space-y-2 p-6 bg-[var(--sys-color-charcoalBackground-steps-1)] border-2 border-[var(--sys-color-concreteGrey-steps-0)]" style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}>
      <div className="flex justify-between text-sm font-bold uppercase tracking-wider text-[var(--sys-color-paperWhite-base)]">
        <span>Profile Completeness</span>
        <span>{completed}/{total} Sections Complete</span>
      </div>
      <div className="h-2 w-full bg-[var(--sys-color-charcoalBackground-steps-3)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--sys-color-solidarityRed-base)] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
