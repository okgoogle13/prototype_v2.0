import React from 'react';
import { CareerEntry, StructuredAchievement } from '../types';

interface CareerEntryListProps {
  entries: CareerEntry[];
  achievements: StructuredAchievement[];
  onUpdateEntry: (entry: CareerEntry) => void;
  onUpdateAchievement: (ach: StructuredAchievement) => void;
  onRequestAI: (type: string, payload: unknown) => Promise<unknown>;
}

export const CareerEntryList: React.FC<CareerEntryListProps> = ({ entries, achievements, onUpdateEntry, onUpdateAchievement, onRequestAI }) => {
  return <div className="space-y-8">CareerEntryList</div>;
};
