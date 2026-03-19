import React, { useState } from 'react';
import { JobOpportunity, CareerDatabase } from '../types';

interface JobOpportunityExtractorProps {
  onExtracted: (job: JobOpportunity) => void;
  onExtract: (
    type: 'url' | 'text',
    content: string,
    careerData?: CareerDatabase
  ) => Promise<JobOpportunity>;
  onSearch: (
    query: string
  ) => Promise<{ title: string; company: string; url: string; snippet: string }[]>;
  extensionContext?: {
    isExtension: boolean;
    currentUrl: string | null;
    extractJobFromPage: () => Promise<JobOpportunity>;
  };
  careerData?: CareerDatabase;
}

export const JobOpportunityExtractor: React.FC<JobOpportunityExtractorProps> = (props) => {
  const { onExtracted, onExtract, onSearch, extensionContext, careerData } = props;
  const { isExtension = false, currentUrl } = extensionContext ?? {};
  const [inputType, setInputType] = useState<'url' | 'text' | 'search'>('url');
  const [url, setUrl] = useState('');
  const [text, setText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ title: string, company: string, url: string, snippet: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [ignoreCriteria, setIgnoreCriteria] = useState(false);

  const validateUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleExtractFromPage = async () => {
    if (!currentUrl || !extensionContext?.extractJobFromPage) return;
    setIsLoading(true);
    setError(null);
    try {
      const job = await extensionContext.extractJobFromPage();
      onExtracted(job);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to extract from page');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsLoading(true);
    setError(null);
    try {
      const results = await onSearch(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExtract = async (contentToProcess?: string) => {
    const finalContent = contentToProcess || (inputType === 'url' ? url : text);
    if (!finalContent) return;
    
    setIsLoading(true);
    setError(null);

    if (inputType === 'url') {
      const isValid = await validateUrl(finalContent);
      if (!isValid) {
        setError("The URL is not accessible. Please use the fallback option below.");
        setShowFallback(true);
        setIsLoading(false);
        return;
      }
    }

    try {
      const job = await onExtract(inputType === 'search' ? 'url' : inputType, finalContent, careerData || undefined);
      if (ignoreCriteria) {
        job.Required_Hard_Skills = [];
        job.Required_Soft_Skills = [];
        job.Required_Experience = "Not specified";
      }
      onExtracted(job);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setShowFallback(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--sys-color-charcoalBackground-steps-1)', borderRadius: 'var(--sys-shape-blockRiot03)', borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid' }} className="max-w-2xl mx-auto p-6 shadow-xl">
      <h3 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)] mb-4">Extract Job Opportunity</h3>
      <p className="text-[var(--sys-color-concreteGrey-base)] mb-6">
        Paste a URL, plain text, or search for a live job posting to automatically extract its key particulars.
      </p>
      
      {isExtension && (
        <div style={{ background: 'color-mix(in srgb, var(--sys-color-solidarityRed-base)_12%,transparent)', borderRadius: 'var(--sys-shape-blockRiot02)', borderColor: 'var(--sys-color-solidarityRed-base)/30', borderWidth: 1, borderStyle: 'solid' }} className="mb-6 p-4 flex items-center justify-between">
          <div>
            <h4 className="text-[var(--sys-color-solidarityRed-base)] font-bold mb-1">Current Page</h4>
            <p className="text-sm text-[var(--sys-color-concreteGrey-base)] truncate max-w-md">{currentUrl || 'Loading...'}</p>
          </div>
          <button
            onClick={handleExtractFromPage}
            disabled={isLoading || !currentUrl}
            className="bg-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-paperWhite-base)] font-bold py-2 px-4 transition-colors text-sm whitespace-nowrap"
            style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}
          >
            {isLoading ? 'Extracting...' : 'Extract from Page'}
          </button>
        </div>
      )}

      <div style={{ borderBottomColor: 'var(--sys-color-concreteGrey-steps-0)', borderBottomWidth: 1, borderBottomStyle: 'solid' }} className="flex flex-col md:flex-row gap-4 mb-4 pb-4 justify-between items-start md:items-center">
        <div className="flex gap-2 md:gap-4 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          <button 
            onClick={() => setInputType('url')}
            style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}
            className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap ${inputType === 'url' ? 'bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_20%,transparent)] text-[var(--sys-color-solidarityRed-base)] border border-[var(--sys-color-solidarityRed-base)]/30' : 'text-[var(--sys-color-concreteGrey-base)]'}`}
          >
            Paste URL
          </button>
          <button 
            onClick={() => setInputType('text')}
            style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}
            className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap ${inputType === 'text' ? 'bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_20%,transparent)] text-[var(--sys-color-solidarityRed-base)] border border-[var(--sys-color-solidarityRed-base)]/30' : 'text-[var(--sys-color-concreteGrey-base)]'}`}
          >
            Paste Text
          </button>
          <button 
            onClick={() => setInputType('search')}
            style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}
            className={`px-3 md:px-4 py-2 font-medium transition-colors whitespace-nowrap ${inputType === 'search' ? 'bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_20%,transparent)] text-[var(--sys-color-solidarityRed-base)] border border-[var(--sys-color-solidarityRed-base)]/30' : 'text-[var(--sys-color-concreteGrey-base)]'}`}
          >
            AI Search
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-[var(--sys-color-concreteGrey-base)] cursor-pointer whitespace-nowrap">
          <input 
            type="checkbox" 
            checked={ignoreCriteria} 
            onChange={(e) => setIgnoreCriteria(e.target.checked)}
            style={{ accentColor: 'var(--sys-color-solidarityRed-base)', background: 'var(--sys-color-charcoalBackground-steps-2)' }}
          />
          Ignore Strict Criteria
        </label>
      </div>

      <div className="mb-4 space-y-4">
        {inputType === 'search' && (
            <div className="space-y-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="e.g., Frontend Developer in New York"
                        style={{ borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid', background: 'var(--sys-color-charcoalBackground-base)' }}
                        className="flex-1 px-4 py-3 text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)]"
                    />
                    <button onClick={handleSearch} className="bg-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-paperWhite-base)] font-bold py-2 px-4" style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}>Search</button>
                </div>
                {searchResults.length > 0 && (
                    <div className="space-y-2">
                        {searchResults.map((res, i) => (
                            <div key={i} style={{ background: 'var(--sys-color-charcoalBackground-steps-2)', borderRadius: 'var(--sys-shape-blockRiot02)' }} className="p-3 cursor-pointer" onClick={() => handleExtract(res.url)}>
                                <h5 className="font-bold text-[var(--sys-color-paperWhite-base)]">{res.title}</h5>
                                <p className="text-sm text-[var(--sys-color-worker-ash-base)]">{res.company}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
        {(inputType === 'url' || (showFallback && inputType !== 'search')) && (
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/job-posting"
            style={{ borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid', background: 'var(--sys-color-charcoalBackground-base)' }}
            className="w-full px-4 py-3 text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)]"
            disabled={isLoading}
          />
        )}
        {(inputType === 'text' || (showFallback && inputType !== 'search')) && (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste the full job description text here..."
            style={{ borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid', background: 'var(--sys-color-charcoalBackground-base)' }}
            className="w-full px-4 py-3 text-[var(--sys-color-paperWhite-base)] focus:outline-none focus:border-[var(--sys-color-solidarityRed-base)] min-h-[200px]"
            disabled={isLoading}
          />
        )}
      </div>

      {inputType !== 'search' && (
        <div className="flex justify-end">
            <button
            onClick={() => handleExtract()}
            disabled={isLoading}
            className="bg-[var(--sys-color-solidarityRed-base)] hover:bg-[var(--sys-color-solidarityRed-steps-1)] text-[var(--sys-color-paperWhite-base)] font-bold py-2 px-8 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}
            >
            {isLoading ? 'Extracting...' : 'Extract'}
            </button>
        </div>
      )}

      {error && (
        <div style={{ background: 'color-mix(in srgb, var(--sys-color-solidarityRed-base) 15%, transparent)', borderColor: 'var(--sys-color-solidarityRed-base)/30', borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--sys-shape-blockRiot02)' }} className="text-[var(--sys-color-solidarityRed-base)] text-sm mt-4 p-3">
          {error}
        </div>
      )}
      {inputType === 'url' && url && !isLoading && !error && (
        <div style={{ background: 'color-mix(in srgb, var(--sys-color-solidarityRed-base) 15%, transparent)', borderColor: 'var(--sys-color-solidarityRed-base)/30', borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--sys-shape-blockRiot02)' }} className="text-[var(--sys-color-solidarityRed-base)] text-sm mt-4 p-3 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <strong>Job Freshness Warning:</strong> Ensure this job posting is still active before dedicating time to tailor your resume.
        </div>
      )}
    </div>
  );
};
