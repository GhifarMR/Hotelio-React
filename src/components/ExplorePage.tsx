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
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 4.8,
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
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 1.9,
      discount: 29,
      reviews: 690,
      facilities1: "Wifi",
      facilities2: "Pools",
      facilities3: "Restaurant",
      price: 611_000,
      priceBefore: 877_000,
    },
    {
      id: 3,
      name: "Amari Boutique Wonosobo",
      location: "Jl. Dieng No. 12, Wonosobo, Jawa Tengah",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 4.5,
      discount: 15,
      reviews: 120,
      facilities1: "Heater",
      facilities2: "Mountain View",
      facilities3: "Coffee Shop",
      price: 450_000,
      priceBefore: 530_000,
    },
    {
      id: 4,
      name: "Burj Al Arab Jumeirah",
      location: "Umm Suqeim 3, Dubai, UAE",
      img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 5.0,
      discount: 5,
      reviews: 12_450,
      facilities1: "Private Jet",
      facilities2: "Underwater Resto",
      facilities3: "Helipad",
      price: 25_000_000,
      priceBefore: 26_500_000,
    },
    {
      id: 5,
      name: "Capsule Pods Shinjuku",
      location: "Shinjuku City, Tokyo, Japan",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 3.7,
      discount: 50,
      reviews: 2_100,
      facilities1: "Shared Bath",
      facilities2: "Locker",
      facilities3: "Vending Machine",
      price: 250_000,
      priceBefore: 500_000,
    },
    {
      id: 6,
      name: "The Ritz-Carlton Jakarta",
      location: "Mega Kuningan, Jakarta Selatan",
      img: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 4.9,
      discount: 12,
      reviews: 3_420,
      facilities1: "Luxury Spa",
      facilities2: "Ballroom",
      facilities3: "Valet",
      price: 3_200_000,
      priceBefore: 3_650_000,
    },
    {
      id: 7,
      name: "Swiss-Belresort Pecatu",
      location: "Pecatu, Kuta Selatan, Bali",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=60&w=800",
      ratingNumbers: 4.1,
      discount: 22,
      reviews: 890,
      facilities1: "Surf Access",
      facilities2: "Pool Bar",
      facilities3: "Gym",
      price: 850_000,
      priceBefore: 1_100_000,
    },
    {
      id: 8,
      name: "Hostel Backpacker Central",
      location: "Khao San Road, Bangkok, Thailand",
      img: "https://images.unsplash.com/photo-1709805619372-40de3f158e83?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9zdGVsfGVufDB8fDB8fHww",
      ratingNumbers: 2.5,
      discount: 10,
      reviews: 45,
      facilities1: "Fan Only",
      facilities2: "Public Lounge",
      facilities3: "Free Map",
      price: 120_000,
      priceBefore: 135_000,
    },
    {
      id: 9,
      name: "Marina Bay Sands Luxury",
      location: "10 Bayfront Ave, Singapore",
      img: "https://images.unsplash.com/photo-1563911302283-d2bc129e7570?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fHww",
      ratingNumbers: 4.9,
      discount: 8,
      reviews: 45_000,
      facilities1: "Infinity Pool",
      facilities2: "Casino",
      facilities3: "Mall Link",
      price: 8_900_000,
      priceBefore: 9_600_000,
    }
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
          <div className="md:hidden max-h-screen">
            <SearchSheet />
          </div>

          <div className="md:hidden max-h-screen">
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
