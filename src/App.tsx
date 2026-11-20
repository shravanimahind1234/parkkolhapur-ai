import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { LandmarkFilter } from './components/LandmarkFilter';
import { VehicleSelector } from './components/VehicleSelector';
import { AiSmartPick } from './components/AiSmartPick';
import { HubCard } from './components/HubCard';
import { InteractiveMap } from './components/InteractiveMap';
import { ShuttleTeaser } from './components/ShuttleTeaser';
import { BottomNav, TabType } from './components/BottomNav';
import { SlotPickerModal } from './components/SlotPickerModal';
import { DirectionsModal } from './components/DirectionsModal';
import { ShuttleModal } from './components/ShuttleModal';
import { FilterDrawer, FilterOptions } from './components/FilterDrawer';
import { NotificationsDrawer } from './components/NotificationsDrawer';
import { ProfileModal } from './components/ProfileModal';
import { AuthModal } from './components/AuthModal';
import { VehicleManagerModal } from './components/VehicleManagerModal';
import { CustomerDashboard } from './components/CustomerDashboard';
import { OwnerDashboard } from './components/OwnerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LocationDetailsModal } from './components/LocationDetailsModal';
import { PageLoader } from './components/PageLoader';
import {
  INITIAL_HUBS,
  INITIAL_BOOKINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER,
  DEMO_ACCOUNTS,
  INITIAL_DESTINATIONS,
} from './data/mockData';
import {
  fetchLiveHubs,
  fetchUserBookings,
  fetchUserVehicles,
  createBookingInDb,
  updateSlotOccupancyInDb,
  subscribeToHubsRealtime,
  isSupabaseConfigured,
  signOutUser,
} from './lib/supabase';
import {
  ParkingHub,
  VehicleType,
  Booking,
  NotificationItem,
  UserAccount,
  SavedVehicle,
  UserRole,
  KolhapurDestination,
} from './types';
import { RefreshCw, MapPin, List, Sparkles, Database, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLandmark, setSelectedLandmark] = useState<string>('Mahalaxmi Temple');
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType>('car');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  const [filters, setFilters] = useState<FilterOptions>({
    maxDistanceMeters: 25000,
    evOnly: false,
    coveredOnly: false,
    municipalOnly: false,
    maxPrice: 60,
  });

  // User & Multi-Account Directory
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USER);
  const [allUsers, setAllUsers] = useState<UserAccount[]>(DEMO_ACCOUNTS);
  const [authPromptMessage, setAuthPromptMessage] = useState<string | null>(null);

  // Guard action: Enforce that all actions can only be performed when user is logged in
  const handleRequireLoginAction = (actionDesc: string, callback: () => void) => {
    if (!currentUser.isLoggedIn) {
      setAuthPromptMessage(`Please sign in to ${actionDesc}.`);
      setIsAuthModalOpen(true);
      return;
    }
    callback();
  };

  // Guard dashboard & private tabs navigation
  const handleNavTabChange = (tab: TabType | string) => {
    const targetTab = tab as TabType;
    if (
      [
        'bookings',
        'customer-dashboard',
        'owner-dashboard',
        'admin-dashboard',
        'owner',
        'admin',
      ].includes(targetTab)
    ) {
      if (!currentUser.isLoggedIn) {
        setAuthPromptMessage('Please sign in to access your personalized dashboard and bookings.');
        setIsAuthModalOpen(true);
        return;
      }
    }
    setActiveTab(targetTab);
  };

  // Hubs, Bookings & Notifications Data
  const [hubs, setHubs] = useState<ParkingHub[]>(INITIAL_HUBS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [isDbSynced, setIsDbSynced] = useState<boolean>(false);

  // Active Modals State
  const [selectedHubForSlot, setSelectedHubForSlot] = useState<ParkingHub | null>(null);
  const [selectedHubForDirections, setSelectedHubForDirections] = useState<ParkingHub | null>(null);
  const [isShuttleModalOpen, setIsShuttleModalOpen] = useState<boolean>(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState<boolean>(false);
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isListeningVoice, setIsListeningVoice] = useState<boolean>(false);
  const [selectedLocationForDetails, setSelectedLocationForDetails] = useState<{
    hub: ParkingHub;
    destination?: KolhapurDestination;
  } | null>(null);

  const handleOpenLocationDetails = (hub: ParkingHub, destination?: KolhapurDestination) => {
    const dest =
      destination ||
      INITIAL_DESTINATIONS.find(
        (d) =>
          d.associatedHubId === hub.id ||
          d.name.toLowerCase().includes(hub.landmark.toLowerCase())
      );
    setSelectedLocationForDetails({ hub, destination: dest });
  };

  // Load from Supabase on mount
  useEffect(() => {
    async function loadSupabaseData() {
      const { data, isFromDb } = await fetchLiveHubs();
      if (data && data.length > 0) {
        setHubs(data);
      }
      setIsDbSynced(isFromDb);

      if (currentUser?.id) {
        const userBookings = await fetchUserBookings(currentUser.id, currentUser.role);
        if (userBookings && userBookings.length > 0) {
          // Merge or set user bookings
          setBookings((prev) => {
            const otherUsersBookings = prev.filter((b) => b.userId !== currentUser.id);
            return [...userBookings, ...otherUsersBookings];
          });
        }
      }
    }

    loadSupabaseData();

    // Subscribe to realtime Postgres changes
    const channel = subscribeToHubsRealtime((updatedHub) => {
      if (updatedHub.id) {
        setHubs((prev) =>
          prev.map((h) => (h.id === updatedHub.id ? { ...h, ...updatedHub } : h))
        );
      }
    });

    return () => {
      if (channel) channel.unsubscribe();
    };
  }, [currentUser?.id, currentUser?.role]);

  // Unread notification count
  const unreadCount = notifications.filter((n) => n.unread).length;

  // Filter hubs based on search, landmark, vehicle type, and filter drawer options
  const filteredHubs = useMemo(() => {
    return hubs.filter((hub) => {
      // Landmark filter
      if (selectedLandmark !== 'all') {
        const query = selectedLandmark.toLowerCase();
        const hubLandmark = hub.landmark.toLowerCase();
        const matchesLandmark =
          hubLandmark.includes(query) || query.includes(hubLandmark);
        const matchesName = hub.name.toLowerCase().includes(query);
        const matchesArea = hub.area.toLowerCase().includes(query);
        const isAdjacentBhavani =
          selectedLandmark === 'Mahalaxmi Temple' && hub.landmark === 'Bhavani Mandap';

        if (!matchesLandmark && !matchesName && !matchesArea && !isAdjacentBhavani) {
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

  // AI Smart Pick Hub
  const smartPickHub = useMemo(() => {
    return filteredHubs[0] || hubs.find((h) => h.id === 'hub-mahalaxmi-south') || hubs[0];
  }, [filteredHubs, hubs]);

  // Voice Search simulation
  const handleVoiceSearch = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setSearchQuery('Mahalaxmi Temple');
      setSelectedLandmark('Mahalaxmi Temple');
      setIsListeningVoice(false);
    }, 1500);
  };

  // Booking handlers: Automatically associates booking with authenticated user's ID
  const handleBookSlot = (newBooking: Booking) => {
    const bookingWithUserId: Booking = {
      ...newBooking,
      userId: currentUser.id,
    };

    setBookings((prev) => [bookingWithUserId, ...prev]);

    // Persist to Supabase if configured
    createBookingInDb(bookingWithUserId);

    // update the hub's open bay count locally and in Supabase
    setHubs((prev) =>
      prev.map((h) => {
        if (h.id === bookingWithUserId.hubId) {
          const newOpenBays = Math.max(0, h.openBays - 1);
          const updatedSlots = h.slots.map((s) =>
            s.code === bookingWithUserId.slotCode ? { ...s, status: 'OCCUPIED' } : s
          );
          // Sync with Supabase DB
          updateSlotOccupancyInDb(h.id, newOpenBays, updatedSlots);

          return {
            ...h,
            openBays: newOpenBays,
            slots: updatedSlots,
          };
        }
        return h;
      })
    );
  };

  const handleExtendBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.userId === currentUser.id) {
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
      prev.map((b) => (b.id === bookingId && b.userId === currentUser.id ? { ...b, status: 'COMPLETED' } : b))
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Role & Dashboard Redirection after Login
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setAuthPromptMessage(null);
    setAllUsers((prev) => {
      const exists = prev.some((u) => u.id === user.id);
      return exists ? prev.map((u) => (u.id === user.id ? user : u)) : [user, ...prev];
    });

    // REDIRECT USER DIRECTLY TO THEIR OWN DASHBOARD
    if (user.role === 'OWNER') {
      setActiveTab('owner-dashboard');
    } else if (user.role === 'ADMIN') {
      setActiveTab('admin-dashboard');
    } else {
      setActiveTab('customer-dashboard');
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    await signOutUser();
    setCurrentUser(INITIAL_USER);
    setAuthPromptMessage(null);
    setActiveTab('home');
  };

  // Vehicle fleet handlers (Strictly user-isolated)
  const handleAddVehicle = (newVehicle: SavedVehicle) => {
    const v = { ...newVehicle, userId: currentUser.id };
    setCurrentUser((prev) => ({
      ...prev,
      vehicles: [v, ...prev.vehicles],
    }));
  };

  const handleRemoveVehicle = (id: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      vehicles: prev.vehicles.filter((v) => v.id !== id),
    }));
  };

  const handleSetDefaultVehicle = (id: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      vehicles: prev.vehicles.map((v) => ({ ...v, isDefault: v.id === id })),
    }));
  };

  // Slot Owner facility actions
  const handleAddOwnerFacility = (newHub: ParkingHub) => {
    setHubs((prev) => [newHub, ...prev]);
  };

  const handleUpdateSlotStatus = (hubId: string, slotCode: string, newStatus: any) => {
    setHubs((prev) =>
      prev.map((h) => {
        if (h.id === hubId) {
          const updatedSlots = h.slots.map((s) =>
            s.code === slotCode ? { ...s, status: newStatus } : s
          );
          const openCount = updatedSlots.filter((s) => s.status === 'AVAILABLE').length;
          return {
            ...h,
            slots: updatedSlots,
            openBays: openCount,
          };
        }
        return h;
      })
    );
  };

  // Admin user role update handler
  const handleUpdateUserRole = (userId: string, newRole: UserRole) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, role: newRole }));
    }
  };

  // Profile update handler
  const handleUpdateProfile = (updated: Partial<UserAccount>) => {
    setCurrentUser((prev) => ({ ...prev, ...updated }));
    setAllUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updated } : u))
    );
  };

  return (
    <div className="bg-[#F7F4EE] text-[#292725] min-h-screen flex flex-col antialiased selection:bg-[#C6A15B]/30 selection:text-[#7B2638]">
      {/* Top Navigation Header */}
      <Header
        currentRole={currentUser.role === 'ADMIN' ? 'ADMIN' : currentUser.role === 'OWNER' ? 'OWNER' : 'SEEKER'}
        onRoleClick={() => {
          if (!currentUser.isLoggedIn) {
            setAuthPromptMessage('Please sign in to view your profile and account settings.');
            setIsAuthModalOpen(true);
          } else {
            setIsProfileModalOpen(true);
          }
        }}
        onNotificationsClick={() => setIsNotificationsDrawerOpen(true)}
        unreadNotificationsCount={unreadCount}
        onProfileClick={() => {
          if (!currentUser.isLoggedIn) {
            setAuthPromptMessage('Please sign in to view your profile.');
            setIsAuthModalOpen(true);
          } else {
            setIsProfileModalOpen(true);
          }
        }}
        activeNavTab={activeTab}
        onNavTabChange={handleNavTabChange}
        currentUser={currentUser}
        onAuthClick={() => {
          setAuthPromptMessage(null);
          setIsAuthModalOpen(true);
        }}
        onOpenVehicles={() =>
          handleRequireLoginAction('manage your registered vehicles', () => setIsVehicleModalOpen(true))
        }
      />

      {/* Supabase Status Banner */}
      <div className="bg-[#FFFDF8] border-b border-[#EFECE4] py-1.5 px-4 text-center text-[11px] flex items-center justify-center gap-2">
        <Database className="w-3.5 h-3.5 text-[#7B2638]" />
        <span className="font-semibold text-[#5e5954]">
          Supabase Endpoint:
        </span>
        <code className="text-[10px] font-mono bg-[#F7F4EE] px-1.5 py-0.5 rounded text-[#7B2638] font-bold">
          rfgnsgjhschjoabqkcvo.supabase.co
        </code>
        <span className="font-bold px-2 py-0.5 rounded-full text-[10px] bg-[#edf8f2] text-[#26965B] flex items-center gap-1 border border-[#26965B]/20">
          <ShieldCheck className="w-3 h-3 text-[#26965B]" />
          <span>Strict RLS Security Active</span>
        </span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pb-20">
        {/* VIEW 1: LANDING PAGE */}
        {activeTab === 'home' && (
          <LandingPage
            onFindParkingClick={() => setActiveTab('explore')}
            onGetStartedClick={() => {
              if (!currentUser.isLoggedIn) {
                setAuthPromptMessage('Sign in or register to get started with smart parking across Kolhapur.');
                setIsAuthModalOpen(true);
              } else {
                setActiveTab('explore');
              }
            }}
            onSelectDestination={(landmark) => {
              setSelectedLandmark(landmark);
              setActiveTab('explore');
            }}
            onViewLocationDetails={handleOpenLocationDetails}
            hubs={hubs}
            onDirectBookHub={(hub) =>
              handleRequireLoginAction(`reserve a parking bay at ${hub.name}`, () => setSelectedHubForSlot(hub))
            }
            selectedVehicle={selectedVehicle}
            onSelectVehicle={setSelectedVehicle}
          />
        )}

        {/* VIEW 2: EXPLORE & PARKING SEARCH */}
        {activeTab === 'explore' && (
          <div className="flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
            <div className="mb-4">
              <LandmarkFilter
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedLandmark={selectedLandmark}
                onSelectLandmark={setSelectedLandmark}
                onOpenFilterDrawer={() => setIsFilterDrawerOpen(true)}
                onVoiceSearch={handleVoiceSearch}
                isListening={isListeningVoice}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <VehicleSelector
                  selectedVehicle={selectedVehicle}
                  onSelectVehicle={setSelectedVehicle}
                />

                {smartPickHub && (
                  <AiSmartPick
                    hub={smartPickHub}
                    vehicleType={selectedVehicle}
                    onInstantReserve={(hub) =>
                      handleRequireLoginAction(`instantly reserve a bay at ${hub.name}`, () => setSelectedHubForSlot(hub))
                    }
                  />
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[18px] font-bold text-[#7B2638] font-serif">
                      Live Kolhapur Parking Hubs
                    </h3>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#C6A15B]/20 text-[#7B2638]">
                      {filteredHubs.length} Available
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-[#26965B] text-[11px] font-bold">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      <span className="hidden sm:inline">KMC Edge Realtime</span>
                    </div>

                    <div className="lg:hidden flex rounded-lg bg-[#FFFFFF] p-0.5 border border-[#EFECE4]">
                      <button
                        type="button"
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-md text-xs cursor-pointer ${
                          viewMode === 'list' ? 'bg-[#7B2638] text-[#FFFDF8]' : 'text-[#5e5954]'
                        }`}
                        title="List View"
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('map')}
                        className={`p-1.5 rounded-md text-xs cursor-pointer ${
                          viewMode === 'map' ? 'bg-[#7B2638] text-[#FFFDF8]' : 'text-[#5e5954]'
                        }`}
                        title="Map View"
                      >
                        <MapPin className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {viewMode === 'map' && (
                  <div className="lg:hidden">
                    <InteractiveMap
                      hubs={filteredHubs}
                      selectedHub={smartPickHub}
                      onSelectHub={(h) => setSelectedHubForSlot(h)}
                      onBookHub={(h) =>
                        handleRequireLoginAction(`book a parking slot at ${h.name}`, () => setSelectedHubForSlot(h))
                      }
                      onDirectionsHub={(h) => setSelectedHubForDirections(h)}
                      onViewDetails={handleOpenLocationDetails}
                      selectedVehicle={selectedVehicle}
                    />
                  </div>
                )}

                {filteredHubs.length > 0 ? (
                  <div className="flex flex-col gap-3.5">
                    {filteredHubs.map((hub) => (
                      <HubCard
                        key={hub.id}
                        hub={hub}
                        vehicleType={selectedVehicle}
                        onSelectSlot={(h) =>
                          handleRequireLoginAction(`select and book a slot at ${h.name}`, () => setSelectedHubForSlot(h))
                        }
                        onDirections={(h) => setSelectedHubForDirections(h)}
                        onViewDetails={handleOpenLocationDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-2xl bg-[#FFFFFF] text-center text-[#5e5954] border border-[#EFECE4]">
                    <p className="text-[14px]">No parking hubs match your criteria.</p>
                  </div>
                )}

                <ShuttleTeaser onOpenShuttleDetails={() => setIsShuttleModalOpen(true)} />
              </div>

              <div className="hidden lg:block lg:col-span-5 sticky top-20">
                <InteractiveMap
                  hubs={filteredHubs}
                  selectedHub={smartPickHub}
                  onSelectHub={(h) => setSelectedHubForSlot(h)}
                  onBookHub={(h) =>
                    handleRequireLoginAction(`book a parking slot at ${h.name}`, () => setSelectedHubForSlot(h))
                  }
                  onDirectionsHub={(h) => setSelectedHubForDirections(h)}
                  onViewDetails={handleOpenLocationDetails}
                  selectedVehicle={selectedVehicle}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: FULLSCREEN LIVE MAP VIEW */}
        {activeTab === 'map' && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12 space-y-4">
            <InteractiveMap
              hubs={hubs}
              selectedHub={smartPickHub}
              onSelectHub={(h) => setSelectedHubForSlot(h)}
              onBookHub={(h) =>
                handleRequireLoginAction(`book a parking slot at ${h.name}`, () => setSelectedHubForSlot(h))
              }
              onDirectionsHub={(h) => setSelectedHubForDirections(h)}
              onViewDetails={handleOpenLocationDetails}
              selectedVehicle={selectedVehicle}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {hubs.map((hub) => (
                <HubCard
                  key={hub.id}
                  hub={hub}
                  vehicleType={selectedVehicle}
                  onSelectSlot={(h) =>
                    handleRequireLoginAction(`select and book a slot at ${h.name}`, () => setSelectedHubForSlot(h))
                  }
                  onDirections={(h) => setSelectedHubForDirections(h)}
                  onViewDetails={handleOpenLocationDetails}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: CITIZEN CUSTOMER DASHBOARD (INDIVIDUAL & STRICTLY PRIVATE) */}
        {(activeTab === 'customer-dashboard' || activeTab === 'bookings') && (
          <CustomerDashboard
            currentUser={currentUser}
            bookings={bookings}
            onExtendBooking={handleExtendBooking}
            onCancelBooking={handleCancelBooking}
            onOpenDirections={(hubId) => {
              const target = hubs.find((h) => h.id === hubId) || hubs[0];
              setSelectedHubForDirections(target);
            }}
            onOpenShuttle={() => setIsShuttleModalOpen(true)}
            onAddVehicle={handleAddVehicle}
            onRemoveVehicle={handleRemoveVehicle}
            onSetDefaultVehicle={handleSetDefaultVehicle}
            onUpdateProfile={handleUpdateProfile}
            onSignOut={handleSignOut}
            onFindParking={() => setActiveTab('explore')}
            onOpenAuth={() => {
              setAuthPromptMessage('Please sign in to access your citizen dashboard.');
              setIsAuthModalOpen(true);
            }}
          />
        )}

        {/* VIEW 5: SLOT OWNER DASHBOARD (INDIVIDUAL & ROLE ISOLATED) */}
        {(activeTab === 'owner-dashboard' || activeTab === 'owner') && (
          <OwnerDashboard
            currentUser={currentUser}
            hubs={hubs}
            bookings={bookings}
            onAddFacility={handleAddOwnerFacility}
            onUpdateSlotStatus={handleUpdateSlotStatus}
            onSignOut={handleSignOut}
            onOpenAuth={() => {
              setAuthPromptMessage('Please sign in as a registered Slot Owner.');
              setIsAuthModalOpen(true);
            }}
          />
        )}

        {/* VIEW 6: KMC ADMIN COMMAND (ROLE PROTECTED) */}
        {(activeTab === 'admin-dashboard' || activeTab === 'admin') && (
          <AdminDashboard
            currentUser={currentUser}
            allUsers={allUsers}
            hubs={hubs}
            bookings={bookings}
            onUpdateUserRole={handleUpdateUserRole}
            onSignOut={handleSignOut}
            onOpenAuth={() => {
              setAuthPromptMessage('Please sign in with KMC Municipal Admin credentials (parkadmin / parkadmin).');
              setIsAuthModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Sticky Bottom Navigation for Mobile */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleNavTabChange}
        activeBookingsCount={currentUser.isLoggedIn ? bookings.filter((b) => b.userId === currentUser.id && b.status === 'ACTIVE').length : 0}
        userRole={currentUser.role}
      />

      {/* Interactive Slot Matrix Modal */}
      {selectedHubForSlot && (
        <SlotPickerModal
          hub={selectedHubForSlot}
          vehicleType={selectedVehicle}
          isOpen={!!selectedHubForSlot}
          onClose={() => setSelectedHubForSlot(null)}
          onBookSlot={handleBookSlot}
          defaultVehicleNumber={currentUser.vehicles.find((v) => v.isDefault)?.plateNumber || currentUser.vehicles[0]?.plateNumber}
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

      {/* Comprehensive Location Details & Nearby Navigator Modal */}
      {selectedLocationForDetails && (
        <LocationDetailsModal
          hub={selectedLocationForDetails.hub}
          destination={selectedLocationForDetails.destination}
          isOpen={!!selectedLocationForDetails}
          onClose={() => setSelectedLocationForDetails(null)}
          onSelectSlot={(hub) =>
            handleRequireLoginAction(`select and book a slot at ${hub.name}`, () => setSelectedHubForSlot(hub))
          }
          onOpenDirections={(hub) => setSelectedHubForDirections(hub)}
          selectedVehicle={selectedVehicle}
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
            maxDistanceMeters: 25000,
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

      {/* Citizen Profile & Persona Switcher Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onSwitchUser={handleLoginSuccess}
        onOpenVehicles={() =>
          handleRequireLoginAction('manage your registered vehicles', () => setIsVehicleModalOpen(true))
        }
        onOpenDashboard={() => {
          if (!currentUser.isLoggedIn) {
            setAuthPromptMessage('Please sign in to access your dashboard.');
            setIsAuthModalOpen(true);
            return;
          }
          if (currentUser.role === 'OWNER') setActiveTab('owner-dashboard');
          else if (currentUser.role === 'ADMIN') setActiveTab('admin-dashboard');
          else setActiveTab('customer-dashboard');
        }}
        onSignOut={handleSignOut}
      />

      {/* Sign In & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthPromptMessage(null);
        }}
        currentUser={currentUser}
        onLoginSuccess={handleLoginSuccess}
        actionPromptMessage={authPromptMessage}
      />

      {/* Vehicle Fleet Management Modal */}
      <VehicleManagerModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        vehicles={currentUser.vehicles}
        onAddVehicle={handleAddVehicle}
        onRemoveVehicle={handleRemoveVehicle}
        onSetDefault={handleSetDefaultVehicle}
      />

      {/* App Launch & Splash Screen with Royal Logo */}
      <PageLoader isLoading={isInitialLoading} />
    </div>
  );
}