import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from "react";
import {
  Loader2, Search, Calendar, Users, User, CreditCard, ChevronDown,
  CheckCircle2, XCircle, Clock, BadgeCheck, AlertCircle,
} from "lucide-react";

import api from "@/lib/axios";
import Navbar from '@/components/Navbar';

export const Route = createFileRoute('/owner/bookings')({
  component: RouteComponent,
})

// ─── Types (SESUAIKAN dengan shape asli BookingController kamu) ────────────

interface Booking {
  id: number;
  hotel: { id: number; name: string };
  room: { id: number; name: string };
  user: { id: number; name: string; email: string };
  check_in: string;
  check_out: string;
  guests: number;
  total_price: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  payment_status: "pending" | "paid" | "failed";
  created_at: string;
}

function formatRp(n: number | string) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function nights(checkIn: string, checkOut: string) {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

// ─── Badges ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Booking["status"] }) {
  const map = {
    pending: { label: "Pending", cls: "bg-amber-100 text-amber-700", icon: Clock },
    confirmed: { label: "Confirmed", cls: "bg-blue-100 text-blue-700", icon: BadgeCheck },
    completed: { label: "Completed", cls: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
    cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-700", icon: XCircle },
  }[status];
  const Icon = map.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${map.cls}`}>
      <Icon size={12} /> {map.label}
    </span>
  );
}

function PaymentBadge({ status }: { status: Booking["payment_status"] }) {
  const map = {
    pending: { label: "Awaiting Payment", cls: "bg-slate-100 text-slate-500" },
    paid: { label: "Paid", cls: "bg-emerald-50 text-emerald-600" },
    failed: { label: "Payment Failed", cls: "bg-red-50 text-red-500" },
  }[status];
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${map.cls}`}>
      <CreditCard size={11} /> {map.label}
    </span>
  );
}

// ─── Booking Card ────────────────────────────────────────────────────────

function BookingCard({
  booking, onUpdateStatus,
}: {
  booking: Booking;
  onUpdateStatus: (id: number, status: Booking["status"]) => void;
}) {
  const [updating, setUpdating] = useState(false);

  const runAction = async (status: Booking["status"]) => {
    setUpdating(true);
    await onUpdateStatus(booking.id, status);
    setUpdating(false);
  };

  return (
    <div className="border border-slate-100 rounded-2xl p-5 bg-white">
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="font-semibold text-slate-800">{booking.hotel.name}</h3>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">{booking.room.name}</span>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <StatusBadge status={booking.status} />
            <PaymentBadge status={booking.payment_status} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Total</p>
          <p className="text-lg font-bold text-slate-800">{formatRp(booking.total_price)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-slate-100">
        <div className="flex items-start gap-2">
          <User size={15} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Guest</p>
            <p className="text-sm font-medium text-slate-700">{booking.user.name}</p>
            <p className="text-xs text-slate-400">{booking.user.email}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Calendar size={15} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Stay</p>
            <p className="text-sm font-medium text-slate-700">
              {formatDate(booking.check_in)} – {formatDate(booking.check_out)}
            </p>
            <p className="text-xs text-slate-400">{nights(booking.check_in, booking.check_out)} night(s)</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Users size={15} className="text-slate-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-slate-400">Guests</p>
            <p className="text-sm font-medium text-slate-700">{booking.guests} orang</p>
          </div>
        </div>
      </div>

      {booking.status === "pending" && (
        <div className="flex gap-2 pt-3 border-t border-slate-100">
          <button
            onClick={() => runAction("confirmed")}
            disabled={updating}
            className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {updating ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
            Confirm Booking
          </button>
          <button
            onClick={() => runAction("cancelled")}
            disabled={updating}
            className="flex-1 py-2 rounded-xl border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            <XCircle size={14} />
            Reject
          </button>
        </div>
      )}

      {booking.status === "confirmed" && (
        <div className="pt-3 border-t border-slate-100">
          <button
            onClick={() => runAction("completed")}
            disabled={updating}
            className="w-full py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {updating ? <Loader2 className="animate-spin" size={14} /> : <CheckCircle2 size={14} />}
            Mark as Completed
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────

const TABS: { key: "all" | Booking["status"]; label: string }[] = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

function RouteComponent() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<typeof TABS[number]["key"]>("all");
  const [search, setSearch] = useState("");
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchBookings = () => {
    setLoading(true);
    api.get("/owner/bookings")
      .then((res) => setBookings(res.data.bookings ?? res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: number, status: Booking["status"]) => {
    setActionError(null);
    const prev = bookings;
    setBookings((b) => b.map((x) => (x.id === id ? { ...x, status } : x)));
    try {
      await api.put(`/owner/bookings/${id}/status`, { status });
    } catch (err: any) {
      setBookings(prev); // rollback
      setActionError(err.response?.data?.message ?? "Failed to update booking status.");
      setTimeout(() => setActionError(null), 4000);
    }
  };

  const filtered = bookings
    .filter((b) => activeTab === "all" || b.status === activeTab)
    .filter((b) => {
      const q = search.toLowerCase();
      if (!q) return true;
      return (
        b.user.name.toLowerCase().includes(q) ||
        b.hotel.name.toLowerCase().includes(q) ||
        b.room.name.toLowerCase().includes(q)
      );
    });

  const counts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0 z-50"><Navbar /></div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-xl font-bold">Bookings</h1>
          <p className="text-sm text-slate-400">Kelola transaksi booking dari customer.</p>
        </div>

        {actionError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            {actionError}
          </div>
        )}

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guest, hotel, or room..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
                activeTab === t.key
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              {t.label} <span className="opacity-60">({counts[t.key]})</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm py-10 justify-center">
            <Loader2 className="animate-spin" size={16} /> Loading bookings...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">
            No bookings found{search ? ` for "${search}"` : ""}.
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <BookingCard key={b.id} booking={b} onUpdateStatus={handleUpdateStatus} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}