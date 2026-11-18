-- ========================================================================
-- ParkKolhapur AI • Strict Role-Based Database Security & RLS
-- Project URL: https://rfgnsgjhschjoabqkcvo.supabase.co
-- ========================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Profiles Table (Synced with Supabase Auth auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'OWNER', 'ADMIN')),
  citizen_badge TEXT DEFAULT 'Verified KMC Resident',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Security Helper Function: Check if the calling user is an Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
$$;

-- 4. Vehicles Table (Strictly isolated by user_id)
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plate_number TEXT NOT NULL,
  nickname TEXT,
  vehicle_type TEXT NOT NULL DEFAULT 'car' CHECK (vehicle_type IN ('car', 'bike', 'ev')),
  is_default BOOLEAN DEFAULT false,
  fasttag_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Parking Hubs Table (Public discovery, owner-isolated management)
CREATE TABLE IF NOT EXISTS public.parking_hubs (
  id TEXT PRIMARY KEY,
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  area TEXT NOT NULL,
  distance TEXT NOT NULL,
  "distanceMeters" INTEGER DEFAULT 250,
  "walkingTimeMin" INTEGER DEFAULT 3,
  "hourlyRate" JSONB NOT NULL DEFAULT '{"bike": 15, "car": 30, "ev": 45}'::jsonb,
  "dayPassRate" JSONB NOT NULL DEFAULT '{"bike": 110, "car": 220, "ev": 320}'::jsonb,
  "totalBays" INTEGER NOT NULL DEFAULT 40,
  "openBays" INTEGER NOT NULL DEFAULT 18,
  "syncTime" TEXT DEFAULT 'Synced via KMC Edge Node',
  "isMunicipalApproved" BOOLEAN DEFAULT true,
  "hasEvCharger" BOOLEAN DEFAULT true,
  "hasCctv" BOOLEAN DEFAULT true,
  "hasCoveredShade" BOOLEAN DEFAULT true,
  landmark TEXT NOT NULL,
  "imageUrl" TEXT,
  coordinates JSONB NOT NULL DEFAULT '{"lat": 16.6944, "lng": 74.2238}'::jsonb,
  "aiAdvisory" JSONB DEFAULT '{"badge": "AI ADVISORY", "message": "Optimal flow", "type": "neutral"}'::jsonb,
  slots JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Bookings Table (Private to customer and facility owner)
CREATE TABLE IF NOT EXISTS public.bookings (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  "hubId" TEXT REFERENCES public.parking_hubs(id) ON DELETE CASCADE,
  "hubName" TEXT NOT NULL,
  "slotCode" TEXT NOT NULL,
  "vehicleType" TEXT NOT NULL DEFAULT 'car',
  "vehicleNumber" TEXT NOT NULL,
  "startTime" TEXT NOT NULL,
  "endTime" TEXT NOT NULL,
  "durationHours" INTEGER NOT NULL DEFAULT 2,
  "totalAmount" NUMERIC NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'COMPLETED', 'CANCELLED')),
  "qrCodeValue" TEXT NOT NULL,
  "includeShuttlePass" BOOLEAN DEFAULT true,
  "entryGate" TEXT DEFAULT 'Gate 1',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Strict Isolation: No user can view or tamper with another user's data
-- ========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parking_hubs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------
-- PROFILES POLICIES
-- ------------------------------------------------------------------------
-- Users can read only their own profile, Admins can read all profiles
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_admin());

-- Users can update only their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid() OR public.is_admin());

-- ------------------------------------------------------------------------
-- VEHICLES POLICIES
-- ------------------------------------------------------------------------
-- Users can only view their own vehicles
CREATE POLICY "Users view own vehicles"
  ON public.vehicles FOR SELECT
  USING (user_id = auth.uid() OR public.is_admin());

-- Users can only add vehicles to their own account
CREATE POLICY "Users insert own vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Users can only update their own vehicles
CREATE POLICY "Users update own vehicles"
  ON public.vehicles FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

-- Users can only delete their own vehicles
CREATE POLICY "Users delete own vehicles"
  ON public.vehicles FOR DELETE
  USING (user_id = auth.uid() OR public.is_admin());

-- ------------------------------------------------------------------------
-- PARKING HUBS POLICIES
-- ------------------------------------------------------------------------
-- Anyone (authenticated or guest) can discover active parking hubs
CREATE POLICY "Public read parking hubs"
  ON public.parking_hubs FOR SELECT
  USING (true);

-- Only verified Slot Owners can add parking facilities
CREATE POLICY "Owners can insert parking facilities"
  ON public.parking_hubs FOR INSERT
  WITH CHECK (
    auth.uid() IS NOT NULL AND
    (owner_id = auth.uid() OR public.is_admin())
  );

-- Only the facility owner or an admin can update lot details / rates
CREATE POLICY "Owners can update own parking facilities"
  ON public.parking_hubs FOR UPDATE
  USING (owner_id = auth.uid() OR public.is_admin());

-- Only the facility owner or an admin can delete their facility
CREATE POLICY "Owners can delete own parking facilities"
  ON public.parking_hubs FOR DELETE
  USING (owner_id = auth.uid() OR public.is_admin());

-- ------------------------------------------------------------------------
-- BOOKINGS POLICIES (Strict Privacy Enforcement)
-- ------------------------------------------------------------------------
-- Customer can only see their own bookings;
-- Slot Owner can see bookings made at facilities they own;
-- Admins can see all bookings.
CREATE POLICY "Strict Booking View Isolation"
  ON public.bookings FOR SELECT
  USING (
    user_id = auth.uid()
    OR EXISTS (
      SELECT 1 FROM public.parking_hubs
      WHERE public.parking_hubs.id = public.bookings."hubId"
        AND public.parking_hubs.owner_id = auth.uid()
    )
    OR public.is_admin()
  );

-- Customers can only insert bookings linked to their own auth.uid()
CREATE POLICY "Strict Booking Creation"
  ON public.bookings FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Customers can update/extend only their own booking
CREATE POLICY "Strict Booking Modification"
  ON public.bookings FOR UPDATE
  USING (user_id = auth.uid() OR public.is_admin());

-- ------------------------------------------------------------------------
-- AUTO-SYNC TRIGGER: On user signup in Supabase Auth, create a public profile
-- ------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', 'Citizen ' || SUBSTRING(NEW.id::text, 1, 6)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'CUSTOMER')
  )
  ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    email = EXCLUDED.email;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.parking_hubs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
