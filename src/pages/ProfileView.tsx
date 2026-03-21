/**
 * CLASSIFICATION: Support-Reference Page
 * Prototype-only reference page.
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { TextInput } from "../components/ui/TextInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { DocumentInput } from "../../components/DocumentInput";
import { Modal } from "../components/ui/Modal";
import { AutocompleteInput } from "../components/ui/AutocompleteInput";
import { commonIndustrySkills } from "../utils/skills";

import { User } from 'firebase/auth';
import { processCareerDocuments } from "../../services/geminiService";
import { CareerDatabase } from "../../types";
import { saveUserCareerData, getUserCareerData } from "../../services/firebase";

interface Props {
  user?: User | null;
}

export function ProfileView({ user }: Props) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>([]);
  const [completeness, setCompleteness] = useState(25);
  const [skills, setSkills] = useState<string[]>([]);
  const [suggestedSkills, setSuggestedSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [docCount, setDocCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [processError, setProcessError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState("identity");

  const sections = [
    { id: "identity", label: "Identity", icon: "User" },
    { id: "documents", label: "Career Documents", icon: "FileText" },
    { id: "skills", label: "Skills", icon: "Zap" },
    { id: "integrations", label: "Integrations", icon: "Link" },
    { id: "settings", label: "Settings", icon: "Settings" },
  ];

  // Load data from Firestore or Google Auth
  useEffect(() => {
    if (user?.uid) {
      getUserCareerData(user.uid).then(data => {
        if (data) {
          setFullName(data.Personal_Information.FullName || "");
          setEmail(data.Personal_Information.Email || "");
          setPhone(data.Personal_Information.Phone || "");
          setLocation(data.Personal_Information.Location || "");
          setPortfolioUrls(data.Personal_Information.Portfolio_Website_URLs || []);
          setSkills(data.Master_Skills_Inventory.map(s => s.Skill_Name) || []);
          setDocCount(data.Saved_Documents?.length || 0);
          
          // Calculate completeness based on data
          let score = 25;
          if (data.Personal_Information.FullName) score += 15;
          if (data.Personal_Information.Email) score += 10;
          if (data.Master_Skills_Inventory.length > 0) score += 25;
          if (data.Saved_Documents && data.Saved_Documents.length > 0) score += 25;
          setCompleteness(Math.min(100, score));
        } else {
          // Auto-populate from Google account if no Firestore data exists
          if (user.displayName) setFullName(user.displayName);
          if (user.email) setEmail(user.email);
        }
      });
    }
  }, [user]);

  const handleSave = async () => {
    if (!user?.uid) return;
    setIsSaving(true);
    try {
      const data: any = {
        Personal_Information: {
          FullName: fullName,
          Email: email,
          Phone: phone,
          Location: location,
          Portfolio_Website_URLs: portfolioUrls
        },
        Master_Skills_Inventory: skills.map(s => ({
          Skill_Name: s,
          Category: "General",
          Subtype: []
        })),
        Career_Profile: {
          Target_Titles: [],
          Master_Summary_Points: []
        },
        Career_Entries: [],
        Structured_Achievements: [],
        KSC_Responses: []
      };
      await saveUserCareerData(user.uid, data);
    } catch (err) {
      console.error("Save failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLoadSampleProfile = () => {
    setFullName("Jane Doe");
    setEmail("jane.doe@example.com");
    setSkills(["React", "TypeScript", "Node.js", "Tailwind CSS"]);
    setCompleteness(100);
    setDocCount(3);
  };

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleProcessDocuments = async (files: File[], rawText?: string, fileData?: { data: string; mimeType: string }[]) => {
    setIsProcessing(true);
    setProcessError(null);
    try {
      let data: CareerDatabase | null = null;
      
      if (fileData && fileData.length > 0) {
        data = await processCareerDocuments(fileData.map(fd => ({ inlineData: fd })));
      } else if (rawText) {
        // If only text, we could still use processCareerDocuments by wrapping it
        data = await processCareerDocuments([{ inlineData: { data: btoa(rawText), mimeType: 'text/plain' } }]);
      }

      if (data) {
        // Update profile with extracted data
        if (data.Personal_Information.FullName) setFullName(data.Personal_Information.FullName);
        if (data.Personal_Information.Email) setEmail(data.Personal_Information.Email);
        if (data.Personal_Information.Phone) setPhone(data.Personal_Information.Phone);
        if (data.Personal_Information.Location) setLocation(data.Personal_Information.Location);
        if (data.Personal_Information.Portfolio_Website_URLs) {
          setPortfolioUrls(prev => Array.from(new Set([...prev, ...data!.Personal_Information.Portfolio_Website_URLs])));
        }
        
        const extractedSkills = data.Master_Skills_Inventory.map(s => s.Skill_Name);
        const newSuggestions = extractedSkills.filter(s => !skills.includes(s));
        setSuggestedSkills(prev => Array.from(new Set([...prev, ...newSuggestions])));
        
        setDocCount(files.length + (rawText ? 1 : 0));
        setCompleteness(Math.min(100, completeness + 40));
        
        // Switch to skills section to show suggestions
        setActiveSection("skills");
      }
    } catch (err) {
      console.error("Processing documents failed:", err);
      setProcessError("Failed to process documents. Please check your files and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <SolidarityPageLayout>
      <WorkspaceLayout>
        <div className="flex flex-col md:flex-row w-full h-full overflow-hidden">
          {/* LEFT PANE: User Profile & Nav */}
          <div className="w-full md:w-[280px] flex-shrink-0 p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] flex flex-col gap-8 overflow-y-auto rounded-t-[28px] md:rounded-l-[28px] md:rounded-tr-none md:rounded-br-none">
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-24 h-24 rounded-full bg-[var(--sys-color-charcoalBackground-steps-3)] overflow-hidden flex items-center justify-center border-4 border-[var(--sys-color-outline-variant)]">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <span className="text-3xl font-bold text-[var(--sys-color-paperWhite-base)]">{fullName.charAt(0) || "U"}</span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)]">{fullName || "Anonymous User"}</h2>
                <p className="text-sm text-[var(--sys-color-worker-ash-base)] truncate w-full max-w-[240px]">{email}</p>
              </div>

              <div className="flex items-center gap-3 mt-2">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[var(--sys-color-charcoalBackground-steps-3)]"
                      strokeWidth="3"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="text-[var(--sys-color-inkGold-base)]"
                      strokeWidth="3"
                      strokeDasharray={`${completeness}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[var(--sys-color-paperWhite-base)]">
                    {completeness}%
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest font-bold">Profile</p>
                  <p className="text-xs text-[var(--sys-color-paperWhite-base)] font-bold uppercase">Complete</p>
                </div>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full text-left transition-all ${
                    activeSection === section.id
                      ? "bg-[var(--sys-color-charcoalBackground-steps-3)] text-[var(--sys-color-paperWhite-base)] font-bold"
                      : "text-[var(--sys-color-worker-ash-base)] hover:bg-[var(--sys-color-charcoalBackground-steps-3)]/50"
                  }`}
                >
                  <span className="uppercase tracking-wider text-sm">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* RIGHT PANE: Section Content */}
          <div className="flex-1 min-width-0 bg-[var(--sys-color-charcoalBackground-steps-1)] flex flex-col overflow-hidden rounded-b-[28px] md:rounded-r-[28px] md:rounded-tl-none md:rounded-bl-none">
            {/* Sticky Save Header */}
            <div className="sticky top-0 z-10 bg-[var(--sys-color-charcoalBackground-steps-1)]/80 backdrop-blur-md border-b border-[var(--sys-color-outline-variant)] py-4 px-8 flex items-center justify-between">
              <h2 className="text-xl font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">
                {sections.find(s => s.id === activeSection)?.label}
              </h2>
              <PrimaryButton 
                label={isSaving ? "Saving..." : "Save Changes"} 
                onClick={handleSave} 
                variant="strike" 
                disabled={isSaving}
              />
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-3xl"
                >
                  {activeSection === "identity" && (
                    <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                      <h3 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6">Identity</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput label="Full Name" placeholder="e.g. Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <TextInput label="Email Address" placeholder="e.g. jane@example.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextInput label="Phone Number" placeholder="e.g. +1 234 567 890" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <TextInput label="Location" placeholder="e.g. New York, NY" value={location} onChange={(e) => setLocation(e.target.value)} />
                      </div>
                      
                      {portfolioUrls.length > 0 && (
                        <div className="mt-8">
                          <label className="block text-sm font-bold uppercase tracking-wider text-[var(--sys-color-worker-ash-base)] mb-4">Portfolio & Social Links</label>
                          <div className="flex flex-wrap gap-3">
                            {portfolioUrls.map((url, i) => (
                              <div key={i} className="px-4 py-2 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] text-xs truncate max-w-[240px] rounded-full">
                                {url}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-6 text-right">
                        <button onClick={handleLoadSampleProfile} className="text-sm text-[var(--sys-color-primary-base)] hover:underline">
                          Load Sample Profile
                        </button>
                      </div>
                    </div>
                  )}

                  {activeSection === "documents" && (
                    <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                      <h3 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6">Career Documents</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-6">Upload your resume or paste raw text. We will use this to tailor your applications.</p>
                      {processError && (
                        <div className="mb-6 p-4 bg-[var(--sys-color-kr-charcoalRed-base)]/10 border border-[var(--sys-color-kr-charcoalRed-base)] text-[var(--sys-color-kr-charcoalRed-base)] font-bold uppercase tracking-wider text-sm rounded-lg">
                          {processError}
                        </div>
                      )}
                      <DocumentInput onProcess={handleProcessDocuments} isLoading={isProcessing} hideTitle={true} />
                    </div>
                  )}

                  {activeSection === "skills" && (
                    <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                      <h3 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6">Skills</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-6">Add your technical and soft skills. These will be used to match you with job opportunities.</p>
                      <div className="flex flex-wrap gap-3 mb-8">
                        {skills.map(skill => (
                          <motion.div
                            key={skill}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2 px-4 py-2 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-wider text-sm rounded-full"
                          >
                            {skill}
                            <button 
                              onClick={() => removeSkill(skill)}
                              className="text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-solidarityRed-base)] transition-colors"
                            >
                              ✕
                            </button>
                          </motion.div>
                        ))}
                      </div>

                      {suggestedSkills.length > 0 && (
                        <div className="mb-8 p-6 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-inkGold-base)]/30 rounded-2xl">
                          <h4 className="text-sm font-bold uppercase tracking-widest text-[var(--sys-color-inkGold-base)] mb-4 flex items-center gap-2">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                            </svg>
                            Suggested from Documents
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {suggestedSkills.map(skill => (
                              <button
                                key={skill}
                                onClick={() => {
                                  addSkill(skill);
                                  setSuggestedSkills(prev => prev.filter(s => s !== skill));
                                }}
                                className="px-3 py-1.5 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] text-xs font-bold uppercase tracking-wider hover:border-[var(--sys-color-inkGold-base)] hover:text-[var(--sys-color-paperWhite-base)] transition-all flex items-center gap-2 rounded-full"
                              >
                                + {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <AutocompleteInput 
                            label="Add Skill" 
                            placeholder="e.g. React, Project Management..." 
                            value={newSkill} 
                            onChange={setNewSkill}
                            onEnter={() => addSkill(newSkill)}
                            suggestions={[...commonIndustrySkills, ...skills]}
                          />
                        </div>
                        <PrimaryButton 
                          label="Add" 
                          onClick={() => addSkill(newSkill)} 
                          variant="tonal" 
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === "integrations" && (
                    <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                      <h3 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6">Integrations</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-8">Connect your external tools to automate your job search.</p>
                      
                      <div className="space-y-4">
                        <IntegrationCard 
                          name="Gmail Scan" 
                          desc="Automatically detect job application emails and update your tracker."
                          status="Connected"
                          lastSync="2 hours ago"
                          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                        />
                        <IntegrationCard 
                          name="Job Scout" 
                          desc="Sync clipped jobs from the CareerCopilot Chrome Extension."
                          status="Connected"
                          lastSync="15 mins ago"
                          icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>}
                        />
                        <IntegrationCard 
                          name="LinkedIn" 
                          desc="Import your profile data and job history directly."
                          status="Disconnected"
                          icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                        />
                      </div>
                    </div>
                  )}

                  {activeSection === "settings" && (
                    <div className="bg-[var(--sys-color-charcoalBackground-steps-2)] p-8 rounded-[28px] border border-[var(--sys-color-outline-variant)]">
                      <h3 className="text-[22px] leading-[28px] font-bold type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase mb-6">Settings</h3>
                      <p className="text-[var(--sys-color-worker-ash-base)] mb-6">Manage your profile settings.</p>
                      <div className="mb-8">
                        <label className="block text-sm font-bold uppercase tracking-wider text-[var(--sys-color-worker-ash-base)] mb-2">Locale Formatting</label>
                        <select className="w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-paperWhite-base)] rounded-lg">
                          <option value="en-US">US English</option>
                          <option value="en-GB">UK English</option>
                          <option value="en-AU">AUS English</option>
                        </select>
                      </div>
                      <div className="pt-8 border-t border-[var(--sys-color-outline-variant)]">
                        <button 
                          onClick={() => setShowDeleteModal(true)}
                          className="px-8 py-4 bg-[var(--sys-color-kr-charcoalRed-base)] text-[var(--sys-color-paperWhite-base)] font-bold text-lg uppercase tracking-wider transition-all hover:bg-[var(--sys-color-solidarityRed-base)] rounded-lg"
                        >
                          Delete My Data
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </WorkspaceLayout>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete My Data">
        <div className="p-8">
          <p className="text-[var(--sys-color-worker-ash-base)] mb-8">Are you sure you want to delete all your data? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <PrimaryButton label="Cancel" onClick={() => setShowDeleteModal(false)} variant="march" />
            <PrimaryButton label="Delete" onClick={() => { setShowDeleteModal(false); console.log("Data deleted"); }} variant="strike" />
          </div>
        </div>
      </Modal>
    </SolidarityPageLayout>
  );
}

function IntegrationCard({ name, desc, status, lastSync, icon }: any) {
  const isConnected = status === "Connected";
  return (
    <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-3)] border border-[var(--sys-color-outline-variant)] rounded-2xl flex items-start gap-6">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isConnected ? 'bg-[var(--sys-color-inkGold-base)]/10 text-[var(--sys-color-inkGold-base)]' : 'bg-[var(--sys-color-charcoalBackground-steps-2)] text-[var(--sys-color-worker-ash-base)]'}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-bold text-[var(--sys-color-paperWhite-base)] uppercase tracking-wider">{name}</h4>
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded ${isConnected ? 'bg-[var(--sys-color-kr-activistSmokeGreen-base)]/20 text-[var(--sys-color-kr-activistSmokeGreen-base)]' : 'bg-[var(--sys-color-charcoalBackground-steps-2)] text-[var(--sys-color-worker-ash-base)]'}`}>
            {status}
          </span>
        </div>
        <p className="text-xs text-[var(--sys-color-worker-ash-base)] mb-3">{desc}</p>
        {lastSync && (
          <p className="text-[10px] text-[var(--sys-color-worker-ash-base)] italic">Last sync: {lastSync}</p>
        )}
      </div>
      <button className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${isConnected ? 'border border-[var(--sys-color-outline-variant)] text-[var(--sys-color-worker-ash-base)] hover:bg-[var(--sys-color-kr-charcoalRed-base)] hover:text-[var(--sys-color-paperWhite-base)]' : 'bg-[var(--sys-color-solidarityRed-base)] text-[var(--sys-color-paperWhite-base)] hover:bg-[var(--sys-color-solidarityRed-steps-3)]'}`}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
