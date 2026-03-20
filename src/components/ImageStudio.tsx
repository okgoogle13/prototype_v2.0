/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React from 'react';
import { PrimaryButton } from './ui/PrimaryButton';
import { TextInput } from './ui/TextInput';
import { SectionHeader } from './ui/SectionHeader';
import { useImageStudio } from '../hooks/useImageStudio';

export function ImageStudio() {
  const {
    prompt,
    setPrompt,
    imageUrl,
    baseImage,
    isGenerating,
    error,
    fileInputRef,
    handleImageUpload,
    handleGenerate,
    clearImage
  } = useImageStudio();

  return (
    <div className="p-8 bg-[var(--sys-color-charcoalBackground-steps-1)] border border-[var(--sys-color-outline-variant)] shadow-[var(--sys-shadow-elevation2Placard)]" style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}>
      <SectionHeader 
        title="Image Studio" 
        subtitle="Generate or edit images using Gemini Flash Image models."
      />
      
      <div className="space-y-6 mt-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">Base Image (Optional for Editing)</label>
          <input 
            type="file" 
            accept="image/*" 
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="flex gap-4 items-center">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-paperWhite-base)] border border-[var(--sys-color-outline-variant)] hover:bg-[var(--sys-color-charcoalBackground-steps-4)] transition-colors text-sm font-bold uppercase tracking-wider"
              style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
            >
              Upload Image
            </button>
            {baseImage && (
              <button 
                onClick={clearImage}
                className="text-xs text-[var(--sys-color-solidarityRed-base)] hover:underline uppercase tracking-wider font-bold"
              >
                Clear Image
              </button>
            )}
          </div>
        </div>

        <TextInput 
          label="Image Prompt" 
          placeholder="e.g. A futuristic city skyline at sunset, cyberpunk style..." 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        <div className="flex justify-end">
          <PrimaryButton 
            label={isGenerating ? "Generating..." : (baseImage ? "Edit Image" : "Generate Image")} 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
          />
        </div>

        {error && (
          <div className="p-4 bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_10%,transparent)] border border-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-solidarityRed-base)]" style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}>
            <p className="font-bold uppercase tracking-widest text-xs mb-1">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {imageUrl && (
          <div className="mt-8 border border-[var(--sys-color-outline-variant)] overflow-hidden" style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}>
            <img 
              src={imageUrl} 
              alt={prompt} 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        )}
      </div>
    </div>
  );
}
