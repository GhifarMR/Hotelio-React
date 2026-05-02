import { useState } from "react";
import { MapPin } from "lucide-react";

import SearchButtonBox from "./SearchButtonBox";
import GuestSelector from "./GuestSelectorBox";
import DateBox from "./DateBox";

const POPULAR_CITIES = [
  "Bali, Indonesia",
  "Jakarta, Indonesia",
  "Yogyakarta, Indonesia",
  "Bandung, Indonesia",
  "Surabaya, Indonesia",
  "New York, USA",
  "Tokyo, Japan",
  "Paris, France",
];

const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filtered =
    location.length > 0
      ? POPULAR_CITIES.filter((c) =>
          c.toLowerCase().includes(location.toLowerCase()),
        )
      : POPULAR_CITIES;


  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col md:flex-row gap-3 w-full mx-auto">
      {/* Location */}
      <div className="flex flex-col flex-1 relative">
        <label className="text-xs text-gray-500 mb-1 font-medium">
          Location
        </label>
        <div className="relative">
          <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Where are you going?"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            className="w-full border rounded-lg pl-9 pr-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        {showSuggestions && filtered.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
            {filtered.map((city) => (
              <button
                key={city}
                className="w-full text-left px-4 py-2.5 text-sm text-gray-800 hover:bg-gray-50 flex items-center gap-2"
                onMouseDown={() => {
                  setLocation(city);
                  setShowSuggestions(false);
                }}
              >
                <MapPin size={14} className="text-gray-400 shrink-0" />
                {city}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date */}
      <div className="flex flex-col flex-1">
        <DateBox />
      </div>

      {/* Guest & Room */}
      <div className="flex flex-col flex-1">
        <GuestSelector />
      </div>

      {/* Search Button */}
      <div className="flex flex-col justify-end">
        <SearchButtonBox />
      </div>
    </div>
  );
};

export default SearchBar;
