import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MapPin, Star } from "lucide-react";
import SearchBox from "./MainDashboard/SearchBox";

const ExplorePage = () => {
  const [starRating, setStarRating] = useState(4);

  return (
    <>
      <Navbar />

      {/* Search Section */}
      <div className="mt-10 flex justify-center">
        <SearchBox />
      </div>

      {/* Main Content: Filter + Hotel List */}
      <div className="max-w-7xl mx-auto px-2 py-10 flex flex-col lg:flex-row gap-10">
        {/* Sidebar Filters */}
        <div className="lg:w-80 space-y-8 hidden md:block">
          {/* Budget */}
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Your Budget</h3>
              <button className="text-indigo-600 text-sm">Reset</button>
            </div>
            <p className="text-sm text-gray-600 mb-4">Per Room / Per Night</p>
            <div className="flex items-center gap-4">
              <p>Min</p>
              <input type="search" className="border-2 rounded-lg p-2" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <p>Max</p>
              <input type="search" className="border-2 rounded-lg p-2" />
            </div>
          </div>

          {/* Star Rating */}
          <div className="bg-white rounded-xl p-6">
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
          <div className="bg-white rounded-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Popular Facilities</h3>
              <button className="text-indigo-600 text-sm">Reset</button>
            </div>
            <div className="space-y-3">
              {[
                "Restaurant",
                "Breakfast Available",
                "Gym",
                "Pools",
                "Spa",
                "WiFi Included",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-gray-700">{item}</span>
                </label>
              ))}
            </div>
            <button className="text-indigo-600 text-sm mt-4 block">
              See All →
            </button>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition">
            Clear All Filters
          </button>
        </div>

        {/* Hotel Results */}
        <main className="flex-1 space-y-6">
          {/* Hotel Card */}
          <div className="bg-white rounded-xl overflow-hidden transition shadow-lg">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-80 h-64 bg-gray-200">
                <img
                  src="https://plus.unsplash.com/premium_photo-1694475318104-93896256067f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Great Ghifar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 p-6 flex justify-between">
                <div>
                  <h2 className="text-2xl font-bold inline-block cursor-pointer text-gray-900 hover:bg-yellow-300">
                    Great Ghifar Hotel
                  </h2>
                  <p className="text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" />
                    Manhattan, NYC
                  </p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                      33.3% OFF
                    </span>
                    <span className="text-2xl font-bold">5.0</span>
                    <span className="text-gray-500 text-sm cursor-pointer">689 Reviews</span>
                  </div>

                  <div className="flex gap-6 mt-6 text-sm text-gray-600">
                    <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                      Wifi
                    </button>
                    <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                      Pools
                    </button>
                    <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                      Restaurant
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-900">
                    $ 100
                  </div>
                  <div className="text-sm text-gray-500 line-through mb-4">
                    $ 150
                  </div>
                  <button className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white cursor-pointer transition">
                    Book Now
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
