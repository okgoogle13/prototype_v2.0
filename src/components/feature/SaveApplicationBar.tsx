/**
 * CLASSIFICATION: Support Component Only
 * Prototype-only component.
 */
import React from "react";
import { motion } from "motion/react";
import { PrimaryButton } from "../ui/PrimaryButton";

export function SaveApplicationBar() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.2 }}
      className="mt-12 p-8 bg-[var(--sys-color-charcoalBackground-steps-2)] border border-[var(--sys-color-outline-variant)] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-[var(--sys-shadow-elevation4Float)]" 
      style={{ borderRadius: 'var(--sys-shape-alertShard01)' }}
    >
      <div>
        <h4 className="text-2xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] tracking-tight">Ready to submit?</h4>
        <p className="type-melancholyLonging text-[var(--sys-color-worker-ash-base)] mt-2">Save this application to your history to track its progress.</p>
      </div>
      <div className="flex gap-4">
        <PrimaryButton label="Export PDF" onClick={() => {}} variant="outlined" />
        <PrimaryButton label="Save to tracker" onClick={() => {}} variant="filled" />
      </div>
    </motion.div>
  );
}
