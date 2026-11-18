import React, { useState } from 'react';
import {
  X,
  Navigation,
  MapPin,
  Compass,
  ExternalLink,
  ShieldCheck,
  Hospital,
  Utensils,
  Hotel,
  Phone,
  Star,
} from 'lucide-react';
import { ParkingHub } from '../types';
import { useLanguage } from '../i18n/LanguageContext';

interface DirectionsModalProps {
  hub: ParkingHub | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DirectionsModal: React.FC<DirectionsModalProps> = ({
  hub,
  isOpen,
  onClose,
}) => {
  const { t, language } = useLanguage();
  if (!isOpen || !hub) return null;

  const [activePoiTab, setActivePoiTab] = useState<'all' | 'hospital' | 'food' | 'stay'>('all');
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${hub.coordinates.lat},${hub.coordinates.lng}`;
  const pois = hub.nearbyPlaces || [];
  const filteredPois = activePoiTab === 'all' ? pois : pois.filter((p) => p.category === activePoiTab);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#FFFDF8] border-t sm:border border-[#C6A15B]/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col text-left max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-4 bg-[#FFFFFF] border-b border-[#EFECE4] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center">
              <Navigation className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#7B2638] font-serif">
                {language === 'mr' ? 'वळणानुसार मार्गदर्शन' : language === 'hi' ? 'टर्न-बाय-टर्न नेविगेशन' : 'Turn-by-Turn Navigation'}
              </h3>
              <p className="text-[11px] text-[#5e5954]">
                {language === 'mr' ? 'गंतव्य' : language === 'hi' ? 'गंतव्य' : 'Destination'}: {hub.name}
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

        {/* Content */}
        <div className="p-4 space-y-4 overflow-y-auto flex-1">
          {/* Visual Route Header Card */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#26965B] tracking-wider">
                  {language === 'mr' ? 'जलद मनपा मार्ग' : language === 'hi' ? 'सबसे तेज नगर निगम मार्ग' : 'Fastest Municipal Approach'}
                </span>
                <h4 className="text-[20px] font-extrabold text-[#7B2638] font-serif mt-0.5">
                  {hub.walkingTimeMin} {language === 'mr' ? 'मिनिटे' : language === 'hi' ? 'मिनट' : 'mins'} ({hub.distance})
                </h4>
              </div>
              <span className="text-[11px] font-bold text-[#7B2638] px-2.5 py-1 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B]/30">
                {language === 'mr' ? 'कमी वाहतूक' : language === 'hi' ? 'कम ट्रैफिक' : 'Low Congestion'}
              </span>
            </div>
            <p className="text-[12px] text-[#5e5954] mt-2">
              {language === 'mr'
                ? 'कोल्हापुरातील गर्दी टाळणारा आणि थेट प्रवेश देणारा अधिकृत मार्ग.'
                : language === 'hi'
                ? 'कोल्हापुर के भीड़भाड़ से बचने और सीधे प्रवेश के लिए आधिकारिक मार्ग।'
                : 'Route calibrated for Kolhapur historic central gates & bypasses Shivaji Road traffic.'}
            </p>
          </div>

          {/* Turn-by-Turn Step Breakdown */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider block">
              {language === 'mr' ? 'टप्प्याटप्प्याने मार्गदर्शन' : language === 'hi' ? 'कदम-दर-कदम दिशा-निर्देश' : 'Step-by-Step Directions'}
            </span>

            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4]">
                <div className="w-6 h-6 rounded-full bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1 text-[12px]">
                  <span className="font-bold text-[#292725] block">
                    {language === 'mr' ? 'भवानी मंडप कमानीकडे पुढे जा' : language === 'hi' ? 'भवानी मंडप गेट की ओर बढ़ें' : 'Head toward Bhavani Mandap Arch'}
                  </span>
                  <span className="text-[#5e5954] text-[11px]">
                    {language === 'mr' ? '१५० मीटर सरळ जा; मनपा एलईडी पार्किंग फलक पहा.' : language === 'hi' ? '150 मीटर सीधे जाएं; केएमसी एलईडी डिस्प्ले देखें।' : 'Proceed 150m straight; look for KMC LED parking telemetry sign.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4]">
                <div className="w-6 h-6 rounded-full bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1 text-[12px]">
                  <span className="font-bold text-[#292725] block">
                    {language === 'mr' ? 'मनपा प्रवेशद्वार १ मधून प्रवेश करा' : language === 'hi' ? 'नगर निगम गेट 1 में प्रवेश करें' : 'Enter Municipal Barrier Gate 1'}
                  </span>
                  <span className="text-[#5e5954] text-[11px]">
                    {language === 'mr' ? 'स्वयंचलित RFID फास्टॅग स्कॅनर सक्रिय. बॅरियर आपोआप उघडेल.' : language === 'hi' ? 'ऑटो आरएफआईडी फास्टैग स्कैनर सक्रिय। बैरियर अपने आप खुलेगा।' : 'Auto RFID FastTag scanner active. Barrier will lift automatically.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#edf8f2] border border-[#26965B]/30">
                <div className="w-6 h-6 rounded-full bg-[#26965B] text-white flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1 text-[12px]">
                  <span className="font-bold text-[#26965B] block">
                    {language === 'mr' ? 'आरक्षित जागेवर वाहन लावा' : language === 'hi' ? 'आरक्षित स्लॉट पर पार्क करें' : 'Arrive at Reserved Bay'}
                  </span>
                  <span className="text-[#5e5954] text-[11px]">
                    {language === 'mr' ? 'छतासह सावलीयुक्त व सुरक्षित जागा उपलब्ध.' : language === 'hi' ? 'छायादार व सुरक्षित पार्किंग स्लॉट उपलब्ध।' : 'Ground level bays with covered canopy shade available.'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Nearby Places at Destination */}
          {pois.length > 0 && (
            <div className="space-y-2.5 pt-2 border-t border-[#EFECE4]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#7B2638]" />
                  <span className="text-[12px] font-bold text-[#7B2638] uppercase tracking-wider">
                    {language === 'mr' ? 'या परिसरातील महत्त्वाची ठिकाणे' : language === 'hi' ? 'इस स्थान के पास प्रमुख स्थल' : 'Nearby at this Location'}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-[#26965B] bg-[#edf8f2] px-2 py-0.5 rounded-full">
                  {pois.length} {language === 'mr' ? 'ठिकाणे' : language === 'hi' ? 'स्थल' : 'Spots'}
                </span>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 text-[11px] overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setActivePoiTab('all')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activePoiTab === 'all'
                      ? 'bg-[#7B2638] text-white'
                      : 'bg-[#F7F4EE] text-[#5e5954] hover:bg-[#EFECE4]'
                  }`}
                >
                  {t.hubCard.allNearby}
                </button>
                <button
                  type="button"
                  onClick={() => setActivePoiTab('hospital')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activePoiTab === 'hospital'
                      ? 'bg-[#D94B4B] text-white'
                      : 'bg-[#F7F4EE] text-[#D94B4B] hover:bg-[#fdf0f0]'
                  }`}
                >
                  <Hospital className="w-3 h-3" />
                  <span>{t.hubCard.hospitals}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePoiTab('food')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activePoiTab === 'food'
                      ? 'bg-[#C6A15B] text-white'
                      : 'bg-[#F7F4EE] text-[#7B2638] hover:bg-[#fef7ec]'
                  }`}
                >
                  <Utensils className="w-3 h-3" />
                  <span>{t.hubCard.food}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePoiTab('stay')}
                  className={`px-2 py-0.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    activePoiTab === 'stay'
                      ? 'bg-[#7B2638] text-white'
                      : 'bg-[#F7F4EE] text-[#7B2638] hover:bg-[#F7F4EE]'
                  }`}
                >
                  <Hotel className="w-3 h-3" />
                  <span>{t.hubCard.stay}</span>
                </button>
              </div>

              {/* POI Cards */}
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {filteredPois.map((poi) => (
                  <div
                    key={poi.id}
                    className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] flex items-start justify-between gap-2 text-[11px]"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          poi.category === 'hospital'
                            ? 'bg-[#fdf0f0] text-[#D94B4B]'
                            : poi.category === 'food'
                            ? 'bg-[#fef7ec] text-[#C6A15B]'
                            : 'bg-[#F7F4EE] text-[#7B2638]'
                        }`}
                      >
                        {poi.category === 'hospital' && <Hospital className="w-3 h-3" />}
                        {poi.category === 'food' && <Utensils className="w-3 h-3" />}
                        {poi.category === 'stay' && <Hotel className="w-3 h-3" />}
                      </div>
                      <div className="min-w-0">
                        <span className="font-extrabold text-[#7B2638] block truncate">
                          {poi.name}
                        </span>
                        <span className="text-[#5e5954] text-[10px] block line-clamp-1">
                          {poi.specialtyOrType}
                        </span>
                        {poi.phone && (
                          <a
                            href={`tel:${poi.phone}`}
                            className="text-[#7B2638] font-bold text-[10px] flex items-center gap-1 mt-0.5 hover:underline"
                          >
                            <Phone className="w-2.5 h-2.5" />
                            <span>{poi.phone}</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <span className="font-bold text-[#26965B] text-[10px] block">
                        {poi.distance}
                      </span>
                      <span className="text-[9px] text-[#8a847e] block">
                        {poi.walkingTimeMin} {language === 'mr' ? 'मि. चालत' : language === 'hi' ? 'मि. पैदल' : 'min walk'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* External Google Maps Button */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-[13px] flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer flex-shrink-0"
          >
            <span>{language === 'mr' ? 'गुगल मॅप्स जीपीएस मध्ये उघडा' : language === 'hi' ? 'गूगल मैप्स जीपीएस में खोलें' : 'Open in Google Maps GPS'}</span>
            <ExternalLink className="w-4 h-4 text-[#C6A15B]" />
          </a>
        </div>
      </div>
    </div>
  );
};