import { useState } from "react";
import {
  Building2,
  Plus,
  MapPin,
  BedDouble,
  Settings2,
  TrendingUp,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import Navbar from "../Navbar";

// ─── Mock Data (ganti dengan props/fetch dari backend) ────────────────────────

interface RoomSummary {
  name: string;
  price: number;
  soldOut: boolean;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  rating: number;
  reviewCount: number;
  facilities: string[];
  rooms: RoomSummary[];
  imageUrl: string;
  isActive: boolean;
  totalBookings: number;
  monthlyRevenue: number;
}

const MOCK_HOTELS: Hotel[] = [
  {
    id: "1",
    name: "Great Ghifar Hotel",
    location: "Manhattan, NYC",
    stars: 5,
    rating: 4.8,
    reviewCount: 690,
    facilities: ["WiFi", "Pool", "Restaurant", "Parking"],
    rooms: [
      { name: "Superior King", price: 1300000, soldOut: false },
      { name: "Deluxe Family", price: 1800000, soldOut: true },
      { name: "Executive Suite", price: 2500000, soldOut: false },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80",
    isActive: true,
    totalBookings: 142,
    monthlyRevenue: 48500000,
  },
  {
    id: "2",
    name: "Hampton Inn New York-JFK",
    location: "JFK Airport, NY",
    stars: 3,
    rating: 1.9,
    reviewCount: 690,
    facilities: ["WiFi", "Pool", "Restaurant"],
    rooms: [
      { name: "Standard Room", price: 611000, soldOut: false },
      { name: "Double Room", price: 877000, soldOut: false },
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80",
    isActive: true,
    totalBookings: 87,
    monthlyRevenue: 21300000,
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function formatRp(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
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

function HotelCard({
  hotel,
}: {
  hotel: Hotel;
}) {
  const [_menuOpen, _setMenuOpen] = useState(false);
  const soldOutCount = hotel.rooms.filter((r) => r.soldOut).length;

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              hotel.isActive
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {hotel.isActive ? "Active" : "Inactive"}
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
            ⭐ {hotel.rating}
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 mb-2">
          <MapPin size={11} />
          {hotel.location}
        </div>

        <StarRow count={hotel.stars} />

        <div className="flex flex-wrap gap-1.5 mt-2 mb-3">
          {hotel.facilities.map((f) => (
            <span
              key={f}
              className="text-xs bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-md"
            >
              {f}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
          <div className="text-center">
            <p className="text-xs text-slate-400">Rooms</p>
            <p className="font-semibold text-slate-700 text-sm">
              {hotel.rooms.length}
            </p>
          </div>
          <div className="text-center border-x border-slate-100">
            <p className="text-xs text-slate-400">Active</p>
            <p className="font-semibold text-slate-700 text-sm">
              {2}
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
        <Link to={"/hotel-config"}>
        <button
          // onClick={() => onConfigure(hotel.id)}
          className="w-full mt-3 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-800 hover:text-white hover:border-slate-800 transition-colors flex items-center justify-center gap-2"
        >
          <Settings2 size={15} /> Configure Hotel
        </button>
        
        </Link>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const OwnerPage = () => {
  const totalRevenue = MOCK_HOTELS.reduce(
    (sum, h) => sum + h.monthlyRevenue,
    0,
  );
  const totalBookings = MOCK_HOTELS.reduce(
    (sum, h) => sum + h.totalBookings,
    0,
  );

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
            to="/add-hotel"
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            <Plus size={16} /> Add Hotel
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Total Properties",
              value: MOCK_HOTELS.length,
              icon: <Building2 size={18} className="text-indigo-500" />,
            },
            {
              label: "Total Bookings",
              value: totalBookings,
              icon: <BedDouble size={18} className="text-emerald-500" />,
            },
            {
              label: "Monthly Revenue",
              value: formatRp(totalRevenue),
              icon: <TrendingUp size={18} className="text-amber-500" />,
            },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white border  rounded-2xl p-4 flex items-center gap-4"
            >
              <div className="p-2.5 rounded-xl">{s.icon}</div>
              <div>
                <p className="text-xs text-slate-400">{s.label}</p>
                <p className="font-bold text-slate-800 text-lg">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Hotel Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_HOTELS.map((h) => (
            <HotelCard key={h.id} hotel={h} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OwnerPage;
