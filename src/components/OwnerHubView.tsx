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
  ArrowRight,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const OwnerHubView: React.FC = () => {
  const [bays, setBays] = useState([
    { id: 'b1', code: 'P-KMC-01', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'OCCUPIED', vehicle: 'MH 09 EF 8812', revenue: '₹120' },
    { id: 'b2', code: 'P-KMC-02', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'AVAILABLE', vehicle: 'Empty (Open for booking)', revenue: '₹90' },
    { id: 'b3', code: 'P-KMC-03', location: 'Bhausingji Road (Near South Gate)', rate: '₹30/hr', status: 'AVAILABLE', vehicle: 'Empty (Open for booking)', revenue: '₹180' },
    { id: 'b4', code: 'P-KMC-04', location: 'Bhavani Mandap North Arch', rate: '₹25/hr', status: 'OCCUPIED', vehicle: 'MH 09 BV 3311', revenue: '₹150' },
  ]);

  const [isLiveEnabled, setIsLiveEnabled] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotAddress, setNewPlotAddress] = useState('');
  const [newPlotCapacity, setNewPlotCapacity] = useState('2');
  const [newPlotRate, setNewPlotRate] = useState('25');
  const [listSuccess, setListSuccess] = useState(false);

  const toggleBayStatus = (id: string) => {
    setBays((prev) =>
      prev.map((b) => {
        if (b.id === id) {
          const nextStatus = b.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE';
          return {
            ...b,
            status: nextStatus,
            vehicle: nextStatus === 'OCCUPIED' ? 'Manual Gate Occupancy' : 'Empty (Open for booking)',
          };
        }
        return b;
      })
    );
  };

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
    <div className="w-full flex flex-col gap-6 pb-20 pt-4 animate-in fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFF9EF] tracking-tight">
              Host & Owner Portal
            </h2>
            <span className="text-[10px] font-black uppercase gold-gradient-bg text-[#22070E] px-2 py-0.5 rounded tracking-wider shadow">
              KMC PARTNER
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#C6A15B] mt-0.5">
            Monetize private land and courtyard parking under Kolhapur Municipal Smart Mobility guidelines
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="h-10 px-4 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs flex items-center justify-center gap-2 shadow-lg hover:brightness-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>List New Parking Bay</span>
        </button>
      </div>

      {/* Revenue & Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] font-bold text-[#B8ADA0] uppercase">Today's Revenue</span>
          <span className="font-royal text-2xl font-black text-[#10B981] mt-1">₹1,840</span>
          <span className="text-[10px] text-[#10B981] flex items-center gap-1 mt-0.5 font-bold">
            <TrendingUp className="w-3 h-3" /> +24% vs last week
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] font-bold text-[#B8ADA0] uppercase">Active Bays</span>
          <span className="font-royal text-2xl font-black text-[#C6A15B] mt-1">{bays.length} Bays</span>
          <span className="text-[10px] text-[#E8DECE]">
            {bays.filter((b) => b.status === 'AVAILABLE').length} currently free
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] font-bold text-[#B8ADA0] uppercase">Municipal Payout</span>
          <span className="font-royal text-2xl font-black text-[#FFF9EF] mt-1">₹12,450</span>
          <span className="text-[10px] text-[#10B981] font-bold">Direct Bank Auto-Settled</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] font-bold text-[#B8ADA0] uppercase">KMC Edge Status</span>
          <span className="font-royal text-2xl font-black text-[#10B981] mt-1">100% Up</span>
          <span className="text-[10px] text-[#C6A15B]">Real-time API Sync</span>
        </div>
      </div>

      {/* Live Bays Management List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-royal text-lg font-bold text-[#FFF9EF]">
            Your Managed Parking Bays
          </h3>
          <span className="text-xs text-[#B8ADA0]">
            Tap toggle button to switch live status
          </span>
        </div>

        <div className="space-y-2.5">
          {bays.map((bay) => {
            const isAvailable = bay.status === 'AVAILABLE';
            return (
              <div
                key={bay.id}
                className="p-4 rounded-2xl bg-[#22070E] border border-white/5 hover:border-[#C6A15B]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#651E2B] border border-[#C6A15B]/30 flex items-center justify-center font-black font-royal text-[#C6A15B] flex-shrink-0">
                    {bay.code.slice(-2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#FFF9EF]">{bay.code}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        isAvailable ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40' : 'bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40'
                      }`}>
                        {bay.status}
                      </span>
                    </div>
                    <span className="text-xs text-[#B8ADA0] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C6A15B]" />
                      <span>{bay.location}</span>
                    </span>
                    <span className="text-[11px] text-[#E8DECE] block mt-0.5">
                      {bay.vehicle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                  <div className="text-right">
                    <span className="text-xs font-bold text-[#C6A15B] block">{bay.rate}</span>
                    <span className="text-[10px] text-[#B8ADA0]">Earned: {bay.revenue}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleBayStatus(bay.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isAvailable
                        ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40 hover:bg-[#10B981]/30'
                        : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40 hover:bg-[#EF4444]/30'
                    }`}
                  >
                    {isAvailable ? 'Mark Occupied' : 'Mark Available'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-gradient-to-b from-[#3D101C] to-[#1A0A0F] border border-[#C6A15B]/40 rounded-3xl p-6 shadow-2xl text-[#FFF9EF]">
            <h3 className="font-royal text-lg font-bold text-[#FFF9EF] mb-1">
              List Private Parking Plot with KMC
            </h3>
            <p className="text-xs text-[#C6A15B] mb-4">
              Authorized under Kolhapur Smart Municipal Parking Corridor
            </p>

            <form onSubmit={handleAddPlot} className="space-y-3 text-xs">
              <div>
                <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">Plot / Property Name</label>
                <input
                  type="text"
                  value={newPlotName}
                  onChange={(e) => setNewPlotName(e.target.value)}
                  placeholder="e.g. Patil Wada Courtyard Parking"
                  className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">Street Location & Landmark</label>
                <input
                  type="text"
                  value={newPlotAddress}
                  onChange={(e) => setNewPlotAddress(e.target.value)}
                  placeholder="e.g. Near Bhavani Mandap Arch, Kolhapur"
                  className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">Car Capacity</label>
                  <input
                    type="number"
                    value={newPlotCapacity}
                    onChange={(e) => setNewPlotCapacity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">Hourly Rate (₹)</label>
                  <input
                    type="number"
                    value={newPlotRate}
                    onChange={(e) => setNewPlotRate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF]"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#B8ADA0] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase shadow"
                >
                  {listSuccess ? 'Listing Saved!' : 'Submit for KMC Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
