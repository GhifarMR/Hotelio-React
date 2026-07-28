import { Link } from "@tanstack/react-router";
import { formatRatingLabel } from "@/lib/rating";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface CardExploreBoxProps {
  name: string;
  id: string;
  location: string;
  img: string;
  stars: number;
  guestRating: number;
  discount: number;
  reviews: number;
  facilities: string[];
  price: number | null;
  priceBefore: number | null;
}

const CardExploreBox = ({
  name,
  id,
  location,
  img,
  stars,
  guestRating,
  discount,
  reviews,
  facilities,
  price,
  priceBefore,
}: CardExploreBoxProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row">
        <Link
          to="/hotels/$id"
          params={{ id: String(id) }}
          className="w-full md:w-80 h-56 md:h-64 overflow-hidden block"
        >
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </Link>

        <div className="flex-1 p-5 md:p-6 flex flex-col md:flex-row md:justify-between gap-4">
          <div className="flex-1">
            <Link
              to="/hotels/$id"
              params={{ id: String(id) }}
              className="text-xl md:text-2xl font-bold hover:bg-yellow-300 w-fit transition block mb-1"
            >
              {name}
            </Link>
            <p className="text-sm md:text-base mb-4">{location}</p>

            <div className="flex flex-wrap items-center gap-3">
              {discount > 0 && (
                <span className="bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
                  {discount}% OFF
                </span>
              )}

              <span className="text-2xl font-bold">
                {guestRating.toFixed(1)}
              </span>

              <span className="text-gray-500">({reviews} reviews)</span>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <div className="text-yellow-400 text-lg">{"★".repeat(stars)}</div>

              <span className="text-sm text-gray-500">Hotel {stars} Star</span>
            </div>

            {facilities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {facilities.slice(0, 3).map((facility) => (
                  <Label
                    key={facility}
                    className="rounded-full border bg-slate-100 px-3 py-1 text-xs"
                  >
                    {facility}
                  </Label>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row md:flex-col justify-between items-end md:items-end md:justify-start border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
            <div className="text-left md:text-right">
              <div className="text-lg md:text-2xl font-bold hover:bg-green-900 hover:text-white">
                Rp {(price ?? 0).toLocaleString("id-ID")}
              </div>
              {priceBefore != null && priceBefore > 0 && (
                <div className="text-xs md:text-sm line-through">
                  Rp {priceBefore.toLocaleString("id-ID")}
                </div>
              )}
            </div>

            <Link
              to="/hotels/$id"
              params={{ id: String(id) }}
              className="md:mt-auto"
            >
              <Button
                variant={"outline"}
                className="border-black text-black hover:bg-black hover:text-white px-6 md:px-8 py-2 md:py-5 rounded-lg font-semibold transition cursor-pointer"
              >
                Order
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExploreBox;
