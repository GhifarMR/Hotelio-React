import { useState, useEffect } from "react";
import Navbar from "../Navbar";
import api from "@/lib/axios";
import { Loader2, AlertCircle, MapPin, Star, BedDouble, Mail } from "lucide-react";

// ─── Types (sesuai shape dari pendingList() + Hotel model) ─────────────────

interface Owner {
  id: number;
  name: string;
  email: string;
}

interface PrimaryImage {
  id: number;
  image_url: string;
  is_primary: boolean;
}

interface Hotel {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  status: "pending" | "approved" | "rejected";
  stars: number;
  facilities: string[];
  created_at: string;
  owner: Owner | null;
  primary_image: PrimaryImage | null;
  rooms_count: number;
}

interface PaginatedResponse {
  data: Hotel[];
  current_page: number;
  last_page: number;
  total: number;
}

type ToastType = "success" | "error";
interface Toast {
  msg: string;
  type: ToastType;
}

function resolveImageUrl(path: string | undefined | null) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${api.defaults.baseURL?.replace("/api", "")}/storage/${path}`;
}

// ─── Reject reason inline form ──────────────────────────────────────────────

function RejectAction({ onConfirm }: { onConfirm: (reason: string) => void }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");

  if (open) {
    return (
      <div className="flex flex-col gap-2 w-full">
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Alasan penolakan (wajib diisi)..."
          rows={2}
          autoFocus
          className="text-xs border border-slate-200 rounded-lg px-2 py-1.5 resize-none focus:ring focus:ring-red-100 outline-none"
        />
        <div className="flex gap-2">
          <button
            onClick={() => {
              if (!reason.trim()) return;
              onConfirm(reason.trim());
              setOpen(false);
              setReason("");
            }}
            disabled={!reason.trim()}
            className="flex-1 px-3 py-1.5 text-xs font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            Confirm Reject
          </button>
          <button
            onClick={() => { setOpen(false); setReason(""); }}
            className="px-3 py-1.5 text-xs font-medium text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setOpen(true)}
      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
    >
      Reject
    </button>
  );
}

// ─── Hotel Review Card ──────────────────────────────────────────────────────

function HotelReviewCard({
  hotel, onApprove, onReject,
}: {
  hotel: Hotel;
  onApprove: (id: number) => void;
  onReject: (id: number, reason: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const imageUrl = resolveImageUrl(hotel.primary_image?.image_url);

  const handleApprove = async () => {
    setBusy(true);
    await onApprove(hotel.id);
    setBusy(false);
  };

  const handleReject = async (reason: string) => {
    setBusy(true);
    await onReject(hotel.id, reason);
    setBusy(false);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="h-36 bg-gray-100">
        {imageUrl ? (
          <img src={imageUrl} alt={hotel.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">
            No photo
          </div>
        )}
      </div>

      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-base truncate">{hotel.name}</h3>
            <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
              <MapPin size={13} /> {hotel.city}, {hotel.province}
            </p>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">
            {new Date(hotel.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })}
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 flex items-center gap-1"><Star size={11} /> Stars</p>
            <p className="text-sm font-medium text-gray-700">{hotel.stars}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 flex items-center gap-1"><BedDouble size={11} /> Rooms</p>
            <p className="text-sm font-medium text-gray-700">{hotel.rooms_count}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3 col-span-1">
            <p className="text-xs text-gray-400">Owner</p>
            <p className="text-sm font-medium text-gray-700 truncate">{hotel.owner?.name ?? "-"}</p>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2">
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-medium mb-1 flex items-center gap-1">
                <Mail size={11} /> Owner Contact
              </p>
              <p className="text-sm text-blue-800">{hotel.owner?.email ?? "-"}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Address</p>
              <p className="text-sm text-gray-700">{hotel.address}</p>
            </div>
            {hotel.description && (
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400 mb-1">Description</p>
                <p className="text-sm text-gray-700">{hotel.description}</p>
              </div>
            )}
            {hotel.facilities.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {hotel.facilities.map((f) => (
                  <span key={f} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md">
                    {f.replaceAll("_", " ")}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/50 gap-2">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2 shrink-0"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
        {busy ? (
          <Loader2 className="animate-spin text-gray-400" size={16} />
        ) : (
          <div className="flex gap-2 flex-1 justify-end">
            <RejectAction onConfirm={handleReject} />
            <button
              onClick={handleApprove}
              className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors h-fit"
            >
              Approve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-medium text-gray-700">All clear!</p>
      <p className="text-sm text-gray-400 mt-1">No hotels are currently awaiting review.</p>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);

  const fetchPending = () => {
    setLoading(true);
    api.get<PaginatedResponse>("/admin/hotels/pending")
      .then((res) => setHotels(res.data.data))
      .catch((err) => {
        console.log(err);
        showToast("Failed to load pending hotels.", "error");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleApprove = async (id: number) => {
    try {
      await api.put(`/hotels/${id}/status`, { status: "approved" });
      setHotels((prev) => prev.filter((h) => h.id !== id));
      showToast("Hotel approved and published.", "success");
    } catch (err: any) {
      showToast(err.response?.data?.message ?? "Failed to approve hotel.", "error");
    }
  };

  const handleReject = async (id: number, reason: string) => {
    try {
      await api.put(`/hotels/${id}/status`, { status: "rejected", reason });
      setHotels((prev) => prev.filter((h) => h.id !== id));
      showToast("Hotel rejected. The owner will be notified.", "success");
    } catch (err: any) {
      showToast(err.response?.data?.message ?? "Failed to reject hotel.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${
            toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-900">Hotel Review</h2>
          <p className="text-sm text-gray-500">
            {loading ? "Loading..." : `${hotels.length} ${hotels.length === 1 ? "hotel" : "hotels"} awaiting approval`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-gray-400 text-sm py-16 justify-center">
            <Loader2 className="animate-spin" size={16} /> Loading pending hotels...
          </div>
        ) : hotels.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotels.map((hotel) => (
              <HotelReviewCard
                key={hotel.id}
                hotel={hotel}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;