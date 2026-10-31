import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
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
import {
  INITIAL_HUBS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
} from './data/mockData';
import { ParkingHub, VehicleType, Booking, NotificationItem } from './types';
import { RefreshCw } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<TabType>('explore');
  const [currentRole, setCurrentRole] = useState<'SEEKER' | 'OWNER' | 'ADMIN'>('SEEKER');

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
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);

  // Unread notification count
  const unreadCount = notifications.filter((n) => n.unread).length;

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
  };

  const handleExtendBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            durationHours: b.durationHours + 1,
            totalAmount: b.totalAmount + (b.hubId.includes('south') ? 30 : 20),
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

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Sync role switch with tab switch if desired
  const handleRoleSwitch = (newRole: 'SEEKER' | 'OWNER' | 'ADMIN') => {
    setCurrentRole(newRole);
    if (newRole === 'OWNER') setActiveTab('owner');
    else if (newRole === 'ADMIN') setActiveTab('admin');
    else setActiveTab('explore');
  };

  return (
    <div className="bg-[#031427] text-[#d3e4fe] min-h-screen flex flex-col antialiased selection:bg-[#ffb95f] selection:text-[#472a00]">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        onRoleClick={() => setIsProfileModalOpen(true)}
        onNotificationsClick={() => setIsNotificationsDrawerOpen(true)}
        unreadNotificationsCount={unreadCount}
        onProfileClick={() => setIsProfileModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-[#031427] max-w-2xl mx-auto min-h-screen">
        {activeTab === 'explore' && (
          <div className="flex flex-col w-full">
            {/* Search & Kolhapur Landmarks Bar */}
            <LandmarkFilter
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedLandmark={selectedLandmark}
              onSelectLandmark={setSelectedLandmark}
              onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
              onVoiceSearch={handleVoiceSearch}
              isListening={isListeningVoice}
            />

            <div className="px-4 flex flex-col gap-4 pt-4 pb-8">
              {/* Vehicle Class Segment Switcher */}
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

              {/* Real-time Parking Hubs List */}
              <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-bold text-[#d3e4fe]">
                      Live Parking Hubs
                    </h3>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#26364a] text-[#c6c6cd]">
                      {filteredHubs.length} near you
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#4edea3] text-[11px] font-bold">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Realtime Supabase</span>
                  </div>
                </div>

                {filteredHubs.length > 0 ? (
                  filteredHubs.map((hub) => (
                    <HubCard
                      key={hub.id}
                      hub={hub}
                      vehicleType={selectedVehicle}
                      onSelectSlot={(h) => setSelectedHubForSlot(h)}
                      onDirections={(h) => setSelectedHubForDirections(h)}
                    />
                  ))
                ) : (
                  <div className="p-8 rounded-2xl bg-[#102034] text-center text-[#c6c6cd]">
                    <p className="text-[14px]">No parking hubs match your criteria.</p>
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
                      className="mt-3 text-[12px] font-bold text-[#ffb95f] underline cursor-pointer"
                    >
                      Clear search & filters
                    </button>
                  </div>
                )}
              </section>

              {/* Visual Cultural Landmark Teaser Card */}
              <ShuttleTeaser onOpenShuttleDetails={() => setIsShuttleModalOpen(true)} />
            </div>
          </div>
        )}

        {/* Tab 2: Bookings */}
        {activeTab === 'bookings' && (
          <div className="px-4 w-full">
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

        {/* Tab 3: Owner Hub */}
        {activeTab === 'owner' && (
          <div className="px-4 w-full">
            <OwnerHubView />
          </div>
        )}

        {/* Tab 4: Admin */}
        {activeTab === 'admin' && (
          <div className="px-4 w-full">
            <AdminView />
          </div>
        )}
      </main>

      {/* Sticky Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeBookingsCount={bookings.filter((b) => b.status === 'ACTIVE').length}
      />

      {/* Interactive Slot Matrix Modal */}
      {selectedHubForSlot && (
        <SlotPickerModal
          hub={selectedHubForSlot}
          vehicleType={selectedVehicle}
          isOpen={!!selectedHubForSlot}
          onClose={() => setSelectedHubForSlot(null)}
          onBookSlot={handleBookSlot}
        />
      )}

      {/* Turn-by-Turn Navigation Modal */}
      {selectedHubForDirections && (
        <DirectionsModal
          hub={selectedHubForDirections}
          isOpen={!!selectedHubForDirections}
          onClose={() => setSelectedHubForDirections(null)}
        />
      )}

      {/* Temple Shuttle Corridor Modal */}
      <ShuttleModal
        isOpen={isShuttleModalOpen}
        onClose={() => setIsShuttleModalOpen(false)}
      />

      {/* Filter Options Drawer */}
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

      {/* City Alerts & Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsDrawerOpen}
        onClose={() => setIsNotificationsDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* Citizen Profile & Role Switcher Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentRole={currentRole}
        onRoleChange={handleRoleSwitch}
      />
    </div>
  );
}
