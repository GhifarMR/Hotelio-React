import { useState, useEffect, useCallback, useRef } from "react";
import { useSearch } from "@tanstack/react-router";
import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";
import CardExploreBox from "./ExplorePage/CardExploreBox";
import FilterBox from "./ExplorePage/FilterBox";
import SearchSheet from "./SearchBox/SearchSheet";
import FilterSheet from "./SearchBox/FilterSheet";
import api from "@/lib/axios";

interface Hotel {
  id: string;
  name: string;
  location: string;
  img: string | null;
  stars: number;
  guestRating: number;
  discount: number;
  reviews: number;
  facilities: string[];
  price: number | null;
  priceBefore: number | null;
}

const ExplorePage = () => {
  // Populated when the user searches from the home/navbar search box
  const { location, checkIn, checkOut, guests, rooms } = useSearch({
    from: "/explore",
  });

  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [stars, setStars] = useState<number[]>([]);
  const [facilities, setFacilities] = useState<string[]>([]);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchHotels = useCallback(() => {
    setLoading(true);

    const params: Record<string, any> = {
      min_price: priceRange[0],
      max_price: priceRange[1],
    };

    if (location) params.city = location;
    if (stars.length > 0) params.stars = stars;
    if (facilities.length > 0) params.facilities = facilities;

    api
      .get("/hotels", { params })
      .then((res) => setHotels(res.data.data))
      .finally(() => setLoading(false));
  }, [priceRange, stars, facilities, location]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(fetchHotels, 400);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fetchHotels]);

  return (
    <div>
      <Navbar />

      <div className="hidden md:block sticky top-0 z-40 bg-white">
        <div className="max-w-5xl mx-auto">
          <SearchBox />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-10 flex flex-col lg:flex-row gap-10">
        <div className="hidden lg:block">
          <FilterBox
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            stars={stars}
            onStarsChange={setStars}
            facilities={facilities}
            onFacilitiesChange={setFacilities}
          />
        </div>

        <div className="sticky top-0 grid grid-cols-2 bg-white md:hidden">
          <SearchSheet />
          <FilterSheet />
        </div>

        <div className="flex-1 space-y-6">
          {location && (
            <p className="text-sm text-slate-500">
              Showing results for{" "}
              <span className="font-semibold">{location}</span>
              {checkIn && checkOut && (
                <>
                  {" "}
                  · {checkIn} – {checkOut}
                </>
              )}
              {guests && (
                <>
                  {" "}
                  · {guests} guest{guests > 1 ? "s" : ""}
                </>
              )}
              {rooms && (
                <>
                  {" "}
                  · {rooms} room{rooms > 1 ? "s" : ""}
                </>
              )}
            </p>
          )}

          {loading ? (
            <p className="text-center text-slate-400 py-10">
              Loading hotels...
            </p>
          ) : hotels.length === 0 ? (
            <p className="text-center text-slate-400 py-10">
              No hotels match your filters.
            </p>
          ) : (
            hotels.map((hotel) => (
              <CardExploreBox
                key={hotel.id}
                id={hotel.id}
                name={hotel.name}
                location={hotel.location}
                img={hotel.img ?? ""}
                stars={hotel.stars}
                guestRating={hotel.guestRating}
                discount={hotel.discount}
                reviews={hotel.reviews}
                facilities={hotel.facilities}
                price={hotel.price}
                priceBefore={hotel.priceBefore}
              />
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExplorePage;
