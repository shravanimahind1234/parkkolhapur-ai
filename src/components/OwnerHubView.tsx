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
    <div className="w-full flex flex-col gap-4 pb-20 pt-2 animate-in fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#d3e4fe] tracking-tight">
            Owner & Host Hub
          </h2>
          <p className="text-[12px] text-[#c6c6cd]">
            Monetize private land under KMC Municipal Smart Corridor guidelines
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="h-9 px-3 rounded-xl bg-[#ffb95f] text-[#472a00] font-bold text-[12px] flex items-center gap-1.5 shadow hover:bg-[#ee9800] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>List Slot</span>
        </button>
      </div>

      {/* Revenue & Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        <div className="p-3.5 rounded-xl bg-[#102034] border border-white/5 flex flex-col">
          <span className="text-[11px] font-bold text-[#c6c6cd] uppercase">Today's Earnings</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-black text-[#4edea3]">₹1,480</span>
          </div>
          <span className="text-[10px] text-[#4edea3] flex items-center gap-1 mt-0.5 font-bold">
            <TrendingUp className="w-3 h-3" /> +18% vs last Thursday
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#102034] border border-white/5 flex flex-col">
          <span className="text-[11px] font-bold text-[#c6c6cd] uppercase">Active Bays</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[24px] font-black text-[#ffb95f]">{bays.length}</span>
            <span className="text-[12px] text-[#c6c6cd]">Slots</span>
          </div>
          <span className="text-[10px] text-[#c6c6cd] mt-0.5 font-medium">
            KMC Sensor Paired
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between sm:flex-col sm:items-start">
          <div>
            <span className="text-[11px] font-bold text-[#c6c6cd] uppercase block">
              Gate Status
            </span>
            <span className="text-[13px] font-bold text-[#d3e4fe] mt-1 block">
              {isLiveEnabled ? 'Online & Accepting' : 'Temporarily Closed'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsLiveEnabled(!isLiveEnabled)}
            className="cursor-pointer text-[#4edea3]"
          >
            {isLiveEnabled ? (
              <ToggleRight className="w-8 h-8 text-[#4edea3]" />
            ) : (
              <ToggleLeft className="w-8 h-8 text-[#c6c6cd]" />
            )}
          </button>
        </div>
      </div>

      {/* KMC Partnership Verification Badge */}
      <div className="p-3 rounded-xl bg-[#0f172a] border border-[#ffb95f]/30 flex items-center gap-3">
        <ShieldCheck className="w-6 h-6 text-[#ffb95f] flex-shrink-0" />
        <div className="text-[12px]">
          <span className="font-bold text-[#ffb95f] block">
            KMC Municipal Verified Host #KH-9921
          </span>
          <span className="text-[#c6c6cd]">
            Payouts routed directly to Kolhapur District Central Co-op Bank via UPI.
          </span>
        </div>
      </div>

      {/* Manage Slots List */}
      <div className="space-y-2">
        <h3 className="text-[13px] font-bold text-[#c6c6cd] uppercase tracking-wider">
          Your Registered Slots
        </h3>

        {bays.map((bay) => (
          <div
            key={bay.id}
            className="p-3.5 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#1b2b3f] flex items-center justify-center font-black text-sm text-[#ffb95f]">
                {bay.code.split('-')[2]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[14px] font-bold text-[#d3e4fe]">
                    {bay.code}
                  </span>
                  <span
                    className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      bay.status === 'AVAILABLE'
                        ? 'bg-[#4edea3]/20 text-[#4edea3]'
                        : 'bg-[#ffb4ab]/20 text-[#ffb4ab]'
                    }`}
                  >
                    {bay.status}
                  </span>
                </div>
                <p className="text-[11px] text-[#8a9bb5] mt-0.5">
                  {bay.location} • Rate: {bay.rate}
                </p>
                <p className="text-[11px] text-[#c6c6cd]">
                  Vehicle: <span className="text-[#d3e4fe] font-semibold">{bay.vehicle}</span>
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[14px] font-bold text-[#4edea3] block">
                {bay.revenue}
              </span>
              <span className="text-[10px] text-[#8a9bb5]">earned today</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Slot Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#0b1c30] border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl">
            <h3 className="text-[17px] font-bold text-[#d3e4fe]">
              List New Parking Spot in Kolhapur
            </h3>
            <p className="text-[12px] text-[#c6c6cd]">
              Compliant with Kolhapur Municipal Corporation (KMC) Smart Transit guidelines.
            </p>

            {listSuccess ? (
              <div className="py-6 text-center text-[#4edea3] font-bold flex flex-col items-center gap-2">
                <CheckCircle className="w-10 h-10 animate-bounce" />
                <span>Slot Registered & Verified with KMC Edge Node!</span>
              </div>
            ) : (
              <form onSubmit={handleAddPlot} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-[#c6c6cd] uppercase block mb-1">
                    Plot / Complex Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                    placeholder="e.g. Mahadwar Courtyard Bay"
                    className="w-full h-11 px-3 rounded-xl bg-[#102034] border border-white/10 text-white text-[13px] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#c6c6cd] uppercase block mb-1">
                    Kolhapur Street / Landmark
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotAddress}
                    onChange={(e) => setNewPlotAddress(e.target.value)}
                    placeholder="e.g. Gujri Bazaar, Mahalaxmi Temple"
                    className="w-full h-11 px-3 rounded-xl bg-[#102034] border border-white/10 text-white text-[13px] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-[#c6c6cd] uppercase block mb-1">
                      Capacity (Cars)
                    </label>
                    <input
                      type="number"
                      value={newPlotCapacity}
                      onChange={(e) => setNewPlotCapacity(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#102034] border border-white/10 text-white text-[13px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#c6c6cd] uppercase block mb-1">
                      Rate (₹/hr)
                    </label>
                    <input
                      type="number"
                      value={newPlotRate}
                      onChange={(e) => setNewPlotRate(e.target.value)}
                      className="w-full h-11 px-3 rounded-xl bg-[#102034] border border-white/10 text-white text-[13px] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 h-11 rounded-xl bg-[#1b2b3f] text-[#c6c6cd] font-bold text-[13px] hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-[#ffb95f] text-[#472a00] font-bold text-[13px] hover:bg-[#ee9800] shadow cursor-pointer"
                  >
                    Register Bay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
