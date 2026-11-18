import React from 'react';
import { Bus, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface ShuttleTeaserProps {
  onOpenShuttleDetails: () => void;
}

export const ShuttleTeaser: React.FC<ShuttleTeaserProps> = ({
  onOpenShuttleDetails,
}) => {
  const { language } = useLanguage();

  return (
    <section
      onClick={onOpenShuttleDetails}
      className="rounded-2xl bg-[#FFFDF8] p-4 flex items-center gap-3.5 shadow-sm border border-[#C6A15B]/40 overflow-hidden relative cursor-pointer hover:border-[#7B2638] transition-all group text-left"
    >
      <div
        className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0 shadow-xs border border-[#EFECE4]"
        style={{
          backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/1280px-Mahalaxmi_Temple%2C_Kolhapur.jpg')`,
        }}
      />
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-extrabold text-[#7B2638] uppercase tracking-wider flex items-center gap-1">
            <Bus className="w-3 h-3 text-[#C6A15B]" />
            {language === 'mr' ? 'मंदिर कॉरिडॉर वाहतूक' : language === 'hi' ? 'मंदिर कॉरिडोर ट्रांजिट' : 'Temple Corridor Transit'}
          </span>
          <ArrowUpRight className="w-4 h-4 text-[#8a847e] group-hover:text-[#7B2638] transition-colors" />
        </div>
        <h4 className="text-[15px] font-bold text-[#7B2638] font-serif truncate mt-0.5">
          {language === 'mr' ? 'अंबाबाई दर्शन विशेष ई-शटल' : language === 'hi' ? 'अंबाबाई दर्शन विशेष ई-शटल' : 'Special Ambabai Darshan Shuttles'}
        </h4>
        <p className="text-[12px] text-[#5e5954] line-clamp-2 mt-0.5 leading-snug">
          {language === 'mr'
            ? 'दक्षिण दरवाजा येथे वाहन पार्क करा आणि महाद्वारासाठी विनामूल्य बॅटरी ई-रिक्षाने जा.'
            : language === 'hi'
            ? 'दक्षिण गेट पर वाहन पार्क करें और महाद्वार के लिए मुफ्त बैटरी ई-रिक्शा लें।'
            : 'Park at South Gate and hop on free battery e-rickshaws directly to the temple Mahadwar.'}
        </p>
      </div>
    </section>
  );
};