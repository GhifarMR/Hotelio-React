import { useState, useEffect } from "react";
import { useParams, Link } from "@tanstack/react-router";
import api from "@/lib/axios"; // adjust to your axios instance

import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";
import SearchSheet from "./SearchBox/SearchSheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star, Wifi, Wind, Utensils, Phone, Car, Waves } from "lucide-react";

// ─── HELPERS ─────────────────────────────────────────────────────────────

const facilityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi size={18} />,
  swimming_pool: <Waves size={18} />,
  restaurant: <Utensils size={18} />,
  parking: <Car size={18} />,
  gym: <Wind size={18} />,
  spa: <Wind size={18} />,
  room_service: <Phone size={18} />,
  business_center: <Wind size={18} />,
  kids_club: <Wind size={18} />,
  laundry: <Wind size={18} />,
  airport_shuttle: <Car size={18} />,
  pet_friendly: <Wind size={18} />,
};

const facilityLabels: Record<string, string> = {
  wifi: "WiFi",
  swimming_pool: "Swimming Pool",
  restaurant: "Restaurant",
  parking: "Parking",
  gym: "Gym / Fitness",
  spa: "Spa",
  room_service: "Room Service",
  business_center: "Business Center",
  kids_club: "Kids Club",
  laundry: "Laundry",
  airport_shuttle: "Airport Shuttle",
  pet_friendly: "Pet Friendly",
};

// Builds a usable <img src> from whatever the backend sends.
// Handles absolute URLs, relative storage paths, and missing values.
const getImageUrl = (url?: string | null) => {
  if (!url) return "https://placehold.co/800x600?text=No+Image";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  const base = import.meta.env.VITE_API_URL ?? "";
  return `${base}/storage/${url}`;
};

// Defensive extractor: some APIs return `image_url`, others `url` or `path`.
const extractImageUrl = (img: unknown): string | null => {
  if (!img || typeof img !== "object") return null;
  const obj = img as Record<string, unknown>;
  const candidate = obj.image_url ?? obj.url ?? obj.path ?? null;
  return typeof candidate === "string" ? candidate : null;
};

const formatRupiah = (n: number) => `Rp. ${Number(n).toLocaleString("id")}`;

// ─── TYPES (adjust to match your actual HotelResource) ────────────────────

type HotelImage = { id: number; image_url: string; is_primary: boolean };
type Room = {
  id: number;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  facilities: string[];
  available_rooms: number;
  images: HotelImage[];
};
type Review = {
  id: number;
  rating: number;
  comment: string;
  user: { name: string };
};
type HotelDetail = {
  id: number;
  name: string;
  address: string;
  city: string;
  description?: string;
  rating_avg: number;
  facilities: string[];
  images: HotelImage[];
  rooms: Room[];
  reviewsList: Review[]; // ← berubah dari `reviews`
};

// ─── DATA FETCH ─────────────────────────────────────────────────────────

function useHotelDetail(id: string) {
  const [hotel, setHotel] = useState<HotelDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchHotel = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const res = await api.get(`/hotels/${id}`);
        const data = res.data?.data ?? res.data;
        if (!cancelled) {
          setHotel(data);
        }
      } catch (err) {
        if (!cancelled) setIsError(true);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    fetchHotel();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { hotel, isLoading, isError };
}

const TAB_KEYS = [
  "overview",
  "rooms",
  "facilities",
  "location",
  "reviews",
] as const;

// ─── COMPONENT ───────────────────────────────────────────────────────────

const OrderPage = () => {
  const { id } = useParams({ from: "/hotels/$id" });
  const { hotel, isLoading, isError } = useHotelDetail(id);

  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("overview");

  const openViewer = (idx: number) => {
    setViewerStartIndex(idx);
    setViewerOpen(true);
  };

  const scrollToSection = (key: string) => {
    setActiveTab(key);
    const el = document.getElementById(`section-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading hotel data...
      </div>
    );
  }

  if (isError || !hotel) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Hotel not found.
      </div>
    );
  }

  // Combine hotel-level images with all room images as a fallback gallery,
  // so the overview isn't stuck on "No Image" when only room photos exist.
  const hotelPhotoUrls = (hotel.images ?? [])
    .map(extractImageUrl)
    .filter((u): u is string => Boolean(u));

  const roomPhotoUrls = (hotel.rooms ?? [])
    .flatMap((room) => (room.images ?? []).map(extractImageUrl))
    .filter((u): u is string => Boolean(u));

  const allPhotoUrls = [...hotelPhotoUrls, ...roomPhotoUrls];

  const photos = allPhotoUrls.length
    ? allPhotoUrls.map((url) => getImageUrl(url))
    : ["https://placehold.co/800x600?text=No+Image"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="hidden md:flex justify-center mb-8">
          <SearchBox />
        </div>
        <div className="md:hidden mb-6">
          <SearchSheet />
        </div>

        {/* TAB NAV */}
        <div className="sticky top-0 z-20 bg-white border-b mb-10">
          <div className="flex gap-1 overflow-x-auto">
            {TAB_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => scrollToSection(key)}
                className={`px-4 pb-3 pt-2 text-sm font-medium capitalize shrink-0 border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* OVERVIEW */}
        {/* OVERVIEW */}
        <section id="section-overview" className="mb-16 scroll-mt-20">
          <h1 className="text-3xl font-bold mb-6">{hotel.name}</h1>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 rounded-xl overflow-hidden mb-8">
            {photos.slice(0, 6).map((src, idx) => (
              <div
                key={idx}
                className="relative cursor-pointer"
                onClick={() => openViewer(idx)}
              >
                <img
                  src={src}
                  className="w-full h-40 md:h-52 object-cover hover:opacity-85 transition-opacity"
                  alt={`${hotel.name} photo ${idx + 1}`}
                />
                {idx === 5 && photos.length > 6 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold text-lg">
                    +{photos.length - 6} more
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl font-bold text-2xl shrink-0">
              {Number(hotel.rating_avg ?? 0).toFixed(1)}
            </div>
            <div>
              <p className="font-semibold">
                {hotel.address}, {hotel.city}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                {hotel.reviewsList?.length ?? 0} Reviews
              </p>
            </div>
          </div>

          {hotel.description && (
            <p className="text-sm text-muted-foreground mt-4">
              {hotel.description}
            </p>
          )}
        </section>

        <Separator className="mb-16" />

        {/* ROOMS */}
        <section id="section-rooms" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Rooms</h2>
          <div className="space-y-4">
            {hotel.rooms?.length ? (
              hotel.rooms.map((room) => {
                const roomImgUrl = extractImageUrl(room.images?.[0]);
                const roomImg = getImageUrl(roomImgUrl);
                const roomPhotoIndex = roomImgUrl
                  ? photos.findIndex((p) => p === getImageUrl(roomImgUrl))
                  : -1;

                return (
                  <Card
                    key={room.id}
                    className="overflow-hidden border-none shadow-sm p-0"
                  >
                    <CardContent className="p-0 flex flex-col md:flex-row items-stretch">
                      <img
                        src={roomImg}
                        alt={room.name}
                        onClick={() =>
                          openViewer(roomPhotoIndex >= 0 ? roomPhotoIndex : 0)
                        }
                        className="w-full md:w-64 h-52 md:h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity shrink-0 self-stretch"
                      />
                      <div className="flex flex-col md:flex-row flex-1 gap-4 p-5 md:px-6">
                        <div className="flex-1 flex flex-col justify-center">
                          <h3 className="text-lg font-semibold">{room.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 mb-3">
                            Max {room.capacity} guests · {room.available_rooms}{" "}
                            rooms available
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {(room.facilities ?? []).map((f) => (
                              <Badge
                                key={f}
                                variant="secondary"
                                className="text-xs font-normal"
                              >
                                {facilityLabels[f] ?? f}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Separator className="md:hidden" />

                        <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:min-w-32">
                          <div className="text-left md:text-right">
                            <p className="text-xl font-bold">
                              {formatRupiah(room.price_per_night)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              per night
                            </p>
                          </div>
                          <Button
                            className="shrink-0 cursor-pointer"
                            disabled={room.available_rooms <= 0}
                            asChild
                          >
                            <Link
                              to="/book"
                              search={{ hotelId: hotel.id, roomId: room.id }}
                            >
                              {room.available_rooms > 0
                                ? "Book Now"
                                : "Sold Out"}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                No rooms available yet.
              </p>
            )}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* FACILITIES */}
        <section id="section-facilities" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Facilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {(hotel.facilities ?? []).map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 p-4 rounded-lg border bg-card"
              >
                <span className="text-muted-foreground">
                  {facilityIcons[f] ?? <Wifi size={18} />}
                </span>
                <span className="text-sm font-medium">
                  {facilityLabels[f] ?? f}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* LOCATION */}
        <section id="section-location" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-2">Location</h2>
          <p className="text-muted-foreground mb-5">
            {hotel.address}, {hotel.city}
          </p>
          <div className="w-full h-72 rounded-xl overflow-hidden border">
            <iframe
              className="w-full h-full"
              loading="lazy"
              title="Hotel location map"
              src={`https://maps.google.com/maps?q=${hotel.latitude},${hotel.longitude}&z=15&output=embed`}
            />
          </div>
        </section>

        <Separator className="mb-16" />

        {/* REVIEWS */}
        <section id="section-reviews" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {hotel.reviewsList?.length ? (
            <div className="space-y-4">
              {hotel.reviewsList.map((r) => (
                <div key={r.id} className="border-b pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{r.user.name}</span>
                    <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                      <Star
                        size={12}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      {r.rating}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-sm">No reviews yet.</p>
          )}
        </section>
      </div>

      {/* PHOTO VIEWER */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-4xl w-full p-6">
          <DialogTitle className="sr-only">Photo Gallery</DialogTitle>
          <Carousel
            opts={{ startIndex: viewerStartIndex, loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {photos.map((src, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-[60vh]">
                    <img
                      src={src}
                      alt={`Gallery photo ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          <div className="flex gap-2 overflow-x-auto pt-2 pb-1">
            {photos.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setViewerStartIndex(idx)}
                className="h-16 w-24 object-cover rounded-md cursor-pointer shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default OrderPage;
