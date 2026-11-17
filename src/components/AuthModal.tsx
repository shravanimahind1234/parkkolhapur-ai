import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Phone,
  Car,
  ShieldCheck,
  CheckCircle,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ParkingCircle,
} from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserAccount) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'signin',
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<'SEEKER' | 'OWNER' | 'ADMIN'>('SEEKER');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please provide both email and password.');
      return;
    }

    if (mode === 'signup' && !fullName) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg(
        mode === 'signin'
          ? `Welcome back to ParkKolhapur, ${fullName || 'Citizen'}!`
          : `Account successfully created as ${selectedRole}!`
      );

      const loggedUser: UserAccount = {
        id: `usr-${Date.now()}`,
        name: fullName || (email.split('@')[0].toUpperCase()),
        email: email,
        phone: phone || '+91 98220 12345',
        role: selectedRole,
        avatarUrl:
          selectedRole === 'ADMIN'
            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80'
            : selectedRole === 'OWNER'
            ? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80'
            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      };

      setTimeout(() => {
        onLoginSuccess(loggedUser);
        onClose();
      }, 1000);
    }, 800);
  };

  const handleQuickDemoLogin = (role: 'SEEKER' | 'OWNER' | 'ADMIN') => {
    const demos: Record<string, UserAccount> = {
      SEEKER: {
        id: 'usr-demo-seeker',
        name: 'Shravani Mahind (Pilgrim)',
        email: 'shravani@kolhapur.citizen',
        phone: '+91 98220 12345',
        role: 'SEEKER',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      },
      OWNER: {
        id: 'usr-demo-owner',
        name: 'Rajendra Patil (Lot Host)',
        email: 'rajendra.patil@kolhapur.lots',
        phone: '+91 94220 54321',
        role: 'OWNER',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      },
      ADMIN: {
        id: 'usr-demo-admin',
        name: 'KMC Smart City Officer',
        email: 'admin.mobility@kolhapurcorporation.gov.in',
        phone: '+91 231 254 0000',
        role: 'ADMIN',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      },
    };

    const user = demos[role];
    setSuccessMsg(`Authenticated as ${user.name}`);
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/35 shadow-2xl overflow-hidden flex flex-col text-[#FFF9EF]">
        
        {/* Header Strip */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#22070E]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E] font-black font-royal text-sm shadow">
              K
            </div>
            <div>
              <h3 className="font-royal text-base font-bold text-[#FFF9EF] leading-none">
                {mode === 'signin' ? 'Sign In to ParkKolhapur' : 'Create Citizen Account'}
              </h3>
              <span className="text-[11px] text-[#C6A15B] font-medium">
                Kolhapur Municipal Smart Mobility
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-[#FFF9EF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="grid grid-cols-2 p-1.5 m-5 mb-3 rounded-2xl bg-[#1A0A0F] border border-[#C6A15B]/20">
          <button
            type="button"
            onClick={() => { setMode('signin'); setErrorMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signin'
                ? 'bg-[#651E2B] text-[#FFF9EF] shadow-md border border-[#C6A15B]/40'
                : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
            }`}
          >
            Citizen Sign In
          </button>
          <button
            type="button"
            onClick={() => { setMode('signup'); setErrorMsg(''); }}
            className={`py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-[#651E2B] text-[#FFF9EF] shadow-md border border-[#C6A15B]/40'
                : 'text-[#B8ADA0] hover:text-[#FFF9EF]'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Role Selector Pill */}
        <div className="px-5 mb-4">
          <label className="text-[11px] uppercase tracking-wider font-bold text-[#C6A15B] block mb-2">
            Select Your Municipal Role:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'SEEKER', label: 'Pilgrim / Seeker', icon: User },
              { id: 'OWNER', label: 'Private Lot Host', icon: ParkingCircle },
              { id: 'ADMIN', label: 'KMC Officer', icon: ShieldCheck },
            ].map((r) => {
              const Icon = r.icon;
              const isSelected = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setSelectedRole(r.id as any)}
                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#651E2B] border-[#C6A15B] text-[#FFF9EF] shadow'
                      : 'bg-[#1A0A0F]/60 border-white/5 text-[#B8ADA0] hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#C6A15B]' : ''}`} />
                  <span className="text-[10px] font-bold leading-tight">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-5 pb-5 space-y-3.5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-semibold flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'signup' && (
            <>
              <div>
                <label className="text-xs font-semibold text-[#E8DECE] block mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#C6A15B] absolute left-3 top-3.5" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Shravani Mahind"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1A0A0F] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#E8DECE] block mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#C6A15B] absolute left-3 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98220 12345"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1A0A0F] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="text-xs font-semibold text-[#E8DECE] block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#C6A15B] absolute left-3 top-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@kolhapur.gov.in"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1A0A0F] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#E8DECE] block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#C6A15B] absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-[#1A0A0F] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#B8ADA0] hover:text-[#FFF9EF]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && selectedRole === 'SEEKER' && (
            <div>
              <label className="text-xs font-semibold text-[#E8DECE] block mb-1">Primary Vehicle Plate (Optional)</label>
              <div className="relative">
                <Car className="w-4 h-4 text-[#C6A15B] absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MH 09 DX 4521"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#1A0A0F] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-[0.99] transition-all cursor-pointer mt-4"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{mode === 'signin' ? 'Sign In & Access Passes' : 'Complete Registration'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Quick Demo Credentials */}
          <div className="pt-3 border-t border-white/10">
            <span className="text-[10px] uppercase font-bold text-[#C6A15B] block text-center mb-2">
              Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('SEEKER')}
                className="py-1.5 px-2 rounded-lg bg-[#292725] hover:bg-[#3D3A37] text-[10px] font-bold text-[#FFF9EF] border border-white/5 transition-colors cursor-pointer truncate"
              >
                Demo Pilgrim
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('OWNER')}
                className="py-1.5 px-2 rounded-lg bg-[#292725] hover:bg-[#3D3A37] text-[10px] font-bold text-[#FFF9EF] border border-white/5 transition-colors cursor-pointer truncate"
              >
                Demo Host
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('ADMIN')}
                className="py-1.5 px-2 rounded-lg bg-[#292725] hover:bg-[#3D3A37] text-[10px] font-bold text-[#FFF9EF] border border-white/5 transition-colors cursor-pointer truncate"
              >
                Demo KMC
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};
