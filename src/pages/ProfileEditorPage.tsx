import React, { useState } from "react";
import { motion } from "motion/react";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { LayeredHero } from "../components/layout/LayeredHero";
import { SectionHeader } from "../components/ui/SectionHeader";
import { TextInput } from "../components/ui/TextInput";
import { PrimaryButton } from "../components/ui/PrimaryButton";
import { DocumentInput } from "../../components/DocumentInput";
import { Modal } from "../components/ui/Modal";

export function ProfileEditorPage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <SolidarityPageLayout
      heroNode={
        <LayeredHero 
          imageUrl="https://picsum.photos/seed/profile/1920/1080?blur=2" 
          altText="Profile Hero" 
        />
      }
    >
      <WorkspaceLayout>
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-12">
            <h1 className="text-7xl type-extremeVariableContrast text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-4">
              Base <br/><span className="text-[var(--sys-color-solidarityRed-base)]">Profile</span>
            </h1>
            <p className="text-xl type-laborExploitationPressure text-[var(--sys-color-stencilYellow-base)] uppercase tracking-widest">
              YOUR FOUNDATION. THE RAW MATERIAL.
            </p>
          </motion.div>
          
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="p-10 bg-[var(--sys-color-charcoalBackground-steps-1)] border-2 border-[var(--sys-color-concreteGrey-steps-0)] shadow-[var(--sys-shadow-elevation2Placard)] relative overflow-hidden mb-12" 
            style={{ borderRadius: 'var(--sys-shape-placardTorn01)' }}
          >
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('https://www.transparenttextures.com/patterns/wall-4-light.png')]" />
            
            <div className="relative z-10">
              <SectionHeader 
                title="Resume / CV" 
                subtitle="Upload your resume or paste raw text. We will use this to tailor your applications."
              />
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <TextInput label="Full Name" placeholder="e.g. Jane Doe" />
                  <TextInput label="Email Address" placeholder="e.g. jane@example.com" type="email" />
                </div>
                <DocumentInput onProcess={(files, rawText) => {}} isLoading={false} />
                <div className="flex justify-end">
                  <PrimaryButton label="Save Profile" onClick={() => {}} variant="strike" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="p-10 bg-[var(--sys-color-charcoalBackground-steps-1)] border-2 border-[var(--sys-color-concreteGrey-steps-0)] shadow-[var(--sys-shadow-elevation2Placard)] relative overflow-hidden" 
            style={{ borderRadius: 'var(--sys-shape-placardTorn01)' }}
          >
            <div className="relative z-10">
              <SectionHeader title="Settings" subtitle="Manage your profile settings." />
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-wider text-[var(--sys-color-worker-ash-base)] mb-2">Locale Formatting</label>
                  <select className="w-full p-4 bg-[var(--sys-color-charcoalBackground-steps-2)] border-2 border-[var(--sys-color-concreteGrey-steps-0)] text-[var(--sys-color-paperWhite-base)]" style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}>
                    <option value="en-US">US English</option>
                    <option value="en-GB">UK English</option>
                    <option value="en-AU">AUS English</option>
                  </select>
                </div>
                <div className="pt-8 border-t-2 border-[var(--sys-color-concreteGrey-steps-0)]">
                  <button 
                    onClick={() => setShowDeleteModal(true)}
                    className="px-8 py-4 bg-[var(--sys-color-kr-charcoalRed-base)] text-[var(--sys-color-paperWhite-base)] font-bold text-lg uppercase tracking-wider transition-all hover:bg-[var(--sys-color-solidarityRed-base)]"
                    style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
                  >
                    Delete My Data
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
