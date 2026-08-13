import {
  Building,
  MapPin,
  Armchair,
  Plus,
  Trash2,
  DoorOpen,
  Loader2,
  ImagePlus,
  Link2,
  X,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import Navbar from "../Navbar";
import api from "@/lib/axios";
import { HOTEL_FACILITIES, ROOM_AMENITIES } from "@/constants/facilities";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImageItem {
  id: string;
  kind: "file" | "url";
  file?: File;
  url?: string;
  preview: string;
  isPrimary: boolean;
}

interface Room {
  id: string;
  name: string;
  description: string;
  priceNow: string;
  priceBefore: string;
  maxGuests: string;
  totalRooms: string;
  amenities: string[];
  images: ImageItem[];
}

interface HotelForm {
  name: string;
  stars: number;
  description: string;
  address: string;
  city: string;
  province: string;
  facilities: string[];
  rooms: Room[];
}

// ─── Reusable Image Uploader (Upload OR Link) ──────────────────────────────────

function ImageUploader({
  images,
  onAdd,
  onRemove,
  onSetPrimary,
  small = false,
}: {
  images: ImageItem[];
  onAdd: (item: ImageItem) => void;
  onRemove: (id: string) => void;
  onSetPrimary: (id: string) => void;
  small?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<"upload" | "link">("upload");
  const [urlDraft, setUrlDraft] = useState("");
  const boxSize = small ? "h-20" : "h-24";

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      onAdd({
        id: crypto.randomUUID(),
        kind: "file",
        file,
        preview: URL.createObjectURL(file),
        isPrimary: images.length === 0,
      });
    });
  };

  const handleAddUrl = () => {
    if (!urlDraft.trim()) return;
    onAdd({
      id: crypto.randomUUID(),
      kind: "url",
      url: urlDraft.trim(),
      preview: urlDraft.trim(),
      isPrimary: images.length === 0,
    });
    setUrlDraft("");
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
            mode === "upload"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          <ImagePlus size={12} /> Upload
        </button>
        <button
          type="button"
          onClick={() => setMode("link")}
          className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1 ${
            mode === "link"
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white border-slate-200 text-slate-500"
          }`}
        >
          <Link2 size={12} /> Link
        </button>
      </div>

      {mode === "link" && (
        <div className="flex gap-2 mb-3">
          <Input
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="text-sm"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="text-xs px-3 rounded-lg bg-slate-900 text-white shrink-0"
          >
            Add
          </button>
        </div>
      )}

      <div
        className={`grid ${small ? "grid-cols-4" : "grid-cols-3 sm:grid-cols-4"} gap-2 mb-2`}
      >
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.preview}
              alt="preview"
              className={`w-full ${boxSize} object-cover rounded-xl border-2 ${
                img.isPrimary ? "border-slate-900" : "border-transparent"
              }`}
            />
            <button
              type="button"
              onClick={() => onRemove(img.id)}
              className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={12} />
            </button>
            <button
              type="button"
              onClick={() => onSetPrimary(img.id)}
              className={`absolute bottom-1 left-1 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                img.isPrimary
                  ? "bg-slate-900 text-white"
                  : "bg-white/80 text-slate-600 opacity-0 group-hover:opacity-100"
              } transition-opacity`}
            >
              {img.isPrimary ? "Primary" : "Set primary"}
            </button>
          </div>
        ))}

        {mode === "upload" && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`${boxSize} rounded-xl border-2 border-dashed border-slate-200 hover:border-slate-300 flex flex-col items-center justify-center text-slate-400 gap-1 transition-colors`}
          >
            <ImagePlus size={16} />
            <span className="text-[10px]">Add photo</span>
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        hidden
        onChange={(e) => {
          if (e.target.files) handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <p className="text-xs text-slate-400">
        {mode === "upload"
          ? "JPG, PNG, or WebP. Max 4MB each."
          : "Paste a direct image URL."}
      </p>
    </div>
  );
}

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

// ─── Room Card ──────────────────────────────────────────────────────────────

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
  const set = (field: keyof Room, value: any) =>
    onChange({ ...room, [field]: value });

  const toggleAmenity = (a: string) => {
    const next = room.amenities.includes(a)
      ? room.amenities.filter((x) => x !== a)
      : [...room.amenities, a];
    set("amenities", next);
  };

  const addImage = (item: ImageItem) => {
    const merged = [...room.images, item];
    set("images", merged);
  };

  const removeImage = (id: string) => {
    const filtered = room.images.filter((i) => i.id !== id);
    if (filtered.length > 0 && !filtered.some((i) => i.isPrimary))
      filtered[0].isPrimary = true;
    set("images", filtered);
  };

  const setPrimaryImage = (id: string) => {
    set(
      "images",
      room.images.map((i) => ({ ...i, isPrimary: i.id === id })),
    );
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
            Total Rooms *
          </Label>
          <Input
            type="number"
            value={room.totalRooms}
            onChange={(e) => set("totalRooms", e.target.value)}
            placeholder="e.g. 5"
            min="1"
          />
        </div>
      </div>

      <div className="mb-3">
        <Label className="text-xs text-slate-500 mb-1 block">
          Description *
        </Label>
        <Input
          value={room.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Short description of this room"
        />
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
            Max Guests *
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

      <div className="mb-3">
        <Label className="text-xs mb-2 block">Room Photos</Label>
        <ImageUploader
          images={room.images}
          onAdd={addImage}
          onRemove={removeImage}
          onSetPrimary={setPrimaryImage}
          small
        />
      </div>

      <div>
        <Label className="text-xs mb-2 block">Room Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {ROOM_AMENITIES.map((a) => (
            <AmenityTag
              key={a.value}
              label={a.label}
              active={room.amenities.includes(a.value)}
              onClick={() => toggleAmenity(a.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Map Preview (debounced, no API key needed) ────────────────────────────

function MapPreview({
  address,
  city,
  province,
}: {
  address: string;
  city: string;
  province: string;
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const full = [address, city, province].filter(Boolean).join(", ");
    const handle = setTimeout(() => setQuery(full), 600); // debounce, sama pola kayak explore filter
    return () => clearTimeout(handle);
  }, [address, city, province]);

  if (!query.trim()) {
    return (
      <div className="w-full h-48 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-sm text-slate-400">
        Fill address, city and province to display a preview
      </div>
    );
  }

  return (
    <div className="w-full h-48 rounded-xl overflow-hidden border border-slate-200">
      <iframe
        title="Location preview"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const AddHotel = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<HotelForm>({
    name: "",
    stars: 3,
    description: "",
    address: "",
    city: "",
    province: "",
    facilities: [],
    rooms: [],
  });

  const [hotelImages, setHotelImages] = useState<ImageItem[]>([]);

  const setField = <K extends keyof HotelForm>(key: K, value: HotelForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFacility = (f: string) => {
    setField(
      "facilities",
      form.facilities.includes(f)
        ? form.facilities.filter((x) => x !== f)
        : [...form.facilities, f],
    );
  };

  const addHotelImage = (item: ImageItem) => {
    setHotelImages((prev) => [...prev, item]);
  };

  const removeHotelImage = (id: string) => {
    setHotelImages((prev) => {
      const filtered = prev.filter((i) => i.id !== id);
      if (filtered.length > 0 && !filtered.some((i) => i.isPrimary))
        filtered[0].isPrimary = true;
      return filtered;
    });
  };

  const setHotelPrimaryImage = (id: string) => {
    setHotelImages((prev) =>
      prev.map((i) => ({ ...i, isPrimary: i.id === id })),
    );
  };

  function addRoom() {
    const newRoom: Room = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      priceNow: "",
      priceBefore: "",
      maxGuests: "",
      totalRooms: "",
      amenities: [],
      images: [],
    };
    setForm((prev) => ({ ...prev, rooms: [...prev.rooms, newRoom] }));
  }

  const updateRoom = (id: string, updated: Room) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.map((r) => (r.id === id ? updated : r)),
    }));
  };

  const removeRoom = (id: string) => {
    setForm((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((r) => r.id !== id),
    }));
  };

  const uploadImage = async (
    item: ImageItem,
    endpoints: { file: string; url: string },
  ) => {
    if (item.kind === "file" && item.file) {
      const fd = new FormData();
      fd.append("image", item.file);
      fd.append("is_primary", item.isPrimary ? "1" : "0");
      await api.post(endpoints.file, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } else if (item.kind === "url" && item.url) {
      await api.post(endpoints.url, {
        image_url: item.url,
        is_primary: item.isPrimary,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    console.log("STARS: " + form.stars);

    if (!form.name || !form.address || !form.city || !form.province) {
      setError("Please fill in all required hotel fields.");
      return;
    }
    if (form.rooms.length === 0) {
      setError("Add at least one room type.");
      return;
    }
    for (const room of form.rooms) {
      if (
        !room.name ||
        !room.description ||
        !room.priceNow ||
        !room.maxGuests ||
        !room.totalRooms
      ) {
        setError(
          `Room "${room.name || "#" + (form.rooms.indexOf(room) + 1)}" has missing required fields.`,
        );
        return;
      }
    }

    setSubmitting(true);
    try {
      const hotelRes = await api.post("/hotels", {
        name: form.name,
        description: form.description,
        address: form.address,
        city: form.city,
        province: form.province,
        latitude: 0,
        longitude: 0,
        stars: form.stars,
        facilities: form.facilities,
      });

      const hotelId = hotelRes.data.hotel.id;

      for (const img of hotelImages) {
        await uploadImage(img, {
          file: `/hotels/${hotelId}/images`,
          url: `/hotels/${hotelId}/images/url`,
        });
      }

      for (const room of form.rooms) {
        const roomRes = await api.post(`/hotels/${hotelId}/rooms`, {
          name: room.name,
          description: room.description,
          price_per_night: Number(room.priceNow),
          price_before: room.priceBefore ? Number(room.priceBefore) : null,
          capacity: Number(room.maxGuests),
          total_rooms: Number(room.totalRooms),
          facilities: room.amenities,
        });

        const roomId = roomRes.data.room.id;

        for (const img of room.images) {
          await uploadImage(img, {
            file: `/hotels/${hotelId}/rooms/${roomId}/images`,
            url: `/hotels/${hotelId}/rooms/${roomId}/images/url`,
          });
        }
      }

      navigate({ to: "/owner" });
    } catch (err: any) {
      console.log(err);
      setError(
        err.response?.data?.message ??
          "Failed to create hotel. Please check the form again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      <form onSubmit={handleSubmit} className="min-h-screen font-sans">
        <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <Card>
            <CardHeader>
              <Building size={22} />
              <h2 className="text-xl font-bold">Basic Information</h2>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm mb-1 block">Hotel Name *</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="e.g. The Grand Horizon"
                  required
                />
              </div>

              <div>
                <Label className="text-sm mb-1 block">Star Rating *</Label>
                <select
                  value={form.stars}
                  onChange={(e) => setField("stars", Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>
                      {s} Star
                    </option>
                  ))}
                </select>
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

              <div>
                <Label className="text-sm mb-2 block">Hotel Photos</Label>
                <ImageUploader
                  images={hotelImages}
                  onAdd={addHotelImage}
                  onRemove={removeHotelImage}
                  onSetPrimary={setHotelPrimaryImage}
                />
              </div>
            </CardContent>
          </Card>

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
                  onChange={(e) => setField("address", e.target.value)}
                  placeholder="e.g. Jl. Sudirman No. 1, Jakarta Pusat"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm mb-1 block">City *</Label>
                  <Input
                    value={form.city}
                    onChange={(e) => setField("city", e.target.value)}
                    placeholder="e.g. Jakarta"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm mb-1 block">Province *</Label>
                  <Input
                    value={form.province}
                    onChange={(e) => setField("province", e.target.value)}
                    placeholder="e.g. DKI Jakarta"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-sm mb-2 block">Location Preview</Label>
                <MapPreview
                  address={form.address}
                  city={form.city}
                  province={form.province}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Armchair size={22} />
              <h2 className="text-xl font-bold">Facilities</h2>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {HOTEL_FACILITIES.map((f) => (
                  <label
                    key={f.value}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.facilities.includes(f.value)}
                      onChange={() => toggleFacility(f.value)}
                      className="rounded"
                    />
                    {f.label}
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

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

              <button
                type="button"
                onClick={addRoom}
                className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={16} />
                Add Room Type
              </button>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pb-10">
            <Link to="/owner">
              <button
                type="button"
                className="px-6 py-2 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 disabled:opacity-60 flex items-center gap-2"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                "Publish Hotel"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
