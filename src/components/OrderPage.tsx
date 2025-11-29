import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const OrderPage = () => {

  // FOTO UTAMA (6 foto tetap)
  const photosMain = [
    "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
    "https://pix8.agoda.net/hotelImages/544421/-1/0b941a065a3a55a21297ae0537afe8b3.jpg?ca=9&ce=1&s=1024x",
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1471039497385-b6d6ba609f9c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
  ];

  // FOTO VIEWER (bisa tambah)
  const photosViewer = [
    ...photosMain,
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1576678927431-7c90890b9fcf?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
  ];

  const rooms = [
    {
      name: "Superior King Room",
      priceBefore: "USD 44.20",
      priceNow: "USD 32.90",
      size: "28m²",
      features: "King Bed · AC · Hot Shower · Breakfast",
      img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop",
    },
    {
      name: "Deluxe Family Room",
      priceBefore: "USD 78.10",
      priceNow: "USD 59.50",
      size: "40m²",
      features: "2 Beds · AC · Hot Shower · TV · Breakfast",
      img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop",
    },
    {
      name: "Executive Suite",
      priceBefore: "USD 120.00",
      priceNow: "USD 89.00",
      size: "55m²",
      features: "King Bed · Living Room · Premium Bathroom",
      img: "https://pix8.agoda.net/property/544421/0/a5127082ada4b9e8024de28038cb2fab.jpeg?s=1024x",
    },
  ];

  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(photosMain[0]);

  const openViewer = (src: string) => {
    setSelectedPhoto(src);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* ===== HOTEL TITLE ===== */}
        <div className="mt-10 bg-white p-4 rounded-xl mb-2">
          <h1 className="text-3xl font-bold">Kresna Hotel Wonosobo</h1>
        </div>
        
        {/* ===== PHOTO GRID ===== */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
          {photosMain.map((src, idx) => (
            <img
              key={idx}
              src={src}
              onClick={() => openViewer(src)}
              className="w-full h-40 md:h-48 object-cover cursor-pointer hover:opacity-80 transition shadow"
            />
          ))}
        </div>

        {/* ===== MODAL VIEWER FULLSCREEN ===== */}
        {viewerOpen && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            
            {/* CLOSE BERBASIS KLIK DI AREA GELAP */}
            <div className="absolute inset-0" onClick={closeViewer}></div>

            {/* WRAPPER */}
            <div className="relative z-10 w-full max-w-6xl flex gap-4">

              {/* FOTO BESAR */}
              <div className="flex-1 flex items-center justify-center">
                <img
                  src={selectedPhoto}
                  className="max-h-[80vh] w-auto shadow-xl"
                />
              </div>

              {/* THUMBNAILS DI KANAN */}
              <div className="w-32 md:w-40 overflow-y-auto max-h-[80vh] grid grid-cols-1 gap-3 pr-2">
                {photosViewer.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    onClick={() => setSelectedPhoto(src)}
                    className={`h-20 w-full object-cover cursor-pointer transition ${
                      src === selectedPhoto
                        ? "ring-4 ring-white"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>
        )}

        {/* ===== RATING ===== */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-3">Rating & Reviews</h2>
          <div className="flex items-center gap-4">
            <span className="text-4xl font-bold text-blue-600">8.4</span>
            <p className="text-gray-500">Very Good · 528 Reviews</p>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Guests love the unique architecture, cleanliness, and peaceful
            location.
          </p>
        </div>

        {/* ===== LOCATION ===== */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-3">Location</h2>
          <p className="text-gray-600">
            Jl. Pasukan Ronggolawe No. 30, Wonosobo City Center
          </p>

          <ul className="mt-3 text-sm text-gray-500 space-y-1">
            <li>• Alun-Alun Wonosobo — 400 m</li>
            <li>• Terminal Mendolo — 2.5 km</li>
            <li>• Wisata Dieng — 24 km</li>
          </ul>

          <div className="mt-5 w-full h-64 rounded-xl overflow-hidden shadow">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.984853720026!2d109.90254897482514!3d-7.355593472371469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa0592f3f9d0d%3A0xa421378e660a9e77!2sKresna%20Hotel%20Wonosobo!5e0!3m2!1sen!2sus!4v1764416566347!5m2!1sen!2sus"
            ></iframe>
          </div>
        </div>

        {/* ===== FACILITIES ===== */}
        <div className="bg-white p-6 rounded-xl shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-3">Facilities</h2>

          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-600 text-sm">
            <li>• Free WiFi</li>
            <li>• AC</li>
            <li>• Restaurant</li>
            <li>• 24h Front Desk</li>
            <li>• Swimming Pool</li>
            <li>• Parking Area</li>
          </ul>
        </div>

        {/* ===== ROOMS ===== */}
        <h2 className="text-2xl font-bold mt-10 mb-4">Rooms</h2>
        {rooms.map((room, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-xl shadow-md mb-6 flex flex-col md:flex-row gap-5"
          >
            <img
              src={room.img}
              className="w-full md:w-60 h-40 rounded-lg object-cover"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold">{room.name}</h3>
              <p className="text-gray-500 text-sm mt-1">{room.size}</p>
              <p className="text-gray-500 text-sm">{room.features}</p>
            </div>

            <div className="text-right">
              <p className="text-sm line-through text-gray-400">
                {room.priceBefore}
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {room.priceNow}
              </p>
              <button className="mt-2 bg-black text-white px-4 py-2 rounded-lg hover:opacity-80 transition">
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
