
import React from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { User } from 'firebase/auth';

interface HeaderProps {
    user: User | null;
    onLogin: () => void;
    onLogout: () => void;
    onProfileClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onProfileClick }) => {
  const displayName = user?.displayName || user?.email;
  const photoURL = user?.photoURL;

  return (
    <header style={{ borderBottomColor: 'var(--sys-color-concreteGrey-steps-0)', borderBottomWidth: 1, borderBottomStyle: 'solid', background: 'color-mix(in srgb, var(--sys-color-charcoalBackground-base) 80%, transparent)' }} className="p-4 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
            <DocumentTextIcon className="w-8 h-8 text-[var(--sys-color-solidarityRed-base)]" />
            <h1 className="text-xl font-bold tracking-tight text-[var(--sys-color-paperWhite-base)] hidden sm:block">
                Career Database Pre-processor
            </h1>
        </div>
        
        <div className="flex items-center gap-4">
            {user ? (
                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs font-bold text-[var(--sys-color-paperWhite-base)]">{displayName}</p>
                        <p className="text-[10px] text-[var(--sys-color-concreteGrey-base)]">{user.email}</p>
                    </div>
                    {photoURL && (
                        <button 
                          onClick={onProfileClick}
                          className="hover:scale-110 transition-transform active:scale-95"
                          title="View Profile"
                        >
                          <img src={photoURL} alt="Profile" style={{ borderRadius: 'var(--sys-shape-sentryAvatar)', borderColor: 'var(--sys-color-solidarityRed-base)', borderWidth: 1, borderStyle: 'solid' }} className="w-8 h-8 shadow-sm" />
                        </button>
                    )}
                    <button 
                        onClick={onLogout}
                        style={{ borderColor: 'var(--sys-color-concreteGrey-steps-0)', borderWidth: 1, borderStyle: 'solid', borderRadius: 'var(--sys-shape-blockRiot01)' }}
                        className="text-xs text-[var(--sys-color-concreteGrey-base)] hover:text-[var(--sys-color-solidarityRed-base)] transition-colors px-2 py-1"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <button 
                    onClick={onLogin}
                    style={{ background: 'var(--sys-color-solidarityRed-base)', borderRadius: 'var(--sys-shape-blockRiot03)' }}
                    className="text-xs text-[var(--sys-color-paperWhite-base)] font-bold py-1.5 px-4 transition-all flex items-center gap-2"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M12.545,11.033H22.241c0.151,0.535,0.229,1.107,0.229,1.696c0,5.803-3.882,9.923-9.925,9.923c-5.8,0-10.5-4.7-10.5-10.5s4.7-10.5,10.5-10.5c2.83,0,5.189,1.033,7.013,2.731l-3.007,3.007c-1.107-1.062-2.585-1.724-4.006-1.724c-3.567,0-6.433,2.866-6.433,6.433c0,3.567,2.866,6.433,6.433,6.433c3.755,0,5.552-2.698,5.828-4.087H12.545V11.033z" />
                    </svg>
                    Sign in with Google
                </button>
            )}
        </div>
      </div>
    </header>
  );
};
