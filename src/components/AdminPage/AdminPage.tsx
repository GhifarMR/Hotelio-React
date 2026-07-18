import { useState } from "react";
import Navbar from "../Navbar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Status = "pending" | "approved" | "rejected";
type TabId = "overview" | "hotels" | "partners";
type ToastType = "success" | "error";

interface Hotel {
  id: number;
  name: string;
  owner: string;
  email: string;
  location: string;
  category: string;
  rooms: number;
  images: number;
  submittedAt: string;
  status: Status;
}

interface PartnerRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  hotelCount: number;
  submittedAt: string;
  message: string;
  status: Status;
}

interface StatItem {
  label: string;
  value: string;
  change: string;
}

interface Toast {
  msg: string;
  type: ToastType;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const PENDING_HOTELS: Hotel[] = [
  {
    id: 1,
    name: "The Grand Bandung",
    owner: "Rizky Pratama",
    email: "rizky@thegrandbandung.com",
    location: "Bandung, West Java",
    category: "4-Star",
    rooms: 85,
    submittedAt: "2026-06-05",
    images: 12,
    status: "pending",
  },
  {
    id: 2,
    name: "Villa Sunrise Ubud",
    owner: "Made Wijaya",
    email: "made@villasunrise.com",
    location: "Ubud, Bali",
    category: "Villa",
    rooms: 10,
    submittedAt: "2026-06-04",
    images: 18,
    status: "pending",
  },
  {
    id: 3,
    name: "Harbour Stay Surabaya",
    owner: "Dewi Santoso",
    email: "dewi@harbourstay.co.id",
    location: "Surabaya, East Java",
    category: "3-Star",
    rooms: 60,
    submittedAt: "2026-06-03",
    images: 9,
    status: "pending",
  },
];

const PARTNER_REQUESTS: PartnerRequest[] = [
  {
    id: 1,
    name: "Sari Kusuma",
    email: "sari.kusuma@gmail.com",
    phone: "0812-3456-7890",
    businessName: "Kusuma Property Group",
    hotelCount: 3,
    submittedAt: "2026-06-06",
    message: "I own 3 properties in Yogyakarta and would like to join Hotelio as a partner.",
    status: "pending",
  },
  {
    id: 2,
    name: "Budi Hartono",
    email: "budi.h@propertindo.com",
    phone: "0878-9012-3456",
    businessName: "Propertindo Nusantara",
    hotelCount: 7,
    submittedAt: "2026-06-05",
    message: "Our company manages 7 hotels across Central Java and we're interested in listing on the Hotelio platform.",
    status: "pending",
  },
  {
    id: 3,
    name: "Anita Wahyuni",
    email: "anita@nusalodge.com",
    phone: "0857-1234-5678",
    businessName: "Nusa Lodge Collection",
    hotelCount: 2,
    submittedAt: "2026-06-02",
    message: "We have 2 boutique lodges in Lombok that we'd like to promote through Hotelio.",
    status: "pending",
  },
];

const STATS: StatItem[] = [
  { label: "Total Hotels",    value: "1,284",  change: "+12 this month"  },
  { label: "Active Partners", value: "348",    change: "+5 this week"    },
  { label: "Pending Review",  value: "6",      change: "3 hotels · 3 partners" },
  { label: "Total Users",     value: "28,451", change: "+240 this week"  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, change }: StatItem) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <p className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full w-fit mb-3">
        {change}
      </p>
      <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    pending:  "bg-amber-50 text-amber-700 border border-amber-200",
    approved: "bg-green-50 text-green-700 border border-green-200",
    rejected: "bg-red-50 text-red-700 border border-red-200",
  };
  const labels: Record<Status, string> = {
    pending:  "Pending",
    approved: "Approved",
    rejected: "Rejected",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

interface HotelCardProps {
  hotel: Hotel;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

function HotelReviewCard({ hotel, onApprove, onReject }: HotelCardProps) {
  const [expanded, setExpanded] = useState(false);

  const details = [
    { label: "Owner",  val: hotel.owner  },
    { label: "Rooms",  val: hotel.rooms  },
    { label: "Photos", val: hotel.images },
  ];

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-base">{hotel.name}</h3>
              <StatusBadge status={hotel.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {hotel.location} · {hotel.category}
            </p>
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">{hotel.submittedAt}</p>
        </div>

        <div className="mt-4  flex-cols-3 gap-3">
          {details.map(({ label, val }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400">{label}</p>
              <p className="text-sm font-medium text-gray-700 truncate">{val}</p>
            </div>
          ))}
        </div>

        {expanded && (
          <div className="mt-3 bg-blue-50 rounded-xl p-3">
            <p className="text-xs text-blue-600 font-medium mb-1">Owner Contact</p>
            <p className="text-sm text-blue-800">{hotel.email}</p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onReject(hotel.id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(hotel.id)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

interface PartnerCardProps {
  req: PartnerRequest;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

function PartnerRequestCard({ req, onApprove, onReject }: PartnerCardProps) {
  const [expanded, setExpanded] = useState(false);
  const initials = req.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-gray-900 text-sm">{req.name}</h3>
                <StatusBadge status={req.status} />
              </div>
              <p className="text-xs text-gray-500">{req.businessName}</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 whitespace-nowrap">{req.submittedAt}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-xs font-medium text-gray-700 truncate">{req.email}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400">Properties</p>
            <p className="text-sm font-medium text-gray-700">{req.hotelCount}</p>
          </div>
        </div>

        {expanded && (
          <div className="mt-3 space-y-2">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-400 mb-1">Phone</p>
              <p className="text-sm text-gray-700">{req.phone}</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3">
              <p className="text-xs text-blue-600 font-medium mb-1">Message</p>
              <p className="text-sm text-blue-900">{req.message}</p>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100 px-5 py-3 flex items-center justify-between bg-gray-50/50">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2"
        >
          {expanded ? "Hide details" : "View details"}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onReject(req.id)}
            className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            Reject
          </button>
          <button
            onClick={() => onApprove(req.id)}
            className="px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ message, sub }: { message: string; sub: string }) {
  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="font-medium text-gray-700">{message}</p>
      <p className="text-sm text-gray-400 mt-1">{sub}</p>
    </div>
  );
}

// ─── Main AdminPage ───────────────────────────────────────────────────────────

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab]   = useState<TabId>("overview");
  const [hotels, setHotels]         = useState<Hotel[]>(PENDING_HOTELS);
  const [partners, setPartners]     = useState<PartnerRequest[]>(PARTNER_REQUESTS);
  const [toast, setToast]           = useState<Toast | null>(null);

  const showToast = (msg: string, type: ToastType) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleHotelAction = (id: number, action: "approve" | "reject") => {
    setHotels((prev) => prev.filter((h) => h.id !== id));
    showToast(
      action === "approve"
        ? "Hotel approved and published."
        : "Hotel rejected. The owner will be notified.",
      action === "approve" ? "success" : "error"
    );
  };

  const handlePartnerAction = (id: number, action: "approve" | "reject") => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
    showToast(
      action === "approve"
        ? "Partner account activated."
        : "Partner request rejected.",
      action === "approve" ? "success" : "error"
    );
  };

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "hotels",   label: hotels.length   > 0 ? `Hotel Review (${hotels.length})`   : "Hotel Review"   },
    { id: "partners", label: partners.length > 0 ? `Partners (${partners.length})`     : "Partners"       },
  ];

  const roleCards = [
    {
      role: "Customer",
      color: "bg-purple-50 border-purple-100",
      textColor: "text-purple-700",
      desc: "Browse and book hotels. Can leave reviews and save favourites.",
    },
    {
      role: "Owner",
      color: "bg-blue-50 border-blue-100",
      textColor: "text-blue-700",
      desc: "Register and manage hotel listings. Requires admin approval before going live.",
    },
    {
      role: "Admin",
      color: "bg-red-50 border-red-100",
      textColor: "text-red-700",
      desc: "Manage the entire platform: review hotels, accept partners, and moderate content.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Toast */}
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

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 mb-8 shadow-sm w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((s) => (
                <StatCard key={s.label} {...s} />
              ))}
            </div>

            {/* Needs Attention */}
            <div>
              <h2 className="text-base font-semibold text-gray-800 mb-4">Needs Attention</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {hotels.length > 0 && (
                  <div
                    onClick={() => setActiveTab("hotels")}
                    className="bg-white border rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-amber-700">Hotels Awaiting Review</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{hotels.length}</p>
                        <p className="text-xs text-gray-400 mt-1">Click to review</p>
                      </div>
                      
                    </div>
                  </div>
                )}
                {partners.length > 0 && (
                  <div
                    onClick={() => setActiveTab("partners")}
                    className="bg-white border  rounded-2xl p-5 cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">New Partner Requests</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">{partners.length}</p>
                        <p className="text-xs text-gray-400 mt-1">Click to review</p>
                      </div>
                      
                    </div>
                  </div>
                )}
                {hotels.length === 0 && partners.length === 0 && (
                  <div className="col-span-2 bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                      <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-green-700 font-medium">All clear!</p>
                    <p className="text-green-600 text-sm mt-1">Nothing pending review right now.</p>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        )}

        {/* ── Hotel Review ── */}
        {activeTab === "hotels" && (
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900">Hotel Review</h2>
              <p className="text-sm text-gray-500">
                {hotels.length} {hotels.length === 1 ? "hotel" : "hotels"} awaiting approval
              </p>
            </div>
            {hotels.length === 0 ? (
              <EmptyState
                message="All hotels have been reviewed."
                sub="No hotels are currently awaiting review."
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel) => (
                  <HotelReviewCard
                    key={hotel.id}
                    hotel={hotel}
                    onApprove={(id) => handleHotelAction(id, "approve")}
                    onReject={(id) => handleHotelAction(id, "reject")}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Partners ── */}
        {activeTab === "partners" && (
          <div>
            <div className="mb-6">
              <h2 className="text-base font-semibold text-gray-900">Partner Requests</h2>
              <p className="text-sm text-gray-500">
                {partners.length} {partners.length === 1 ? "request" : "requests"} awaiting review
              </p>
            </div>
            {partners.length === 0 ? (
              <EmptyState
                message="All partner requests have been processed."
                sub="No partner requests are currently pending."
              />
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {partners.map((req) => (
                  <PartnerRequestCard
                    key={req.id}
                    req={req}
                    onApprove={(id) => handlePartnerAction(id, "approve")}
                    onReject={(id) => handlePartnerAction(id, "reject")}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPage;