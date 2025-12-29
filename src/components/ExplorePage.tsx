import Navbar from "./Navbar";
import Footer from "./MainDashboard/Footer";
import SearchBox from "./SearchBox/SearchBox";
import CardExploreBox from "./ExplorePage/CardExploreBox";
import FilterBox from "./ExplorePage/FilterBox";

const ExplorePage = () => {
  const Hotels = [
    {
      id: 1,
      name: "Great Ghifar Hotel",
      location: "Manhattan, NYC",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
      discount: 33.3,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 300000,
      priceBefore: 450000,
    },
    //   {
    //     id: 1,
    //     name: "Hampton Inn New York-JFK",
    //     location: "144-10 135th Avenue, John F. Kennedy International Airport, New York (NY), United States, 11436",
    //     img: "https://pix8.agoda.net/hotelImages/6993/0/3be443a2f5c8896fdc20d4a45e9154d4.jpg?ca=7&ce=1&s=1024x",
    //     ratingStars: "★★★★★",
    //     ratingNumbers: "4.8 stars",
    //     discount: 71,
    //     reviews: 690,
    //     facilities1: "Wifi",
    //     facilities2: "Pools",
    //     facilities3: "Restaurant",
    //     price: 211000,
    //     priceBefore: 877000,
    //   },
  ];

  return (
    <>
      <Navbar />

      {/* Search Box */}
      <div className="mt-10 flex justify-center">
        <SearchBox />
      </div>

      {/* Main Content*/}
      <div className="max-w-7xl mx-auto px-2 py-10 flex flex-col lg:flex-row gap-10">
        <FilterBox />

        {/* Hotel Box */}
        <div className="flex-1 space-y-6">
          {Hotels.map((item) => (
            <CardExploreBox
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
