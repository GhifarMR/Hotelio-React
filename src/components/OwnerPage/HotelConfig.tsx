import { useState } from "react";
import {
  BedDouble,
  ToggleLeft,
  ToggleRight,
  Save,
  ChevronLeft,
  AlertCircle,
  CheckCircle2,
  Pencil,
  X,
  Check,
} from "lucide-react";
import NavbarOwner from "./NavbarOwner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Room {
  id: string;
  name: string;
  size: number;
  priceNow: number;
  priceBefore: number;
  maxGuests: number;
  amenities: string[];
  soldOut: boolean;
  isVisible: boolean;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  isActive: boolean;
  rooms: Room[];
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_HOTEL: Hotel = {
  id: "1",
  name: "Great Ghifar Hotel",
  location: "Manhattan, NYC",
  isActive: true,
  rooms: [
    {
      id: "r1",
      name: "Superior King Room",
      size: 28,
      priceNow: 300000,
      priceBefore: 400000,
      maxGuests: 2,
      amenities: ["King Bed", "AC", "Hot Shower", "Breakfast"],
      soldOut: false,
      isVisible: true,
    },
    {
      id: "r2",
      name: "Deluxe Family Room",
      size: 40,
      priceNow: 400000,
      priceBefore: 500000,
      maxGuests: 4,
      amenities: ["2 Beds", "AC", "Hot Shower", "TV", "Breakfast"],
      soldOut: true,
      isVisible: true,
    },
    {
      id: "r3",
      name: "Executive Suite",
      size: 55,
      priceNow: 500000,
      priceBefore: 600000,
      maxGuests: 2,
      amenities: ["King Bed", "AC", "Bathtub", "Mini Bar", "Workspace"],
      soldOut: false,
      isVisible: false,
    },
  ],
};

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function Toggle({
  value,
  onChange,
  labelOn = "On",
  labelOff = "Off",
  colorOn = "text-emerald-600",
}: {
  value: boolean;
  onChange: (v: boolean) => void;
  labelOn?: string;
  labelOff?: string;
  colorOn?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
        value ? colorOn : "text-slate-400"
      }`}
    >
      {value ? (
        <ToggleRight size={22} className={colorOn} />
      ) : (
        <ToggleLeft size={22} className="text-slate-300" />
      )}
      {value ? labelOn : labelOff}
    </button>
  );
}

// ─── Inline Price Editor ──────────────────────────────────────────────────────

function PriceEditor({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const parsed = parseInt(draft.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 0) onChange(parsed);
    setEditing(false);
  };

  return (
    <div>
      <Label className="text-xs text-slate-400 mb-1 block">{label}</Label>
      {editing ? (
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-400">Rp</span>
          <Input
            type="number"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setEditing(false);
            }}
            autoFocus
            className="h-8 text-sm w-32"
            min="0"
          />
          <button
            onClick={commit}
            className="p-1 rounded-md hover:bg-emerald-50 text-emerald-600"
          >
            <Check size={14} />
          </button>
          <button
            onClick={() => setEditing(false)}
            className="p-1 rounded-md hover:bg-red-50 text-red-400"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">
            {formatRp(value)}
          </span>
          <button
            onClick={() => { setDraft(String(value)); setEditing(true); }}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600"
          >
            <Pencil size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Room Config Row ──────────────────────────────────────────────────────────

function RoomConfigRow({
  room,
  onChange,
}: {
  room: Room;
  onChange: (updated: Room) => void;
}) {
  const set = <K extends keyof Room>(key: K, val: Room[K]) =>
    onChange({ ...room, [key]: val });

  const discount =
    room.priceBefore > 0
      ? Math.round(((room.priceBefore - room.priceNow) / room.priceBefore) * 100)
      : 0;

  return (
    <div
      className={`border rounded-2xl p-5 transition-all ${
        room.soldOut
          ? "border-red-100 bg-red-50/40"
          : room.isVisible
          ? "border-slate-100 bg-white"
          : "border-slate-100 bg-slate-50 opacity-60"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800">{room.name}</h3>
            {room.soldOut && (
              <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                Sold Out
              </span>
            )}
            {!room.isVisible && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                Hidden
              </span>
            )}
            {discount > 0 && !room.soldOut && (
              <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">
                {discount}% OFF
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            {room.size}m² · Max {room.maxGuests} guests
          </p>
        </div>

        {/* Toggles */}
        <div className="flex flex-col items-end gap-2">
          <Toggle
            value={room.soldOut}
            onChange={(v) => set("soldOut", v)}
            labelOn="Sold Out"
            labelOff="Available"
            colorOn="text-red-500"
          />
          <Toggle
            value={room.isVisible}
            onChange={(v) => set("isVisible", v)}
            labelOn="Visible"
            labelOff="Hidden"
            colorOn="text-emerald-600"
          />
        </div>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-6 mb-4 pt-4 border-t border-slate-100">
        <PriceEditor
          label="Current Price / Night"
          value={room.priceNow}
          onChange={(v) => set("priceNow", v)}
        />
        <PriceEditor
          label="Original Price (strikethrough)"
          value={room.priceBefore}
          onChange={(v) => set("priceBefore", v)}
        />
      </div>

      {/* Amenities preview */}
      <div className="flex flex-wrap gap-1.5">
        {room.amenities.map((a) => (
          <span
            key={a}
            className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md"
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const HotelConfig = () => {
  const [hotel, setHotel] = useState<Hotel>(MOCK_HOTEL);
  const [saved, setSaved] = useState(false);

  const updateRoom = (id: string, updated: Room) => {
    setHotel((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? updated : r)),
    }));
  };

  const handleSave = () => {
    // TODO: router.post(`/owner/hotels/${hotel.id}/config`, hotel)
    console.log("Saving config:", hotel);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const allSoldOut = hotel.rooms.every((r) => r.soldOut);
  const availableCount = hotel.rooms.filter(
    (r) => !r.soldOut && r.isVisible
  ).length;

  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0 z-50">
        <NavbarOwner />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Back + Header */}
        <div className="flex items-center gap-3 mb-6">
          <a
            href="/owner"
            className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <ChevronLeft size={20} />
          </a>
          <div>
            <h1 className="text-xl font-bold ">{hotel.name}</h1>
            <p className="text-xs ">{hotel.location}</p>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <Toggle
              value={hotel.isActive}
              onChange={(v) => setHotel((p) => ({ ...p, isActive: v }))}
              labelOn="Hotel Active"
              labelOff="Hotel Inactive"
              colorOn=""
              
            />
          </div>
        </div>

        {/* Status Banner */}
        {allSoldOut && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            All rooms are marked as sold out. Your hotel won't appear in search
            results.
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <CheckCircle2 size={16} className="shrink-0" />
            Configuration saved successfully!
          </div>
        )}

        {/* Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            {
              label: "Total Rooms",
              value: hotel.rooms.length,
              color: "text-slate-700",
            },
            {
              label: "Available",
              value: availableCount,
              color: "text-emerald-600",
            },
            {
              label: "Sold Out",
              value: hotel.rooms.filter((r) => r.soldOut).length,
              color: "text-red-500",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border border-slate-100 rounded-xl p-4 text-center"
            >
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() =>
              setHotel((p) => ({
                ...p,
                rooms: p.rooms.map((r) => ({ ...r, soldOut: true })),
              }))
            }
            className="text-xs px-3 py-2 rounded-lg border border-red-100 text-red-500 hover:bg-red-50 transition-colors"
          >
            Mark All Sold Out
          </button>
          <button
            onClick={() =>
              setHotel((p) => ({
                ...p,
                rooms: p.rooms.map((r) => ({ ...r, soldOut: false })),
              }))
            }
            className="text-xs px-3 py-2 rounded-lg border border-emerald-100 text-emerald-600 hover:bg-emerald-50 transition-colors"
          >
            Mark All Available
          </button>
          <button
            onClick={() =>
              setHotel((p) => ({
                ...p,
                rooms: p.rooms.map((r) => ({ ...r, isVisible: true })),
              }))
            }
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Show All Rooms
          </button>
        </div>

        {/* Room Cards */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BedDouble size={16} />
            Room Configuration
          </div>
          {hotel.rooms.map((room) => (
            <RoomConfigRow
              key={room.id}
              room={room}
              onChange={(updated) => updateRoom(room.id, updated)}
            />
          ))}
        </div>

        {/* Save */}
        <div className="flex justify-end gap-3">
          <a
            href="/owner"
            className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Discard
          </a>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Save size={15} />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelConfig;