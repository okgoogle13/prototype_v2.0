import React from 'react';
import { KSCResponse, CareerEntry, StructuredAchievement } from '../types';

interface KSCResponseListProps {
  kscs: KSCResponse[];
  entries: CareerEntry[];
  achievements: StructuredAchievement[];
  onUpdateKSC: (ksc: KSCResponse) => void;
  onRequestAI: (type: string, payload: unknown) => Promise<unknown>;
}

export const KSCResponseList: React.FC<KSCResponseListProps> = ({ kscs, entries, achievements, onUpdateKSC, onRequestAI }) => {
  return <div className="space-y-8">KSCResponseList</div>;
};
