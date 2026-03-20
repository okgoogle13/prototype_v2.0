/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React, { useState } from 'react';
import { CareerDatabase, MatchAnalysis, StructuredAchievement } from '../types';
import { TemplateStyle } from '../constants';
import { refineAchievementField } from '../services/geminiService';
import { SingleColumnResume } from './feature/SingleColumnResume';
import { TwoColumnResume } from './feature/TwoColumnResume';

interface TailoredResumeViewProps {
  careerData: CareerDatabase;
  analysis: MatchAnalysis;
  template: TemplateStyle;
  locale?: 'US' | 'UK/AU';
}

export const TailoredResumeView: React.FC<TailoredResumeViewProps> = ({ careerData, analysis, template, locale = 'US' }) => {
  const { Personal_Information, Career_Entries, Structured_Achievements, Master_Skills_Inventory } = careerData;
  const [achievements, setAchievements] = useState<StructuredAchievement[]>(Structured_Achievements);
  const [tailoredSummary, setTailoredSummary] = useState(analysis.Tailored_Summary);
  const [isPolishing, setIsPolishing] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Record<string, string>>({});

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    
    if (locale === 'US') {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });
    }
  };

  const handlePolish = async (achId: string, field: keyof StructuredAchievement) => {
    setIsPolishing(`${achId}-${field}`);
    try {
      const ach = achievements.find(a => a.Achievement_ID === achId);
      if (!ach) return;
      const polishedText = await refineAchievementField(ach, field);
      setSuggestions(prev => ({ ...prev, [`${achId}-${field}`]: polishedText }));
    } catch (error) {
      console.error("Failed to polish text:", error);
      alert("Failed to polish text. Please try again.");
    } finally {
      setIsPolishing(null);
    }
  };

  const applySuggestion = (achId: string, field: keyof StructuredAchievement) => {
    const suggestion = suggestions[`${achId}-${field}`];
    if (!suggestion) return;
    setAchievements(prev => prev.map(a => 
      a.Achievement_ID === achId ? { ...a, [field]: suggestion } : a
    ));
    setSuggestions(prev => {
      const next = { ...prev };
      delete next[`${achId}-${field}`];
      return next;
    });
  };

  const discardSuggestion = (achId: string, field: keyof StructuredAchievement) => {
    setSuggestions(prev => {
      const next = { ...prev };
      delete next[`${achId}-${field}`];
      return next;
    });
  };

  // Filter and sort achievements: recommended ones first, then others, grouped by Entry_ID
  const getAchievementsForEntry = (entryId: string) => {
    const entryAchievements = achievements.filter(a => a.Entry_ID === entryId);
    
    // Sort so recommended achievements appear first
    return entryAchievements.sort((a, b) => {
      const aIsRecommended = analysis.Recommended_Achievement_IDs.includes(a.Achievement_ID);
      const bIsRecommended = analysis.Recommended_Achievement_IDs.includes(b.Achievement_ID);
      if (aIsRecommended && !bIsRecommended) return -1;
      if (!aIsRecommended && bIsRecommended) return 1;
      return 0;
    });
  };

  const workEntries = Career_Entries.filter(e => e.Entry_Type === "Work Experience")
    .sort((a, b) => new Date(b.StartDate).getTime() - new Date(a.StartDate).getTime());

  const educationEntries = Career_Entries.filter(e => e.Entry_Type === "Education");

  return (
    <div 
      className="bg-white p-10 shadow-lg max-w-4xl mx-auto"
      style={{ 
        fontFamily: template.fontSans,
        color: template.textColor,
        lineHeight: '1.5'
      }}
    >
      {/* Header - ATS Friendly */}
      <div 
        className="text-center mb-8 border-b-2 pb-6"
        style={{ borderColor: template.primaryColor }}
      >
        <h1 
          className="text-4xl font-bold uppercase tracking-tight mb-2"
          style={{ color: template.primaryColor }}
        >
          {Personal_Information.FullName}
        </h1>
        {analysis.Headline_Suggestion && (
          <h2 className="text-xl font-medium mb-4" style={{ color: template.secondaryColor }}>
            {analysis.Headline_Suggestion}
          </h2>
        )}
        {template.layout === 'single' && (
          <div className="text-sm flex flex-wrap justify-center gap-4 font-medium">
            <span>{Personal_Information.Email}</span>
            <span style={{ color: template.accentColor }}>•</span>
            <span>{Personal_Information.Phone}</span>
            <span style={{ color: template.accentColor }}>•</span>
            <span>{Personal_Information.Location}</span>
          </div>
        )}
        {template.layout === 'single' && Personal_Information.Portfolio_Website_URLs?.length > 0 && (
          <div 
            className="text-sm mt-2 font-semibold"
            style={{ color: template.secondaryColor }}
          >
            {Personal_Information.Portfolio_Website_URLs.join(' | ')}
          </div>
        )}
      </div>

      {template.layout === 'single' ? (
        <SingleColumnResume
          careerData={careerData}
          analysis={analysis}
          template={template}
          locale={locale}
          achievements={achievements}
          suggestions={suggestions}
          isPolishing={isPolishing}
          formatDate={formatDate}
          getAchievementsForEntry={getAchievementsForEntry}
          applySuggestion={applySuggestion}
          discardSuggestion={discardSuggestion}
          handlePolish={handlePolish}
          workEntries={workEntries}
          educationEntries={educationEntries}
          tailoredSummary={tailoredSummary}
          setTailoredSummary={setTailoredSummary}
        />
      ) : (
        <TwoColumnResume
          careerData={careerData}
          analysis={analysis}
          template={template}
          locale={locale}
          achievements={achievements}
          suggestions={suggestions}
          isPolishing={isPolishing}
          formatDate={formatDate}
          getAchievementsForEntry={getAchievementsForEntry}
          applySuggestion={applySuggestion}
          discardSuggestion={discardSuggestion}
          handlePolish={handlePolish}
          workEntries={workEntries}
          educationEntries={educationEntries}
          tailoredSummary={tailoredSummary}
          setTailoredSummary={setTailoredSummary}
        />
      )}
    </div>
  );
};
