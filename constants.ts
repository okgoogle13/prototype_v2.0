export interface TemplateStyle {
  id: string;
  name: string;
  layout: 'single' | 'two-column';
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontSans: string;
  fontSerif: string;
  headingColor: string;
  textColor: string;
  borderColor: string;
  bgLight: string;
}

export const RESUME_TEMPLATES: TemplateStyle[] = [
  {
    id: 'classic-burgundy',
    name: 'Classic',
    layout: 'single',
    primaryColor: '#7f1d1d', // red-900
    secondaryColor: '#991b1b', // red-800
    accentColor: '#dc2626', // red-600
    fontSans: "'Work Sans', sans-serif",
    fontSerif: "'Libre Bodoni', serif",
    headingColor: '#7f1d1d',
    textColor: '#111827',
    borderColor: '#fee2e2',
    bgLight: '#fef2f2'
  },
  {
    id: 'modern-slate',
    name: 'Modern',
    layout: 'single',
    primaryColor: '#0f172a', // slate-900
    secondaryColor: '#475569', // slate-600
    accentColor: '#0ea5e9', // sky-500
    fontSans: "'Work Sans', sans-serif",
    fontSerif: "'Work Sans', sans-serif",
    headingColor: '#0f172a',
    textColor: '#334155',
    borderColor: '#e2e8f0',
    bgLight: '#f8fafc'
  },
  {
    id: 'minimal-charcoal',
    name: 'ATS-Optimized',
    layout: 'single',
    primaryColor: '#171717', // neutral-900
    secondaryColor: '#404040', // neutral-700
    accentColor: '#737373', // neutral-500
    fontSans: "'Work Sans', sans-serif",
    fontSerif: "'Work Sans', sans-serif",
    headingColor: '#171717',
    textColor: '#262626',
    borderColor: '#e5e5e5',
    bgLight: '#fafafa'
  }
];
