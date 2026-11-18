import React, { useState } from 'react';
import {
  ParkingCircle,
  TrendingUp,
  ShieldCheck,
  Plus,
  Video,
  CheckCircle,
  Zap,
  IndianRupee,
  ToggleLeft,
  ToggleRight,
  X,
  Sparkles,
} from 'lucide-react';

export const OwnerHubView: React.FC = () => {
  const [bays, setBays] = useState([
    { id: 'b1', code: 'P-KMC-01', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'OCCUPIED', vehicle: 'MH 09 EF 8812', revenue: '₹120' },
    { id: 'b2', code: 'P-KMC-02', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'AVAILABLE', vehicle: 'Empty', revenue: '₹90' },
    { id: 'b3', code: 'P-KMC-03', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'AVAILABLE', vehicle: 'Empty', revenue: '₹180' },
  ]);

  const [isLiveEnabled, setIsLiveEnabled] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotAddress, setNewPlotAddress] = useState('');
  const [newPlotCapacity, setNewPlotCapacity] = useState('2');
  const [newPlotRate, setNewPlotRate] = useState('25');
  const [listSuccess, setListSuccess] = useState(false);

  const handleAddPlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotName) return;

    setBays((prev) => [
      ...prev,
      {
        id: `b-${Date.now()}`,
        code: `P-KMC-0${prev.length + 1}`,
        location: newPlotAddress || newPlotName,
        rate: `₹${newPlotRate}/hr`,
        status: 'AVAILABLE',
        vehicle: 'Ready for booking',
        revenue: '₹0',
      },
    ]);

    setListSuccess(true);
    setTimeout(() => {
      setListSuccess(false);
      setShowAddModal(false);
      setNewPlotName('');
      setNewPlotAddress('');
    }, 1200);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 pb-20 pt-2 animate-in fade-in text-left">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-[#7B2638] font-serif tracking-tight">
              Owner & Host Hub
            </h2>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#C6A15B]/20 text-[#7B2638] border border-[#C6A15B]/30">
              KMC Host Portal
            </span>
          </div>
          <p className="text-[12px] text-[#5e5954]">
            Monetize private land under KMC Municipal Smart Corridor guidelines
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="h-9 px-3.5 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-[12px] flex items-center gap-1.5 shadow-sm hover:bg-[#5e1c2a] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#C6A15B]" />
          <span>List Plot</span>
        </button>
      </div>

      {/* Revenue & Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col">
          <span className="text-[10px] text-[#5e5954] uppercase font-bold">Today's Revenue</span>
          <span className="text-[24px] font-extrabold text-[#7B2638] mt-1 font-serif">₹390.00</span>
          <span className="text-[11px] text-[#26965B] font-semibold mt-0.5">↑ 18% vs yesterday</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col">
          <span className="text-[10px] text-[#5e5954] uppercase font-bold">Occupancy Rate</span>
          <span className="text-[24px] font-extrabold text-[#26965B] mt-1 font-serif">66.7%</span>
          <span className="text-[11px] text-[#5e5954] mt-0.5">2 of 3 bays occupied</span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-[#5e5954] uppercase font-bold">KMC Sensor Auto-Sync</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#26965B] animate-pulse" />
              <span className="text-[13px] font-extrabold text-[#292725]">
                {isLiveEnabled ? 'Online & Discoverable' : 'Paused by Host'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsLiveEnabled(!isLiveEnabled)}
            className="text-[11px] font-bold text-[#7B2638] hover:underline cursor-pointer text-left mt-2"
          >
            {isLiveEnabled ? 'Toggle Offline' : 'Toggle Online'}
          </button>
        </div>
      </div>

      {/* Managed Bays Table */}
      <div className="rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
          <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
            Your Registered Parking Bays
          </h3>
          <span className="text-[11px] font-bold text-[#5e5954]">
            {bays.length} Bays Active
          </span>
        </div>

        <div className="divide-y divide-[#EFECE4]">
          {bays.map((bay) => (
            <div key={bay.id} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    bay.status === 'AVAILABLE'
                      ? 'bg-[#edf8f2] text-[#26965B]'
                      : 'bg-[#fdf0f0] text-[#D94B4B]'
                  }`}
                >
                  {bay.code.split('-')[2]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#292725]">
                      {bay.code}
                    </span>
                    <span
                      className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                        bay.status === 'AVAILABLE'
                          ? 'bg-[#edf8f2] text-[#26965B]'
                          : 'bg-[#fdf0f0] text-[#D94B4B]'
                      }`}
                    >
                      {bay.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5e5954] block mt-0.5">
                    {bay.location} • {bay.rate}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#5e5954] block">Earnings</span>
                <span className="text-[14px] font-extrabold text-[#7B2638]">
                  {bay.revenue}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Plot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#C6A15B]/30 shadow-2xl p-6 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F7F4EE] text-[#5e5954] flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {listSuccess ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle className="w-12 h-12 text-[#26965B] mx-auto animate-bounce" />
                <h4 className="text-[18px] font-bold text-[#7B2638] font-serif">
                  Plot Registered with KMC!
                </h4>
                <p className="text-[12px] text-[#5e5954]">
                  Municipal edge sensor node provisioned. Your lot is now discoverable.
                </p>
              </div>
            ) : (
              <form onSubmit={handleAddPlot} className="space-y-3.5">
                <div className="border-b border-[#EFECE4] pb-2">
                  <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                    List Private Land for Parking
                  </h3>
                  <p className="text-[11px] text-[#5e5954]">
                    Earn revenue from tourists & temple visitors in Kolhapur
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                    Plot / Landmark Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                    placeholder="e.g. Mahadwar Courtyard Parking"
                    className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                    Street Address in Kolhapur
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotAddress}
                    onChange={(e) => setNewPlotAddress(e.target.value)}
                    placeholder="e.g. Near Bhavani Mandap Gate"
                    className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                      Bay Capacity
                    </label>
                    <input
                      type="number"
                      value={newPlotCapacity}
                      onChange={(e) => setNewPlotCapacity(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                      Hourly Rate (₹)
                    </label>
                    <input
                      type="number"
                      value={newPlotRate}
                      onChange={(e) => setNewPlotRate(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-[#7B2638] hover:bg-[#5e1c2a] text-[#FFFDF8] font-bold text-[13px] shadow-sm transition-all cursor-pointer mt-2"
                >
                  Confirm & List Bay
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};