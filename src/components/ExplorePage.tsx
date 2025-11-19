import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Star } from "lucide-react";
import SearchBox from "./MainDashboard/SearchBox";
import CardExploreBox from "./ExplorePage/CardExploreBox";

const ExplorePage = () => {
  const [starRating, setStarRating] = useState(4);

  const Hotels = [
    {
      id: 1,
      name: "Valeriia Bugaiova",
      location: "Garung, Indonesia",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 3.33,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
    },
  ];

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
        <div className="flex-1 space-y-6">
          {Hotels.map((item) => (
            <CardExploreBox
              name={item.name}
              location={item.location}
              img={item.img}
              ratingStars={item.ratingStars}
              ratingNumbers={item.ratingNumbers}
              discount={item.discount}
              reviews={item.reviews}
              facilities1={item.facilities1}
              facilities2={item.facilities2}
              facilities3={item.facilities3}
            />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ExplorePage;
