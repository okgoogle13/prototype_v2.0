import React from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { WorkspaceLayout } from "../components/layout/WorkspaceLayout";
import { SolidarityPageLayout } from "../components/layout/SolidarityPageLayout";
import { LayeredHero } from "../components/layout/LayeredHero";
import { JobInputPanel } from "../components/feature/JobInputPanel";
import { AiOutputsTabs } from "../components/feature/AiOutputsTabs";
import { SaveApplicationBar } from "../components/feature/SaveApplicationBar";
import { PrimaryButton } from "../components/ui/PrimaryButton";

export function ApplicationWorkspacePage() {
  const navigate = useNavigate();

  const handleLoadSampleProfile = () => {
    // Mock data
    const mockProfile = {
      workExperience: [{ title: "Software Engineer", company: "TechCorp" }],
      skills: ["React", "TypeScript"]
    };
    console.log("Loading sample profile:", mockProfile);
    // Navigate to Profile & Settings
    navigate('/profile');
  };

  return (
    <SolidarityPageLayout
      heroNode={
        <LayeredHero 
          imageUrl="https://picsum.photos/seed/workspace/1920/1080?blur=2" 
          altText="Workspace Hero" 
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
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-12 flex justify-between items-center">
            <div>
              <h1 className="text-7xl type-extremeVariableContrast text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-4">
                Application <br/><span className="text-[var(--sys-color-solidarityRed-base)]">Workspace</span>
              </h1>
              <p className="text-xl type-laborExploitationPressure text-[var(--sys-color-stencilYellow-base)] uppercase tracking-widest">
                NO NEUTRAL CANVAS. TAILOR YOUR RESPONSE.
              </p>
            </div>
            <PrimaryButton label="Load Sample Profile" onClick={handleLoadSampleProfile} variant="march" />
          </motion.div>
          
          <div className="space-y-12">
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <JobInputPanel />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <AiOutputsTabs />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              <SaveApplicationBar />
            </motion.div>
          </div>
        </motion.div>
      </WorkspaceLayout>
    </SolidarityPageLayout>
  );
}
