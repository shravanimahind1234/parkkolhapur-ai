import React, { useState } from 'react';
import {
  User,
  Ticket,
  Clock,
  Car,
  ShieldCheck,
  Plus,
  Calendar,
  IndianRupee,
  MapPin,
  QrCode,
  Download,
  PlusCircle,
  LogOut,
  Edit3,
  CheckCircle2,
  Trash2,
  Zap,
  Bike,
  Sparkles,
} from 'lucide-react';
import { UserAccount, Booking, SavedVehicle } from '../types';

interface CustomerDashboardProps {
  currentUser: UserAccount;
  bookings: Booking[];
  onExtendBooking: (bookingId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onOpenDirections: (hubId: string) => void;
  onOpenShuttle: () => void;
  onAddVehicle: (v: SavedVehicle) => void;
  onRemoveVehicle: (id: string) => void;
  onSetDefaultVehicle: (id: string) => void;
  onUpdateProfile: (updated: Partial<UserAccount>) => void;
  onSignOut: () => void;
  onFindParking: () => void;
  onOpenAuth?: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  bookings,
  onExtendBooking,
  onCancelBooking,
  onOpenDirections,
  onOpenShuttle,
  onAddVehicle,
  onRemoveVehicle,
  onSetDefaultVehicle,
  onUpdateProfile,
  onSignOut,
  onFindParking,
  onOpenAuth,
}) => {
  // STRICT DATA PRIVACY: Require login before showing private data
  if (!currentUser.isLoggedIn) {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#7B2638]/20 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#7B2638]/10 text-[#7B2638] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#7B2638] font-serif">
            Citizen Dashboard Sign-In Required
          </h2>
          <p className="text-[13px] text-[#5e5954] leading-relaxed">
            Please sign in to access your personalized parking passes, active vehicle fleet, payment history, and account settings. All user records and passes are strictly private and isolated.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onOpenAuth || onSignOut}
              className="h-10 px-5 rounded-xl bg-[#7B2638] text-white text-xs font-bold shadow-md hover:bg-[#5e1c2a] transition-all cursor-pointer"
            >
              Sign In to Your Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // STRICT DATA PRIVACY: Filter bookings strictly by authenticated user's ID
  const myBookings = bookings.filter((b) => b.userId === currentUser.id);
  const activeBookings = myBookings.filter((b) => b.status === 'ACTIVE');
  const pastBookings = myBookings.filter((b) => b.status !== 'ACTIVE');

  const [activeSubTab, setActiveSubTab] = useState<'passes' | 'history' | 'vehicles' | 'settings'>('passes');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editName, setEditName] = useState(currentUser.name);
  const [editPhone, setEditPhone] = useState(currentUser.phone);
  const [editAddress, setEditAddress] = useState(currentUser.address || 'Kolhapur, Maharashtra');
  const [showAddVehicleForm, setShowAddVehicleForm] = useState(false);
  const [newPlate, setNewPlate] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newType, setNewType] = useState<'car' | 'bike' | 'ev'>('car');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Computed metrics
  const totalHoursParked = myBookings.reduce((sum, b) => sum + (b.durationHours || 2), 0);
  const totalSpent = myBookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setIsEditingProfile(false);
    }, 1000);
  };

  const handleAddVehicleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate.trim()) return;

    const v: SavedVehicle = {
      id: `v-${Date.now()}`,
      userId: currentUser.id,
      plateNumber: newPlate.toUpperCase().trim(),
      nickname: newNickname.trim() || (newType === 'car' ? 'Car' : newType === 'bike' ? '2-Wheeler' : 'EV'),
      vehicleType: newType,
      isDefault: currentUser.vehicles.length === 0,
      fastTagId: `FT-${Math.floor(1000 + Math.random() * 9000)}-KMC-09`,
    };

    onAddVehicle(v);
    setNewPlate('');
    setNewNickname('');
    setShowAddVehicleForm(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 text-left">
      {/* 1. Personalized User Welcome Header */}
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
                {currentUser.citizenBadge}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf8f2] text-[#26965B]">
                ID: {currentUser.id.slice(0, 12)}
              </span>
            </div>
            <p className="text-[13px] text-[#5e5954] mt-1">
              {currentUser.email} • {currentUser.phone}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            type="button"
            onClick={onFindParking}
            className="h-10 px-4 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-[#5e1c2a] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#C6A15B]" />
            <span>Book Parking</span>
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

      {/* 2. Personalized Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Active Passes
          </span>
          <div className="text-2xl font-extrabold text-[#7B2638] font-serif mt-1">
            {activeBookings.length}
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            {activeBookings.length > 0 ? 'Ready at barrier' : 'No active pass'}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Parking History
          </span>
          <div className="text-2xl font-extrabold text-[#292725] font-serif mt-1">
            {myBookings.length}
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Total sessions booked
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Hours Parked
          </span>
          <div className="text-2xl font-extrabold text-[#C6A15B] font-serif mt-1">
            {totalHoursParked} hrs
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Across Kolhapur lots
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Saved Vehicles
          </span>
          <div className="text-2xl font-extrabold text-[#7B2638] font-serif mt-1">
            {currentUser.vehicles.length}
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            FastTag Synced
          </span>
        </div>
      </div>

      {/* 3. Personalized Dashboard Navigation Tabs */}
      <div className="flex border-b border-[#EFECE4] mb-6 gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSubTab('passes')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'passes'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>Active Passes ({activeBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('history')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'history'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Parking History ({pastBookings.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('vehicles')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'vehicles'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Car className="w-4 h-4" />
          <span>My Vehicles ({currentUser.vehicles.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('settings')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeSubTab === 'settings'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Account Settings</span>
        </button>
      </div>

      {/* 4. Tab Content: Active Passes */}
      {activeSubTab === 'passes' && (
        <div className="space-y-4">
          {activeBookings.length > 0 ? (
            activeBookings.map((b) => (
              <div
                key={b.id}
                className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border-2 border-[#C6A15B]/30 shadow-md relative overflow-hidden"
              >
                <div className="flex items-start justify-between border-b border-[#EFECE4] pb-3 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase bg-[#7B2638] text-[#FFFDF8] px-2 py-0.5 rounded tracking-wider">
                        PASS #{b.id}
                      </span>
                      <span className="text-[11px] font-bold text-[#26965B] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-ping" />
                        ACTIVE
                      </span>
                    </div>
                    <h3 className="text-[18px] font-bold text-[#7B2638] font-serif mt-1">
                      {b.hubName}
                    </h3>
                    <p className="text-[12px] text-[#5e5954] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7B2638]" />
                      {b.entryGate}
                    </p>
                  </div>

                  <div className="p-2 px-3.5 rounded-2xl bg-[#F7F4EE] border border-[#C6A15B]/40 text-center">
                    <span className="text-[9px] font-bold text-[#5e5954] uppercase block">Assigned Bay</span>
                    <span className="text-[22px] font-black text-[#7B2638] leading-none mt-0.5 block">
                      {b.slotCode}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-3 border-b border-[#EFECE4]">
                  <div className="p-3 rounded-xl bg-[#F7F4EE]">
                    <span className="text-[10px] text-[#5e5954] font-bold block">Vehicle</span>
                    <span className="text-[13px] font-mono font-bold text-[#292725]">{b.vehicleNumber}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F4EE]">
                    <span className="text-[10px] text-[#5e5954] font-bold block">Duration</span>
                    <span className="text-[13px] font-bold text-[#292725]">{b.durationHours} Hours</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#F7F4EE] col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-[#5e5954] font-bold block">Paid Amount</span>
                    <span className="text-[13px] font-bold text-[#7B2638]">₹{b.totalAmount}</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onExtendBooking(b.id)}
                      className="h-9 px-3 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Extend +1 Hr</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenDirections(b.hubId)}
                      className="h-9 px-3 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>Navigate</span>
                    </button>
                    {b.includeShuttlePass && (
                      <button
                        type="button"
                        onClick={onOpenShuttle}
                        className="h-9 px-3 rounded-xl bg-[#fef7ec] text-[#7B2638] text-[11px] font-bold cursor-pointer"
                      >
                        Temple Shuttle ➔
                      </button>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => onCancelBooking(b.id)}
                    className="h-9 px-3 rounded-xl bg-[#fdf0f0] text-[#D94B4B] text-[11px] font-bold hover:bg-[#fbdada] cursor-pointer"
                  >
                    End Parking
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] text-center space-y-3">
              <Ticket className="w-12 h-12 text-[#C6A15B] mx-auto" />
              <h4 className="text-[17px] font-bold text-[#7B2638] font-serif">
                No Active Municipal Passes
              </h4>
              <p className="text-[13px] text-[#5e5954] max-w-sm mx-auto">
                You have no active parking bookings right now. Reserve a bay to get your instant QR barrier pass.
              </p>
              <button
                type="button"
                onClick={onFindParking}
                className="h-10 px-5 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs inline-flex items-center gap-1.5 shadow-sm hover:bg-[#5e1c2a] cursor-pointer"
              >
                <span>Find Parking in Kolhapur</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 5. Tab Content: Parking History */}
      {activeSubTab === 'history' && (
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
              Personal Parking Records
            </h3>
            <span className="text-[11px] text-[#5e5954] font-medium">
              Strictly filtered to Account: {currentUser.name}
            </span>
          </div>

          {pastBookings.length > 0 ? (
            <div className="divide-y divide-[#EFECE4]">
              {pastBookings.map((b) => (
                <div key={b.id} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-bold text-[#292725]">
                        {b.hubName}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#edf8f2] text-[#26965B]">
                        COMPLETED
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5e5954] block mt-0.5">
                      Bay {b.slotCode} • {b.vehicleNumber} • {b.durationHours} hrs
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[14px] font-bold text-[#7B2638] block">
                      ₹{b.totalAmount}
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
              No past parking history yet. Completed sessions will be archived here.
            </div>
          )}
        </div>
      )}

      {/* 6. Tab Content: My Vehicles */}
      {activeSubTab === 'vehicles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[16px] font-bold text-[#7B2638] font-serif">
                Registered Kolhapur Vehicles
              </h3>
              <p className="text-[12px] text-[#5e5954]">
                Vehicle numbers linked to your citizen account for automatic FastTag recognition
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddVehicleForm(true)}
              className="h-9 px-3.5 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Vehicle</span>
            </button>
          </div>

          {showAddVehicleForm && (
            <form onSubmit={handleAddVehicleSubmit} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#C6A15B]/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-[#7B2638]">
                  Register Vehicle Plate
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddVehicleForm(false)}
                  className="text-[11px] text-[#5e5954] hover:underline"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(['car', 'bike', 'ev'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setNewType(t)}
                    className={`py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                      newType === t ? 'bg-[#7B2638] text-[#FFFDF8]' : 'bg-[#F7F4EE] text-[#5e5954]'
                    }`}
                  >
                    {t === 'ev' ? 'EV Hub' : t === 'bike' ? '2-Wheeler' : 'Car'}
                  </button>
                ))}
              </div>

              <input
                type="text"
                required
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                placeholder="MH 09 XX 0000"
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] font-mono font-bold uppercase focus:outline-none focus:border-[#7B2638]"
              />

              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                placeholder="Model / Nickname (e.g. Honda City)"
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
              />

              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs transition-colors cursor-pointer"
              >
                Save Vehicle
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentUser.vehicles.map((v) => (
              <div key={v.id} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#C6A15B]/15 text-[#7B2638] flex items-center justify-center">
                    {v.vehicleType === 'bike' ? <Bike className="w-5 h-5" /> : v.vehicleType === 'ev' ? <Zap className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14px] font-mono font-bold text-[#292725]">{v.plateNumber}</span>
                      {v.isDefault && (
                        <span className="text-[9px] font-bold bg-[#7B2638] text-[#FFFDF8] px-1.5 py-0.2 rounded">DEFAULT</span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#5e5954]">{v.nickname}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {!v.isDefault && (
                    <button
                      type="button"
                      onClick={() => onSetDefaultVehicle(v.id)}
                      className="text-[11px] font-bold text-[#7B2638] hover:underline px-2 py-1 cursor-pointer"
                    >
                      Make Default
                    </button>
                  )}
                  {currentUser.vehicles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onRemoveVehicle(v.id)}
                      className="w-7 h-7 text-[#D94B4B] hover:bg-[#fdf0f0] rounded-lg flex items-center justify-center cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Tab Content: Account Settings & Profile Editing */}
      {activeSubTab === 'settings' && (
        <div className="max-w-xl rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
            <div>
              <h3 className="text-[16px] font-bold text-[#7B2638] font-serif">
                Citizen Account Settings
              </h3>
              <p className="text-[12px] text-[#5e5954]">
                Manage your personal contact details & verification
              </p>
            </div>
            {saveSuccess && (
              <span className="text-[11px] font-bold text-[#26965B] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Saved
              </span>
            )}
          </div>

          <form onSubmit={handleProfileSave} className="space-y-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#5e5954] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] text-[#292725] focus:outline-none focus:border-[#7B2638]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#5e5954] block mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] text-[#292725] focus:outline-none focus:border-[#7B2638]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#5e5954] block mb-1">
                Resident Address in Kolhapur
              </label>
              <input
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] text-[#292725] focus:outline-none focus:border-[#7B2638]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#5e5954] block mb-1">
                Account ID (Fixed Supabase UID)
              </label>
              <input
                type="text"
                disabled
                value={currentUser.id}
                className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[12px] font-mono text-[#8a847e] cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="h-10 px-5 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-xs hover:bg-[#5e1c2a] transition-all cursor-pointer shadow-xs"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};