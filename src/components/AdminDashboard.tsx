import React, { useState } from 'react';
import {
  ShieldAlert,
  Cpu,
  Activity,
  Radio,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Zap,
  Server,
  Layers,
  Users,
  Lock,
  Building2,
  TrendingUp,
  SlidersHorizontal,
  ChevronRight,
  LogOut,
  Car,
} from 'lucide-react';
import { UserAccount, ParkingHub, Booking, UserRole } from '../types';

interface AdminDashboardProps {
  currentUser: UserAccount;
  allUsers: UserAccount[];
  hubs: ParkingHub[];
  bookings: Booking[];
  onUpdateUserRole: (userId: string, newRole: UserRole) => void;
  onSignOut: () => void;
  onOpenAuth?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  allUsers,
  hubs,
  bookings,
  onUpdateUserRole,
  onSignOut,
  onOpenAuth,
}) => {
  // STRICT ACCESS CONTROL: Only ADMIN permitted
  if (!currentUser.isLoggedIn || currentUser.role !== 'ADMIN') {
    return (
      <div className="w-full max-w-xl mx-auto px-4 py-16 text-center">
        <div className="p-8 rounded-3xl bg-[#FFFFFF] border-2 border-[#D94B4B]/30 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#fdf0f0] text-[#D94B4B] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-bold text-[#7B2638] font-serif">
            Security Exception: Admin Privilege Required
          </h2>
          <p className="text-[13px] text-[#5e5954] leading-relaxed">
            {!currentUser.isLoggedIn ? (
              <span>
                Please sign in with authorized KMC Municipal Administrator credentials (<strong>username: parkadmin</strong>, <strong>pass: parkadmin</strong>) to access the administrative command console.
              </span>
            ) : (
              <span>
                Your authenticated account (<strong>{currentUser.email}</strong>) has role <strong>{currentUser.role}</strong>.
                Database and backend policies restrict municipal command access exclusively to authorized <strong>KMC Municipal Administrators</strong> (username: <code>parkadmin</code>).
              </span>
            )}
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={onOpenAuth || onSignOut}
              className="h-10 px-5 rounded-xl bg-[#7B2638] text-white text-xs font-bold cursor-pointer hover:bg-[#5e1c2a] transition-all shadow-sm"
            >
              Sign In as Municipal Administrator
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [activeAdminTab, setActiveAdminTab] = useState<'telemetry' | 'users' | 'hubs'>('telemetry');
  const [aartiSurgeActive, setAartiSurgeActive] = useState(true);
  const [emergencyCorridor, setEmergencyCorridor] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 800);
  };

  // System-wide Aggregations
  const totalBays = hubs.reduce((sum, h) => sum + h.totalBays, 0);
  const openBays = hubs.reduce((sum, h) => sum + h.openBays, 0);
  const occupancyPercentage = ((totalBays - openBays) / (totalBays || 1)) * 100;
  const totalSystemRevenue = bookings.reduce((sum, b) => sum + b.totalAmount, 0) + 4820;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16 text-left">
      {/* Admin Header */}
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
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#7B2638] text-[#FFFDF8] shadow-xs">
                KMC Municipal Admin
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#edf8f2] text-[#26965B]">
                Full System Scope
              </span>
            </div>
            <p className="text-[13px] text-[#5e5954] mt-1">
              Kolhapur Municipal Corporation (KMC) Smart Mobility Central Command
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end md:self-auto">
          <button
            type="button"
            onClick={handleSync}
            className="h-10 px-4 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#7B2638]' : ''}`} />
            <span>Sync Telemetry</span>
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

      {/* Global Kolhapur Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            City Occupancy
          </span>
          <div className="text-2xl font-extrabold text-[#7B2638] font-serif mt-1">
            {occupancyPercentage.toFixed(1)}%
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            {totalBays - openBays} / {totalBays} Bays Filled
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Total Users
          </span>
          <div className="text-2xl font-extrabold text-[#292725] font-serif mt-1">
            {allUsers.length}+
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Citizens & Hosts
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Active Gateways
          </span>
          <div className="text-2xl font-extrabold text-[#26965B] font-serif mt-1">
            6 / 6
          </div>
          <span className="text-[11px] text-[#26965B] font-semibold">
            100% Sub-Second Sync
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#5e5954] tracking-wider block">
            Platform Revenue
          </span>
          <div className="text-2xl font-extrabold text-[#C6A15B] font-serif mt-1">
            ₹{totalSystemRevenue}
          </div>
          <span className="text-[11px] text-[#5e5954]">
            Settled via FastTag
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex border-b border-[#EFECE4] mb-6 gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveAdminTab('telemetry')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'telemetry'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>KMC Edge Telemetry</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminTab('users')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'users'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User & Role Management ({allUsers.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveAdminTab('hubs')}
          className={`py-2.5 px-4 text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
            activeAdminTab === 'hubs'
              ? 'border-[#7B2638] text-[#7B2638]'
              : 'border-transparent text-[#5e5954] hover:text-[#292725]'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>All Municipal Hubs ({hubs.length})</span>
        </button>
      </div>

      {/* Tab 1: Edge Telemetry */}
      {activeAdminTab === 'telemetry' && (
        <div className="space-y-6">
          {/* Overrides */}
          <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs space-y-3">
            <h3 className="text-[13px] font-bold text-[#7B2638] uppercase tracking-wider">
              Smart City Emergency & Surge Overrides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold text-[#292725] block">Aarti Surge Protection</span>
                  <span className="text-[11px] text-[#5e5954]">Holds 20% bays for Ambabai pilgrims</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAartiSurgeActive(!aartiSurgeActive)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    aartiSurgeActive ? 'bg-[#7B2638]' : 'bg-[#EFECE4]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${aartiSurgeActive ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold text-[#292725] block">Emergency Vehicle Priority</span>
                  <span className="text-[11px] text-[#5e5954]">Frees Bhausingji Road ambulance route</span>
                </div>
                <button
                  type="button"
                  onClick={() => setEmergencyCorridor(!emergencyCorridor)}
                  className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                    emergencyCorridor ? 'bg-[#7B2638]' : 'bg-[#EFECE4]'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${emergencyCorridor ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Node Gateway Table */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
            <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
              <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
                Municipal Edge Node Telemetry Status
              </h3>
              <span className="text-[11px] font-bold text-[#26965B]">All 6 Gateways Online</span>
            </div>

            <div className="divide-y divide-[#EFECE4]">
              {[
                { name: 'Node #1: Mahalaxmi South Gate Gateway', latency: '12ms', ip: '192.168.10.4', status: 'ONLINE', bays: '18 open / 40' },
                { name: 'Node #2: Rankala Chowpatty DC Hub', latency: '18ms', ip: '192.168.10.8', status: 'ONLINE', bays: '34 open / 60' },
                { name: 'Node #3: New Palace Visitor Gateway', latency: '14ms', ip: '192.168.10.12', status: 'ONLINE', bays: '28 open / 50' },
                { name: 'Node #4: Panhala Fort Base Node', latency: '24ms', ip: '192.168.10.16', status: 'ONLINE', bays: '45 open / 70' },
                { name: 'Node #5: Central Bus Stand (CBS) Hub', latency: '9ms', ip: '192.168.10.20', status: 'ONLINE', bays: '52 open / 120' },
                { name: 'Node #6: Bhavani Mandap Heritage Barrier', latency: '11ms', ip: '192.168.10.24', status: 'ONLINE', bays: '3 open / 25' },
              ].map((node, i) => (
                <div key={i} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                  <div className="flex items-center gap-3">
                    <Server className="w-5 h-5 text-[#7B2638]" />
                    <div>
                      <span className="text-[13px] font-bold text-[#292725] block">{node.name}</span>
                      <span className="text-[11px] text-[#5e5954]">{node.ip} • Telemetry Latency: {node.latency}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[#26965B] bg-[#edf8f2] px-2.5 py-0.5 rounded">
                      {node.bays}
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#26965B] text-white">
                      {node.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: User & Role Directory */}
      {activeAdminTab === 'users' && (
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
              Registered Accounts Directory
            </h3>
            <span className="text-[11px] text-[#5e5954]">
              Role-Based Access Enforcement
            </span>
          </div>

          <div className="divide-y divide-[#EFECE4]">
            {allUsers.map((u) => (
              <div key={u.id} className="p-4 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-sm flex items-center justify-center">
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#292725]">{u.name}</span>
                      <span
                        className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                          u.role === 'ADMIN'
                            ? 'bg-[#7B2638] text-white'
                            : u.role === 'OWNER'
                            ? 'bg-[#C6A15B] text-black'
                            : 'bg-[#edf8f2] text-[#26965B]'
                        }`}
                      >
                        {u.role}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#5e5954] block mt-0.5">
                      {u.email} • {u.phone || 'No phone'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#5e5954]">Change Role:</span>
                  <select
                    value={u.role}
                    onChange={(e) => onUpdateUserRole(u.id, e.target.value as UserRole)}
                    className="h-8 px-2 rounded-lg bg-[#F7F4EE] border border-[#EFECE4] text-xs font-bold text-[#7B2638] focus:outline-none cursor-pointer"
                  >
                    <option value="CUSTOMER">CUSTOMER</option>
                    <option value="OWNER">OWNER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: All Municipal Hubs Monitor */}
      {activeAdminTab === 'hubs' && (
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
            <h3 className="text-[15px] font-bold text-[#7B2638] font-serif">
              Kolhapur Parking Lots Global Overview
            </h3>
            <span className="text-[11px] text-[#5e5954]">
              {hubs.length} Active Hubs
            </span>
          </div>

          <div className="divide-y divide-[#EFECE4]">
            {hubs.map((hub) => (
              <div key={hub.id} className="p-4 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-bold text-[#7B2638] font-serif">{hub.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-[#C6A15B]/20 text-[#7B2638]">
                      {hub.landmark}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#5e5954] block mt-0.5">
                    {hub.area} • Car: ₹{hub.hourlyRate.car}/hr
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[13px] font-bold text-[#26965B] block">
                    {hub.openBays} of {hub.totalBays} Bays Free
                  </span>
                  <span className="text-[10px] text-[#8a847e]">
                    {hub.ownerId ? `Hosted (Owner: ${hub.ownerId.slice(0, 10)})` : 'KMC Municipal Lot'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};