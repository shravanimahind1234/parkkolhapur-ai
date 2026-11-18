import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../types';

interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flagLetter: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flagLetter: 'EN' },
  { code: 'mr', label: 'Marathi', nativeLabel: 'मराठी', flagLetter: 'म' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिंदी', flagLetter: 'हि' },
];

export const LanguageSwitcher: React.FC<{ variant?: 'compact' | 'segmented' | 'dropdown' }> = ({
  variant = 'compact',
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  if (variant === 'segmented') {
    return (
      <div className="inline-flex items-center p-1 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] shadow-xs">
        {LANGUAGES.map((item) => {
          const isSelected = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => setLanguage(item.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isSelected
                  ? 'bg-[#7B2638] text-[#FFFDF8] shadow-xs'
                  : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#EFECE4]'
              }`}
            >
              <span>{item.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select Language"
        className="h-8 sm:h-9 px-2 sm:px-2.5 rounded-full bg-[#FFFDF8] hover:bg-[#F7F4EE] border border-[#C6A15B]/40 hover:border-[#7B2638] transition-all flex items-center gap-1.5 shadow-xs cursor-pointer text-[#7B2638]"
        title="Change Language / भाषा बदला"
      >
        <Globe className="w-3.5 h-3.5 text-[#C6A15B]" />
        <span className="text-[11px] sm:text-[12px] font-bold tracking-tight">
          {currentLang.nativeLabel}
        </span>
        <ChevronDown className={`w-3 h-3 text-[#5e5954] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-[#FFFDF8] border border-[#C6A15B]/30 shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-[#EFECE4] text-[10px] font-extrabold uppercase tracking-wider text-[#5e5954]">
            Language / भाषा
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setLanguage(item.code);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#7B2638]/10 text-[#7B2638]'
                    : 'text-[#292725] hover:bg-[#F7F4EE] hover:text-[#7B2638]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#F7F4EE] text-[#7B2638] text-[10px] font-black flex items-center justify-center border border-[#EFECE4]">
                    {item.flagLetter}
                  </span>
                  <span>{item.nativeLabel}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#7B2638]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
