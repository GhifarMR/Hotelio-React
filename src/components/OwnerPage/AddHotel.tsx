import {
  Building,
  MapPin,
  Armchair,
  ClipboardList,
  Plus,
  Trash2,
  DoorOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import NavbarOwner from "./NavbarOwner";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";

// ─── Types ───────────────────────────────────────────────────────────────────

const ROOM_AMENITIES = [
  "King Bed",
  "Twin Bed",
  "Double Bed",
  "AC",
  "Hot Shower",
  "Bathtub",
  "TV",
  "Mini Bar",
  "Safe",
  "Balcony",
  "Breakfast",
  "Workspace",
];

const HOTEL_FACILITIES = [
  "WiFi",
  "Swimming Pool",
  "Restaurant",
  "Parking",
  "Gym / Fitness",
  "Spa",
  "Room Service",
  "Business Center",
  "Kids Club",
  "Laundry",
  "Airport Shuttle",
  "Pet Friendly",
];

interface Room {
  id: string;
  name: string;
  size: string;
  priceNow: string;
  priceBefore: string;
  maxGuests: string;
  amenities: string[];
}

interface HotelForm {
  name: string;
  stars: number;
  phone: string;
  email: string;
  description: string;
  address: string;
  city: string;
  province: string;
  country: string;
  landmarks: string;
  facilities: string[];
  checkinTime: string;
  checkoutTime: string;
  cancellationPolicy: string;
  minAge: string;
  policyNotes: string;
  rooms: Room[];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function AmenityTag({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors cursor-pointer ${
        active
          ? "bg-red-900 text-white"
          : "bg-white border-slate-200 hover:border-slate-300"
      }`}
    >
      {label}
    </button>
  );
}

function RoomCard({
  room,
  index,
  onChange,
  onRemove,
}: {
  room: Room;
  index: number;
  onChange: (updated: Room) => void;
  onRemove: () => void;
}) {
  const set = (field: keyof Room, value: string | string[]) =>
    onChange({ ...room, [field]: value });

  const toggleAmenity = (a: string) => {
    const next = room.amenities.includes(a)
      ? room.amenities.filter((x) => x !== a)
      : [...room.amenities, a];
    set("amenities", next);
  };

  return (
    <div className="border border-slate-100 rounded-xl p-4 mb-3">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-medium bg-blue-950 text-white px-2.5 py-1 rounded-full">
          Room #{index + 1}
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded-md transition-colors"
        >
          <Trash2 size={15} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            Room Name *
          </Label>
          <Input
            value={room.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="e.g. Superior King Room"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            Room Size (m²)
          </Label>
          <Input
            type="number"
            value={room.size}
            onChange={(e) => set("size", e.target.value)}
            placeholder="e.g. 28"
            min="1"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            Price / Night (Rp) *
          </Label>
          <Input
            type="number"
            value={room.priceNow}
            onChange={(e) => set("priceNow", e.target.value)}
            placeholder="300000"
            min="0"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            Original Price (Rp)
          </Label>
          <Input
            type="number"
            value={room.priceBefore}
            onChange={(e) => set("priceBefore", e.target.value)}
            placeholder="400000"
            min="0"
          />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">
            Max Guests
          </Label>
          <Input
            type="number"
            value={room.maxGuests}
            onChange={(e) => set("maxGuests", e.target.value)}
            placeholder="2"
            min="1"
          />
        </div>
      </div>

      <div>
        <Label className="text-xs  mb-2 block">
          Room Amenities
        </Label>
        <div className="flex flex-wrap gap-2">
          {ROOM_AMENITIES.map((a) => (
            <AmenityTag
              key={a}
              label={a}
              active={room.amenities.includes(a)}
              onClick={() => toggleAmenity(a)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MapEmbed({ query }: { query: string }) {
  if (!query || query.trim().length < 6) {
    return (
      <div className="w-full h-48 rounded-xl border border-slate-100 bg-slate-50 flex flex-col items-center justify-center gap-2 text-slate-400">
        <MapPin size={28} />
        <span className="text-sm">Map will appear after entering address</span>
      </div>
    );
  }
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&z=15`;
  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-100">
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: "none" }}
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        title="Hotel location map"
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AddHotel = () => {
  const [form, setForm] = useState<HotelForm>({
    name: "",
    stars: 0,
    phone: "",
    email: "",
    description: "",
    address: "",
    city: "",
    province: "",
    country: "Indonesia",
    landmarks: "",
    facilities: [],
    checkinTime: "14:00",
    checkoutTime: "12:00",
    cancellationPolicy: "Non-refundable",
    minAge: "18",
    policyNotes: "",
    rooms: [],
  });

  // Debounced map query
  const mapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mapQuery, setMapQuery] = useState("");

  const setField = <K extends keyof HotelForm>(key: K, value: HotelForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const triggerMapUpdate = useCallback(
    (name: string, address: string, city: string) => {
      if (mapTimerRef.current) clearTimeout(mapTimerRef.current);
      mapTimerRef.current = setTimeout(() => {
        const q = [name, address, city].filter(Boolean).join(", ");
        if (q.length > 5) setMapQuery(q);
      }, 900);
    },
    [],
  );

  const handleLocationField = (
    field: "name" | "address" | "city",
    value: string,
  ) => {
    setField(field, value);
    const next = {
      name: form.name,
      address: form.address,
      city: form.city,
      [field]: value,
    };
    triggerMapUpdate(next.name, next.address, next.city);
  };

  const toggleFacility = (f: string) => {
    setField(
      "facilities",
      form.facilities.includes(f)
        ? form.facilities.filter((x) => x !== f)
        : [...form.facilities, f],
    );
  };

  const addRoom = () => {
    const newRoom: Room = {
      id: crypto.randomUUID(),
      name: "",
      size: "",
      priceNow: "",
      priceBefore: "",
      maxGuests: "",
      amenities: [],
    };
    setField("rooms", [...form.rooms, newRoom]);
  };

  const updateRoom = (id: string, updated: Room) => {
    setField(
      "rooms",
      form.rooms.map((r) => (r.id === id ? updated : r)),
    );
  };

  const removeRoom = (id: string) => {
    setField(
      "rooms",
      form.rooms.filter((r) => r.id !== id),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel form data:", form);
    // TODO: submit to backend via Inertia router.post() or axios
  };

  return (
    <div>
      <div className="sticky top-0 z-50">
        <NavbarOwner />
      </div>

      <form onSubmit={handleSubmit} className="min-h-screen font-sans">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          {/* ── Basic Information ── */}
          <Card>
            <CardHeader>
              <Building size={22} />
              <h2 className="text-xl font-bold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <Label className="text-sm mb-1 block">Hotel Name *</Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      handleLocationField("name", e.target.value)
                    }
                    placeholder="e.g. The Grand Horizon"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">Phone Number *</Label>
                  <Input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    placeholder="+62 812 3456 7890"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Email Address</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    placeholder="info@hotel.com"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm mb-1 block">Short Description</Label>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  placeholder="A brief description of your hotel..."
                  rows={3}
                  className="w-full p-3 rounded-xl border focus:ring focus:ring-gray-200 outline-none text-sm resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Location ── */}
          <Card>
            <CardHeader>
              <MapPin size={22} />
              <h2 className="text-xl font-bold">Location</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm mb-1 block">Full Address *</Label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    handleLocationField("address", e.target.value)
                  }
                  placeholder="e.g. Jl. Sudirman No. 1, Jakarta Pusat"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">City *</Label>
                  <Input
                    value={form.city}
                    onChange={(e) =>
                      handleLocationField("city", e.target.value)
                    }
                    placeholder="e.g. Jakarta"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Province</Label>
                  <Input
                    value={form.province}
                    onChange={(e) => setField("province", e.target.value)}
                    placeholder="e.g. DKI Jakarta"
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Country</Label>
                  <select
                    value={form.country}
                    onChange={(e) => setField("country", e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  >
                    {[
                      "Indonesia",
                      "United States",
                      "Singapore",
                      "Malaysia",
                      "Australia",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  Nearby Landmarks{" "}
                  <span className="text-xs">(comma separated)</span>
                </Label>
                <Input
                  value={form.landmarks}
                  onChange={(e) => setField("landmarks", e.target.value)}
                  placeholder="e.g. Bundaran HI, Grand Indonesia Mall"
                />
              </div>

              <div>
                <Label className="text-sm mb-1 block">
                  Map Preview{" "}
                  <span className="text-xs">
                    — updates automatically as you fill in the address
                  </span>
                </Label>
                <MapEmbed query={mapQuery} />
              </div>
            </CardContent>
          </Card>

          {/* ── Facilities ── */}
          <Card>
            <CardHeader>
              <Armchair size={22} />
              <h2 className="text-xl font-bold">Facilities</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {HOTEL_FACILITIES.map((f) => (
                  <label
                    key={f}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.facilities.includes(f)}
                      onChange={() => toggleFacility(f)}
                      className="rounded"
                    />
                    {f}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ── Rooms ── */}
          <Card>
            <CardHeader>
              <DoorOpen size={22} />
              <h2 className="text-xl font-bold">Rooms</h2>
            </CardHeader>
            <CardContent>
              {form.rooms.length === 0 && (
                <p className="text-sm text-slate-400 mb-3">
                  No room types added yet. Click below to add one.
                </p>
              )}

              {form.rooms.map((room, i) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  index={i}
                  onChange={(updated) => updateRoom(room.id, updated)}
                  onRemove={() => removeRoom(room.id)}
                />
              ))}

              <Button
                type="button"
                onClick={addRoom}
                className="w-full py-3 border-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} />
                Add Room Type
              </Button>
            </CardContent>
          </Card>

          {/* ── Policies ── */}
          <Card>
            <CardHeader>
              <ClipboardList size={22} />
              <h2 className="text-xl font-bold ">Policies</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">Check-in Time</Label>
                  <Input
                    type="time"
                    value={form.checkinTime}
                    onChange={(e) => setField("checkinTime", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Check-out Time</Label>
                  <Input
                    type="time"
                    value={form.checkoutTime}
                    onChange={(e) => setField("checkoutTime", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">
                    Cancellation Policy
                  </Label>
                  <select
                    value={form.cancellationPolicy}
                    onChange={(e) =>
                      setField("cancellationPolicy", e.target.value)
                    }
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                  >
                    {[
                      "Non-refundable",
                      "Free cancellation 24h before",
                      "Free cancellation 48h before",
                      "Free cancellation 7 days before",
                    ].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-sm  mb-1 block">
                    Min. Age to Book
                  </Label>
                  <Input
                    type="number"
                    value={form.minAge}
                    onChange={(e) => setField("minAge", e.target.value)}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm mb-1 block">Additional Notes</Label>
                <textarea
                  value={form.policyNotes}
                  onChange={(e) => setField("policyNotes", e.target.value)}
                  placeholder="e.g. Valid government ID required. No smoking in rooms."
                  rows={2}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-gray-200 outline-none text-sm resize-none"
                />
              </div>
            </CardContent>
          </Card>

          {/* ── Submit ── */}
          <div className="flex justify-end gap-3 pb-10">
            <Link to={"/owner-dashboard"}>
              <Button
                type="button"
                variant="outline"
                className="px-6 cursor-pointer"
              >
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="px-8 cursor-pointer">
              Publish Hotel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
