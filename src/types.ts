export type VehicleType = 'bike' | 'car' | 'ev';

export type SlotStatus = 'AVAILABLE' | 'RESERVED' | 'OCCUPIED' | 'MAINTENANCE';

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
}

export interface Booking {
  id: string;
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
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'alert' | 'info' | 'success';
  unread: boolean;
}
