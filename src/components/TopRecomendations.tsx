import BigCards from "./Recomendation/BigCards";
import HeadLine from "./Recomendation/HeadLine";

const TopRecommendations = () => {
  const hotel = [
    {
      id: 1,
      name: "Grand Ghifar Hotel",
      location: "Kertek, Indonesia",
      img: "https://images.unsplash.com/photo-1479502806991-251c94be6b15?q=80&w=1170&auto=format&fit=crop",
      ratingStars: "★★★★★",
      ratingNumbers: "5.0 stars",
    },
  ];

  return (
    <div className="w-full px-6 md:px-16 my-16 mt-30">
      {/* Header */}
      <HeadLine
        title="OUR MOST VISITED HOTEL IN 2025"
        description="Take a look at our best choice for the hotels of the year, we pick the hotels from our amazing visitor"
      />

      {/* Grid */}
      <div className="grid md:grid-cols-3 gap-6">

        {hotel.map((item) => (
          <BigCards
            key={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            ratingStars={item.ratingStars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}

        {/* Small cards*/}
        <div className="flex flex-col gap-6">
          {/* Small cards top*/}
          <a
            href="#"
            className="relative rounded-xl overflow-hidden group h-auto w-auto]"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop"
              alt="Ghifar Ocean View Resort"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 text-white drop-shadow-lg">
              <h3 className="text-lg font-bold hover:bg-yellow-300 hover:text-black">
                Ghifar Ocean View Resort
              </h3>
              <span className="block text-sm">Garung, Indonesia</span>
              <div className=" text-xs">
                <span className="text-yellow-400">★★★★★</span> 4.8 stars rating
              </div>
            </div>
          </a>

          {/* Small cards bottom*/}
          <a
            href="#"
            className="relative rounded-xl overflow-hidden group h-auto w-auto"
          >
            <img
              src="https://images.unsplash.com/photo-1529316275402-0462fcc4abd6?w=600&auto=format&fit=crop"
              alt="Ghifar Blue Lagoon Hotel"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-3 left-3 text-white drop-shadow-lg">
              <h3 className="text-lg font-bold hover:bg-yellow-300 hover:text-black">
                Ghifar Blue Lagoon Hotel
              </h3>
              <span className="block text-sm">Sawangan, Indonesia</span>
              <div className=" text-xs">
                <span className="text-yellow-400">★★★★★</span> 4.9 stars rating
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopRecommendations;
