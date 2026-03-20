import React from "react";
import { motion } from "motion/react";

type Props = {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  type?: string;
};

export function TextInput({ label, placeholder, value, onChange, onFocus, onBlur, onKeyDown, type = "text" }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-bold text-[var(--sys-color-worker-ash-base)] uppercase tracking-widest">
        {label}
      </label>
      <motion.input
        type={type}
        whileFocus={{ scale: 1.01, x: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--sys-color-solidarityRed-base)';
          onFocus?.(e);
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--sys-color-outline-variant)';
          onBlur?.(e);
        }}
        onKeyDown={onKeyDown}
        className="w-full p-4 border text-lg type-melancholyLonging focus:outline-none focus:shadow-[var(--sys-shadow-elevation2Placard)] text-[var(--sys-color-paperWhite-base)] transition-colors"
        style={{ 
          borderRadius: 'var(--sys-shape-blockRiot01)',
          background: 'var(--sys-color-charcoalBackground-steps-0)',
          borderColor: 'var(--sys-color-outline-variant)'
        }}
      />
    </div>
  );
}
