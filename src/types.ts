export type VehicleType = 'bike' | 'car' | 'ev';

export type Language = 'en' | 'mr' | 'hi';

export type SlotStatus = 'AVAILABLE' | 'RESERVED' | 'OCCUPIED' | 'MAINTENANCE';

export type UserRole = 'CUSTOMER' | 'OWNER' | 'ADMIN';

export type PoiCategory = 'hospital' | 'food' | 'stay';

export interface NearbyPlace {
  id: string;
  name: string;
  marathiName?: string;
  category: PoiCategory;
  distance: string;
  distanceMeters: number;
  walkingTimeMin: number;
  rating?: number;
  specialtyOrType: string;
  address: string;
  phone?: string;
  priceLevel?: string;
  isOpenNow?: boolean;
  timing?: string;
  coordinates?: { lat: number; lng: number };
}

export interface ParkingSlot {
  id: string;
  code: string;
  type: VehicleType;
  status: SlotStatus;
  hasCharger?: boolean;
  isCovered?: boolean;
  floor?: string;
}

export interface AIAdvisory {
  badge: string;
  probability?: string;
  message: string;
  type: 'warning' | 'neutral' | 'urgent';
  icon?: string;
}

export interface ParkingHub {
  id: string;
  name: string;
  area: string;
  distance: string;
  distanceMeters: number;
  walkingTimeMin: number;
  hourlyRate: {
    bike: number;
    car: number;
    ev: number;
  };
  dayPassRate: {
    bike: number;
    car: number;
    ev: number;
  };
  totalBays: number;
  openBays: number;
  syncTime: string;
  isMunicipalApproved: boolean;
  hasEvCharger: boolean;
  hasCctv: boolean;
  hasCoveredShade: boolean;
  aiAdvisory: AIAdvisory;
  slots: ParkingSlot[];
  landmark: string;
  coordinates: { lat: number; lng: number };
  imageUrl?: string;
  ownerId?: string;
  nearbyPlaces?: NearbyPlace[];
}

export interface Booking {
  id: string;
  userId: string;
  hubId: string;
  hubName: string;
  slotCode: string;
  vehicleType: VehicleType;
  vehicleNumber: string;
  startTime: string;
  endTime: string;
  durationHours: number;
  totalAmount: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
  qrCodeValue: string;
  includeShuttlePass: boolean;
  entryGate: string;
  createdAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  unread: boolean;
}

export interface SavedVehicle {
  id: string;
  userId: string;
  plateNumber: string;
  nickname: string;
  vehicleType: VehicleType;
  isDefault: boolean;
  fastTagId?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: UserRole;
  citizenBadge: string;
  isLoggedIn: boolean;
  vehicles: SavedVehicle[];
  address?: string;
  joinedDate?: string;
}

export interface KolhapurDestination {
  id: string;
  name: string;
  marathiName: string;
  tagline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  associatedHubId: string;
  walkingDistance: string;
  openBays: number;
  category: 'temple' | 'palace' | 'lake' | 'fort' | 'market' | 'museum' | 'nature' | 'heritage';
  highlights: string[];
}

export interface OwnerFacility {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  hourlyRate: number;
  totalSlots: number;
  availableSlots: number;
  status: 'ACTIVE' | 'MAINTENANCE' | 'OFFLINE';
  cctvEnabled: boolean;
  evCharging: boolean;
  todayRevenue: number;
  totalBookings: number;
}
