import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { CareerDatabase, EntryType } from '../types';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ArrowPathIcon } from './icons/ArrowPathIcon';

interface UserProfileProps {
  user: User;
  data: CareerDatabase | null;
  onClose: () => void;
  onDeleteData: (uid: string) => Promise<void>;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user, data, onClose, onDeleteData }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const displayName = user.displayName || user.email;
  const photoURL = user.photoURL;
  const downloadJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal_information.full_name.replace(/\s+/g, '_')}_Master_Database.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadMasterResume = () => {
    if (!data) return;

    let md = `# MASTER RESUME: ${data.personal_information.full_name.toUpperCase()}\n`;
    md += `**Generated:** ${new Date().toLocaleDateString()}\n\n`;
    md += `> **Note:** This Master Resume is a comprehensive repository of your entire career history. It contains every role, skill, project, and achievement without duplication. Use this document as your "Source of Truth" to copy-paste into targeted applications.\n\n`;
    
    // Contact Info
    md += `## CONTACT INFORMATION\n`;
    md += `**${data.personal_information.full_name}**\n`;
    md += `${data.personal_information.email} | ${data.personal_information.phone} | ${data.personal_information.location}\n`;
    if (data.personal_information.portfolio_website_urls.length > 0) {
      md += `**Links:** ${data.personal_information.portfolio_website_urls.join(', ')}\n`;
    }
    md += `\n---\n\n`;

    // 1. Professional Summary
    md += `## PROFESSIONAL SUMMARY\n\n`;
    data.career_profile.master_summary_points.forEach(p => md += `- ${p}\n`);
    md += `\n`;

    // 2. Comprehensive Skills Inventory
    if (data.master_skills_inventory.length > 0) {
      md += `## SKILLS & COMPETENCIES\n\n`;
      const groupedSkills: Record<string, string[]> = {};
      data.master_skills_inventory.forEach(s => {
        if (!groupedSkills[s.category]) groupedSkills[s.category] = [];
        groupedSkills[s.category].push(s.skill_name);
      });

      for (const [category, skills] of Object.entries(groupedSkills)) {
        md += `### ${category}\n${skills.join(', ')}\n\n`;
      }
    }

    // Helper for sections
    const renderSection = (title: string, type: EntryType) => {
      const entries = data.career_entries.filter(e => e.entry_type === type);
      if (entries.length === 0) return '';

      let sectionMd = `## ${title}\n\n`;
      entries.forEach(entry => {
        sectionMd += `### ${entry.role} | ${entry.organization}\n`;
        sectionMd += `*${entry.start_date} — ${entry.end_date} | ${entry.location}*\n\n`;
        
        if (entry.core_responsibilities_scope) {
          sectionMd += `**Responsibilities:**\n${entry.core_responsibilities_scope}\n\n`;
        }

        const achievements = data.structured_achievements.filter(a => a.entry_id === entry.entry_id);
        if (achievements.length > 0) {
          sectionMd += `**Key Accomplishments:**\n`;
          achievements.forEach(a => {
            const metricStr = a.metric && a.metric !== 'X' ? ` [${a.metric}]` : '';
            sectionMd += `- ${a.action_verb} ${a.noun_task}${metricStr} by ${a.strategy}, resulting in ${a.outcome}.\n`;
          });
          sectionMd += `\n`;
        }
        
        // Include skills used in this specific role
        const entrySkills = new Set<string>();
        entry.subtype_tags.forEach(t => entrySkills.add(t));
        achievements.forEach(a => a.skills_used.forEach(s => entrySkills.add(s)));
        
        if (entrySkills.size > 0) {
             sectionMd += `*Skills Applied:* ${Array.from(entrySkills).join(', ')}\n\n`;
        }

        sectionMd += `---\n\n`;
      });
      return sectionMd;
    };

    // 3. Experience Sections (Full History)
    md += renderSection('PROFESSIONAL EXPERIENCE', EntryType.WORK_EXPERIENCE);
    md += renderSection('SPECIAL PROJECTS & ASSIGNMENTS', EntryType.PROJECT);
    md += renderSection('VOLUNTEER & COMMUNITY LEADERSHIP', EntryType.VOLUNTEER);
    
    // 4. Education & Certs
    md += renderSection('EDUCATION', EntryType.EDUCATION);
    md += renderSection('CERTIFICATIONS & LICENSES', EntryType.CERTIFICATION);

    // 5. Behavioral Library (KSC)
    if (data.ksc_responses.length > 0) {
      md += `## BEHAVIORAL EXAMPLES (STAR LIBRARY)\n\n`;
      data.ksc_responses.forEach(ksc => {
        md += `### ${ksc.ksc_prompt}\n\n`;
        md += `**Situation:** ${ksc.situation}\n`;
        md += `**Task:** ${ksc.task}\n`;
        md += `**Action:** ${ksc.action}\n`;
        md += `**Result:** ${ksc.result}\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.personal_information.full_name.replace(/\s+/g, '_')}_Master_Resume.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeleteData = async () => {
    if (window.confirm("Are you sure you want to delete ALL your career data? This action cannot be undone.")) {
      setIsDeleting(true);
      try {
        await onDeleteData(user.uid);
        onClose();
      } catch (error) {
        alert("Failed to delete data. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const stats = {
    entries: data?.career_entries.length || 0,
    achievements: data?.structured_achievements.length || 0,
    kscs: data?.ksc_responses.length || 0,
    skills: data?.master_skills_inventory.length || 0
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[color-mix(in_srgb,var(--sys-color-charcoalBackground-base)_85%,transparent)] backdrop-blur-sm" style={{ animation: 'var(--motion-fadeIn, none)' }}>
      <div style={{ background: 'var(--sys-color-charcoalBackground-steps-1)', borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--sys-shape-blockRiot02)' }} className="w-full max-w-lg shadow-2xl overflow-hidden">
        <div style={{ borderBottomColor: 'var(--sys-color-concreteGrey-steps-0)', borderBottomWidth: 1, borderBottomStyle: 'solid', background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)' }} className="p-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] flex items-center gap-2">
            <DocumentTextIcon className="w-6 h-6 text-[var(--sys-color-inkGold-base)]" />
            User Profile & Master Data
          </h3>
          <button onClick={onClose} className="text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)] text-2xl leading-none">&times;</button>
        </div>

        <div className="p-8">
          <div className="flex flex-col items-center mb-8">
            {photoURL ? (
              <img 
                src={photoURL} 
                alt={displayName || 'User'} 
                style={{ borderRadius: 'var(--sys-shape-sentryAvatar)', borderColor: 'color-mix(in srgb, var(--sys-color-inkGold-base) 20%, transparent)', borderWidth: 4, borderStyle: 'solid' }} className="w-24 h-24 mb-4 shadow-lg"
              />
            ) : (
              <div style={{ borderRadius: 'var(--sys-shape-sentryAvatar)', background: 'var(--sys-color-charcoalBackground-steps-2)', borderColor: 'color-mix(in srgb, var(--sys-color-inkGold-base) 20%, transparent)', borderWidth: 4, borderStyle: 'solid' }} className="w-24 h-24 flex items-center justify-center mb-4 shadow-lg">
                 <span className="text-3xl font-bold text-[var(--sys-color-inkGold-base)]">{displayName?.charAt(0) || user.email?.charAt(0)}</span>
              </div>
            )}
            <h4 className="text-2xl font-bold text-[var(--sys-color-paperWhite-base)]">{displayName || 'Anonymous User'}</h4>
            <p className="text-[var(--sys-color-concreteGrey-base)]">{user.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div style={{ background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)', borderRadius: 'var(--sys-shape-blockRiot01)', borderColor: 'color-mix(in srgb, var(--sys-color-concreteGrey-steps-0) 60%, transparent)', borderWidth: 1, borderStyle: 'solid' }} className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--sys-color-solidarityRed-base)]">{stats.entries}</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--sys-color-concreteGrey-base)] font-bold">Entries</p>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)', borderRadius: 'var(--sys-shape-blockRiot01)', borderColor: 'color-mix(in srgb, var(--sys-color-concreteGrey-steps-0) 60%, transparent)', borderWidth: 1, borderStyle: 'solid' }} className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--sys-color-stencilYellow-base)]">{stats.achievements}</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--sys-color-concreteGrey-base)] font-bold">Achievements</p>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)', borderRadius: 'var(--sys-shape-blockRiot01)', borderColor: 'color-mix(in srgb, var(--sys-color-concreteGrey-steps-0) 60%, transparent)', borderWidth: 1, borderStyle: 'solid' }} className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--sys-color-inkGold-base)]">{stats.kscs}</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--sys-color-concreteGrey-base)] font-bold">STAR Responses</p>
            </div>
            <div style={{ background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)', borderRadius: 'var(--sys-shape-blockRiot01)', borderColor: 'color-mix(in srgb, var(--sys-color-concreteGrey-steps-0) 60%, transparent)', borderWidth: 1, borderStyle: 'solid' }} className="p-4 text-center">
              <p className="text-2xl font-bold text-[var(--sys-color-worker-ash-base)]">{stats.skills}</p>
              <p className="text-[10px] uppercase tracking-widest text-[var(--sys-color-concreteGrey-base)] font-bold">Skills</p>
            </div>
          </div>

          <div className="space-y-4">
            <button 
              onClick={downloadMasterResume}
              disabled={!data}
              style={{ background: 'var(--sys-color-solidarityRed-base)', borderRadius: 'var(--sys-shape-blockRiot02)' }}
              className="w-full py-4 text-[var(--sys-color-paperWhite-base)] font-bold transition-all flex items-center justify-center gap-2 shadow-lg group transform hover:scale-[1.02] disabled:bg-[var(--sys-color-charcoalBackground-steps-2)] disabled:text-[var(--sys-color-concreteGrey-base)]/40 hover:bg-[var(--sys-color-solidarityRed-steps-1)]"
            >
              <DocumentTextIcon className="w-6 h-6" />
              <span className="text-lg">Download Master Resume</span>
            </button>
            <button 
              onClick={downloadJSON}
              disabled={!data}
              style={{ background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-steps-2) 60%, transparent)', borderRadius: 'var(--sys-shape-blockRiot01)', borderColor: 'color-mix(in srgb, var(--sys-color-concreteGrey-base)]/30', borderWidth: 1, borderStyle: 'solid' }}
              className="w-full py-3 text-[var(--sys-color-worker-ash-base)] font-medium transition-all flex items-center justify-center gap-2 hover:bg-[var(--sys-color-charcoalBackground-steps-3)]"
            >
              <ArrowPathIcon className="w-4 h-4" />
              <span>Export Raw JSON Database</span>
            </button>
            <button 
              onClick={handleDeleteData}
              disabled={isDeleting || !data}
              style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
              className="w-full py-3 text-[var(--sys-color-solidarityRed-base)] font-medium transition-all flex items-center justify-center gap-2 mt-4 bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_20%,transparent)] hover:bg-[color-mix(in_srgb,var(--sys-color-solidarityRed-base)_35%,transparent)] border border-[var(--sys-color-solidarityRed-base)]/30 hover:border-[var(--sys-color-solidarityRed-base)]/50"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>{isDeleting ? 'Deleting...' : 'Delete All Data'}</span>
            </button>
          </div>
          
          {!data && (
            <p className="mt-4 text-xs text-center text-[var(--sys-color-stencilYellow-base)] font-medium">
              * Process your career documents first to generate your master data.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
