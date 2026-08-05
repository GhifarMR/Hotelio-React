import { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { Calendar, MapPin, Receipt, Clock } from "lucide-react";
import Navbar from "./Navbar";
import { Button } from "./ui/button";
import axios from "@/lib/axios";

declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
    };
  }
}

interface BookingDetail {
  id: number;
  booking_code: string;
  check_in: string;
  check_out: string;
  total_nights: number;
  total_price: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  room: {
    id: number;
    name: string;
    hotel: { id: number; name: string; city: string };
  };
}

const STATUS_LABEL: Record<string, string> = {
  pending: "Waiting for Payment",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-blue-100 text-blue-700",
};

const MIDTRANS_SNAP_URL = "https://app.sandbox.midtrans.com/snap/snap.js";
const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

const BookingDetailPage = () => {
  const { id } = useParams({ from: "/bookings/$id" });
  const navigate = useNavigate();

  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payingAgain, setPayingAgain] = useState(false);

  const fetchBooking = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get<BookingDetail>(`/bookings/${id}`);
      setBooking(data);
    } catch {
      setError("Failed to load this booking.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  useEffect(() => {
    if (document.querySelector(`script[src="${MIDTRANS_SNAP_URL}"]`)) return;
    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_URL;
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleCancel = async () => {
    if (!booking || !confirm("Cancel this booking?")) return;
    try {
      await axios.put(`/bookings/${booking.id}/cancel`);
      fetchBooking();
    } catch {
      alert("Failed to cancel this booking, please try again.");
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading booking...</div>;
  }

  if (error || !booking) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">{error ?? "Booking not found."}</div>;
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0 z-40"><Navbar /></div>

      <div className="max-w-2xl mx-auto my-10 px-4">
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="font-bold text-xl">{booking.room.hotel.name}</p>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <MapPin size={14} /> {booking.room.hotel.city}
              </p>
            </div>
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_STYLES[booking.status]}`}>
              {STATUS_LABEL[booking.status]}
            </span>
          </div>

          <div className="space-y-3 text-sm border-t border-b border-slate-100 py-4 mb-4">
            <div className="flex items-center gap-2 text-slate-600">
              <Calendar size={16} />
              {booking.check_in} - {booking.check_out} ({booking.total_nights} nights)
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Receipt size={16} />
              {booking.room.name} · {booking.booking_code}
            </div>
          </div>

          <div className="flex justify-between items-center text-lg font-bold mb-6">
            <span>Total Price</span>
            <span>Rp {Number(booking.total_price).toLocaleString("id-ID")}</span>
          </div>

          {booking.status === "pending" && (
            <div className="space-y-3">
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <Clock size={14} /> Waiting for your payment confirmation. This may take a moment if you already paid.
              </p>
              <div className="flex gap-3">
                <Button
                  className="flex-1"
                  disabled={payingAgain}
                  onClick={async () => {
                    // Re-fetch a fresh snap token by re-creating the booking flow isn't ideal;
                    // for now this button simply refreshes booking status.
                    setPayingAgain(true);
                    await fetchBooking();
                    setPayingAgain(false);
                  }}
                >
                  {payingAgain ? "Checking..." : "Refresh Status"}
                </Button>
                <Button variant="outline" className="text-red-600 border-red-200" onClick={handleCancel}>
                  Cancel Booking
                </Button>
              </div>
            </div>
          )}

          {booking.status !== "pending" && (
            <Button variant="outline" className="w-full" onClick={() => navigate({ to: "/orders" })}>
              Back to My Orders
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;