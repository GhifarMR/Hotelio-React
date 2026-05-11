import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Search,
  Star,
  Wifi,
  Wind,
  Utensils,
  Phone,
  Car,
  Waves,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const photosMain = [
  "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
  "https://pix8.agoda.net/hotelImages/544421/-1/0b941a065a3a55a21297ae0537afe8b3.jpg?ca=9&ce=1&s=1024x",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
];

const photosViewer = [
  ...photosMain,
  "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1576678927431-7c90890b9fcf?auto=format&fit=crop&w=1000&q=80",
];

const rooms = [
  {
    name: "Superior King Room",
    priceBefore: "USD 44.20",
    priceNow: "USD 32.90",
    size: "28m²",
    features: ["King Bed", "AC", "Hot Shower", "Breakfast"],
    img: photosMain[2],
  },
  {
    name: "Deluxe Family Room",
    priceBefore: "USD 78.10",
    priceNow: "USD 59.50",
    size: "40m²",
    features: ["2 Beds", "AC", "Hot Shower", "TV", "Breakfast"],
    img: photosMain[3],
  },
  {
    name: "Executive Suite",
    priceBefore: "USD 120.00",
    priceNow: "USD 89.00",
    size: "55m²",
    features: ["King Bed", "Living Room", "Premium Bathroom"],
    img: photosMain[1],
  },
];

const facilities = [
  { icon: <Wifi size={18} />, label: "Free WiFi" },
  { icon: <Wind size={18} />, label: "AC" },
  { icon: <Utensils size={18} />, label: "Restaurant" },
  { icon: <Phone size={18} />, label: "24h Front Desk" },
  { icon: <Waves size={18} />, label: "Swimming Pool" },
  { icon: <Car size={18} />, label: "Parking Area" },
];

const TAB_KEYS = ["overview", "rooms", "facilities", "location", "reviews"];

// ─── COMPONENT ───────────────────────────────────────────────────────────────

const OrderPage = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerStartIndex, setViewerStartIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const openViewer = (idx: number) => {
    setViewerStartIndex(idx);
    setViewerOpen(true);
  };

  const scrollToSection = (key: string) => {
    setActiveTab(key);
    const el = document.getElementById(`section-${key}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── SEARCH BOX ── */}
        <div className="hidden md:flex justify-center mb-8">
          <SearchBox />
        </div>
        
        <div className="md:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full gap-2">
                <Search size={16} />
                Search rooms
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-auto rounded-t-2xl pb-10">
              <div className="pt-4">
                <SearchBox />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* ── TAB NAV (anchor links) ── */}
        <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b mb-10">
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

        {/* ══════════════════════════════════════════════════
            SECTION: OVERVIEW
        ══════════════════════════════════════════════════ */}
        <section id="section-overview" className="mb-16 scroll-mt-20">
          <h1 className="text-3xl font-bold mb-6">Great Ghifar Hotel</h1>

          {/* Photo grid — klik buka viewer */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 rounded-xl overflow-hidden mb-8">
            {photosMain.map((src, idx) => (
              <img
                key={idx}
                src={src}
                onClick={() => openViewer(idx)}
                className="w-full h-40 md:h-52 object-cover cursor-pointer hover:opacity-85 transition-opacity"
              />
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white font-bold text-xl shrink-0">
              8.4
            </div>
            <div>
              <p className="font-semibold">Very Good</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Star size={13} className="fill-yellow-400 text-yellow-400" />
                528 Reviews
              </p>
            </div>
          </div>
        </section>

        <Separator className="mb-16" />

        {/* ══════════════════════════════════════════════════
            SECTION: ROOMS
        ══════════════════════════════════════════════════ */}
        <section id="section-rooms" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Rooms</h2>
          <div className="space-y-4">
            {rooms.map((room, idx) => (
              <Card key={idx} className="overflow-hidden">
                <CardContent className="p-0 flex flex-col md:flex-row">
                  <img
                    src={room.img}
                    onClick={() => openViewer(photosMain.indexOf(room.img))}
                    className="w-full md:w-56 h-44 object-cover cursor-pointer hover:opacity-85 transition-opacity shrink-0"
                  />
                  <div className="flex flex-col md:flex-row flex-1 gap-4 p-5">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{room.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">
                        {room.size}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {room.features.map((f) => (
                          <Badge key={f} variant="secondary" className="text-xs font-normal">
                            {f}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Separator className="md:hidden" />

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:min-w-[130px]">
                      <div className="text-left md:text-right">
                        <p className="text-sm line-through text-muted-foreground">
                          {room.priceBefore}
                        </p>
                        <p className="text-xl font-bold text-orange-500">
                          {room.priceNow}
                        </p>
                        <p className="text-xs text-muted-foreground">per night</p>
                      </div>
                      <Button size="sm" className="shrink-0">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* ══════════════════════════════════════════════════
            SECTION: FACILITIES
        ══════════════════════════════════════════════════ */}
        <section id="section-facilities" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Facilities</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {facilities.map(({ icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 p-4 rounded-lg border bg-card"
              >
                <span className="text-muted-foreground">{icon}</span>
                <span className="text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <Separator className="mb-16" />

        {/* ══════════════════════════════════════════════════
            SECTION: LOCATION
        ══════════════════════════════════════════════════ */}
        <section id="section-location" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-2">Location</h2>
          <p className="text-muted-foreground mb-5">
            Jl. Pasukan Ronggolawe No. 30, Wonosobo City Center
          </p>
          <div className="w-full h-72 rounded-xl overflow-hidden border">
            <iframe
              className="w-full h-full"
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.984806288536!2d109.90254897500061!3d-7.3555987926533435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa0592f3f9d0d%3A0xa421378e660a9e77!2sKresna%20Hotel%20Wonosobo!5e0!3m2!1sen!2sid!4v1764420621488!5m2!1sen!2sid"
            />
          </div>
        </section>

        <Separator className="mb-16" />

        {/* ══════════════════════════════════════════════════
            SECTION: REVIEWS
        ══════════════════════════════════════════════════ */}
        <section id="section-reviews" className="mb-16 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <p className="text-muted-foreground text-sm">
            Guests love the clean architecture and peaceful atmosphere.
          </p>
        </section>

      </div>

      {/* ══════════════════════════════════════════════════
          PHOTO VIEWER — Dialog + Carousel
      ══════════════════════════════════════════════════ */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-4xl w-full p-6">
          <DialogTitle className="sr-only">Photo Gallery</DialogTitle>

          <Carousel
            opts={{ startIndex: viewerStartIndex, loop: true }}
            className="w-full"
          >
            <CarouselContent>
              {photosViewer.map((src, idx) => (
                <CarouselItem key={idx}>
                  <div className="flex items-center justify-center bg-muted rounded-lg overflow-hidden h-[60vh]">
                    <img
                      src={src}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          {/* Thumbnail strip */}
          <div className="flex gap-2 overflow-x-auto pt-2 pb-1">
            {photosViewer.map((src, idx) => (
              <img
                key={idx}
                src={src}
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