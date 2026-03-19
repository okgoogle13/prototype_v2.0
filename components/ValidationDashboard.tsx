import React from 'react';
import { CareerDatabase } from '../types';
import { DashboardContainer, CareerEntryList, KSCResponseList, AISuggestionPanel } from './index';

interface ValidationDashboardProps {
  data: CareerDatabase;
  onUpdate: (newData: CareerDatabase) => void;
  userId?: string;
}

export const ValidationDashboard: React.FC<ValidationDashboardProps> = ({ data, onUpdate, userId }) => {
  const onRequestAI = async (type: string, payload: unknown): Promise<unknown> => {
    // Implement AI request logic here
    return {};
  };

  const onSaveProfile = async (data: unknown): Promise<void> => {
    // Implement save logic here
  };

  return (
    <div className="space-y-8">
      <DashboardContainer data={data} userId={userId || ''} />
      <CareerEntryList 
        entries={data.Career_Entries} 
        achievements={data.Structured_Achievements} 
        onUpdateEntry={(entry) => {}} 
        onUpdateAchievement={(ach) => {}} 
        onRequestAI={onRequestAI}
      />
      <KSCResponseList 
        kscs={data.KSC_Responses} 
        entries={data.Career_Entries} 
        achievements={data.Structured_Achievements} 
        onUpdateKSC={(ksc) => {}} 
        onRequestAI={onRequestAI}
      />
      <AISuggestionPanel data={data} onRequestAI={onRequestAI} />
    </div>
  );
};
