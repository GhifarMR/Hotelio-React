import { useState, useEffect } from "react";
import api from "@/lib/axios";
import CardContainer from "../Recomendation/CardContainer";
import HeadLine from "../Recomendation/HeadLine";
import MoreButton from "../Recomendation/MoreButton";

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
  stars: number;
  ratingNumbers: number;
}

const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600";

const GeneralRecomendations = () => {
  const [hotels, setHotels] = useState<HotelCard[]>([]);

  useEffect(() => {
    api
      .get("/hotels", { params: { per_page: 6 } })
      .then((res) => {
        const items: HotelApiItem[] = res.data?.data ?? [];
        setHotels(
          items.map((h) => ({
            id: h.id,
            name: h.name,
            location: h.location,
            img: h.img ?? FALLBACK_IMG,
            stars: h.stars ?? 0,
            ratingNumbers: Number(h.guestRating ?? 0),
          }))
        );
      });
  }, []);

  return (
    <div className="w-full px-6 md:px-16 my-16 mt-30">
      {/* Header */}
      <HeadLine
        title={
          <>
            EXPLORE OUR BEST LIST <br /> 5-STARS HOTEL
          </>
        }
        description="We understand that very important has different preferences. That’s why we provide lots of choice."
      />

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotels.map((item) => (
          <CardContainer
            key={item.id}
            id={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            stars={item.stars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}

        <div className="col-span-full flex justify-center mt-8">
          <MoreButton />
        </div>
      </div>
    </div>
  );
};

export default GeneralRecomendations;