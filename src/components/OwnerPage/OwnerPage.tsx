import { useState, useEffect } from "react";
import {
  Building2,
  Plus,
  MapPin,
  BedDouble,
  Settings2,
  Loader2,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import Navbar from "../Navbar";
import api from "@/lib/axios";

// ─── Types (sesuai response backend) ───────────────────────────────────────────

interface RoomSummary {
  id: number;
  name: string;
  price_per_night: string;
  available_rooms: number;
  is_active: boolean;
}

interface Hotel {
  id: number;
  name: string;
  city: string;
  province: string;
  stars: number;
  status: "pending" | "approved" | "rejected";
  rating_avg: number;
  rejection_reason: string | null;
  rooms: RoomSummary[];
  primary_image?: { image_url: string } | null;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

const STATUS_STYLE: Record<string, string> = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

function resolveImageUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `http://127.0.0.1:8000/storage/${path}`;
}

function StarRow({ count }: { count: number }) {
  return (
    <span className="text-amber-400 text-sm">
      {"★".repeat(count)}
      <span className="text-slate-200">{"★".repeat(5 - count)}</span>
    </span>
  );
}

// ─── Hotel Card ───────────────────────────────────────────────────────────────

function HotelCard({ hotel }: { hotel: Hotel }) {
  const soldOutCount = hotel.rooms.filter((r) => r.available_rooms <= 0).length;
  const activeCount = hotel.rooms.filter((r) => r.is_active).length;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        {hotel.primary_image ? (
          <img
            src={resolveImageUrl(hotel.primary_image.image_url)}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <Building2 size={32} />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLE[hotel.status]}`}
          >
            {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
          </span>
          {soldOutCount > 0 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 text-red-700">
              {soldOutCount} sold out
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-slate-800 text-base leading-tight">
            {hotel.name}
          </h3>
          <div className="flex items-center gap-1 text-sm font-semibold text-slate-700 shrink-0 ml-2">
            Rating: {hotel.rating_avg?.toFixed(1) ?? "0.0"}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <MapPin size={11} />
          {hotel.city}, {hotel.province}
        </div>

        <StarRow count={hotel.stars} />

        {hotel.status === "rejected" && hotel.rejection_reason && (
          <p className="text-xs text-red-500 mt-2">
            Rejection reason: {hotel.rejection_reason}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 mt-3 border-t border-slate-100">
          <div className="text-center">
            <p className="text-xs text-slate-400">Rooms</p>
            <p className="font-semibold text-slate-700 text-sm">
              {hotel.rooms.length}
            </p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-xs text-slate-400">Active</p>
            <p className="font-semibold text-slate-700 text-sm">
              {activeCount}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400">Sold Out</p>
            <p className="font-semibold text-slate-700 text-sm">
              {soldOutCount}
            </p>
          </div>
        </div>

        {/* Action */}
        <Link
          to="/owner/hotels/$hotelId"
          params={{ hotelId: String(hotel.id) }}
        >
          <button className="w-full mt-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-colors flex items-center justify-center gap-2">
            <Settings2 size={15} /> Configure Hotel
          </button>
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const OwnerPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/owner/hotels")
      .then((res) => setHotels(res.data.data))
      .finally(() => setLoading(false));
  }, []);

  const totalRooms = hotels.reduce((sum, h) => sum + h.rooms.length, 0);
  const pendingCount = hotels.filter((h) => h.status === "pending").length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-3">
            <h1 className="text-2xl font-bold">My Hotels</h1>
            <p className="text-sm">
              Manage your properties and room configurations
            </p>
          </div>
          <Link
            to="/owner/add-hotel"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Plus size={16} /> Add Hotel
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            {
              label: "Total Properties",
              value: hotels.length,
              icon: <Building2 size={18} className="text-indigo-500" />,
            },
            {
              label: "Total Rooms",
              value: totalRooms,
              icon: <BedDouble size={18} className="text-emerald-500" />,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="p-2.5 rounded-xl">{s.icon}</div>
              <div>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="font-bold text-slate-800 text-lg">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {pendingCount > 0 && (
          <p className="text-xs text-amber-600 mb-4">
            {pendingCount} {pendingCount === 1 ? "hotel is" : "hotels are"} waiting for admin approval.
          </p>
        )}

        {/* Hotel Grid */}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-400 py-10 justify-center">
            <Loader2 className="animate-spin" size={16} /> Loading...
          </div>
        ) : hotels.length === 0 ? (
          <p className="text-sm text-slate-400">
            No hotels yet. Click "Add Hotel" to add your first property.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotels.map((h) => (
              <HotelCard key={h.id} hotel={h} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerPage;