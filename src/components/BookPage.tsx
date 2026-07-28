import { useState, useEffect } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Calendar, Receipt, ShieldCheck, User } from "lucide-react";
import Navbar from "./Navbar";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Field } from "@/components/ui/field";
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
        }
      ) => void;
    };
  }
}

interface RoomDetail {
  id: number;
  name: string;
  price_per_night: number;
}

interface HotelDetail {
  id: number;
  name: string;
  rooms: RoomDetail[];
}

interface BookingResponse {
  message: string;
  booking: {
    id: number;
    booking_code: string;
    check_in: string;
    check_out: string;
    total_nights: number;
    total_price: string;
    status: string;
  };
  snap_token: string;
}

const MIDTRANS_SNAP_URL = "https://app.sandbox.midtrans.com/snap/snap.js"; // switch to production URL when going live
const MIDTRANS_CLIENT_KEY = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

const BookPage: React.FC = () => {
  const navigate = useNavigate();
  const { hotelId, roomId, checkIn: initialCheckIn, checkOut: initialCheckOut } =
    useSearch({ from: "/book" });

  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [room, setRoom] = useState<RoomDetail | null>(null);
  const [fetchingRoom, setFetchingRoom] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [checkIn, setCheckIn] = useState(initialCheckIn ?? "");
  const [checkOut, setCheckOut] = useState(initialCheckOut ?? "");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load room + hotel details automatically from hotelId/roomId in the URL
  useEffect(() => {
    if (!hotelId || !roomId) {
      setFetchError("Missing hotel or room reference.");
      setFetchingRoom(false);
      return;
    }

    let cancelled = false;

    const fetchDetail = async () => {
      setFetchingRoom(true);
      setFetchError(null);
      try {
        const res = await axios.get(`/hotels/${hotelId}`);
        const data: HotelDetail = res.data?.data ?? res.data;
        const matchedRoom = data.rooms?.find((r) => String(r.id) === String(roomId));

        if (!matchedRoom) {
          if (!cancelled) setFetchError("Room not found.");
          return;
        }

        if (!cancelled) {
          setHotel(data);
          setRoom(matchedRoom);
        }
      } catch {
        if (!cancelled) setFetchError("Failed to load room details.");
      } finally {
        if (!cancelled) setFetchingRoom(false);
      }
    };

    fetchDetail();

    return () => {
      cancelled = true;
    };
  }, [hotelId, roomId]);

  // Load the Midtrans Snap script once
  useEffect(() => {
    if (document.querySelector(`script[src="${MIDTRANS_SNAP_URL}"]`)) return;

    const script = document.createElement("script");
    script.src = MIDTRANS_SNAP_URL;
    script.setAttribute("data-client-key", MIDTRANS_CLIENT_KEY);
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // keep the script loaded across navigations; no cleanup needed
    };
  }, []);

  const nights =
    checkIn && checkOut
      ? Math.max(
          1,
          Math.round(
            (new Date(checkOut).getTime() - new Date(checkIn).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  const pricePerNight = room?.price_per_night ?? 0;
  const roomTotal = nights * pricePerNight;
  const tax = Math.round(roomTotal * 0.11);
  const grandTotal = roomTotal + tax;

  const handleBooking = async () => {
    if (!room) {
      setError("Room data is not loaded yet.");
      return;
    }
    if (!checkIn || !checkOut) {
      setError("Please choose check-in and check-out dates.");
      return;
    }
    if (!agreed) {
      setError("You need to accept the terms and conditions first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post<BookingResponse>("/bookings", {
        room_id: room.id,
        check_in: checkIn,
        check_out: checkOut,
      });

      window.snap.pay(data.snap_token, {
        onSuccess: () => {
          navigate({
            to: "/bookings/$id",
            params: { id: String(data.booking.id) },
            search: { status: "processing" },
          });
        },
        onPending: () => {
          navigate({
            to: "/bookings/$id",
            params: { id: String(data.booking.id) },
            search: { status: "pending" },
          });
        },
        onError: () => {
          setError("Payment failed, please try again.");
        },
        onClose: () => {
          setError("Payment was cancelled. Your booking is saved as pending.");
        },
      });
    } catch (err: any) {
      const message =
        err?.response?.data?.message ?? "Failed to create the booking, please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingRoom) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading booking details...
      </div>
    );
  }

  if (fetchError || !room || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        {fetchError ?? "Unable to load this booking."}
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 my-10">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Booking Contact — read-only, pulled from the logged-in user's profile */}
          <Card>
            <CardHeader>
              <User size={24} />
              <h2 className="text-xl font-bold text-slate-800">
                Booking Contact
              </h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  disabled
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  disabled
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  disabled
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                This information comes from your account. Update it from your profile page if anything is wrong.
              </p>
            </CardContent>
          </Card>

          {/* Dates — only shown if not already provided via search params */}
          <Card>
            <CardHeader>
              <Calendar size={24} />
              <h2 className="text-xl font-bold text-slate-800">Dates</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Check-in</label>
                  <Input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">Check-out</label>
                  <Input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Payment — Midtrans handles everything, no manual card form */}
          <Card>
            <CardHeader>
              <Receipt size={24} />
              <h2 className="text-xl font-bold text-slate-800">Payment</h2>
              <p className="text-sm text-slate-500">
                You'll be redirected to Midtrans' secure payment page after clicking the button below.
              </p>
            </CardHeader>
          </Card>

          {/* 3. Accommodation Policies */}
          <Card>
            <CardHeader>
              <ShieldCheck size={24} />
              <h2 className="text-xl font-bold text-slate-800">Policies</h2>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2 list-disc pl-5">
                <li>Check-in: 2:00 PM | Check-out: 12:00 PM</li>
                <li>Cancellation: Non-refundable for this rate.</li>
                <li>No pets allowed.</li>
                <li>Valid ID is required upon arrival.</li>
              </ul>

              <Field className="mt-4" orientation="horizontal">
                <Checkbox
                  id="terms-checkbox"
                  checked={agreed}
                  onCheckedChange={(v) => setAgreed(Boolean(v))}
                />
                <Label htmlFor="terms-checkbox" className="text-red-800">
                  Accept terms and conditions
                </Label>
              </Field>

              {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <aside className="bg-white p-6 rounded-2xl shadow-sm border md:min-w-100 border-slate-100 fixed">
            <div className="flex items-center gap-3 mb-6">
              <Calendar size={20} />
              <h2 className="text-lg font-bold">Reservation</h2>
            </div>

            <div className="mb-6 pb-6 border-slate-100 border-b">
              <p className="font-bold">{hotel.name}</p>
              <p className="text-sm text-slate-500">{room.name}</p>
              <p className="text-sm">
                {nights > 0
                  ? `${nights} Nights (${checkIn} - ${checkOut})`
                  : "Choose your dates"}
              </p>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Receipt size={20} />
              <h2 className="text-lg font-bold">Price Details</h2>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Room x {nights} Nights</span>
                <span className="font-medium">
                  Rp {roomTotal.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees</span>
                <span className="font-medium">
                  Rp {tax.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold">
                <span>Total Price</span>
                <span>Rp {grandTotal.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <Button
              className="w-full mt-8 cursor-pointer"
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Processing..." : "Complete Booking"}
            </Button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BookPage;