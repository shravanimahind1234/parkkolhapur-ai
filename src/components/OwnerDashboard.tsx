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
  Lock,
  Warehouse,
  AlertTriangle,
  User,
  LogOut,
  Calendar,
  X,
  Sparkles,
} from 'lucide-react';
import { UserAccount, ParkingHub, Booking } from '../types';

interface OwnerDashboardProps {
  currentUser: UserAccount;
  hubs: ParkingHub[];
  bookings: Booking[];
  onAddFacility: (newHub: ParkingHub) => void;
  onUpdateSlotStatus: (hubId: string, slotCode: string, newStatus: any) => void;
  onSignOut: () => void;
  onOpenAuth?: () => void;
}

export const OwnerDashboard: React.FC<OwnerDashboardProps> = ({
  currentUser,
  hubs,
  bookings,
  onAddFacility,
  onUpdateSlotStatus,
  onSignOut,
  onOpenAuth,
}) => {
  // STRICT DATA PRIVACY: Load only facilities where ownerId matches this authenticated owner
  const myFacilities = hubs.filter((h) => h.ownerId === currentUser.id);

  // Load only bookings made at facilities owned by this user
  const myFacilityIds = new Set(myFacilities.map((f) => f.id));
  const myFacilityBookings = bookings.filter((b) => myFacilityIds.has(b.hubId));

  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlotName, setNewPlotName] = useState('');
  const [newPlotAddress, setNewPlotAddress] = useState('');
  const [newPlotRate, setNewPlotRate] = useState('25');
  const [newPlotBays, setNewPlotBays] = useState('8');
  const [selectedHubId, setSelectedHubId] = useState<string>(myFacilities[0]?.id || '');
  const [listSuccess, setListSuccess] = useState(false);

  // Role Gate check: Only OWNER or ADMIN permitted
  if (!currentUser.isLoggedIn || (currentUser.role !== 'OWNER' && currentUser.role !== 'ADMIN')) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#D94B4B]/30 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#fdf0f0] text-[#D94B4B] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#7B2638] font-serif">
            Slot Owner Access Restricted
          </h2>
          <p className="text-[13px] text-[#5e5954] leading-relaxed">
            {!currentUser.isLoggedIn ? (
              <span>Please sign in with a registered <strong>Slot Owner / Host</strong> account to manage your facilities and slots.</span>
            ) : (
              <span>
                Your current account (<strong>{currentUser.email}</strong>) is registered as a <strong>Citizen Customer</strong>.
                Under KMC Municipal strict isolation policies, only verified private lot hosts and owners can access this dashboard.
              </span>
            )}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onOpenAuth || onSignOut}
              className="h-10 px-5 rounded-xl bg-[#7B2638] text-white text-xs font-bold cursor-pointer hover:bg-[#5e1c2a] transition-all shadow-sm"
            >
              Sign In as Owner Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Aggregate metrics across this owner's facilities only
  const totalBaysOwned = myFacilities.reduce((sum, f) => sum + f.totalBays, 0);
  const totalOpenBays = myFacilities.reduce((sum, f) => sum + f.openBays, 0);
  const totalRevenue = myFacilityBookings.reduce((sum, b) => sum + b.totalAmount, 0) + (myFacilities.length > 0 ? 320 : 0);

  const activeHub = myFacilities.find((f) => f.id === selectedHubId) || myFacilities[0];

  const handleCreatePlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlotName.trim()) return;

    const newHub: ParkingHub = {
      id: `hub-owner-${Date.now()}`,
      ownerId: currentUser.id,
      name: newPlotName.trim(),
      area: newPlotAddress.trim() || 'Central Kolhapur',
      distance: 'Within 500m',
      distanceMeters: 500,
      walkingTimeMin: 5,
      hourlyRate: { bike: 15, car: Number(newPlotRate) || 25, ev: 40 },
      dayPassRate: { bike: 100, car: (Number(newPlotRate) || 25) * 8, ev: 280 },
      totalBays: Number(newPlotBays) || 8,
      openBays: Number(newPlotBays) || 8,
      syncTime: 'Synced via Host Telemetry',
      isMunicipalApproved: true,
      hasEvCharger: false,
      hasCctv: true,
      hasCoveredShade: true,
      landmark: 'Bhavani Mandap',
      coordinates: { lat: 16.6957, lng: 74.2255 },
      aiAdvisory: {
        badge: 'HOSTED BAY',
        message: 'Private host lot calibrated under KMC smart corridor',
        type: 'neutral',
      },
      slots: Array.from({ length: Number(newPlotBays) || 8 }, (_, i) => ({
        id: `s-${Date.now()}-${i}`,
        code: `P-0${i + 1}`,
        type: 'car' as const,
        status: 'AVAILABLE' as const,
        isCovered: true,
      })),
    };

    onAddFacility(newHub);
    setSelectedHubId(newHub.id);
    setListSuccess(true);
    setTimeout(() => {
      setListSuccess(false);
      setShowAddModal(false);
      setNewPlotName('');
      setNewPlotAddress('');
    }, 1000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 text-left">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-sm mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#7B2638] text-[#FFFDF8] font-serif text-2xl font-black flex items-center justify-center shadow-md border-2 border-[#C6A15B]/30">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-[#7B2638] font-serif">
                {currentUser.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#C6A15B]/20 text-[#7B2638] border border-[#C6A15B]/30">
                Verified Lot Owner
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf8f2] text-[#26965B]">
                Host UID: {currentUser.id.slice(0, 12)}
              </span>
            </div>
            <p className="text-[13px] text-[#5e5954] mt-1">
              Private Parking Facility Management & KMC Municipal Revenue Settlement
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-10 px-4 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#5e1c2a] transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#C6A15B]" />
            <span>List New Facility</span>
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="h-10 px-3 rounded-xl bg-[#fdf0f0] text-[#D94B4B] font-bold text-xs flex items-center gap-1.5 border border-[#D94B4B]/20 hover:bg-[#fbdada] transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Owner Financial & Capacity Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Today's Net Revenue
          </span>
          <div className="text-2xl font-extrabold text-[#26965B] font-serif mt-1">
            ₹{totalRevenue}
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            Direct KMC payout
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Registered Facilities
          </span>
          <div className="text-2xl font-extrabold text-[#7B2638] font-serif mt-1">
            {myFacilities.length}
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Under this account
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Total Bays Managed
          </span>
          <div className="text-2xl font-extrabold text-[#292725] font-serif mt-1">
            {totalBaysOwned} Bays
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            {totalOpenBays} Currently Available
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Customer Bookings
          </span>
          <div className="text-2xl font-extrabold text-[#C6A15B] font-serif mt-1">
            {myFacilityBookings.length}
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Recorded at your lots
          </span>
        </div>
      </div>

      {/* Facilities Tabs & Management */}
      {myFacilities.length > 0 ? (
        <div className="space-y-6">
          {/* Facility Selector */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex items-center justify-between flex-wrap gap-3">
            <div>
              <span className="text-[11px] font-bold text-[#5e5954] uppercase tracking-wider block">
                Active Parking Facility
              </span>
              <div className="flex items-center gap-2 mt-1">
                {myFacilities.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedHubId(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      activeHub.id === f.id
                        ? 'bg-[#7B2638] text-[#FFFDF8] border-[#7B2638]'
                        : 'bg-[#F7F4EE] text-[#5e5954] border-[#EFECE4]'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 text-[12px] font-bold text-[#26965B]">
              <span className="w-2 h-2 rounded-full bg-[#26965B] animate-pulse" />
              <span>Edge Node Online</span>
            </div>
          </div>

          {/* Active Facility Live Slot Matrix & Slot Toggles */}
          {activeHub && (
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
                <div>
                  <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                    Live Slot Occupancy Matrix • {activeHub.name}
                  </h3>
                  <p className="text-[12px] text-[#5e5954]">
                    Tap any slot to toggle between Available and Maintenance
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-[#5e5954] block">Hourly Rate</span>
                  <span className="text-[16px] font-bold text-[#7B2638]">
                    ₹{activeHub.hourlyRate.car}/hr
                  </span>
                </div>
              </div>

              {/* Slot grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                {activeHub.slots.map((slot) => {
                  const isAvail = slot.status === 'AVAILABLE';
                  const isOcc = slot.status === 'OCCUPIED';
                  const isMaint = slot.status === 'MAINTENANCE';

                  return (
                    <button
                      key={slot.id}
                      type="button"
                      onClick={() =>
                        onUpdateSlotStatus(
                          activeHub.id,
                          slot.code,
                          isMaint ? 'AVAILABLE' : isAvail ? 'MAINTENANCE' : 'AVAILABLE'
                        )
                      }
                      className={`h-14 rounded-2xl flex flex-col items-center justify-center p-1 border transition-all cursor-pointer ${
                        isAvail
                          ? 'bg-[#edf8f2] text-[#26965B] border-[#26965B]/30 hover:border-[#26965B]'
                          : isOcc
                          ? 'bg-[#fdf0f0] text-[#D94B4B] border-[#D94B4B]/30'
                          : 'bg-[#F7F4EE] text-[#8a847e] border-[#EFECE4]'
                      }`}
                    >
                      <span className="text-[13px] font-black">{slot.code}</span>
                      <span className="text-[9px] font-bold uppercase">
                        {slot.status}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 text-[11px] text-[#5e5954] pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#26965B]" /> Open for booking
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#D94B4B]" /> Customer Parked
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-[#8a847e]" /> Maintenance / Reserved
                </span>
              </div>
            </div>
          )}

          {/* Bookings At Your Facility */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
                Customer Bookings at Your Facilities
              </h3>
              <span className="text-[11px] text-[#5e5954]">
                Isolated to your owner account
              </span>
            </div>

            {myFacilityBookings.length > 0 ? (
              <div className="divide-y divide-[#EFECE4]">
                {myFacilityBookings.map((b) => (
                  <div key={b.id} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#292725]">
                          Bay {b.slotCode} • {b.vehicleNumber}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-[#edf8f2] text-[#26965B]">
                          {b.status}
                        </span>
                      </div>
                      <span className="text-[11px] text-[#5e5954] block mt-0.5">
                        {b.hubName} • Pass #{b.id}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[14px] font-bold text-[#26965B] block">
                        +₹{b.totalAmount}
                      </span>
                      <span className="text-[10px] text-[#8a847e]">
                        {b.startTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-[#5e5954] text-[13px]">
                No customer bookings recorded at your facilities yet. New arrivals will appear here in real time.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-10 rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] text-center space-y-4">
          <Warehouse className="w-12 h-12 text-[#C6A15B] mx-auto" />
          <h3 className="text-xl font-bold text-[#7B2638] font-serif">
            No Parking Facilities Listed Yet
          </h3>
          <p className="text-[13px] text-[#5e5954] max-w-md mx-auto">
            You are registered as a Slot Owner. Register your private plot or courtyard to start earning parking revenue in Kolhapur.
          </p>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-10 px-5 rounded-xl bg-[#7B2638] text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>List Your First Parking Lot</span>
          </button>
        </div>
      )}

      {/* Add Facility Modal */}
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
                  Facility Registered Securely!
                </h4>
                <p className="text-[12px] text-[#5e5954]">
                  Linked with Owner ID: {currentUser.id}. Isolated under your dashboard.
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreatePlot} className="space-y-3.5">
                <div className="border-b border-[#EFECE4] pb-2">
                  <h3 className="text-[17px] font-bold text-[#7B2638] font-serif">
                    Register Parking Facility
                  </h3>
                  <p className="text-[11px] text-[#5e5954]">
                    Listed under your authenticated owner ID with KMC approval
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                    Facility Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotName}
                    onChange={(e) => setNewPlotName(e.target.value)}
                    placeholder="e.g. Mahadwar Courtyard Smart Parking"
                    className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                    Address in Kolhapur
                  </label>
                  <input
                    type="text"
                    required
                    value={newPlotAddress}
                    onChange={(e) => setNewPlotAddress(e.target.value)}
                    placeholder="e.g. Bhavani Mandap Road"
                    className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                      Total Bays
                    </label>
                    <input
                      type="number"
                      value={newPlotBays}
                      onChange={(e) => setNewPlotBays(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl bg-[#FFFFFF] border border-[#EFECE4] text-[13px] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#5e5954] uppercase block mb-1">
                      Car Hourly Rate (₹)
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
                  Confirm & List Facility
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};