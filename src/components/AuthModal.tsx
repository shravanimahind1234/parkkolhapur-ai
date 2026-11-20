import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Phone,
  Mail,
  Lock,
  User,
  CheckCircle2,
  Car,
  Sparkles,
  Building2,
  ShieldAlert,
  KeyRound,
} from 'lucide-react';
import { UserAccount, UserRole } from '../types';
import { signUpWithEmail, signInWithEmail } from '../lib/supabase';
import { DEMO_ACCOUNTS, ADMIN_CREDENTIALS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLoginSuccess: (user: UserAccount) => void;
  initialMode?: 'signin' | 'signup';
  actionPromptMessage?: string | null;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  initialMode = 'signin',
  actionPromptMessage = null,
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('CUSTOMER');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    if (mode === 'signup') {
      const { user, error } = await signUpWithEmail(
        identifier.trim(),
        password || 'Kolhapur@123',
        name.trim() || 'Kolhapur Citizen',
        phone.trim() || '+91 98220 00000',
        selectedRole
      );

      setLoading(false);
      if (error) {
        setErrorMessage(error);
        return;
      }
      if (user) {
        setIsSuccess(true);
        setTimeout(() => {
          onLoginSuccess(user);
          setIsSuccess(false);
          onClose();
        }, 800);
      }
    } else {
      const { user, error } = await signInWithEmail(identifier.trim(), password);
      setLoading(false);
      if (error) {
        setErrorMessage(error);
        return;
      }
      if (user) {
        setIsSuccess(true);
        setTimeout(() => {
          onLoginSuccess(user);
          setIsSuccess(false);
          onClose();
        }, 800);
      }
    }
  };

  const handleQuickAdminLogin = () => {
    setIdentifier('parkadmin');
    setPassword('parkadmin');
    const adminAcc = DEMO_ACCOUNTS.find((a) => a.role === 'ADMIN');
    if (adminAcc) {
      setIsSuccess(true);
      setTimeout(() => {
        onLoginSuccess(adminAcc);
        setIsSuccess(false);
        onClose();
      }, 700);
    }
  };

  const handleQuickDemoSwitch = (demoUser: UserAccount) => {
    setIsSuccess(true);
    setTimeout(() => {
      onLoginSuccess(demoUser);
      setIsSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#C6A15B]/30 shadow-2xl overflow-hidden p-6 relative text-left">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="py-8 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-full bg-[#edf8f2] text-[#26965B] flex items-center justify-center animate-bounce shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-[20px] font-bold text-[#7B2638] font-serif">
              Authentication Verified
            </h3>
            <p className="text-[13px] text-[#5e5954]">
              Redirecting to your isolated personalized dashboard...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-[#EFECE4] pb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center font-serif text-2xl font-black shadow-md">
                P
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-[19px] font-extrabold text-[#7B2638] font-serif tracking-tight">
                    ParkN<span className="text-[#C6A15B]">Explore</span>
                  </h2>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#C6A15B]/20 text-[#7B2638] uppercase tracking-wider">
                    KMC
                  </span>
                </div>
                <p className="text-[12px] text-[#5e5954]">
                  {mode === 'signin' ? 'Sign in required to perform parking actions' : 'Create an isolated citizen or owner account'}
                </p>
              </div>
            </div>

            {/* Action Prompt Banner if user tried an unauthenticated action */}
            {actionPromptMessage && (
              <div className="p-3 rounded-2xl bg-[#fef7ec] border border-[#E6A23C]/40 text-[12px] text-[#7B2638] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#E6A23C] flex-shrink-0" />
                <span className="font-semibold leading-tight">{actionPromptMessage}</span>
              </div>
            )}

            {/* Quick Admin Credentials Callout Badge */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#7B2638]/10 via-[#FFFDF8] to-[#C6A15B]/15 border border-[#7B2638]/20 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#7B2638] text-white flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-4 h-4 text-[#C6A15B]" />
                </div>
                <div>
                  <span className="text-[11px] font-black text-[#7B2638] block leading-tight">
                    Official KMC Admin Credentials
                  </span>
                  <span className="text-[10px] font-mono text-[#5e5954]">
                    User: <strong>parkadmin</strong> • Pass: <strong>parkadmin</strong>
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleQuickAdminLogin}
                className="h-8 px-2.5 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] text-[11px] font-bold transition-all shadow-xs cursor-pointer flex-shrink-0"
              >
                1-Click Admin
              </button>
            </div>

            {/* Quick Persona Switcher */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block">
                Or Sign In As Demo Persona:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickDemoSwitch(DEMO_ACCOUNTS[1])}
                  className="p-2 rounded-xl bg-[#F7F4EE] hover:bg-[#edf8f2] border border-[#EFECE4] text-[11px] font-bold text-[#292725] text-left transition-all cursor-pointer"
                >
                  <span className="text-[#26965B] block font-extrabold">Ajay Shinde</span>
                  <span className="text-[9px] text-[#8a847e] font-normal block">Citizen Customer</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickDemoSwitch(DEMO_ACCOUNTS[2])}
                  className="p-2 rounded-xl bg-[#F7F4EE] hover:bg-[#fef7ec] border border-[#EFECE4] text-[11px] font-bold text-[#292725] text-left transition-all cursor-pointer"
                >
                  <span className="text-[#C6A15B] block font-extrabold">Rajesh Patil</span>
                  <span className="text-[9px] text-[#8a847e] font-normal block">Slot Owner / Host</span>
                </button>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#F7F4EE] border border-[#EFECE4]">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-[#7B2638] text-[#FFFDF8] shadow-sm'
                    : 'text-[#5e5954] hover:text-[#292725]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`py-2 text-[13px] font-bold rounded-lg transition-all cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-[#7B2638] text-[#FFFDF8] shadow-sm'
                    : 'text-[#5e5954] hover:text-[#292725]'
                }`}
              >
                Register
              </button>
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-xl bg-[#fdf0f0] border border-[#D94B4B]/30 text-[12px] text-[#D94B4B]">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block mb-1">
                      Account Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedRole('CUSTOMER')}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedRole === 'CUSTOMER'
                            ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638]'
                            : 'bg-white text-[#5e5954] border-[#EFECE4]'
                        }`}
                      >
                        Citizen Customer
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRole('OWNER')}
                        className={`py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          selectedRole === 'OWNER'
                            ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638]'
                            : 'bg-white text-[#5e5954] border-[#EFECE4]'
                        }`}
                      >
                        Parking Lot Owner
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block mb-1">
                      Full Name
                    </label>
                    <div className="flex items-center h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] focus-within:border-[#7B2638]">
                      <User className="w-4 h-4 text-[#C6A15B] mr-2" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Anand Jadhav"
                        className="w-full bg-transparent text-[13px] text-[#292725] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block mb-1">
                      Phone Number
                    </label>
                    <div className="flex items-center h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] focus-within:border-[#7B2638]">
                      <Phone className="w-4 h-4 text-[#C6A15B] mr-2" />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98224 XXXXX"
                        className="w-full bg-transparent text-[13px] text-[#292725] focus:outline-none"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block mb-1">
                  Username or Email
                </label>
                <div className="flex items-center h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] focus-within:border-[#7B2638]">
                  <Mail className="w-4 h-4 text-[#C6A15B] mr-2" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="Username (e.g. parkadmin) or Email"
                    className="w-full bg-transparent text-[13px] text-[#292725] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#5e5954] block mb-1">
                  Password
                </label>
                <div className="flex items-center h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] focus-within:border-[#7B2638]">
                  <Lock className="w-4 h-4 text-[#C6A15B] mr-2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password (e.g. parkadmin)"
                    className="w-full bg-transparent text-[13px] text-[#292725] focus:outline-none"
                  />
                </div>
              </div>

              <div className="p-2 rounded-xl bg-[#edf8f2] border border-[#26965B]/20 flex items-center gap-2 text-[11px] text-[#292725]">
                <ShieldCheck className="w-4 h-4 text-[#26965B] flex-shrink-0" />
                <span>Strict Supabase RLS isolation: users cannot see other users' details.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-[13px] flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>{loading ? 'Authenticating...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};