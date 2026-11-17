import React, { useState } from 'react';
import {
  X,
  Car,
  Bike,
  Zap,
  Plus,
  Trash2,
  CheckCircle2,
  Shield,
  Star,
  Sparkles,
} from 'lucide-react';
import { UserVehicle, VehicleType } from '../types';

interface VehicleManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: UserVehicle[];
  onAddVehicle: (newVehicle: UserVehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onSetDefaultVehicle: (id: string) => void;
  onSelectVehicleTypeForSearch?: (type: VehicleType) => void;
}

export const VehicleManagementModal: React.FC<VehicleManagementModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  onAddVehicle,
  onDeleteVehicle,
  onSetDefaultVehicle,
  onSelectVehicleTypeForSearch,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [plateNumber, setPlateNumber] = useState('');
  const [nickname, setNickname] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('car');
  const [isDefault, setIsDefault] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!plateNumber.trim()) {
      setErrorMsg('Please enter a valid registration plate number (e.g. MH 09 DX 4521).');
      return;
    }

    const newVeh: UserVehicle = {
      id: `v-${Date.now()}`,
      plateNumber: plateNumber.toUpperCase().trim(),
      type: vehicleType,
      nickname: nickname.trim() || `${vehicleType.toUpperCase()} (${plateNumber.slice(-4)})`,
      isDefault: isDefault || vehicles.length === 0,
    };

    onAddVehicle(newVeh);
    setSuccessMsg(`Vehicle ${newVeh.plateNumber} added successfully!`);
    setTimeout(() => {
      setSuccessMsg('');
      setShowAddForm(false);
      setPlateNumber('');
      setNickname('');
      setIsDefault(false);
    }, 1000);
  };

  const getVehicleIcon = (type: VehicleType) => {
    switch (type) {
      case 'car':
        return <Car className="w-5 h-5 text-[#C6A15B]" />;
      case 'bike':
        return <Bike className="w-5 h-5 text-[#C6A15B]" />;
      case 'ev':
        return <Zap className="w-5 h-5 text-[#10B981]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-gradient-to-b from-[#3D101C] via-[#22070E] to-[#1A0A0F] border border-[#C6A15B]/35 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#FFF9EF]">
        
        {/* Header */}
        <div className="p-5 bg-[#22070E] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl gold-gradient-bg flex items-center justify-center text-[#22070E]">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-royal text-base sm:text-lg font-bold text-[#FFF9EF] leading-tight">
                My Registered Vehicles
              </h3>
              <p className="text-xs text-[#C6A15B]">
                Kolhapur Municipal Smart Fast-Pass Garage
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 rounded-full bg-[#1A0A0F] text-[#B8ADA0] hover:text-[#FFF9EF] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-5 overflow-y-auto space-y-4">
          
          {/* Top Info Banner */}
          <div className="p-3.5 rounded-2xl bg-[#651E2B]/40 border border-[#C6A15B]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Shield className="w-5 h-5 text-[#C6A15B] flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-[#FFF9EF] block">Automatic ANPR Gate Recognition</span>
                <span className="text-[11px] text-[#B8ADA0]">Bays automatically open via license plate scans at all KMC hubs</span>
              </div>
            </div>
            {!showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="px-3 py-1.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs flex items-center gap-1 shadow cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>

          {/* Add Vehicle Form Drawer */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="p-4 rounded-2xl bg-[#1A0A0F] border border-[#C6A15B]/35 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs font-bold text-[#C6A15B] uppercase">Register New Vehicle</span>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="text-xs text-[#B8ADA0] hover:text-white"
                >
                  Cancel
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-[#EF4444]/20 border border-[#EF4444]/40 text-[#EF4444] text-xs font-semibold">
                  {errorMsg}
                </div>
              )}

              {successMsg && (
                <div className="p-2.5 rounded-lg bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* Vehicle Type Switcher */}
              <div>
                <label className="text-[11px] font-bold text-[#E8DECE] block mb-1.5">Vehicle Category</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'car', label: 'Car / 4W', icon: Car },
                    { id: 'bike', label: 'Bike / 2W', icon: Bike },
                    { id: 'ev', label: 'Electric EV', icon: Zap },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSel = vehicleType === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setVehicleType(cat.id as VehicleType)}
                        className={`p-2 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSel
                            ? 'bg-[#651E2B] border-[#C6A15B] text-[#FFF9EF]'
                            : 'bg-[#22070E] border-white/5 text-[#B8ADA0]'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSel ? 'text-[#C6A15B]' : ''}`} />
                        <span className="text-[10px] font-bold">{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Number Plate Input */}
              <div>
                <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">
                  License Registration Number
                </label>
                <input
                  type="text"
                  value={plateNumber}
                  onChange={(e) => setPlateNumber(e.target.value.toUpperCase())}
                  placeholder="e.g. MH 09 DX 4521"
                  className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF] font-bold uppercase tracking-wider focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Nickname Input */}
              <div>
                <label className="text-[11px] font-bold text-[#E8DECE] block mb-1">
                  Vehicle Model / Nickname
                </label>
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Red Nexon EV, Royal Enfield 350"
                  className="w-full px-3 py-2 rounded-xl bg-[#22070E] border border-white/10 text-xs text-[#FFF9EF] focus:outline-none focus:border-[#C6A15B]"
                />
              </div>

              {/* Make Default Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="accent-[#C6A15B] rounded"
                />
                <span className="text-xs text-[#E8DECE]">Set as primary vehicle for instant slot booking</span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl gold-gradient-bg text-[#22070E] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow mt-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Save to Garage</span>
              </button>
            </form>
          )}

          {/* List of Registered Vehicles */}
          <div className="space-y-2.5">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#C6A15B] block">
              Saved Vehicles ({vehicles.length})
            </span>

            {vehicles.map((v) => (
              <div
                key={v.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  v.isDefault
                    ? 'bg-[#3D101C]/80 border-[#C6A15B] shadow-md'
                    : 'bg-[#1A0A0F]/80 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#651E2B] border border-[#C6A15B]/30 flex items-center justify-center flex-shrink-0">
                    {getVehicleIcon(v.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-black text-[#FFF9EF] tracking-wider">
                        {v.plateNumber}
                      </span>
                      {v.isDefault && (
                        <span className="px-2 py-0.5 rounded-full bg-[#C6A15B] text-[#22070E] text-[9px] font-black uppercase">
                          Primary
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#B8ADA0] block mt-0.5">
                      {v.nickname} • {v.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!v.isDefault && (
                    <button
                      type="button"
                      onClick={() => onSetDefaultVehicle(v.id)}
                      title="Set as Default"
                      className="p-1.5 rounded-lg bg-[#22070E] text-[#B8ADA0] hover:text-[#C6A15B] border border-white/5 transition-colors cursor-pointer"
                    >
                      <Star className="w-4 h-4" />
                    </button>
                  )}

                  {vehicles.length > 1 && (
                    <button
                      type="button"
                      onClick={() => onDeleteVehicle(v.id)}
                      title="Remove Vehicle"
                      className="p-1.5 rounded-lg bg-[#22070E] text-[#B8ADA0] hover:text-[#EF4444] border border-white/5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#22070E] border-t border-white/10 text-center">
          <p className="text-[11px] text-[#B8ADA0]">
            Vehicles registered here are automatically recognized at all Kolhapur Municipal Smart Gates.
          </p>
        </div>

      </div>
    </div>
  );
};
