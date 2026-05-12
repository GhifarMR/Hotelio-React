import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";
import CardExploreBox from "./ExplorePage/CardExploreBox";
import FilterBox from "./ExplorePage/FilterBox";
import SearchSheet from "./SearchBox/SearchSheet";
import FilterSheet from "./SearchBox/FilterSheet";

const ExplorePage = () => {
  const Hotels = [
    {
      id: 1,
      name: "Great Ghifar Hotel",
      location: "Manhattan, NYC",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 38,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 1_300_000,
      priceBefore: 2_500_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 2,
      name: "Hampton Inn New York-JFK",
      location: "144-10 135th Avenue, JFK Airport, NY",
      img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
  ];


  return (
    <div>
      <Navbar />

      {/* SEARCH BOX */}
      <div className="md:sticky md:block md:top-0 md:z-40 bg-white hidden">
        <div className="max-w-5xl mx-auto">
          <SearchBox />
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="max-w-7xl mx-auto px-2 py-10 flex flex-col lg:flex-row gap-10">
        {/* FILTER */}
        <div className="hidden lg:block">
          <FilterBox />
        </div>

        <div className="sticky top-0 grid grid-cols-2 bg-white">
          <div className="md:hidden">
            <SearchSheet />
          </div>

          <div className="md:hidden">
            <FilterSheet />
          </div>
        </div>

        {/* HOTEL LIST */}
        <div className="flex-1 space-y-6">
          {Hotels.map((item) => (
            <CardExploreBox
              key={item.id}
              name={item.name}
              location={item.location}
              img={item.img}
              ratingStars={item.ratingStars}
              ratingNumbers={item.ratingNumbers}
              discount={item.discount}
              reviews={item.reviews}
              facilities1={item.facilities1}
              facilities2={item.facilities2}
              facilities3={item.facilities3}
              price={item.price}
              priceBefore={item.priceBefore}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ExplorePage;
