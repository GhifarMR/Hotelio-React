import { useState } from "react";
import Navbar from "../Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type BookingStatus =
  | "pending"
  | "confirmed"
  | "checked_in"
  | "checked_out"
  | "cancelled";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  hotelName: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
  status: BookingStatus;
  bookedAt: string;
  specialRequest?: string;
}

type FilterStatus = "all" | BookingStatus;

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "BK-20260001",
    customerName: "Arya Permana",
    customerEmail: "arya.permana@gmail.com",
    customerPhone: "0812-9988-7766",
    hotelName: "Great Ghifar Hotel",
    roomType: "Deluxe Suite",
    roomNumber: "301",
    checkIn: "2026-06-10",
    checkOut: "2026-06-13",
    nights: 3,
    guests: 2,
    totalPrice: 4500000,
    status: "pending",
    bookedAt: "2026-06-07",
    specialRequest: "Late check-in around 11 PM, please keep the room ready.",
  },
  {
    id: "BK-20260002",
    customerName: "Maya Setiawati",
    customerEmail: "maya.s@outlook.com",
    customerPhone: "0878-1122-3344",
    hotelName: "Great Ghifar Hotel",
    roomType: "Standard Room",
    roomNumber: "105",
    checkIn: "2026-06-08",
    checkOut: "2026-06-10",
    nights: 2,
    guests: 1,
    totalPrice: 1800000,
    status: "confirmed",
    bookedAt: "2026-06-05",
  },
  {
    id: "BK-20260003",
    customerName: "Reza Firmansyah",
    customerEmail: "reza.f@yahoo.com",
    customerPhone: "0857-5566-7788",
    hotelName: "Hampton Inn New York-JFK",
    roomType: "Superior Room",
    roomNumber: "212",
    checkIn: "2026-06-07",
    checkOut: "2026-06-09",
    nights: 2,
    guests: 3,
    totalPrice: 2400000,
    status: "checked_in",
    bookedAt: "2026-06-01",
    specialRequest: "Extra bed needed for the third guest.",
  },
  {
    id: "BK-20260004",
    customerName: "Sinta Rahayu",
    customerEmail: "sinta.r@gmail.com",
    customerPhone: "0821-4433-5566",
    hotelName: "Great Ghifar Hotel",
    roomType: "Deluxe Suite",
    roomNumber: "302",
    checkIn: "2026-06-01",
    checkOut: "2026-06-04",
    nights: 3,
    guests: 2,
    totalPrice: 4500000,
    status: "checked_out",
    bookedAt: "2026-05-28",
  },
  {
    id: "BK-20260005",
    customerName: "Doni Pratama",
    customerEmail: "doni.p@gmail.com",
    customerPhone: "0813-7788-9900",
    hotelName: "Hampton Inn New York-JFK",
    roomType: "Standard Room",
    roomNumber: "110",
    checkIn: "2026-06-15",
    checkOut: "2026-06-17",
    nights: 2,
    guests: 2,
    totalPrice: 1600000,
    status: "pending",
    bookedAt: "2026-06-07",
  },
  {
    id: "BK-20260006",
    customerName: "Lina Kusuma",
    customerEmail: "lina.k@gmail.com",
    customerPhone: "0895-2233-4455",
    hotelName: "Great Ghifar Hotel",
    roomType: "Standard Room",
    roomNumber: "108",
    checkIn: "2026-06-20",
    checkOut: "2026-06-22",
    nights: 2,
    guests: 1,
    totalPrice: 1800000,
    status: "cancelled",
    bookedAt: "2026-06-06",
    specialRequest: "High floor room preferred.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const STATUS_CONFIG: Record<
  BookingStatus,
  { label: string; className: string; dotColor: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
    dotColor: "bg-amber-400",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border border-blue-200",
    dotColor: "bg-blue-400",
  },
  checked_in: {
    label: "Checked In",
    className: "bg-green-50 text-green-700 border border-green-200",
    dotColor: "bg-green-500",
  },
  checked_out: {
    label: "Checked Out",
    className: "bg-gray-100 text-gray-600 border border-gray-200",
    dotColor: "bg-gray-400",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border border-red-200",
    dotColor: "bg-red-400",
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: BookingStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${cfg.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotColor}`} />
      {cfg.label}
    </span>
  );
}

interface BookingCardProps {
  booking: Booking;
  onAction: (id: string, action: BookingStatus) => void;
}

function BookingCard({ booking, onAction }: BookingCardProps) {
  const [expanded, setExpanded] = useState(false);

  const initials = booking.customerName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-colors">
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#1a2744] flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm leading-tight">
                {booking.customerName}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{booking.id}</p>
            </div>
          </div>
          <StatusBadge status={booking.status} />
        </div>

        {/* Hotel & Room */}
        <div className="bg-gray-50 rounded-xl p-3 mb-3">
          <p className="text-xs text-gray-400 mb-1">Property</p>
          <p className="text-sm font-medium text-gray-800">
            {booking.hotelName}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {booking.roomType} · Room {booking.roomNumber}
          </p>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Check-in</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">
              {formatDate(booking.checkIn)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Check-out</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">
              {formatDate(booking.checkOut)}
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Duration</p>
            <p className="text-xs font-semibold text-gray-800 mt-0.5">
              {booking.nights}N · {booking.guests}G
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">Total</p>
          <p className="text-base font-bold text-gray-900">
            {formatRupiah(booking.totalPrice)}
          </p>
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Email</p>
                <p className="text-xs text-gray-700 break-all">
                  {booking.customerEmail}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Phone</p>
                <p className="text-xs text-gray-700">{booking.customerPhone}</p>
              </div>
            </div>
            {booking.specialRequest && (
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-1">
                  Special Request
                </p>
                <p className="text-xs text-blue-900">
                  {booking.specialRequest}
                </p>
              </div>
            )}
            <p className="text-xs text-gray-400">
              Booked on {formatDate(booking.bookedAt)}
            </p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/40">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors"
        >
          {expanded ? "Hide details" : "View details"}
        </button>

        <div className="flex gap-2">
          {booking.status === "pending" && (
            <>
              <button
                onClick={() => onAction(booking.id, "cancelled")}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Decline
              </button>
              <button
                onClick={() => onAction(booking.id, "confirmed")}
                className="px-3 py-1.5 text-xs font-medium text-white bg-[#1a2744] rounded-lg hover:bg-[#243460] transition-colors"
              >
                Confirm
              </button>
            </>
          )}
          {booking.status === "confirmed" && (
            <button
              onClick={() => onAction(booking.id, "checked_in")}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#1a2744] rounded-lg hover:bg-[#243460] transition-colors"
            >
              Mark Checked In
            </button>
          )}
          {booking.status === "checked_in" && (
            <button
              onClick={() => onAction(booking.id, "checked_out")}
              className="px-3 py-1.5 text-xs font-medium text-white bg-[#1a2744] rounded-lg hover:bg-[#243460] transition-colors"
            >
              Mark Checked Out
            </button>
          )}
          {(booking.status === "checked_out" ||
            booking.status === "cancelled") && (
            <span className="text-xs text-gray-400 italic">No actions</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const FILTER_TABS: { id: FilterStatus; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "confirmed", label: "Confirmed" },
  { id: "checked_in", label: "Checked In" },
  { id: "checked_out", label: "Checked Out" },
  { id: "cancelled", label: "Cancelled" },
];

const OwnerBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [activeFilter, setActiveFilter] = useState<FilterStatus>("all");
  const [selectedHotel, setSelectedHotel] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error";
  } | null>(null);

  // Derive unique hotel names owned by this account
  const myHotels = Array.from(new Set(MOCK_BOOKINGS.map((b) => b.hotelName)));

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleAction = (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)),
    );
    const messages: Partial<Record<BookingStatus, string>> = {
      confirmed: "Booking confirmed. The customer will be notified.",
      cancelled: "Booking declined.",
      checked_in: "Guest marked as checked in.",
      checked_out: "Guest marked as checked out.",
    };
    showToast(
      messages[newStatus] ?? "Updated.",
      newStatus === "cancelled" ? "error" : "success",
    );
  };

  const filtered = bookings.filter((b) => {
    const matchHotel = selectedHotel === "all" || b.hotelName === selectedHotel;
    const matchStatus = activeFilter === "all" || b.status === activeFilter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      b.customerName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.hotelName.toLowerCase().includes(q) ||
      b.roomType.toLowerCase().includes(q);
    return matchHotel && matchStatus && matchSearch;
  });

  // Scope of bookings for the selected hotel (for summary cards)
  const scopedBookings =
    selectedHotel === "all"
      ? bookings
      : bookings.filter((b) => b.hotelName === selectedHotel);

  // Summary counts — scoped to selected hotel
  const counts = {
    pending: scopedBookings.filter((b) => b.status === "pending").length,
    confirmed: scopedBookings.filter((b) => b.status === "confirmed").length,
    checked_in: scopedBookings.filter((b) => b.status === "checked_in").length,
    checked_out: scopedBookings.filter((b) => b.status === "checked_out")
      .length,
    cancelled: scopedBookings.filter((b) => b.status === "cancelled").length,
  };

  const totalRevenue = scopedBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const summaryCards = [
    { label: "Total Bookings", value: scopedBookings.length.toString() },
    { label: "Pending", value: counts.pending.toString() },
    { label: "Active Guests", value: counts.checked_in.toString() },
    { label: "Total Revenue", value: formatRupiah(totalRevenue) },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${
            toast.type === "success"
              ? "bg-[#1a2744] text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Booking Management
          </h1>
          <p className="text-gray-500 text-sm mb-5">
            Review and manage all incoming reservations
          </p>

          {/* Hotel Switcher */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide mr-1">
              Property
            </span>
            <button
              onClick={() => setSelectedHotel("all")}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                selectedHotel === "all"
                  ? "bg-[#1a2744] text-white border-[#1a2744]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
              }`}
            >
              All Hotels
              <span
                className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                  selectedHotel === "all"
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {bookings.length}
              </span>
            </button>
            {myHotels.map((hotel) => {
              const hotelCount = bookings.filter(
                (b) => b.hotelName === hotel,
              ).length;
              const hasPending = bookings.some(
                (b) => b.hotelName === hotel && b.status === "pending",
              );
              return (
                <button
                  key={hotel}
                  onClick={() => setSelectedHotel(hotel)}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedHotel === hotel
                      ? "bg-[#1a2744] text-white border-[#1a2744]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {hotel}
                  <span
                    className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                      selectedHotel === hotel
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {hotelCount}
                  </span>
                  {/* Pending dot indicator */}
                  {hasPending && selectedHotel !== hotel && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-gray-50" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary Cards — same style as "My Hotels" stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summaryCards.map(({ label, value }) => (
            <div
              key={label}
              className="bg-white border border-gray-200 rounded-2xl px-5 py-4"
            >
              <p className="text-sm text-gray-400">{label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1 tracking-tight">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Search + Filter Row */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, ID, hotel…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a2744]/20 focus:border-[#1a2744] placeholder-gray-400"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 overflow-x-auto">
            {FILTER_TABS.map((tab) => {
              const count =
                tab.id === "all"
                  ? bookings.length
                  : bookings.filter((b) => b.status === tab.id).length;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeFilter === tab.id
                      ? "bg-[#1a2744] text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-xs rounded-full px-1.5 py-0.5 leading-none ${
                      activeFilter === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Booking Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <p className="font-medium text-gray-600">No bookings found</p>
            <p className="text-sm text-gray-400 mt-1">
              Try adjusting the filter or search query.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onAction={handleAction}
              />
            ))}
          </div>
        )}

        {/* Results count */}
        {filtered.length > 0 && (
          <p className="text-xs text-gray-400 mt-6 text-center">
            Showing {filtered.length} of {bookings.length} bookings
          </p>
        )}
      </div>
    </div>
  );
};

export default OwnerBookingsPage;
