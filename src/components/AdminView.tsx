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
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const [aartiSurgeActive, setAartiSurgeActive] = useState(true);
  const [emergencyCorridor, setEmergencyCorridor] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1000);
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-20 pt-4 animate-in fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-royal text-2xl sm:text-3xl font-extrabold text-[#FFF9EF] tracking-tight">
              KMC Edge Command Center
            </h2>
            <span className="text-[10px] font-black uppercase gold-gradient-bg text-[#22070E] px-2 py-0.5 rounded tracking-wider shadow">
              MUNICIPAL AUTHORITY
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#C6A15B] mt-0.5">
            Kolhapur Municipal Corporation Smart Mobility & Temple Corridor Telemetry
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          className="h-10 px-4 rounded-xl gold-gradient-bg text-[#22070E] text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:brightness-105 active:scale-95"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Sync All 42 Edge Nodes</span>
        </button>
      </div>

      {/* Real-time Telemetry Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] text-[#B8ADA0] uppercase font-bold">City-Wide Occupancy</span>
          <span className="font-royal text-2xl font-black text-[#F59E0B] mt-1">74.2%</span>
          <span className="text-[10px] text-[#10B981] font-bold">236 / 320 Active Bays</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] text-[#B8ADA0] uppercase font-bold">IoT Sensors Online</span>
          <span className="font-royal text-2xl font-black text-[#10B981] mt-1">42 / 42</span>
          <span className="text-[10px] text-[#C6A15B]">100% Sub-Second Sync</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] text-[#B8ADA0] uppercase font-bold">Aarti Rush AI Model</span>
          <span className="font-royal text-2xl font-black text-[#C6A15B] mt-1">v4.2 Pro</span>
          <span className="text-[10px] text-[#10B981] font-bold">Active Forecasting</span>
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-b from-[#3D101C] to-[#22070E] border border-[#C6A15B]/30 flex flex-col shadow">
          <span className="text-[10px] text-[#B8ADA0] uppercase font-bold">Daily Municipal Revenue</span>
          <span className="font-royal text-2xl font-black text-[#FFF9EF] mt-1">₹48,250</span>
          <span className="text-[10px] text-[#10B981] font-bold">+18.5% Pilgrimage Peak</span>
        </div>
      </div>

      {/* Corridor Emergency Controls */}
      <div className="p-5 rounded-2xl bg-[#22070E] border border-[#C6A15B]/35 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#FFF9EF] block">
            Temple Aarti Surge Auto-Balancing
          </span>
          <span className="text-[11px] text-[#B8ADA0] block mt-0.5">
            Automatically routes incoming pilgrims to New Palace & Rankala hubs when Mahalaxmi South Gate exceeds 80% occupancy.
          </span>
        </div>

        <button
          type="button"
          onClick={() => setAartiSurgeActive(!aartiSurgeActive)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
            aartiSurgeActive
              ? 'bg-[#10B981]/20 text-[#10B981] border-[#10B981]'
              : 'bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]'
          }`}
        >
          {aartiSurgeActive ? '✓ Surge Model Active' : 'Model Paused'}
        </button>
      </div>

      {/* KMC Edge Nodes Status List */}
      <div className="space-y-3">
        <h3 className="font-royal text-lg font-bold text-[#FFF9EF]">
          Active Municipal Edge Node Gateways
        </h3>

        <div className="space-y-2.5">
          {[
            { name: 'Node #1: Mahalaxmi South Gate Gateway', latency: '12ms', ip: '192.168.10.4', status: 'ONLINE', bays: '18 open / 40' },
            { name: 'Node #2: New Palace Royal Grounds Gateway', latency: '14ms', ip: '192.168.10.6', status: 'ONLINE', bays: '54 open / 85' },
            { name: 'Node #3: Rankala Chowpatty DC Fast Hub', latency: '16ms', ip: '192.168.10.8', status: 'ONLINE', bays: '34 open / 60' },
            { name: 'Node #4: Bhavani Mandap Heritage Cam Node', latency: '14ms', ip: '192.168.10.12', status: 'ONLINE', bays: '4 open / 25' },
            { name: 'Node #5: CBS MSRTC Multi-Tier Terminal', latency: '21ms', ip: '192.168.10.16', status: 'ONLINE', bays: '52 open / 120' },
          ].map((node) => (
            <div
              key={node.name}
              className="p-4 rounded-2xl bg-[#22070E] border border-white/5 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-[#10B981] animate-pulse flex-shrink-0" />
                <div>
                  <span className="font-bold text-[#FFF9EF] block">{node.name}</span>
                  <span className="text-[11px] text-[#B8ADA0]">
                    IP: {node.ip} • Latency: {node.latency}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-[#C6A15B] block">{node.bays}</span>
                <span className="text-[10px] font-black text-[#10B981] uppercase">
                  {node.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
