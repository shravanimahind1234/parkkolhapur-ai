import React, { useState } from 'react';
import { X, Car, Bike, Zap, Plus, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SavedVehicle, VehicleType } from '../types';

interface VehicleManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: SavedVehicle[];
  onAddVehicle: (vehicle: SavedVehicle) => void;
  onRemoveVehicle: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export const VehicleManagerModal: React.FC<VehicleManagerModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onAddVehicle,
  onRemoveVehicle,
  onSetDefault,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [fastTagId, setFastTagId] = useState('');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!plateNumber.trim()) return;

    const newVehicle: SavedVehicle = {
      id: `v-${Date.now()}`,
      plateNumber: plateNumber.toUpperCase().trim(),
      nickname: nickname.trim() || (vehicleType === 'car' ? 'Car' : vehicleType === 'bike' ? '2-Wheeler' : 'EV'),
      vehicleType,
      isDefault: vehicles.length === 0,
      fastTagId: fastTagId.trim() || undefined,
    };

    onAddVehicle(newVehicle);
    setPlateNumber('');
    setNickname('');
    setFastTagId('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-[#FFFDF8] rounded-3xl border border-[#C6A15B]/30 shadow-2xl overflow-hidden p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#7B2638] text-[#FFFDF8] flex items-center justify-center">
              <Car className="w-5 h-5 text-[#C6A15B]" />
            </div>
            <div>
              <h3 className="text-[17px] font-bold text-[#7B2638] font-serif leading-tight">
                Kolhapur Vehicle Fleet
              </h3>
              <p className="text-[12px] text-[#5e5954]">
                Manage saved vehicles for 1-click booking & FastTag
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#5e5954] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Vehicle List */}
        <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1 no-scrollbar">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                v.isDefault
                  ? 'bg-[#FFFFFF] border-[#7B2638] shadow-sm'
                  : 'bg-[#F7F4EE] border-[#EFECE4]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    v.vehicleType === 'ev'
                      ? 'bg-[#edf8f2] text-[#26965B]'
                      : 'bg-[#C6A15B]/15 text-[#7B2638]'
                  }`}
                >
                  {v.vehicleType === 'bike' ? (
                    <Bike className="w-4 h-4" />
                  ) : v.vehicleType === 'ev' ? (
                    <Zap className="w-4 h-4" />
                  ) : (
                    <Car className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-extrabold text-[#292725] tracking-wide font-mono">
                      {v.plateNumber}
                    </span>
                    {v.isDefault && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#7B2638] text-[#FFFDF8]">
                        Default
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#5e5954] block mt-0.5">
                    {v.nickname} {v.fastTagId ? `• FastTag: ${v.fastTagId}` : ''}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {!v.isDefault && (
                  <button
                    type="button"
                    onClick={() => onSetDefault(v.id)}
                    className="text-[11px] font-bold text-[#7B2638] hover:underline px-2 py-1 cursor-pointer"
                  >
                    Set Default
                  </button>
                )}
                {vehicles.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveVehicle(v.id)}
                    className="w-7 h-7 rounded-lg text-[#D94B4B] hover:bg-[#fdf0f0] flex items-center justify-center transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Add Vehicle Toggle / Form */}
        {showAddForm ? (
          <form onSubmit={handleAddSubmit} className="mt-4 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C6A15B]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold text-[#7B2638]">
                Add New Kolhapur Vehicle
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-[11px] text-[#5e5954] hover:underline cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(['car', 'bike', 'ev'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVehicleType(t)}
                  className={`py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    vehicleType === t
                      ? 'bg-[#7B2638] text-[#FFFDF8]'
                      : 'bg-[#F7F4EE] text-[#5e5954]'
                  }`}
                >
                  {t === 'ev' ? 'EV Hub' : t === 'bike' ? '2-Wheeler' : 'Car (4W)'}
                </button>
              ))}
            </div>

            <input
              type="text"
              required
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="e.g. MH 09 DX 4521"
              className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] font-mono font-bold uppercase focus:outline-none focus:border-[#7B2638]"
            />

            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Vehicle Nickname (e.g. White Creta)"
              className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
            />

            <input
              type="text"
              value={fastTagId}
              onChange={(e) => setFastTagId(e.target.value)}
              placeholder="FastTag ID (Optional)"
              className="w-full h-10 px-3 rounded-xl bg-[#F7F4EE] border border-[#EFECE4] text-[13px] focus:outline-none focus:border-[#7B2638]"
            />

            <button
              type="submit"
              className="w-full h-10 rounded-xl bg-[#7B2638] text-[#FFFDF8] font-bold text-[12px] transition-colors cursor-pointer"
            >
              Save Vehicle
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="w-full mt-4 h-11 rounded-xl bg-[#F7F4EE] hover:bg-[#EFECE4] text-[#7B2638] font-bold text-[13px] flex items-center justify-center gap-1.5 border border-[#EFECE4] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle (MH 09 ...)</span>
          </button>
        )}

        <div className="mt-4 pt-3 border-t border-[#EFECE4] flex items-center gap-2 text-[11px] text-[#5e5954]">
          <ShieldCheck className="w-4 h-4 text-[#26965B]" />
          <span>Vehicle plates are auto-authorized at municipal barrier nodes.</span>
        </div>
      </div>
    </div>
  );
};