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
  price: number,
  priceBefore: number,
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
    <div className="bg-white rounded-xl overflow-hidden transition shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-80 h-64 bg-gray-200">
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 p-6 flex justify-between">
          <div>
            <h2 className="text-2xl font-bold inline-block cursor-pointer text-gray-900 hover:bg-yellow-300">
              {name}
            </h2>
            <p className="text-gray-600 flex items-center gap-1 mt-1">
              {location}
            </p>

            <div className="flex items-center gap-3 mt-4">
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded">
                {discount} OFF
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
            <div className="text-3xl font-bold text-gray-900">$ {price}</div>
            <div className="text-sm text-gray-500 line-through mb-4">$ {priceBefore}</div>
            <button className="bg-white text-black border-2 border-black px-8 py-3 rounded-lg font-semibold hover:bg-black hover:text-white cursor-pointer transition">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardExploreBox;
