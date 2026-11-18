import { createClient } from '@supabase/supabase-js';
import { ParkingHub, Booking, NotificationItem, SavedVehicle, UserAccount, UserRole } from '../types';
import { INITIAL_HUBS, INITIAL_BOOKINGS, DEMO_ACCOUNTS } from '../data/mockData';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rfgnsgjhschjoabqkcvo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY'
);

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey || 'dummy-anon-key-placeholder'
);

// ========================================================================
// AUTHENTICATION & SESSION MANAGEMENT
// ========================================================================

/**
 * Register a new user with Supabase Auth
 */
export async function signUpWithEmail(
  email: string,
  pass: string,
  name: string,
  phone: string,
  role: UserRole = 'CUSTOMER'
): Promise<{ user: UserAccount | null; error: string | null }> {
  if (!isSupabaseConfigured) {
    // Local fallback for offline/demo development
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role,
      citizenBadge: role === 'ADMIN' ? 'KMC Municipal Administrator' : role === 'OWNER' ? 'Registered KMC Lot Host' : 'Verified KMC Resident',
      isLoggedIn: true,
      vehicles: [],
      joinedDate: 'Just Now',
    };
    return { user: newUser, error: null };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: pass,
      options: {
        data: {
          name,
          phone,
          role,
        },
      },
    });

    if (error) return { user: null, error: error.message };
    if (!data.user) return { user: null, error: 'Registration failed' };

    const newUser: UserAccount = {
      id: data.user.id,
      name,
      email,
      phone,
      role,
      citizenBadge: role === 'ADMIN' ? 'KMC Municipal Administrator' : role === 'OWNER' ? 'Registered KMC Lot Host' : 'Verified KMC Resident',
      isLoggedIn: true,
      vehicles: [],
      joinedDate: 'Just Now',
    };

    return { user: newUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || 'Unknown error' };
  }
}

/**
 * Sign in existing user with Supabase Auth or verified Admin credentials
 */
export async function signInWithEmail(
  identifier: string,
  pass: string
): Promise<{ user: UserAccount | null; error: string | null }> {
  const cleanId = identifier.trim().toLowerCase();

  // 1. OFFICIAL ADMIN CREDENTIAL CHECK (username: parkadmin, pass: parkadmin)
  if (
    (cleanId === 'parkadmin' || cleanId === 'parkadmin@kolhapur.gov.in') &&
    pass === 'parkadmin'
  ) {
    const adminAcc = DEMO_ACCOUNTS.find((a) => a.role === 'ADMIN');
    if (adminAcc) {
      return { user: { ...adminAcc, isLoggedIn: true }, error: null };
    }
  }

  // 2. CHECK DEMO ACCOUNTS
  const demoMatch = DEMO_ACCOUNTS.find(
    (a) => a.email.toLowerCase() === cleanId || a.id === cleanId
  );
  if (demoMatch) {
    return { user: { ...demoMatch, isLoggedIn: true }, error: null };
  }

  // 3. SUPABASE LIVE AUTH IF CONFIGURED
  if (isSupabaseConfigured) {
    try {
      const email = cleanId.includes('@') ? cleanId : `${cleanId}@kolhapur.org`;
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass,
      });

      if (error) return { user: null, error: error.message };
      if (!data.user) return { user: null, error: 'Login failed' };

      // Fetch user profile from profiles table
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();

      const role = (profile?.role || data.user.user_metadata?.role || 'CUSTOMER') as UserRole;

      const loggedUser: UserAccount = {
        id: data.user.id,
        name: profile?.name || data.user.user_metadata?.name || 'Citizen User',
        email: data.user.email || email,
        phone: profile?.phone || data.user.user_metadata?.phone || '',
        role: role,
        citizenBadge:
          role === 'ADMIN'
            ? 'KMC Municipal Administrator'
            : role === 'OWNER'
            ? 'Registered KMC Lot Host'
            : 'Verified KMC Resident',
        isLoggedIn: true,
        vehicles: [],
      };

      return { user: loggedUser, error: null };
    } catch (err: any) {
      return { user: null, error: err.message || 'Login error' };
    }
  }

  // 4. Default Citizen User Creation
  return {
    user: {
      id: `usr-${Date.now()}`,
      name: identifier.split('@')[0],
      email: cleanId.includes('@') ? cleanId : `${cleanId}@kolhapur.org`,
      phone: '+91 98224 00000',
      role: 'CUSTOMER',
      citizenBadge: 'Verified KMC Resident',
      isLoggedIn: true,
      vehicles: [],
    },
    error: null,
  };
}

/**
 * Sign out user from Supabase
 */
export async function signOutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('[Supabase] Signout error:', e);
    }
  }
}

// ========================================================================
// STRICT USER DATA ISOLATION (RLS FILTERED QUERIES)
// ========================================================================

/**
 * Fetch bookings strictly for the authenticated user ID (or all if admin)
 */
export async function fetchUserBookings(
  userId: string,
  userRole: UserRole = 'CUSTOMER'
): Promise<Booking[]> {
  if (!isSupabaseConfigured) {
    // Filter demo data strictly by user ID
    if (userRole === 'ADMIN') {
      return INITIAL_BOOKINGS; // Admin views all
    }
    return INITIAL_BOOKINGS.filter((b) => b.userId === userId);
  }

  try {
    let query = supabase.from('bookings').select('*');

    // Unless admin, explicitly restrict to userId for defense in depth
    if (userRole !== 'ADMIN') {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    if (error || !data) {
      return INITIAL_BOOKINGS.filter((b) => b.userId === userId);
    }

    return data.map((b: any) => ({
      id: b.id,
      userId: b.user_id || userId,
      hubId: b.hubId,
      hubName: b.hubName,
      slotCode: b.slotCode,
      vehicleType: b.vehicleType,
      vehicleNumber: b.vehicleNumber,
      startTime: b.startTime,
      endTime: b.endTime,
      durationHours: b.durationHours,
      totalAmount: b.totalAmount,
      status: b.status,
      qrCodeValue: b.qrCodeValue,
      includeShuttlePass: b.includeShuttlePass,
      entryGate: b.entryGate,
    }));
  } catch (err) {
    console.warn('[Supabase] Error fetching user bookings:', err);
    return INITIAL_BOOKINGS.filter((b) => b.userId === userId);
  }
}

/**
 * Fetch vehicles belonging strictly to the specified user ID
 */
export async function fetchUserVehicles(userId: string): Promise<SavedVehicle[]> {
  if (!isSupabaseConfigured) {
    const userMatch = DEMO_ACCOUNTS.find((a) => a.id === userId);
    return userMatch ? userMatch.vehicles : [];
  }

  try {
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map((v: any) => ({
      id: v.id,
      userId: v.user_id,
      plateNumber: v.plate_number,
      nickname: v.nickname,
      vehicleType: v.vehicle_type,
      isDefault: v.is_default,
      fastTagId: v.fasttag_id,
    }));
  } catch (err) {
    return [];
  }
}

/**
 * Add a new vehicle securely to the user's account
 */
export async function insertUserVehicle(vehicle: SavedVehicle): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase.from('vehicles').insert([
      {
        user_id: vehicle.userId,
        plate_number: vehicle.plateNumber,
        nickname: vehicle.nickname,
        vehicle_type: vehicle.vehicleType,
        is_default: vehicle.isDefault,
        fasttag_id: vehicle.fastTagId,
      },
    ]);
    return !error;
  } catch (err) {
    return false;
  }
}

/**
 * Remove a vehicle belonging to the user
 */
export async function deleteUserVehicle(vehicleId: string, userId: string): Promise<boolean> {
  if (!isSupabaseConfigured) return true;

  try {
    const { error } = await supabase
      .from('vehicles')
      .delete()
      .eq('id', vehicleId)
      .eq('user_id', userId);
    return !error;
  } catch (err) {
    return false;
  }
}

/**
 * Fetch parking facilities owned strictly by the specified owner ID
 */
export async function fetchOwnerFacilities(ownerId: string, allHubs: ParkingHub[]): Promise<ParkingHub[]> {
  if (!isSupabaseConfigured) {
    return allHubs.filter((h) => h.ownerId === ownerId);
  }

  try {
    const { data, error } = await supabase
      .from('parking_hubs')
      .select('*')
      .eq('owner_id', ownerId);

    if (error || !data || data.length === 0) {
      return allHubs.filter((h) => h.ownerId === ownerId);
    }
    return data as ParkingHub[];
  } catch (err) {
    return allHubs.filter((h) => h.ownerId === ownerId);
  }
}

/**
 * Fetch live parking hubs from Supabase with fallback to mock data
 */
export async function fetchLiveHubs(): Promise<{ data: ParkingHub[]; isFromDb: boolean }> {
  if (!isSupabaseConfigured) {
    return { data: INITIAL_HUBS, isFromDb: false };
  }

  try {
    const { data, error } = await supabase
      .from('parking_hubs')
      .select('*')
      .order('openBays', { ascending: false });

    if (error || !data || data.length === 0) {
      if (error) console.warn('[Supabase] Could not fetch parking_hubs:', error.message);
      return { data: INITIAL_HUBS, isFromDb: false };
    }

    return { data: data as ParkingHub[], isFromDb: true };
  } catch (err) {
    console.warn('[Supabase] Connection error, using cached mock data:', err);
    return { data: INITIAL_HUBS, isFromDb: false };
  }
}

/**
 * Persist a new parking booking to Supabase
 */
export async function createBookingInDb(booking: Booking): Promise<boolean> {
  if (!isSupabaseConfigured) {
    return false;
  }

  try {
    const { error } = await supabase.from('bookings').insert([
      {
        id: booking.id,
        user_id: booking.userId,
        hubId: booking.hubId,
        hubName: booking.hubName,
        slotCode: booking.slotCode,
        vehicleType: booking.vehicleType,
        vehicleNumber: booking.vehicleNumber,
        startTime: booking.startTime,
        endTime: booking.endTime,
        durationHours: booking.durationHours,
        totalAmount: booking.totalAmount,
        status: booking.status,
        qrCodeValue: booking.qrCodeValue,
        includeShuttlePass: booking.includeShuttlePass,
        entryGate: booking.entryGate,
      },
    ]);
    if (error) {
      console.warn('[Supabase] Failed to insert booking:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[Supabase] Error saving booking:', err);
    return false;
  }
}

/**
 * Update slot status and open bay counter in Supabase
 */
export async function updateSlotOccupancyInDb(
  hubId: string,
  newOpenBays: number,
  updatedSlots?: any
): Promise<void> {
  if (!isSupabaseConfigured) return;

  try {
    await supabase
      .from('parking_hubs')
      .update({
        openBays: newOpenBays,
        ...(updatedSlots ? { slots: updatedSlots } : {}),
      })
      .eq('id', hubId);
  } catch (err) {
    console.warn('[Supabase] Error updating hub bays:', err);
  }
}

/**
 * Subscribe to realtime updates for parking hubs
 */
export function subscribeToHubsRealtime(onUpdate: (updatedHub: Partial<ParkingHub>) => void) {
  if (!isSupabaseConfigured) return null;

  try {
    const channel = supabase
      .channel('public:parking_hubs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'parking_hubs' },
        (payload) => {
          if (payload.new) {
            onUpdate(payload.new as Partial<ParkingHub>);
          }
        }
      )
      .subscribe();

    return channel;
  } catch (err) {
    console.warn('[Supabase] Could not subscribe to realtime channel:', err);
    return null;
  }
}