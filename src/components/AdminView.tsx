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
    <div className="w-full flex flex-col gap-4 pb-20 pt-2 animate-in fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-[#d3e4fe] tracking-tight">
              KMC Edge Command
            </h2>
            <span className="text-[10px] font-extrabold uppercase bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30 px-2 py-0.5 rounded-full">
              MUNICIPAL
            </span>
          </div>
          <p className="text-[12px] text-[#c6c6cd]">
            Kolhapur Municipal Corporation Smart Mobility Telemetry
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          className="h-8 px-2.5 rounded-lg bg-[#1b2b3f] hover:bg-[#26364a] text-[#d3e4fe] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#ffb95f]' : ''}`} />
          <span>Sync Nodes</span>
        </button>
      </div>

      {/* Real-time telemetry summary */}
      <div className="grid grid-cols-3 gap-2">
        <div className="p-3 rounded-xl bg-[#102034] border border-white/5 flex flex-col">
          <span className="text-[10px] text-[#c6c6cd] uppercase font-bold">City Occupancy</span>
          <span className="text-[22px] font-black text-[#ffb95f] mt-1">74.2%</span>
          <span className="text-[10px] text-[#4edea3]">182 / 245 Bays</span>
        </div>

        <div className="p-3 rounded-xl bg-[#102034] border border-white/5 flex flex-col">
          <span className="text-[10px] text-[#c6c6cd] uppercase font-bold">Active Sensors</span>
          <span className="text-[22px] font-black text-[#4edea3] mt-1">42 / 42</span>
          <span className="text-[10px] text-[#8a9bb5]">100% Up</span>
        </div>

        <div className="p-3 rounded-xl bg-[#102034] border border-white/5 flex flex-col">
          <span className="text-[10px] text-[#c6c6cd] uppercase font-bold">ML Surge Model</span>
          <span className="text-[22px] font-black text-[#38bdf8] mt-1">v3.4</span>
          <span className="text-[10px] text-[#38bdf8]">Edge Calibrated</span>
        </div>
      </div>

      {/* KMC Edge Nodes Status */}
      <div className="space-y-2">
        <h3 className="text-[12px] font-bold text-[#c6c6cd] uppercase tracking-wider">
          Municipal Edge Node Gateways
        </h3>

        <div className="space-y-2">
          {[
            { name: 'Node #1: Mahalaxmi South Gate Gateway', latency: '12ms', ip: '192.168.10.4', status: 'ONLINE', bays: '18 open / 40' },
            { name: 'Node #2: Rankala Chowpatty DC Hub', latency: '18ms', ip: '192.168.10.8', status: 'ONLINE', bays: '34 open / 60' },
            { name: 'Node #3: Bhavani Mandap Heritage Cam', latency: '14ms', ip: '192.168.10.12', status: 'ONLINE', bays: '3 open / 25' },
            { name: 'Node #4: CBS MSRTC Multi-Tier Hub', latency: '22ms', ip: '192.168.10.16', status: 'ONLINE', bays: '52 open / 120' },
          ].map((node) => (
            <div
              key={node.name}
              className="p-3 rounded-xl bg-[#102034] border border-white/5 flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Radio className="w-4 h-4 text-[#4edea3] animate-pulse flex-shrink-0" />
                <div>
                  <span className="text-[13px] font-bold text-[#d3e4fe] block">
                    {node.name}
                  </span>
                  <span className="text-[11px] text-[#8a9bb5]">
                    Ping: {node.latency} • {node.ip} • {node.bays}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-black text-[#4edea3] bg-[#001c10] border border-[#4edea3]/30 px-2 py-0.5 rounded">
                {node.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Municipal Traffic & Pricing Controls */}
      <div className="space-y-2">
        <h3 className="text-[12px] font-bold text-[#c6c6cd] uppercase tracking-wider">
          Automated Smart Traffic Controls
        </h3>

        <div className="p-4 rounded-xl bg-[#102034] border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[13px] font-bold text-[#d3e4fe] block">
                Evening Ambabai Temple Aarti Surge Policy
              </span>
              <span className="text-[11px] text-[#8a9bb5]">
                Adjusts reservation priority and triggers free e-rickshaw dispatch
              </span>
            </div>
            <button
              type="button"
              onClick={() => setAartiSurgeActive(!aartiSurgeActive)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                aartiSurgeActive
                  ? 'bg-[#ffb95f] text-[#472a00]'
                  : 'bg-[#1b2b3f] text-[#c6c6cd]'
              }`}
            >
              {aartiSurgeActive ? 'ACTIVE (88%)' : 'DISABLED'}
            </button>
          </div>

          <div className="border-t border-white/5 pt-3 flex items-center justify-between">
            <div>
              <span className="text-[13px] font-bold text-[#d3e4fe] block">
                Emergency VIP / Fire Corridor Override
              </span>
              <span className="text-[11px] text-[#8a9bb5]">
                Instantly lifts all automated barriers across Bhavani Mandap Road
              </span>
            </div>
            <button
              type="button"
              onClick={() => setEmergencyCorridor(!emergencyCorridor)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                emergencyCorridor
                  ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]'
                  : 'bg-[#1b2b3f] text-[#c6c6cd]'
              }`}
            >
              {emergencyCorridor ? 'LOCKED OPEN' : 'STANDBY'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
