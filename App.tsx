
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppShell } from './src/components/layout/AppShell';
import { ApplicationWorkspacePage } from './src/pages/ApplicationWorkspacePage';
import { ProfileEditorPage } from './src/pages/ProfileEditorPage';
import { PastApplicationsPage } from './src/pages/PastApplicationsPage';
import { ComponentLibraryPage } from './src/pages/ComponentLibraryPage';
import { ImageStudioPage } from './src/pages/ImageStudioPage';
import { auth, signIn, logout } from './services/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';
import { useChromeExtension } from './hooks/useChromeExtension';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const { isExtension } = useChromeExtension();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logout();
    navigate('/workspace');
  };

  if (isAuthLoading) {
    return (
        <div 
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'var(--sys-color-charcoalBackground-base)' }}
        >
            <div 
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin" 
              style={{ borderColor: 'var(--sys-color-solidarityRed-base) transparent var(--sys-color-solidarityRed-base) var(--sys-color-solidarityRed-base)' }}
            />
        </div>
    );
  }

  if (!user) {
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
              A living manifesto for your career. No neutral canvas. Tailor your response.
            </p>
            <button 
              onClick={handleLogin}
              className="px-8 py-4 text-[var(--sys-color-paperWhite-base)] font-bold uppercase tracking-widest text-xl hover:text-[var(--sys-color-solidarityRed-base)] border-2 transition-all"
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
          </div>
          <div className="flex-1 w-full">
            <div 
              className="w-full aspect-square md:aspect-video border-2 flex flex-col items-center justify-center p-8 text-center relative overflow-hidden"
              style={{ 
                borderRadius: 'var(--sys-shape-blockRiot03)',
                background: 'var(--sys-color-charcoalBackground-steps-2)',
                borderColor: 'var(--sys-color-concreteGrey-steps-0)'
              }}
            >
              <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              <h3 className="text-2xl type-solidarityProtest text-[var(--sys-color-paperWhite-base)] uppercase tracking-widest mb-4 relative z-10">
                Hero Illustration Placeholder
              </h3>
              <p className="text-sm type-melancholyLonging text-[var(--sys-color-worker-ash-base)] max-w-md relative z-10">
                Archetype: Placard / Scaffold. Hard architectural lines. Asymmetric radii.
                <br/><br/>
                <strong className="text-[var(--sys-color-solidarityRed-base)] uppercase tracking-widest">CRITICAL RULE: Zero-Flora lockdown.</strong>
                <br/>
                Absolutely NO Australian flora, eucalyptus, or wattle concepts permitted in the ultimate imagery.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AppShell onLogout={handleLogout}>
      <Routes>
        <Route path="/workspace" element={<ApplicationWorkspacePage />} />
        <Route path="/profile" element={<ProfileEditorPage />} />
        <Route path="/past" element={<PastApplicationsPage />} />
        <Route path="/components" element={<ComponentLibraryPage />} />
        <Route path="/studio" element={<ImageStudioPage />} />
        <Route path="*" element={<Navigate to="/workspace" replace />} />
      </Routes>
    </AppShell>
  );
};

export default App;
