import { useState, useEffect } from "react";
import api from "@/lib/axios";
import BigCards from "../Recomendation/BigCards";
import HeadLine from "../Recomendation/HeadLine";
import SmallCards from "../Recomendation/SmallCards";

interface HotelApiItem {
  id: string;
  name: string;
  location: string;
  img: string | null;
  stars: number;
  guestRating: number;
}

interface HotelCard {
  id: string;
  name: string;
  location: string;
  img: string;
  ratingStars: string;
  ratingNumbers: string;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1479502806991-251c94be6b15?q=80&w=1170&auto=format&fit=crop";

const TopRecommendations = () => {
  const [hotels, setHotels] = useState<HotelCard[]>([]);

  useEffect(() => {
    api
      .get("/hotels", { params: { sort_by: "stars", sort_order: "desc", per_page: 3 } })
      .then((res) => {
        const items: HotelApiItem[] = res.data?.data ?? [];
        setHotels(
          items.map((h) => ({
            id: h.id,
            name: h.name,
            location: h.location,
            img: h.img ?? FALLBACK_IMG,
            ratingStars: "★".repeat(h.stars ?? 0),
            ratingNumbers: `${Number(h.guestRating ?? 0).toFixed(1)} stars`,
          }))
        );
      });
  }, []);

  return (
    <div className="w-full px-6 md:px-16 my-16 mt-30">
      {/* Header */}
      <HeadLine
        title="OUR MOST VISITED HOTEL IN 2025"
        description="Take a look at our best choice for the hotels of the year, we pick the hotels from our amazing visitor"
      />

      {/* Grid for md*/}
      <div className="hidden md:grid md:grid-cols-3 gap-6">
        {hotels.slice(0, 1).map((item) => (
          <BigCards
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            ratingStars={item.ratingStars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}

        <div className="flex flex-col gap-6">
          {hotels.slice(1).map((item) => (
            <SmallCards
              key={item.id}
              id={item.id}
              name={item.name}
              location={item.location}
              img={item.img}
              ratingStars={item.ratingStars}
              ratingNumbers={item.ratingNumbers}
            />
          ))}
        </div>
      </div>

      {/* Grid for mobile */}
      <div className="grid grid-cols-1 md:hidden gap-6">
        {hotels.map((item) => (
          <BigCards
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            ratingStars={item.ratingStars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}
      </div>
    </div>
  );
};

export default TopRecommendations;