import React from 'react';
import { X, Bus, Clock, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { SHUTTLE_INFO } from '../data/mockData';
import { useLanguage } from '../i18n/LanguageContext';

interface ShuttleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShuttleModal: React.FC<ShuttleModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left">
        {/* Header */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#EFECE4] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center">
              <Bus className="w-4 h-4 text-[#C6A15B]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#7B2638] font-serif">
                {language === 'mr' ? 'अंबाबाई दर्शन विशेष ई-शटल' : language === 'hi' ? 'अंबाबाई दर्शन विशेष ई-शटल' : SHUTTLE_INFO.name}
              </h3>
              <p className="text-[11px] text-[#5e5954]">
                {language === 'mr' ? 'मोफत मंदिर कॉरिडॉर वाहतूक' : language === 'hi' ? 'मुफ्त मंदिर कॉरिडोर ट्रांजिट' : 'Free Temple Corridor Transit'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto no-scrollbar">
          {/* Authentic Real Kolhapur Photo Card */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#C6A15B]/30 shadow-xs">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mahalaxmi_Temple%2C_Kolhapur.jpg/1280px-Mahalaxmi_Temple%2C_Kolhapur.jpg"
              alt="Authentic photograph of Mahalaxmi Temple, Kolhapur"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const el = e.currentTarget;
                if (!el.dataset.tried) {
                  el.dataset.tried = 'true';
                  el.src = 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80';
                }
              }}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/85 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#7B2638] text-white">
                {language === 'mr' ? 'पर्यावरणपूरक फ्लीट' : language === 'hi' ? 'पर्यावरण अनुकूल फ्लीट' : 'Eco-Friendly Fleet'}
              </span>
              <p className="text-[13px] font-bold mt-1">
                {language === 'mr' ? 'शून्य उत्सर्जन बॅटरी ई-रिक्षा' : language === 'hi' ? 'शून्य उत्सर्जन बैटरी ई-रिक्शा' : 'Zero Emission Battery E-Rickshaws'}
              </p>
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4]">
              <span className="text-[10px] text-[#5e5954] uppercase font-bold block">
                {language === 'mr' ? 'वारंवारता' : language === 'hi' ? 'आवृत्ति' : 'Frequency'}
              </span>
              <span className="text-[14px] font-extrabold text-[#7B2638] block mt-0.5">
                {language === 'mr' ? 'दर ४-६ मिनिटांनी' : language === 'hi' ? 'हर 4-6 मिनट में' : SHUTTLE_INFO.frequency}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4]">
              <span className="text-[10px] text-[#5e5954] uppercase font-bold block">
                {language === 'mr' ? 'वेळा' : language === 'hi' ? 'समय' : 'Timings'}
              </span>
              <span className="text-[13px] font-extrabold text-[#292725] block mt-0.5">
                5:00 AM – 10:30 PM
              </span>
            </div>
          </div>

          {/* Route Stops */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider block">
              {language === 'mr' ? 'कॉरिडॉर थांबे' : language === 'hi' ? 'कॉरिडोर स्टॉप' : 'Corridor Stops'}
            </span>

            <div className="space-y-2">
              {SHUTTLE_INFO.stops.map((stop, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <div>
                      <span className="text-[13px] font-bold text-[#292725] block">
                        {stop.name}
                      </span>
                      <span className="text-[11px] text-[#5e5954]">
                        {stop.walk} {language === 'mr' ? 'थांब्यावरून चालत' : language === 'hi' ? 'स्टॉप से पैदल' : 'from stop'}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-[#26965B]">
                    {stop.distance}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#edf8f2] border border-[#26965B]/30 flex items-center gap-2 text-[11px] text-[#292725]">
            <ShieldCheck className="w-4 h-4 text-[#26965B] flex-shrink-0" />
            <span>
              {language === 'mr'
                ? 'मोफत प्रवासासाठी चालकाला आपला डिजिटल पार्क कोल्हापूर पास दाखवा.'
                : language === 'hi'
                ? 'मुफ्त यात्रा के लिए चालक को अपना डिजिटल पार्क कोल्हापुर पास दिखाएं।'
                : 'Show your digital ParkKolhapur pass to the driver for free boarding.'}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full h-11 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-[13px] transition-colors cursor-pointer"
          >
            {language === 'mr' ? 'समजले' : language === 'hi' ? 'ठीक है' : 'Got It'}
          </button>
        </div>
      </div>
    </div>
  );
};