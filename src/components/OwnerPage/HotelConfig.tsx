import { useState, useEffect, useRef } from "react";
import {
  BedDouble, Save, ChevronLeft, AlertCircle, CheckCircle2, Pencil, X, Check, Loader2,
  Plus, Trash2, ImagePlus, Link2,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Link, useParams, useNavigate } from "@tanstack/react-router";
import Navbar from "../Navbar";
import api from "@/lib/axios";
import { ROOM_AMENITIES } from "@/constants/facilities";

interface ImageItem {
  id: string;
  kind: "file" | "url";
  file?: File;
  url?: string;
  preview: string;
  isPrimary: boolean;
}

interface Room {
  id: number;
  name: string;
  description: string;
  capacity: number;
  price_per_night: string;
  price_before: string | null;
  total_rooms: number;
  available_rooms: number;
  facilities: string[];
  is_active: boolean;
}

interface Hotel {
  id: number;
  name: string;
  city: string;
  province: string;
  status: "pending" | "approved" | "rejected";
  rooms: Room[];
}

function formatRp(n: number | string) {
  return "Rp " + Number(n).toLocaleString("id-ID");
}

function Toggle({
  value, onChange, labelOn = "On", labelOff = "Off", colorOn = "text-emerald-600",
}: {
  value: boolean; onChange: (v: boolean) => void; labelOn?: string; labelOff?: string; colorOn?: string;
}) {
  return (
    <div
      onClick={() => onChange(!value)}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors cursor-pointer select-none ${value ? colorOn : "text-slate-400"}`}
    >
      <Switch checked={value} className={value ? colorOn : "text-slate-300"} />
      <span>{value ? labelOn : labelOff}</span>
    </div>
  );
}

function PriceEditor({ label, value, onCommit }: { label: string; value: number; onCommit: (v: number) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const parsed = parseInt(draft.replace(/\D/g, ""), 10);
    if (!isNaN(parsed) && parsed >= 0) onCommit(parsed);
    setEditing(false);
  };

  return (
    <div>
      <Label className="text-xs text-slate-400 mb-1 block">{label}</Label>
      {editing ? (
        <div className="flex items-center gap-1">
          <span className="text-sm text-slate-400">Rp</span>
          <Input type="number" value={draft} onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
            autoFocus className="h-8 text-sm w-32" min="0" />
          <button onClick={commit} className="p-1 rounded-md hover:bg-emerald-50 text-emerald-600"><Check size={14} /></button>
          <button onClick={() => setEditing(false)} className="p-1 rounded-md hover:bg-red-50 text-red-400"><X size={14} /></button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-700">{formatRp(value)}</span>
          <button onClick={() => { setDraft(String(value)); setEditing(true); }} className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600">
            <Pencil size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Generic inline text/number editor (name, description, capacity) ───────

function TextEditor({
  label, value, onCommit, type = "text", multiline = false,
}: {
  label: string;
  value: string | number;
  onCommit: (v: string | number) => void;
  type?: "text" | "number";
  multiline?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    if (type === "number") {
      const parsed = parseInt(draft, 10);
      if (!isNaN(parsed) && parsed > 0) onCommit(parsed);
    } else {
      const trimmed = draft.trim();
      if (trimmed) onCommit(trimmed);
    }
    setEditing(false);
  };

  return (
    <div>
      <Label className="text-xs text-slate-400 mb-1 block">{label}</Label>
      {editing ? (
        <div className="flex items-start gap-1">
          {multiline ? (
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Escape") setEditing(false); }}
              autoFocus
              rows={2}
              className="text-sm border rounded-lg px-2 py-1 w-full resize-none focus:ring focus:ring-slate-200 outline-none"
            />
          ) : (
            <Input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") setEditing(false); }}
              autoFocus
              className="h-8 text-sm"
              min={type === "number" ? 1 : undefined}
            />
          )}
          <button onClick={commit} className="p-1 rounded-md hover:bg-emerald-50 text-emerald-600 shrink-0"><Check size={14} /></button>
          <button onClick={() => setEditing(false)} className="p-1 rounded-md hover:bg-red-50 text-red-400 shrink-0"><X size={14} /></button>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <span className="text-sm text-slate-700">{value}</span>
          <button onClick={() => { setDraft(String(value)); setEditing(true); }} className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-600 shrink-0">
            <Pencil size={13} />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Delete room, two-step confirm (no window.confirm) ─────────────────────

function DeleteRoomButton({ onConfirm }: { onConfirm: () => void }) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <span className="text-slate-500">Delete this room?</span>
        <button
          onClick={() => { onConfirm(); setConfirming(false); }}
          className="px-2 py-1 rounded-md bg-red-600 text-white font-medium hover:bg-red-700"
        >
          Yes, delete
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="px-2 py-1 rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors"
      title="Delete room"
    >
      <Trash2 size={15} />
    </button>
  );
}

// ─── Reusable Image Uploader (Upload OR Link) — same as AddHotel.tsx ───────

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

function RoomConfigRow({
  room, onFieldChange, onDelete,
}: {
  room: Room;
  onFieldChange: (id: number, field: string, value: any) => void;
  onDelete: (id: number) => void;
}) {
  const priceBefore = room.price_before ? Number(room.price_before) : 0;
  const priceNow = Number(room.price_per_night);
  const soldOut = room.available_rooms <= 0;
  const discount = priceBefore > 0 ? Math.round(((priceBefore - priceNow) / priceBefore) * 100) : 0;

  return (
    <div className={`border rounded-2xl p-5 transition-all ${soldOut ? "border-red-100 bg-red-50/40" : room.is_active ? "border-slate-100 bg-white" : "border-slate-100 bg-slate-50 opacity-60"}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 pr-4">
          <div className="flex items-center gap-2 flex-wrap">
            <TextEditor label="Room Name" value={room.name} onCommit={(v) => onFieldChange(room.id, "name", v)} />
            {soldOut && <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium h-fit">Sold Out</span>}
            {!room.is_active && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full h-fit">Hidden</span>}
            {discount > 0 && !soldOut && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium h-fit">{discount}% OFF</span>}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {room.available_rooms}/{room.total_rooms} available
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Toggle value={room.is_active} onChange={(v) => onFieldChange(room.id, "is_active", v)} labelOn="Visible" labelOff="Hidden" colorOn="text-emerald-600" />
          <DeleteRoomButton onConfirm={() => onDelete(room.id)} />
        </div>
      </div>

      <div className="mb-4 pt-4 border-t border-slate-100">
        <TextEditor
          label="Description"
          value={room.description}
          onCommit={(v) => onFieldChange(room.id, "description", v)}
          multiline
        />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-4">
        <PriceEditor label="Current Price / Night" value={priceNow} onCommit={(v) => onFieldChange(room.id, "price_per_night", v)} />
        <PriceEditor label="Original Price (strikethrough)" value={priceBefore} onCommit={(v) => onFieldChange(room.id, "price_before", v)} />
        <TextEditor
          label="Max Guests"
          value={room.capacity}
          type="number"
          onCommit={(v) => onFieldChange(room.id, "capacity", v)}
        />
        <div>
          <Label className="text-xs text-slate-400 mb-1 block">Total Rooms</Label>
          <Input
            type="number" min="0" defaultValue={room.total_rooms}
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (!isNaN(v) && v !== room.total_rooms) onFieldChange(room.id, "total_rooms", v);
            }}
            className="h-8 text-sm w-24"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {room.facilities.map((a) => (
          <span key={a} className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{a.replaceAll("_", " ")}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Add Room form (same pattern as AddHotel: images required, min 1) ──────

interface NewRoomDraft {
  name: string;
  description: string;
  priceNow: string;
  priceBefore: string;
  maxGuests: string;
  totalRooms: string;
  amenities: string[];
  images: ImageItem[];
}

const emptyDraft: NewRoomDraft = {
  name: "",
  description: "",
  priceNow: "",
  priceBefore: "",
  maxGuests: "",
  totalRooms: "",
  amenities: [],
  images: [],
};

function AddRoomForm({
  hotelId, onCreated,
}: {
  hotelId: number;
  onCreated: (room: Room) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<NewRoomDraft>(emptyDraft);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof NewRoomDraft, value: any) => {
  setDraft((prev) => ({ ...prev, [field]: value }));
  if (error) setError(null); // bersihin pesan error lama begitu user mulai benerin
};

  const toggleAmenity = (a: string) => {
  set("amenities", draft.amenities.includes(a)
    ? draft.amenities.filter((x) => x !== a)
    : [...draft.amenities, a]);
  // udah otomatis ke-handle karena manggil set()
};

const addImage = (item: ImageItem) => {
  set("images", [...draft.images, item]); // sama, udah lewat set()
};

  const removeImage = (id: string) => {
    const filtered = draft.images.filter((i) => i.id !== id);
    if (filtered.length > 0 && !filtered.some((i) => i.isPrimary)) filtered[0].isPrimary = true;
    set("images", filtered);
  };

  const setPrimaryImage = (id: string) =>
    set("images", draft.images.map((i) => ({ ...i, isPrimary: i.id === id })));

  const uploadImage = async (item: ImageItem, endpoints: { file: string; url: string }) => {
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

  const handleCreate = async () => {
    setError(null);
    if (!draft.name || !draft.description || !draft.priceNow || !draft.maxGuests || !draft.totalRooms) {
      setError("Please fill in all required fields.");
      return;
    }
    if (draft.images.length === 0) {
      setError("Add at least one room photo.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await api.post(`/hotels/${hotelId}/rooms`, {
        name: draft.name,
        description: draft.description,
        price_per_night: Number(draft.priceNow),
        price_before: draft.priceBefore ? Number(draft.priceBefore) : null,
        capacity: Number(draft.maxGuests),
        total_rooms: Number(draft.totalRooms),
        facilities: draft.amenities,
      });

      const roomId = res.data.room.id;

      for (const img of draft.images) {
        await uploadImage(img, {
          file: `/hotels/${hotelId}/rooms/${roomId}/images`,
          url: `/hotels/${hotelId}/rooms/${roomId}/images/url`,
        });
      }

      onCreated(res.data.room);
      setDraft(emptyDraft);
      setOpen(false);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to add room.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={16} />
        Add Room Type
      </button>
    );
  }

  return (
    <div className="border border-slate-200 rounded-2xl p-5 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-700">New Room Type</h3>
        <button onClick={() => { setOpen(false); setDraft(emptyDraft); setError(null); }} className="text-slate-400 hover:text-slate-600">
          <X size={16} />
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2 mb-3">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Room Name *</Label>
          <Input value={draft.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Superior King Room" />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Total Rooms *</Label>
          <Input type="number" value={draft.totalRooms} onChange={(e) => set("totalRooms", e.target.value)} placeholder="e.g. 5" min="1" />
        </div>
      </div>

      <div className="mb-3">
        <Label className="text-xs text-slate-500 mb-1 block">Description *</Label>
        <Input value={draft.description} onChange={(e) => set("description", e.target.value)} placeholder="Short description of this room" />
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Price / Night (Rp) *</Label>
          <Input type="number" value={draft.priceNow} onChange={(e) => set("priceNow", e.target.value)} placeholder="300000" min="0" />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Original Price (Rp)</Label>
          <Input type="number" value={draft.priceBefore} onChange={(e) => set("priceBefore", e.target.value)} placeholder="400000" min="0" />
        </div>
        <div>
          <Label className="text-xs text-slate-500 mb-1 block">Max Guests *</Label>
          <Input type="number" value={draft.maxGuests} onChange={(e) => set("maxGuests", e.target.value)} placeholder="2" min="1" />
        </div>
      </div>

      <div className="mb-4">
        <Label className="text-xs mb-2 block">Room Photos *</Label>
        <ImageUploader
          images={draft.images}
          onAdd={addImage}
          onRemove={removeImage}
          onSetPrimary={setPrimaryImage}
          small
        />
      </div>

      <div className="mb-4">
        <Label className="text-xs mb-2 block">Room Amenities</Label>
        <div className="flex flex-wrap gap-2">
          {ROOM_AMENITIES.map((a) => (
            <button
              key={a.value}
              type="button"
              onClick={() => toggleAmenity(a.value)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                draft.amenities.includes(a.value)
                  ? "bg-red-900 text-white"
                  : "bg-white border-slate-200 hover:border-slate-300"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleCreate}
        disabled={submitting}
        className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-700 disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? <Loader2 className="animate-spin" size={16} /> : <><ImagePlus size={15} /> Create Room</>}
      </button>
    </div>
  );
}

const HotelConfig = () => {
  const { hotelId } = useParams({ from: "/owner/hotels/$hotelId" });
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Record<number, Record<string, any>>>({});
  const navigate = useNavigate();

  const fetchHotel = () => {
    setLoading(true);
    api.get(`/owner/hotels/${hotelId}`).then((res) => setHotel(res.data)).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  const handleFieldChange = (roomId: number, field: string, value: any) => {
    setHotel((prev) => prev ? { ...prev, rooms: prev.rooms.map((r) => r.id === roomId ? { ...r, [field]: value } : r) } : prev);
    setPendingChanges((prev) => ({ ...prev, [roomId]: { ...prev[roomId], [field]: value } }));
  };

  const handleRoomCreated = (room: Room) => {
    setHotel((prev) => prev ? { ...prev, rooms: [...prev.rooms, room] } : prev);
  };

  const handleDeleteRoom = async (roomId: number) => {
    if (!hotel) return;
    const prevRooms = hotel.rooms;
    setHotel((prev) => prev ? { ...prev, rooms: prev.rooms.filter((r) => r.id !== roomId) } : prev);
    setPendingChanges((prev) => {
      const { [roomId]: _, ...rest } = prev;
      return rest;
    });
    try {
      await api.delete(`/hotels/${hotel.id}/rooms/${roomId}`);
    } catch (err) {
      console.log(err);
      setHotel((prev) => prev ? { ...prev, rooms: prevRooms } : prev);
      setSaveError("Failed to delete room. Please try again.");
      setTimeout(() => setSaveError(null), 4000);
    }
  };

  const handleSave = async () => {
    if (!hotel) return;
    setSaveError(null);
    const entries = Object.entries(pendingChanges);
    if (entries.length === 0) {
      setSaveError("No changes to save.");
      setTimeout(() => setSaveError(null), 3000);
      return;
    }

    setSaving(true);
    try {
      await Promise.all(
        entries.map(([roomId, changes]) =>
          api.put(`/hotels/${hotel.id}/rooms/${roomId}`, changes),
        ),
      );
      setPendingChanges({});
      setSaved(true);
      fetchHotel();
      setTimeout(() => {
        setSaved(false);
        navigate({ to: "/owner" });
      }, 1200);
    } catch (err: any) {
      console.log(err);
      setSaveError(err.response?.data?.message ?? "Failed to save changes. Please try again.");
      setTimeout(() => setSaveError(null), 4000);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !hotel) {
    return (
      <div className="min-h-screen font-sans">
        <div className="sticky top-0 z-50"><Navbar /></div>
        <div className="max-w-3xl mx-auto px-6 py-8 flex items-center gap-2 text-slate-400 text-sm">
          <Loader2 className="animate-spin" size={16} /> Loading...
        </div>
      </div>
    );
  }

  const allSoldOut = hotel.rooms.every((r) => r.available_rooms <= 0);
  const availableCount = hotel.rooms.filter((r) => r.available_rooms > 0 && r.is_active).length;

  return (
    <div className="min-h-screen font-sans">
      <div className="sticky top-0 z-50"><Navbar /></div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/owner" className="p-2 rounded-xl hover:bg-white border border-transparent hover:border-slate-100 transition-colors text-slate-400 hover:text-slate-600">
            <ChevronLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">{hotel.name}</h1>
            <p className="text-xs">{hotel.city}, {hotel.province}</p>
          </div>
          <div className="ml-auto">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              hotel.status === "approved" ? "bg-green-100 text-green-700" :
              hotel.status === "pending" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            }`}>
              {hotel.status.charAt(0).toUpperCase() + hotel.status.slice(1)}
            </span>
          </div>
        </div>

        {allSoldOut && hotel.rooms.length > 0 && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            All rooms are marked as sold out. Your hotel won't appear in search results.
          </div>
        )}

        {saved && (
          <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <CheckCircle2 size={16} className="shrink-0" />
            Configuration saved successfully!
          </div>
        )}

        {saveError && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
            <AlertCircle size={16} className="shrink-0" />
            {saveError}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Total Rooms", value: hotel.rooms.length, color: "text-slate-700" },
            { label: "Available", value: availableCount, color: "text-emerald-600" },
            { label: "Sold Out", value: hotel.rooms.filter((r) => r.available_rooms <= 0).length, color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-slate-100 rounded-xl p-4 text-center">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <BedDouble size={16} /> Room Configuration
          </div>
          {hotel.rooms.length === 0 && (
            <p className="text-sm text-slate-400 mb-1">No room types yet. Add one below.</p>
          )}
          {hotel.rooms.map((room) => (
            <RoomConfigRow key={room.id} room={room} onFieldChange={handleFieldChange} onDelete={handleDeleteRoom} />
          ))}

          <AddRoomForm hotelId={hotel.id} onCreated={handleRoomCreated} />
        </div>

        <div className="flex justify-end gap-3">
          <Link to="/owner" className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 hover:bg-slate-100 transition-colors">
            Back
          </Link>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 disabled:opacity-60 transition-colors"
          >
            {saving ? <Loader2 className="animate-spin" size={15} /> : <Save size={15} />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelConfig;