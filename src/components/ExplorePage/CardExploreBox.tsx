import { Link } from "@tanstack/react-router";
import { formatRatingLabel, getRatingStars } from "@/lib/rating";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

interface CardExploreBoxProps {
  name: string;
  id: string;
  location: string;
  img: string;
  ratingNumbers: number;
  discount: number;
  reviews: number;
  facilities1: string;
  facilities2: string;
  facilities3: string;
  price: number;
  priceBefore: number;
}

const CardExploreBox = ({
  name,
  id,
  location,
  img,
  ratingNumbers,
  discount,
  reviews,
  facilities1,
  facilities2,
  facilities3,
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
              <span className="bg-green-600 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded">
                {discount}% OFF
              </span>
              <span className="text-xl md:text-2xl font-bold text-gray-900">
                {ratingNumbers.toFixed(1)}
              </span>
              <span className="text-gray-500 text-xs md:text-sm">
                {reviews} Reviews
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-lg text-yellow-400">
                {getRatingStars(ratingNumbers)}
              </span>
              <span className="text-sm">
                {formatRatingLabel(ratingNumbers)}
              </span>
            </div>

            <div className="flex gap-4 mt-6 text-xs md:text-sm overflow-x-auto pb-2 md:pb-0">
              <Label>{facilities1}</Label>
              <Label>{facilities2}</Label>
              <Label>{facilities3}</Label>
            </div>
          </div>

          <div className="flex flex-row md:flex-col justify-between items-end md:items-end md:justify-start border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0">
            <div className="text-left md:text-right">
              <div className="text-lg md:text-2xl font-bold hover:bg-green-900 hover:text-white">
                Rp {price.toLocaleString("id-ID")}
              </div>
              <div className="text-xs md:text-sm line-through">
                Rp {priceBefore.toLocaleString("id-ID")}
              </div>
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
