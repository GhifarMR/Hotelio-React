import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";
import CardExploreBox from "./ExplorePage/CardExploreBox";
import FilterBox from "./ExplorePage/FilterBox";
import { useState } from "react";

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
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <>
      <Navbar />

      {/* MOBILE BUTTONS */}
      <div className="mt-20 flex gap-3 justify-end px-4 md:hidden">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => {
            setShowSearch(!showSearch);
            setShowFilter(false);
          }}
        >
          Search
        </button>

        <button
          className="px-4 py-2 bg-gray-600 text-white rounded"
          onClick={() => {
            setShowFilter(!showFilter);
            setShowSearch(false);
          }}
        >
          Filter
        </button>
      </div>

      {/* SEARCH BOX */}
      <div className="mt-6 flex justify-center">

        {/* desktop */}
        <div className="hidden md:flex">
          <SearchBox />
        </div>

        {/* mobile */}
        {showSearch && (
          <div className="md:hidden w-full px-4">
            <SearchBox />
          </div>
        )}
      </div>

      {/* MAIN CONTENT */}
      
      <div className="max-w-7xl mx-auto px-2 py-10 flex flex-col lg:flex-row gap-10">
        {/* FILTER */}
        <div className="hidden lg:block">
          <FilterBox />
        </div>

        {showFilter && (
          <div className="lg:hidden">
            <FilterBox />
          </div>
        )}

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
    </>
  );
};

export default ExplorePage;
