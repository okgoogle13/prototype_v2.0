import React from "react";
import { motion } from "motion/react";

type Props = {
  label: string;
  onClick: () => void;
  variant?: 'strike' | 'march';
  disabled?: boolean;
};

export function PrimaryButton({ label, onClick, variant = 'strike', disabled }: Props) {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-4 font-bold text-lg uppercase tracking-wider transition-colors overflow-hidden group";
  
  const variantClasses = variant === 'strike' 
    ? "text-[var(--sys-color-paperWhite-base)] shadow-[var(--sys-shadow-elevation2Placard)]"
    : "text-[var(--sys-color-paperWhite-base)] border-2";

  const shape = variant === 'strike' ? 'var(--sys-shape-blockRiot03)' : 'var(--sys-shape-blockRiot01)';
  const bg = variant === 'strike' ? 'var(--sys-color-solidarityRed-base)' : 'var(--sys-color-charcoalBackground-steps-3)';
  const borderColor = variant === 'strike' ? 'transparent' : 'var(--sys-color-concreteGrey-steps-0)';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02, rotate: variant === 'strike' ? -1 : 1 } : {}}
      whileTap={!disabled ? { scale: 0.95, rotate: 0 } : {}}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseClasses} ${variantClasses} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      style={{ 
        borderRadius: shape,
        background: bg,
        borderColor: borderColor
      }}
      onMouseEnter={(e) => {
        if (!disabled && variant === 'march') {
          e.currentTarget.style.borderColor = 'var(--sys-color-paperWhite-base)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && variant === 'march') {
          e.currentTarget.style.borderColor = 'var(--sys-color-concreteGrey-steps-0)';
        }
      }}
    >
      <span className="relative z-10">{label}</span>
      {variant === 'strike' && !disabled && (
        <div 
          className="absolute inset-0 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out z-0"
          style={{ background: 'var(--sys-color-inkGold-base)' }}
        ></div>
      )}
      {variant === 'strike' && !disabled && (
        <span className="absolute inset-0 z-10 flex items-center justify-center text-[var(--sys-color-charcoalBackground-base)] translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-in-out">
          {label}
        </span>
      )}
    </motion.button>
  );
}
