import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer"; // pastikan kamu sudah punya Footer juga
import { MapPin, Users, Home, Search, Star, ChevronDown } from "lucide-react";

const ExplorePage = () => {
  // State untuk search bar
  const [location, setLocation] = useState("Wonosoobo");
  const [people, setPeople] = useState("2 People");
  const [hotelType, setHotelType] = useState("Luxury Hotel");

  // State filter sederhana (bisa dikembangkan lagi)
  const [budget, setBudget] = useState(1000000);
  const [starRating, setStarRating] = useState(4);

  return (
    <>
      <Navbar />

      {/* Search Section */}
      <section className="bg-white border-b mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Location */}
            <div className="flex items-center border rounded-lg px-4 py-3 flex-1">
              <MapPin className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="outline-none w-full"
                placeholder="Where are you going?"
              />
            </div>

            {/* Guests */}
            <div className="flex items-center border rounded-lg px-4 py-3 flex-1">
              <Users className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
                className="outline-none w-full"
                placeholder="Guests"
              />
            </div>

            {/* Hotel Type */}
            <div className="flex items-center border rounded-lg px-4 py-3 flex-1 relative">
              <Home className="w-5 h-5 text-gray-500 mr-3" />
              <input
                type="text"
                value={hotelType}
                onChange={(e) => setHotelType(e.target.value)}
                className="outline-none w-full"
                placeholder="Property type"
              />
              <ChevronDown className="w-5 h-5 text-gray-400 absolute right-3" />
            </div>

            {/* Search Button */}
            <button className="bg-black text-white px-12 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-900 transition">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Main Content: Filter + Hotel List */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <aside className="lg:w-80 space-y-8">
          {/* Budget */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Your Budget</h3>
              <button className="text-indigo-600 text-sm">Reset</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Per Room / Per Night</p>
            <div className="flex items-center gap-4">
              <span className="text-sm whitespace-nowrap">Rp 0</span>
              <input
                type="range"
                min="0"
                max="5000000"
                step="100000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm whitespace-nowrap">Rp 5jt+</span>
            </div>
            <p className="text-right mt-2 font-medium">
              Rp {budget.toLocaleString("id-ID")}
            </p>
          </div>

          {/* Star Rating */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Star Rating</h3>
              <button className="text-indigo-600 text-sm">Reset</button>
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-10 h-10 cursor-pointer transition ${
                    star <= starRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setStarRating(star)}
                />
              ))}
            </div>
          </div>

          {/* Popular Facilities */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Popular Facilities</h3>
              <button className="text-indigo-600 text-sm">Reset</button>
            </div>
            <div className="space-y-3">
              {["Restaurant", "Breakfast Available", "Gym", "Pools", "Spa", "WiFi Included"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-indigo-600 rounded" />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button className="text-indigo-600 text-sm mt-4 block">See All →</button>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition">
            Clear All Filters
          </button>
        </aside>

        {/* Hotel Results */}
        <main className="flex-1 space-y-6">
          {/* Hotel Card */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-80 h-64 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Dafam Hotel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-6 flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Dafam Hotel</h2>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    Pusat kota wonosoobo
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                      EXCELLENT
                    </span>
                    <span className="text-2xl font-bold">5.5</span>
                    <span className="text-gray-500 text-sm">689 Reviews</span>
                  </div>

                  <div className="flex gap-6 mt-6 text-sm text-gray-600">
                    <button className="hover:text-indigo-600 flex items-center gap-1">
                      Properties
                    </button>
                    <button className="hover:text-indigo-600 flex items-center gap-1">
                      Properties
                    </button>
                    <button className="hover:text-indigo-600 flex items-center gap-1">
                      Properties
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    Rp 1.000.000
                  </div>
                  <div className="text-sm text-gray-500 line-through mb-4">
                    Rp 1.500.000
                  </div>
                  <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                    Pilih Kamar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default ExplorePage;