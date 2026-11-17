import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { LandmarkFilter } from './components/LandmarkFilter';
import { VehicleSelector } from './components/VehicleSelector';
import { AiSmartPick } from './components/AiSmartPick';
import { HubCard } from './components/HubCard';
import { ShuttleTeaser } from './components/ShuttleTeaser';
import { BottomNav, TabType } from './components/BottomNav';
import { SlotPickerModal } from './components/SlotPickerModal';
import { DirectionsModal } from './components/DirectionsModal';
import { ShuttleModal } from './components/ShuttleModal';
import { FilterDrawer, FilterOptions } from './components/FilterDrawer';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ProfileModal } from './components/ProfileModal';
import { BookingsView } from './components/BookingsView';
import { OwnerHubView } from './components/OwnerHubView';
import { AdminView } from './components/AdminView';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { VehicleManagementModal } from './components/VehicleManagementModal';
import { AuthModal } from './components/AuthModal';
import {
  INITIAL_HUBS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_VEHICLES,
  INITIAL_USER,
} from './data/mockData';
import { ParkingHub, VehicleType, Booking, NotificationItem, UserVehicle, UserAccount } from './types';
import { RefreshCw, MapPin, Navigation, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<TabType>('landing');
  const [currentRole, setCurrentRole] = useState<'SEEKER' | 'OWNER' | 'ADMIN'>('SEEKER');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(INITIAL_USER);
  const [vehicles, setVehicles] = useState<UserVehicle[]>(INITIAL_VEHICLES);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLandmark, setSelectedLandmark] = useState<string>('Mahalaxmi Temple');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('car');
  const [filters, setFilters] = useState<FilterOptions>({
    maxDistanceMeters: 5000,
    evOnly: false,
    coveredOnly: false,
    municipalOnly: false,
    maxPrice: 60,
  });

  // Hubs & Bookings Data
  const [hubs, setHubs] = useState<ParkingHub[]>(INITIAL_HUBS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Active Modals State
  const [selectedHubForSlot, setSelectedHubForSlot] = useState<ParkingHub | null>(null);
  const [selectedHubForDirections, setSelectedHubForDirections] = useState<ParkingHub | null>(null);
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState<boolean>(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);

  // Unread notification count
  const unreadCount = notifications.filter((n) => n.unread).length;
  const activeBookingsCount = bookings.filter((b) => b.status === 'ACTIVE').length;

  // Filter hubs based on search, landmark, vehicle type, and filter drawer options
  const filteredHubs = useMemo(() => {
    return hubs.filter((hub) => {
      // Landmark filter
      if (
        selectedLandmark !== 'all' &&
        hub.landmark !== selectedLandmark &&
        !hub.name.toLowerCase().includes(selectedLandmark.toLowerCase())
      ) {
        // If searching specifically for Mahalaxmi Temple, allow Bhavani Mandap as it's adjacent
        if (selectedLandmark === 'Mahalaxmi Temple' && hub.landmark === 'Bhavani Mandap') {
          // keep it
        } else {
          return false;
        }
      }

      // Text search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = hub.name.toLowerCase().includes(query);
        const matchesArea = hub.area.toLowerCase().includes(query);
        const matchesLandmark = hub.landmark.toLowerCase().includes(query);
        if (!matchesName && !matchesArea && !matchesLandmark) return false;
      }

      // Filter Drawer criteria
      if (hub.distanceMeters > filters.maxDistanceMeters) return false;
      if (filters.evOnly && !hub.hasEvCharger) return false;
      if (filters.coveredOnly && !hub.hasCoveredShade) return false;
      if (filters.municipalOnly && !hub.isMunicipalApproved) return false;
      if (hub.hourlyRate[selectedVehicle] > filters.maxPrice) return false;

      return true;
    });
  }, [hubs, selectedLandmark, searchQuery, filters, selectedVehicle]);

  // AI Smart Pick Hub (Mahalaxmi South Gate Smart Lot by default or highest score)
  const smartPickHub = useMemo(() => {
    return hubs.find((h) => h.id === 'hub-mahalaxmi-south') || hubs[0];
  }, [hubs]);

  // Voice Search simulation
  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Mahalaxmi Temple');
      setSelectedLandmark('Mahalaxmi Temple');
      setIsListeningVoice(false);
    }, 1500);
  };

  // Booking handlers
  const handleBookSlot = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
    // update the hub's open bay count
    setHubs((prev) =>
      prev.map((h) => {
        if (h.id === newBooking.hubId) {
          return {
            ...h,
            openBays: Math.max(0, h.openBays - 1),
            slots: h.slots.map((s) =>
              s.code === newBooking.slotCode ? { ...s, status: 'OCCUPIED' } : s
            ),
          };
        }
        return h;
      })
    );
    // Switch to passes view so user immediately sees their ticket
    setActiveTab('bookings');
  };

  const handleExtendBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            durationHours: b.durationHours + 1,
            totalAmount: b.totalAmount + (b.hubId.includes('south') ? 30 : 25),
            endTime: 'Extended +1 Hour',
          };
        }
        return b;
      })
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'COMPLETED' } : b))
    );
  };

  // Vehicle Management Handlers
  const handleAddVehicle = (newVeh: UserVehicle) => {
    if (newVeh.isDefault) {
      setVehicles((prev) => [newVeh, ...prev.map((v) => ({ ...v, isDefault: false }))]);
    } else {
      setVehicles((prev) => [...prev, newVeh]);
    }
  };

  const handleDeleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const handleSetDefaultVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => ({ ...v, isDefault: v.id === id }))
    );
  };

  // Auth Handler
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.role === 'OWNER') setActiveTab('owner');
    else if (user.role === 'ADMIN') setActiveTab('admin');
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Sync role switch with tab switch
  const handleRoleSwitch = (newRole: 'SEEKER' | 'OWNER' | 'ADMIN') => {
    setCurrentRole(newRole);
    if (currentUser) {
      setCurrentUser({ ...currentUser, role: newRole });
    }
    if (newRole === 'OWNER') setActiveTab('owner');
    else if (newRole === 'ADMIN') setActiveTab('admin');
    else setActiveTab('explore');
  };

  return (
    <div className="bg-[#1A0A0F] text-[#FFF9EF] min-h-screen flex flex-col antialiased selection:bg-[#C6A15B] selection:text-[#3D101C]">
      
      {/* Top Royal Kolhapur Header */}
      <Header
        currentRole={currentRole}
        activeTab={activeTab}
        onNavigateTab={(tab) => setActiveTab(tab)}
        onRoleClick={() => setIsProfileModalOpen(true)}
        onNotificationsClick={() => setIsNotificationsDrawerOpen(true)}
        unreadNotificationsCount={unreadCount}
        onProfileClick={() => setIsProfileModalOpen(true)}
        onOpenMap={() => setIsMapModalOpen(true)}
        onOpenShuttle={() => setIsShuttleModalOpen(true)}
        onOpenVehicles={() => setIsVehicleModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        currentUser={currentUser}
        activeBookingsCount={activeBookingsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-20 pb-20 lg:pb-12 bg-[#1A0A0F]">
        
        {/* ========================================================
            VIEW 1: LANDING PAGE
            ======================================================== */}
        {activeTab === 'landing' && (
          <LandingPage
            hubs={hubs}
            onExploreHubs={() => setActiveTab('explore')}
            onSelectHub={(hub) => setSelectedHubForSlot(hub)}
            onOpenMap={() => setIsMapModalOpen(true)}
            onOpenShuttle={() => setIsShuttleModalOpen(true)}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onSearchChange={(q) => setSearchQuery(q)}
            onLandmarkSelect={(lm) => setSelectedLandmark(lm)}
            onVehicleSelect={(v) => setSelectedVehicle(v)}
          />
        )}

        {/* ========================================================
            VIEW 2: LIVE PARKING EXPLORER
            ======================================================== */}
        {activeTab === 'explore' && (
          <div className="flex flex-col w-full animate-in fade-in">
            {/* Search & Landmarks Filter Header */}
            <LandmarkFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLandmark={selectedLandmark}
              onSelectLandmark={setSelectedLandmark}
              onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
              onVoiceSearch={handleVoiceSearch}
              isListening={isListeningVoice}
            />

            <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col gap-6 pt-6 pb-12">
              
              {/* Vehicle Category Switcher */}
              <VehicleSelector
                selectedVehicle={selectedVehicle}
                onSelectVehicle={setSelectedVehicle}
              />

              {/* AI Smart Pick Recommendation Banner */}
              {smartPickHub && (
                <AiSmartPick
                  hub={smartPickHub}
                  vehicleType={selectedVehicle}
                  onInstantReserve={(hub) => setSelectedHubForSlot(hub)}
                />
              )}

              {/* Real-Time Parking Hubs Grid */}
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-royal text-xl sm:text-2xl font-bold text-[#FFF9EF]">
                      Live Kolhapur Parking Hubs
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#3D101C] text-[#C6A15B] border border-[#C6A15B]/30">
                      {filteredHubs.length} Available
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMapModalOpen(true)}
                      className="px-3 py-1.5 rounded-xl bg-[#3D101C] hover:bg-[#651E2B] text-xs font-bold text-[#C6A15B] border border-[#C6A15B]/30 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open City Map</span>
                    </button>

                    <div className="flex items-center gap-1.5 text-[#10B981] text-xs font-bold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>KMC Edge Sync</span>
                    </div>
                  </div>
                </div>

                {filteredHubs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHubs.map((hub) => (
                      <HubCard
                        key={hub.id}
                        hub={hub}
                        vehicleType={selectedVehicle}
                        onSelectSlot={(h) => setSelectedHubForSlot(h)}
                        onDirections={(h) => setSelectedHubForDirections(h)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 rounded-3xl bg-[#22070E] border border-white/10 text-center text-[#B8ADA0] space-y-3">
                    <p className="text-sm font-semibold text-[#FFF9EF]">
                      No parking hubs match your active filter criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedLandmark('all');
                        setFilters({
                          maxDistanceMeters: 5000,
                          evOnly: false,
                          coveredOnly: false,
                          municipalOnly: false,
                          maxPrice: 60,
                        });
                      }}
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase cursor-pointer shadow"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}
              </section>

              {/* Ambabai Shuttle Teaser */}
              <ShuttleTeaser onOpenShuttleDetails={() => setIsShuttleModalOpen(true)} />

            </div>
          </div>
        )}

        {/* ========================================================
            VIEW 3: BOOKINGS & PASSES
            ======================================================== */}
        {activeTab === 'bookings' && (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <BookingsView
              bookings={bookings}
              onExtendBooking={handleExtendBooking}
              onCancelBooking={handleCancelBooking}
              onOpenShuttle={() => setIsShuttleModalOpen(true)}
              onOpenDirectionsForBooking={(hubId) => {
                const target = hubs.find((h) => h.id === hubId) || hubs[0];
                setSelectedHubForDirections(target);
              }}
            />
          </div>
        )}

        {/* ========================================================
            VIEW 4: PRIVATE LOT OWNER PORTAL
            ======================================================== */}
        {activeTab === 'owner' && (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <OwnerHubView />
          </div>
        )}

        {/* ========================================================
            VIEW 5: KMC MUNICIPAL ADMIN
            ======================================================== */}
        {activeTab === 'admin' && (
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <AdminView />
          </div>
        )}

      </main>

      {/* Sticky Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeBookingsCount={activeBookingsCount}
      />

      {/* ========================================================
          MODALS & DRAWERS
          ======================================================== */}

      {/* Slot Picker Modal */}
      {selectedHubForSlot && (
        <SlotPickerModal
          hub={selectedHubForSlot}
          vehicleType={selectedVehicle}
          isOpen={!!selectedHubForSlot}
          onClose={() => setSelectedHubForSlot(null)}
          onBookSlot={handleBookSlot}
        />
      )}

      {/* Turn-by-Turn Directions Modal */}
      {selectedHubForDirections && (
        <DirectionsModal
          hub={selectedHubForDirections}
          isOpen={!!selectedHubForDirections}
          onClose={() => setSelectedHubForDirections(null)}
        />
      )}

      {/* Shree Ambabai Darshan E-Shuttle Modal */}
      <ShuttleModal
        isOpen={isShuttleModalOpen}
        onClose={() => setIsShuttleModalOpen(false)}
      />

      {/* Interactive Kolhapur City Map Modal */}
      <InteractiveMapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        hubs={hubs}
        onSelectHubForSlot={(hub) => setSelectedHubForSlot(hub)}
        onSelectHubForDirections={(hub) => setSelectedHubForDirections(hub)}
        selectedVehicle={selectedVehicle}
      />

      {/* Vehicle Garage Management Modal */}
      <VehicleManagementModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        vehicles={vehicles}
        onAddVehicle={handleAddVehicle}
        onDeleteVehicle={handleDeleteVehicle}
        onSetDefaultVehicle={handleSetDefaultVehicle}
      />

      {/* Sign In & Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            maxDistanceMeters: 5000,
            evOnly: false,
            coveredOnly: false,
            municipalOnly: false,
            maxPrice: 60,
          })
        }
      />

      {/* City Alerts Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* Citizen Profile & Role Switcher */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentRole={currentRole}
        onRoleChange={handleRoleSwitch}
        currentUser={currentUser}
        onSignOut={() => setCurrentUser(null)}
      />

    </div>
  );
}
