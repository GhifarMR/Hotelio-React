import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

interface CardContainerProps {
  name: string;
  location: string;
  img: string;
  ratingStars: string;
  ratingNumbers: string;
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
  location,
  img,
  ratingStars,
  ratingNumbers,
  discount,
  reviews,
  facilities1,
  facilities2,
  facilities3,
  price,
  priceBefore,
}: CardContainerProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden transition">
      <div className="flex flex-col md:flex-row">
        <Link
          to="/order"
          className="md:w-80 h-64 overflow-hidden transition-all duration-300"
        >
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </Link>

        <div className="flex-1 p-6 flex justify-between">
          <div>
            <Link to="/order" className="md:text-2xl text-xl font-bold inline-block cursor-pointer text-gray-900 hover:bg-yellow-300 transition">
              {name}
            </Link>
            <p className="text-gray-600 flex items-center gap-1 mt-1 max-w-80">
              {location}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                {discount} % OFF
              </span>
              <span className="text-2xl font-bold">5.0</span>
              <span className="text-gray-500 text-sm cursor-pointer">
                {reviews} Reviews
              </span>
            </div>

            <a href="#">
              <div className="text-lg mt-1">
                <span className="text-yellow-400 mr-2">{ratingStars}</span>
                {ratingNumbers}
              </div>
            </a>

            <div className="flex gap-6 mt-6 text-sm text-gray-600">
              <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                {facilities1}
              </button>
              <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                {facilities2}
              </button>
              <button className="hover:text-indigo-600 flex items-center gap-1 cursor-pointer">
                {facilities3}
              </button>
            </div>
          </div>

          <div className="text-right">
            <div className="md:text-3xl text-xl font-bold text-gray-900 hover:bg-green-900 hover:text-white transition cursor-pointer">Rp. {price.toLocaleString("id")}</div>
            <div className="text-sm text-gray-500 line-through mb-4">
              Rp. {priceBefore}
            </div>
            <Link to="/order">
              <Button variant={"outline"} className="bg-white text-black border-black px-8 py-5 rounded-lg font-semibold hover:bg-black hover:text-white active:bg-blue-950 active:text-white cursor-pointer transition">
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
