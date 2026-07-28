import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";

type BookingStatus = "pending" | "confirmed" | "cancelled";
type FilterStatus = "all" | BookingStatus;

interface Booking {
  id: number;
  booking_code: string;
  check_in: string;
  check_out: string;
  total_nights: number;
  total_price: string;
  status: BookingStatus;
  created_at: string;
  user: { id: number; name: string; email: string; phone: string };
  room: { id: number; name: string; hotel_id: number; hotel?: { name: string } };
}

function formatRupiah(amount: number | string) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(amount));
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_CONFIG: Record<BookingStatus, { label: string; className: string; dotColor: string }> = {
  pending: { label: "Pending", className: "bg-amber-50 text-amber-700 border border-amber-200", dotColor: "bg-amber-400" },
  confirmed: { label: "Confirmed", className: "bg-blue-50 text-blue-700 border border-blue-200", dotColor: "bg-blue-400" },
  cancelled: { label: "Cancelled", className: "bg-red-50 text-red-600 border border-red-200", dotColor: "bg-red-400" },
};

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  );
}

function BookingCard({ booking }: { booking: Booking }) {
  const [expanded, setExpanded] = useState(false);
  const initials = booking.user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">{booking.user.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">{booking.booking_code}</p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <p className="text-xs text-gray-400 mb-1">Room</p>
          <p className="text-sm font-medium text-gray-800">{booking.room.name}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Check-in</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{formatDate(booking.check_in)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Check-out</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{formatDate(booking.check_out)}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Nights</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">{booking.total_nights}N</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-base font-bold text-gray-900">{formatRupiah(booking.total_price)}</p>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-xs text-gray-700 break-all">{booking.user.email}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <p className="text-xs text-gray-700">{booking.user.phone}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400">Booked on {formatDate(booking.created_at)}</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/40">
        <button onClick={() => setExpanded(!expanded)} className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors">
          {expanded ? "Hide details" : "View details"}
        </button>
        <span className="text-xs text-gray-400 italic">Status ditentukan oleh sistem pembayaran</span>
      </div>
    </div>
  );
}

const FILTER_TABS: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "cancelled", label: "Cancelled" },
];

const OwnerBookingsPage = () => {
  const [hotels, setHotels] = useState<{ id: number; name: string }[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<number | "all">("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/owner/hotels").then((res) => setHotels(res.data.data.map((h: any) => ({ id: h.id, name: h.name }))));
  }, []);

  useEffect(() => {
    if (hotels.length === 0) {
      setBookings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const targets = selectedHotel === "all" ? hotels.map((h) => h.id) : [selectedHotel];

    Promise.all(targets.map((id) => api.get(`/owner/hotels/${id}/bookings`)))
      .then((results) => {
        const all = results.flatMap((r) => r.data.data);
        setBookings(all);
      })
      .finally(() => setLoading(false));
  }, [hotels, selectedHotel]);

  const filtered = bookings.filter((b) => {
    const matchStatus = activeFilter === "all" || b.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch = !q || b.user.name.toLowerCase().includes(q) || b.booking_code.toLowerCase().includes(q) || b.room.name.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };
  const totalRevenue = bookings.filter((b) => b.status === "confirmed").reduce((sum, b) => sum + Number(b.total_price), 0);

  const summaryCards = [
    { label: "Total Bookings", value: bookings.length.toString() },
    { label: "Pending", value: counts.pending.toString() },
    { label: "Confirmed", value: counts.confirmed.toString() },
    { label: "Total Revenue", value: formatRupiah(totalRevenue) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Booking Management</h1>
          <p className="text-gray-500 text-sm mb-5">Review all incoming reservations</p>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide mr-1">Property</span>
            <button onClick={() => setSelectedHotel("all")} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedHotel === "all" ? "bg-[#1a2744] text-white border-[#1a2744]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
              All Hotels
            </button>
            {hotels.map((h) => (
              <button key={h.id} onClick={() => setSelectedHotel(h.id)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${selectedHotel === h.id ? "bg-[#1a2744] text-white border-[#1a2744]" : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"}`}>
                {h.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryCards.map(({ label, value }) => (
            <div key={label} className="bg-white border border-gray-200 rounded-2xl px-5 py-4">
              <p className="text-sm text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text" placeholder="Search by name, code, room…" value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2744]/20 focus:border-[#1a2744] placeholder-gray-400"
            />
          </div>
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto">
            {FILTER_TABS.map((tab) => (
              <button key={tab.id} onClick={() => setActiveFilter(tab.id)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeFilter === tab.id ? "bg-[#1a2744] text-white shadow-sm" : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"}`}>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-400 py-10 justify-center"><Loader2 className="animate-spin" size={16} /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="font-medium text-gray-600">No bookings found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting the filter or search query.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookingsPage;