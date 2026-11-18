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
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 pb-20 pt-2 animate-in fade-in text-left">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-bold text-[#7B2638] font-serif tracking-tight">
              KMC Edge Command
            </h2>
            <span className="text-[10px] font-extrabold uppercase bg-[#7B2638] text-[#FFFDF8] px-2 py-0.5 rounded-full shadow-xs">
              MUNICIPAL TELEMETRY
            </span>
          </div>
          <p className="text-[12px] text-[#5e5954]">
            Kolhapur Municipal Corporation Smart Mobility Telemetry & Gateway Status
          </p>
        </div>

        <button
          type="button"
          onClick={handleSync}
          className="h-8 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#F7F4EE] text-[#7B2638] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#EFECE4] shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#7B2638]' : ''}`} />
          <span>Sync Nodes</span>
        </button>
      </div>

      {/* Real-time telemetry summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col">
          <span className="text-[10px] text-[#5e5954] uppercase font-bold">City Occupancy</span>
          <span className="text-[26px] font-extrabold text-[#7B2638] mt-1 font-serif">74.2%</span>
          <span className="text-[11px] text-[#26965B] font-semibold">182 / 245 Bays Filled</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col">
          <span className="text-[10px] text-[#5e5954] uppercase font-bold">IoT Sensors Online</span>
          <span className="text-[26px] font-extrabold text-[#26965B] mt-1 font-serif">48 / 48</span>
          <span className="text-[11px] text-[#5e5954]">100% Edge Gateways Up</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs flex flex-col">
          <span className="text-[10px] text-[#5e5954] uppercase font-bold">AI Aarti Surge Model</span>
          <span className="text-[26px] font-extrabold text-[#C6A15B] mt-1 font-serif">v3.4 ML</span>
          <span className="text-[11px] text-[#5e5954]">Calibrated for 6:30 PM Aarti</span>
        </div>
      </div>

      {/* KMC Edge Nodes Status */}
      <div className="rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
          <h3 className="text-[14px] font-bold text-[#7B2638] font-serif uppercase tracking-wider">
            Municipal Edge Node Gateways
          </h3>
          <span className="text-[11px] font-semibold text-[#26965B] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#26965B] animate-pulse" />
            Active Sub-Second Polling
          </span>
        </div>

        <div className="divide-y divide-[#EFECE4]">
          {[
            { name: 'Node #1: Mahalaxmi South Gate Gateway', latency: '12ms', ip: '192.168.10.4', status: 'ONLINE', bays: '18 open / 40' },
            { name: 'Node #2: Rankala Chowpatty DC Hub', latency: '18ms', ip: '192.168.10.8', status: 'ONLINE', bays: '34 open / 60' },
            { name: 'Node #3: New Palace Visitor Gateway', latency: '14ms', ip: '192.168.10.12', status: 'ONLINE', bays: '28 open / 50' },
            { name: 'Node #4: Panhala Fort Base Node', latency: '24ms', ip: '192.168.10.16', status: 'ONLINE', bays: '45 open / 70' },
            { name: 'Node #5: Central Bus Stand (CBS) Hub', latency: '9ms', ip: '192.168.10.20', status: 'ONLINE', bays: '52 open / 120' },
          ].map((node, i) => (
            <div key={i} className="p-3.5 flex items-center justify-between text-[12px] gap-2 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-[#7B2638]" />
                <div>
                  <span className="font-bold text-[#292725] block">{node.name}</span>
                  <span className="text-[10px] text-[#5e5954]">{node.ip} • Latency: {node.latency}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-bold text-[#26965B] bg-[#edf8f2] px-2 py-0.5 rounded">
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

      {/* Control Toggles */}
      <div className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#EFECE4] shadow-xs space-y-3">
        <h3 className="text-[13px] font-bold text-[#7B2638] uppercase tracking-wider">
          Smart City Municipal Overrides
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] flex items-center justify-between">
            <div>
              <span className="text-[12px] font-bold text-[#292725] block">Aarti Surge Protection</span>
              <span className="text-[10px] text-[#5e5954]">Auto-holds 20% bays for pilgrims</span>
            </div>
            <button
              type="button"
              onClick={() => setAartiSurgeActive(!aartiSurgeActive)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                aartiSurgeActive ? 'bg-[#7B2638]' : 'bg-[#EFECE4]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  aartiSurgeActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="p-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] flex items-center justify-between">
            <div>
              <span className="text-[12px] font-bold text-[#292725] block">Emergency Vehicle Priority</span>
              <span className="text-[10px] text-[#5e5954]">Frees Bhausingji Road corridor</span>
            </div>
            <button
              type="button"
              onClick={() => setEmergencyCorridor(!emergencyCorridor)}
              className={`w-10 h-5 rounded-full p-0.5 transition-colors cursor-pointer ${
                emergencyCorridor ? 'bg-[#7B2638]' : 'bg-[#EFECE4]'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs transition-transform ${
                  emergencyCorridor ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};