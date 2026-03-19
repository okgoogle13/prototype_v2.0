import React, { useState } from 'react';
import { CareerDatabase } from '../types';

interface AISuggestionPanelProps {
  data: CareerDatabase;
  onRequestAI: (type: string, payload: unknown) => Promise<unknown>;
}

export const AISuggestionPanel: React.FC<AISuggestionPanelProps> = ({ data, onRequestAI }) => {
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [selectedSuggestedTags, setSelectedSuggestedTags] = useState<Set<string>>(new Set());
  const [suggestedGaps, setSuggestedGaps] = useState<string[]>([]);
  const [isSuggesting, setIsSuggesting] = useState(false);

  return <div className="p-4">AISuggestionPanel</div>;
};
