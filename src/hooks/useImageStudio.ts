import React, { useState, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';

export function useImageStudio() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [baseImage, setBaseImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const base64Data = result.split(',')[1];
      setBaseImage({
        data: base64Data,
        mimeType: file.type,
      });
      setImageUrl(result); // Preview the uploaded image
    };
    reader.readAsDataURL(file);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setError(null);

    try {
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
      if (!apiKey) throw new Error("Gemini API key is missing.");
      
      const ai = new GoogleGenAI({ apiKey });

      const parts: any[] = [{ text: prompt }];
      
      if (baseImage) {
        parts.unshift({
          inlineData: {
            data: baseImage.data,
            mimeType: baseImage.mimeType,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: baseImage ? 'gemini-2.5-flash-image' : 'gemini-3.1-flash-image-preview',
        contents: { parts },
        config: baseImage ? undefined : {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: "1K"
          }
        },
      });

      let foundImage = false;
      if (response.candidates && response.candidates[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            const base64EncodeString = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64EncodeString}`);
            foundImage = true;
            break;
          }
        }
      }

      if (!foundImage) {
        throw new Error("No image was returned by the model.");
      }
    } catch (err: any) {
      console.error("Image generation failed:", err);
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsGenerating(false);
    }
  };

  const clearImage = () => {
    setBaseImage(null);
    setImageUrl(null);
  };

  return {
    prompt,
    setPrompt,
    imageUrl,
    setImageUrl,
    baseImage,
    setBaseImage,
    isGenerating,
    setIsGenerating,
    error,
    setError,
    fileInputRef,
    handleImageUpload,
    handleGenerate,
    clearImage
  };
}
