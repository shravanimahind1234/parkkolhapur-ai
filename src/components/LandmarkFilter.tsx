import React from 'react';
import { Search, Mic, SlidersHorizontal, Landmark, Waves, Bus, Shield, Castle, ShoppingBag, X, TreePine, Trophy, Building2, Flame } from 'lucide-react';
import { LANDMARKS } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

const LANDMARK_NAMES_I18N: Record<string, { mr: string; hi: string }> = {
  'all': { mr: 'सर्व कोल्हापूर', hi: 'सभी कोल्हापुर' },
  'Mahalaxmi Temple': { mr: 'महालक्ष्मी मंदिर', hi: 'महालक्ष्मी मंदिर' },
  'Jyotiba Temple': { mr: 'ज्योतिबा मंदिर', hi: 'ज्योतिबा मंदिर' },
  'Rankala Lake': { mr: 'रंकाळा तलाव', hi: 'रंकाला झील' },
  'New Palace': { mr: 'नवीन राजवाडा', hi: 'न्यू पैलेस' },
  'Panhala Fort': { mr: 'पन्हाळा किल्ला', hi: 'पन्हाला किला' },
  'Kaneri Math': { mr: 'कणेरी मठ (सिद्धगिरी)', hi: 'कणेरी मठ (सिद्धगिरी)' },
  'Kopeshwar Temple': { mr: 'खिद्रापूर कोपेश्वर', hi: 'खिदरापुर कोपेश्वर' },
  'Radhanagari Wildlife Sanctuary': { mr: 'राधानगरी व दाजीपूर', hi: 'राधानगरी व दाजीपुर' },
  'Town Hall Museum': { mr: 'टाऊन हॉल संग्रहालय', hi: 'टाउन हॉल संग्रहालय' },
  'Narsobachi Wadi': { mr: 'नृसिंहवाडी', hi: 'नृसिंहवाडी' },
  'Khasbag Maidan': { mr: 'खासबाग मैदान', hi: 'खासबाग मैदान' },
  'Bhavani Mandap': { mr: 'भवानी मंडप', hi: 'भवानी मंडप' },
  'Central Bus Stand (CBS)': { mr: 'मध्यवर्ती बस स्थानक (CBS)', hi: 'सेंट्रल बस स्टैंड (CBS)' },
};

interface LandmarkFilterProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedLandmark: string;
  onSelectLandmark: (landmark: string) => void;
  onOpenFilterDrawer: () => void;
  onVoiceSearch: () => void;
  isListening?: boolean;
}

export const LandmarkFilter: React.FC<LandmarkFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedLandmark,
  onSelectLandmark,
  onOpenFilterDrawer,
  onVoiceSearch,
  isListening = false,
}) => {
  const { t, language } = useLanguage();

  const getIcon = (id: string) => {
    switch (id) {
      case 'Mahalaxmi Temple':
        return <Landmark className="w-3.5 h-3.5 text-[#7B2638]" />;
      case 'Jyotiba Temple':
        return <Flame className="w-3.5 h-3.5 text-[#C6A15B]" />;
      case 'Rankala Lake':
        return <Waves className="w-3.5 h-3.5 text-[#26965B]" />;
      case 'Central Bus Stand (CBS)':
        return <Bus className="w-3.5 h-3.5 text-[#7B2638]" />;
      case 'Bhavani Mandap':
        return <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />;
      case 'New Palace':
        return <Castle className="w-3.5 h-3.5 text-[#7B2638]" />;
      case 'Panhala Fort':
        return <Shield className="w-3.5 h-3.5 text-[#C6A15B]" />;
      case 'Kaneri Math':
        return <Building2 className="w-3.5 h-3.5 text-[#C6A15B]" />;
      case 'Kopeshwar Temple':
        return <Landmark className="w-3.5 h-3.5 text-[#C6A15B]" />;
      case 'Radhanagari Wildlife Sanctuary':
        return <TreePine className="w-3.5 h-3.5 text-[#26965B]" />;
      case 'Town Hall Museum':
        return <Building2 className="w-3.5 h-3.5 text-[#7B2638]" />;
      case 'Narsobachi Wadi':
        return <Waves className="w-3.5 h-3.5 text-[#26965B]" />;
      case 'Khasbag Maidan':
        return <Trophy className="w-3.5 h-3.5 text-[#7B2638]" />;
      default:
        return <Landmark className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="px-4 py-3 bg-[#FFFDF8] border-b border-[#EFECE4] shadow-xs">
      {/* Search Bar */}
      <div className="relative w-full max-w-2xl mx-auto">
        <div className="flex items-center h-12 rounded-2xl bg-[#FFFFFF] px-3 shadow-sm border border-[#EFECE4] focus-within:border-[#7B2638] transition-colors">
          <Search className="w-4 h-4 text-[#7B2638] mr-2 flex-shrink-0" />
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t.searchFilter.searchPlaceholder}
            className="w-full bg-transparent text-[13px] text-[#292725] placeholder-[#8a847e] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-[#8a847e] hover:text-[#292725] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="flex items-center gap-1 border-l border-[#EFECE4] pl-2 ml-1">
            <button
              type="button"
              onClick={onVoiceSearch}
              title={language === 'mr' ? 'आवाज शोध' : language === 'hi' ? 'वॉइस सर्च' : 'Voice Search'}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                isListening
                  ? 'bg-[#7B2638] text-[#FFFDF8] animate-bounce'
                  : 'text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE]'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onOpenFilterDrawer}
              title={language === 'mr' ? 'फिल्टर पर्याय' : language === 'hi' ? 'फ़िल्टर विकल्प' : 'Filter Options'}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[#5e5954] hover:text-[#7B2638] hover:bg-[#F7F4EE] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Kolhapur Landmark Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pt-2.5 pb-0.5 no-scrollbar max-w-2xl mx-auto">
        {LANDMARKS.map((item) => {
          const isSelected = selectedLandmark === item.id;
          const displayName =
            language === 'mr'
              ? LANDMARK_NAMES_I18N[item.id]?.mr || item.name
              : language === 'hi'
              ? LANDMARK_NAMES_I18N[item.id]?.hi || item.name
              : item.name;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectLandmark(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer border ${
                isSelected
                  ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638] shadow-xs'
                  : 'bg-[#FFFFFF] text-[#5e5954] hover:text-[#292725] border-[#EFECE4] hover:bg-[#F7F4EE]'
              }`}
            >
              {getIcon(item.id)}
              <span>{displayName}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};