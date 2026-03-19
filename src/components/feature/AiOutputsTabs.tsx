import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";

export function AiOutputsTabs() {
  const [activeTab, setActiveTab] = useState('criteria');
  const [ignoredCriteria, setIgnoredCriteria] = useState<number[]>([]);

  const toggleCriteria = (id: number) => {
    setIgnoredCriteria(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const criteria = [
    { id: 1, title: "5+ years experience in React and TypeScript", required: true },
    { id: 2, title: "Experience with GraphQL and Node.js", required: false },
  ];

  return (
    <div className="mt-12">
      <div className="flex gap-4 mb-8 border-b-2 border-[var(--sys-color-concreteGrey-steps-0)] pb-4 relative">
        <TabButton label="Extracted Criteria" active={activeTab === 'criteria'} onClick={() => setActiveTab('criteria')} id="criteria" />
        <TabButton label="Profile Match" active={activeTab === 'match'} onClick={() => setActiveTab('match')} id="match" />
        <TabButton label="Cover Letter Draft" active={activeTab === 'cover'} onClick={() => setActiveTab('cover')} id="cover" />
      </div>

      <Card className="p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {activeTab === 'criteria' && (
              <div className="space-y-6">
                <h3 className="text-3xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight">Identified Filters</h3>
                <p className="type-melancholyLonging text-lg text-[var(--sys-color-worker-ash-base)]">
                  The following key selection criteria were extracted from the job description.
                </p>
                {criteria.map(c => (
                  <motion.div 
                    key={c.id}
                    whileHover={{ scale: 1.01, rotate: ignoredCriteria.includes(c.id) ? 0 : (c.id % 2 === 0 ? -0.5 : 0.5) }}
                    className={`p-6 border-2 border-[var(--sys-color-concreteGrey-steps-0)] cursor-default transition-opacity ${ignoredCriteria.includes(c.id) ? 'opacity-40 bg-[var(--sys-color-charcoalBackground-steps-1)]' : 'bg-[var(--sys-color-charcoalBackground-steps-2)]'}`}
                    style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-mono text-sm text-[var(--sys-color-stencilYellow-base)] uppercase tracking-widest">Criteria 0{c.id}</p>
                      <div className="flex items-center gap-4">
                        <Badge label={c.required ? "Required" : "Nice to have"} variant={c.required ? "danger" : "success"} />
                        <button 
                          onClick={() => toggleCriteria(c.id)}
                          className="text-2xl text-[var(--sys-color-paperWhite-base)] hover:text-[var(--sys-color-solidarityRed-base)] transition-colors"
                        >
                          {ignoredCriteria.includes(c.id) ? '+' : '×'}
                        </button>
                      </div>
                    </div>
                    <p className={`text-xl font-bold ${ignoredCriteria.includes(c.id) ? 'text-[var(--sys-color-worker-ash-base)] line-through' : 'text-[var(--sys-color-paperWhite-base)]'}`}>{c.title}</p>
                  </motion.div>
                ))}
              </div>
            )}
            {activeTab === 'match' && (
              <div>
                <h3 className="text-3xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight mb-6">Gap Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border-2 border-[var(--sys-color-concreteGrey-steps-0)] bg-[var(--sys-color-charcoalBackground-steps-2)]" style={{ borderRadius: 'var(--sys-shape-blockRiot02)' }}>
                    <span className="text-lg text-[var(--sys-color-paperWhite-base)] font-bold">React & TypeScript</span>
                    <Badge label="Strong Match" variant="success" />
                  </div>
                  <div className="flex items-center justify-between p-4 border-2 border-[var(--sys-color-concreteGrey-steps-0)] bg-[var(--sys-color-charcoalBackground-steps-2)]" style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}>
                    <span className="text-lg text-[var(--sys-color-paperWhite-base)] font-bold">GraphQL</span>
                    <Badge label="Missing" variant="danger" />
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'cover' && (
              <div>
                <h3 className="text-3xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tight mb-6">Drafted Response</h3>
                <div className="p-6 bg-[var(--sys-color-charcoalBackground-steps-2)] border-2 border-[var(--sys-color-concreteGrey-steps-0)]" style={{ borderRadius: 'var(--sys-shape-blockRiot03)' }}>
                  <p className="type-melancholyLonging text-[var(--sys-color-worker-ash-base)] whitespace-pre-line">
                    Dear Hiring Manager,
                    {"\n\n"}
                    I am writing to express my strong interest in the Senior Frontend Engineer position at TechCorp Inc. With over 6 years of experience building scalable web applications using React and TypeScript, I am confident in my ability to contribute effectively to your team.
                    {"\n\n"}
                    While I don't have direct production experience with GraphQL, my solid foundation in REST APIs and Node.js allows me to quickly adapt to new data fetching paradigms.
                    {"\n\n"}
                    Sincerely,
                    {"\n"}
                    [Your Name]
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}

function TabButton({ label, active, onClick, id }: { label: string, active: boolean, onClick: () => void, id: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative px-6 py-3 font-bold uppercase tracking-wider text-sm transition-colors z-10 ${
        active 
          ? 'text-[var(--sys-color-paperWhite-base)]' 
          : 'text-[var(--sys-color-worker-ash-base)] hover:text-[var(--sys-color-paperWhite-base)]'
      }`}
    >
      {active && (
        <motion.div
          layoutId="activeTabIndicator"
          className="absolute inset-0 bg-[var(--sys-color-solidarityRed-base)] border-2 border-[var(--sys-color-solidarityRed-base)] -z-10"
          style={{ borderRadius: 'var(--sys-shape-blockRiot01)' }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      )}
      {label}
    </button>
  );
}
