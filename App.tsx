
/**
 * CLASSIFICATION: Top-Level Shell / Router Shim
 * This file handles prototype-only navigation state. 
 * Canonical routing is owned by the main CareerCopilot repository.
 */
import React, { useState, useEffect } from 'react';
import { AppShell } from './src/components/layout/AppShell';
import { ApplyQuickWorkspaceReference } from './src/pages/ApplyQuickWorkspaceReference';
import { ProfileView } from './src/pages/ProfileView';
import { PastApplicationsReference } from './src/pages/PastApplicationsReference';
import { LibraryReferencePage } from './src/pages/LibraryReferencePage';
import { OptimisePage } from './src/pages/ImageStudioPage';
import { OnboardingPathBifurcation } from './src/pages/OnboardingPathBifurcation';
import { useUserStore } from './src/hooks/useUserStore';
import { JobInputPanel } from './src/components/feature/JobInputPanel';
import { auth, signIn, logout } from './services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useChromeExtension } from './hooks/useChromeExtension';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { hasCompletedOnboarding, onboardingPath } = useUserStore();
  
  // Prototype-only activeTab state. Canonical routing belongs to the main repo.
  const [activeTab, setActiveTab] = useState<'WORKSPACE' | 'PROFILE' | 'PAST' | 'OPTIMISE' | 'LIBRARY' | 'LOOKOUT' | 'PREP'>('WORKSPACE');
  const [initialJobData, setInitialJobData] = useState<{title: string, company: string, text: string} | null>(null);

  useEffect(() => {
    if (hasCompletedOnboarding && onboardingPath) {
      setActiveTab(onboardingPath);
    }
  }, [hasCompletedOnboarding, onboardingPath]);
  const { isExtension } = useChromeExtension();

  // Auth Listener
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      if (timeoutId) clearTimeout(timeoutId);
    });

    // Fallback: if auth takes too long (e.g. config missing), stop loading
    timeoutId = setTimeout(() => {
      setIsAuthLoading(false);
    }, 5000);

    return () => {
      unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isExtension]);

  const handleLogin = async () => {
    try {
        await signIn();
    } catch (err) {
        console.error("Login failed", err);
    }
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsGuest(false);
    setActiveTab('WORKSPACE');
  };

  if (isAuthLoading) {
    return (
        <div 
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
        >
            <div 
              className="w-16 h-16 border-4 border-t-transparent animate-spin" 
              style={{ 
                borderColor: 'var(--sys-color-solidarityRed-base) transparent var(--sys-color-solidarityRed-base) var(--sys-color-solidarityRed-base)',
                borderRadius: 'var(--sys-shape-cutoutRiot01)'
              }}
            />
        </div>
    );
  }

  if (!user && !isGuest) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
        style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
      >
        {/* Grit Particle Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        
        <div className="max-w-6xl w-full flex flex-col md:flex-row gap-16 items-center relative z-10">
          <div className="flex-1 flex flex-col items-start">
            <h1 className="text-7xl md:text-8xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-tighter leading-none mb-8">
              Career<br/><span className="text-[var(--sys-color-solidarityRed-base)]">Copilot</span>
            </h1>
            <p className="text-xl type-melancholyLonging text-[var(--sys-color-worker-ash-base)] mb-12 max-w-xl">
              Your career. Precisely targeted.
            </p>
            
            <div className="w-full mb-12">
              <JobInputPanel 
                onAnalyze={(title, company, text) => {
                  setInitialJobData({ title, company, text });
                  handleGuestLogin();
                  return Promise.resolve();
                }} 
                isAnalyzing={false} 
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleLogin}
                className="px-8 py-4 text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-xl hover:text-[var(--sys-color-solidarityRed-base)] border transition-all"
                style={{ 
                  borderRadius: 'var(--sys-shape-blockRiot01)',
                  background: 'var(--sys-color-solidarityRed-base)',
                  borderColor: 'var(--sys-color-solidarityRed-base)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--sys-color-charcoalBackground-steps-1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--sys-color-solidarityRed-base)';
                }}
              >
                Sign In with Google
              </button>
              <button 
                onClick={handleGuestLogin}
                className="px-8 py-4 text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-xl hover:text-[var(--sys-color-solidarityRed-base)] border transition-all"
                style={{ 
                  borderRadius: 'var(--sys-shape-blockRiot01)',
                  background: 'transparent',
                  borderColor: 'var(--sys-color-outline-variant)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sys-color-paperWhite-base)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--sys-color-outline-variant)';
                }}
              >
                Explore as Guest
              </button>
            </div>
          </div>
          <div className="flex-1 w-full">
            <div 
              className="w-full aspect-square md:aspect-video flex items-center justify-center relative overflow-hidden"
              style={{ 
                borderRadius: '24px',
                background: 'var(--sys-color-charcoalBackground-steps-2)',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--sys-color-outline-variant)" strokeWidth="1" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="100" cy="150" r="60" fill="var(--sys-color-solidarityRed-base)" opacity="0.1" />
                <rect x="200" y="80" width="120" height="120" rx="24" fill="var(--sys-color-inkGold-base)" opacity="0.05" transform="rotate(15 260 140)" />
                <path d="M 50 250 Q 200 100 350 250" fill="none" stroke="var(--sys-color-metalBlue-base)" strokeWidth="2" opacity="0.2" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (user && !hasCompletedOnboarding) {
    return <OnboardingPathBifurcation />;
  }

  return (
    <AppShell onLogout={handleLogout} activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Canonical routing is owned by the main repo router. */}
      {activeTab === 'WORKSPACE' && <ApplyQuickWorkspaceReference initialJobData={initialJobData} user={user} />}
      {activeTab === 'PROFILE' && <ProfileView user={user} />}
      {activeTab === 'PAST' && <PastApplicationsReference user={user} />}
      {activeTab === 'LIBRARY' && <LibraryReferencePage user={user} />}
      {activeTab === 'OPTIMISE' && <OptimisePage user={user} />}
      {activeTab === 'LOOKOUT' && <div className="p-8 text-center text-[var(--sys-color-worker-ash-base)]">Lookout Feed (Coming Soon)</div>}
      {activeTab === 'PREP' && <div className="p-8 text-center text-[var(--sys-color-worker-ash-base)]">Interview Prep (Coming Soon)</div>}
    </AppShell>
  );
};

export default App;
