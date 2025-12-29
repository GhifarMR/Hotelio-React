import BigCards from "../Recomendation/BigCards";
import HeadLine from "../Recomendation/HeadLine";
import SmallCards from "../Recomendation/SmallCards";

const TopRecommendations = () => {
  const bigHotel = [
    {
      id: 1,
      name: "Grand Ghifar Hotel",
      location: "Kertek, Indonesia",
      img: "https://images.unsplash.com/photo-1479502806991-251c94be6b15?q=80&w=1170&auto=format&fit=crop",
      ratingStars: "★★★★★",
      ratingNumbers: "5.0 stars",
    },
  ];

  const smallHotel = [
    {
      id: 2,
      name: "Ghifar Ocean View Resort",
      location: "Garung, Indonesia",
      img: "https://plus.unsplash.com/premium_photo-1687960116497-0dc41e1808a2?w=600&auto=format&fit=crop",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 3,
      name: "Ghifar Blue Lagoon Hotel",
      location: "Sawangan, Indonesia",
      img: "https://images.unsplash.com/photo-1529316275402-0462fcc4abd6?w=600&auto=format&fit=crop",
      ratingStars: "★★★★★",
      ratingNumbers: "4.9 stars",
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

        {bigHotel.map((item) => (
          <BigCards
            key={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            ratingStars={item.ratingStars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}

        <div className="flex flex-col gap-6">
          {smallHotel.map((item) => (
            <SmallCards
              key={item.id}
              name={item.name}
              location={item.location}
              img={item.img}
              ratingStars={item.ratingStars}
              ratingNumbers={item.ratingNumbers}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopRecommendations;
