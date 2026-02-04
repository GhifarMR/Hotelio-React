import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";

const OrderPage = () => {
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
      features: "King Bed · AC · Hot Shower · Breakfast",
      img: photosMain[2],
    },
    {
      name: "Deluxe Family Room",
      priceBefore: "USD 78.10",
      priceNow: "USD 59.50",
      size: "40m²",
      features: "2 Beds · AC · Hot Shower · TV · Breakfast",
      img: photosMain[3],
    },
    {
      name: "Executive Suite",
      priceBefore: "USD 120.00",
      priceNow: "USD 89.00",
      size: "55m²",
      features: "King Bed · Living Room · Premium Bathroom",
      img: photosMain[1],
    },
  ];

  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(photosMain[0]);
  const [activeTab, setActiveTab] = useState("overview");

  const openViewer = (src: string) => {
    setSelectedPhoto(src);
    setViewerOpen(true);
  };

  const closeViewer = () => setViewerOpen(false);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto bg-white px-6 py-8 mt-20">
        {/* TAB MENU */}
        <div className="flex gap-6 border-b mb-6 overflow-x-auto">
          {[
            { key: "overview", label: "Overview" },
            { key: "rooms", label: "Rooms" },
            { key: "facilities", label: "Facilities" },
            { key: "location", label: "Location" },
            { key: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium ${
                activeTab === tab.key
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* OVERVIEW */}
        {activeTab === "overview" && (
          <div>
            <h1 className="text-3xl font-bold mb-4">Great Ghifar Hotel</h1>

            {/* FOTO GRID TANPA ROUNDED */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1 mb-8">
              {photosMain.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  onClick={() => openViewer(src)}
                  className="w-full h-40 md:h-52 object-cover cursor-pointer hover:opacity-80"
                />
              ))}
            </div>

            {/* RATING */}
            <h2 className="text-xl font-semibold mb-2">Rating</h2>
            <div className="flex items-center gap-3 mb-10">
              <span className="text-4xl font-semibold text-blue-600">8.4</span>
              <span className="text-gray-500">Very Good · 528 Reviews</span>
            </div>
          </div>
        )}

        {/* ROOMS */}
        {activeTab === "rooms" && (
          <div className="space-y-6">
            {rooms.map((room, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row gap-5 border p-5"
              >
                <img
                  src={room.img}
                  onClick={() => openViewer(room.img)}
                  className="w-full md:w-60 h-44 object-cover cursor-pointer"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{room.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{room.size}</p>
                  <p className="text-gray-500 text-sm">{room.features}</p>
                </div>

                <div className="text-right min-w-[120px]">
                  <p className="text-sm line-through text-gray-400">
                    {room.priceBefore}
                  </p>
                  <p className="text-2xl font-bold text-orange-600">
                    {room.priceNow}
                  </p>
                  <button className="mt-2 bg-black text-white px-4 py-2 text-sm">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* FACILITIES */}
        {activeTab === "facilities" && (
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 text-gray-700 text-sm">
            <li>Free WiFi</li>
            <li>AC</li>
            <li>Restaurant</li>
            <li>24h Front Desk</li>
            <li>Swimming Pool</li>
            <li>Parking Area</li>
          </ul>
        )}

        {/* LOCATION */}
        {activeTab === "location" && (
          <div>
            <p className="text-gray-600">
              Jl. Pasukan Ronggolawe No. 30, Wonosobo City Center
            </p>

            <div className="mt-5 w-full h-64 shadow">
              <iframe
                className="w-full h-full"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.984806288536!2d109.90254897500061!3d-7.3555987926533435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7aa0592f3f9d0d%3A0xa421378e660a9e77!2sKresna%20Hotel%20Wonosobo!5e0!3m2!1sen!2sid!4v1764420621488!5m2!1sen!2sid"
              ></iframe>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "reviews" && (
          <p className="text-gray-600 text-sm">
            Guests love the clean architecture and peaceful atmosphere.
          </p>
        )}
      </div>

      {/* White VIEWER POPUP */}
      {viewerOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          {/* CLICK OUTSIDE */}
          <div className="absolute inset-0" onClick={closeViewer}></div>

          {/* POPUP WRAPPER */}
          <div
            className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-6 flex flex-col md:flex-row gap-6"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={closeViewer}
              className="absolute top-3 left-4 cursor-pointer text-gray-500 hover:text-black text-3xl leading-none"
            >
              ×
            </button>

            {/* MAIN PHOTO */}
            <div className="flex-1 flex items-center justify-center">
              <img
                src={selectedPhoto}
                className="max-h-[65vh] shadow-lg transition"
              />
            </div>

            {/* THUMBNAILS */}
            <div
              className="w-full md:w-36 overflow-y-auto max-h-[70vh] flex flex-col gap-4 pr-1"
            >
              {photosViewer.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  onClick={() => setSelectedPhoto(src)}
                  className={`
              h-20 w-full object-cover rounded-lg cursor-pointer transition-all
              ${
                src === selectedPhoto
                  ? " opacity-100"
                  : "opacity-60 hover:opacity-100"
              }
            `}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default OrderPage;
