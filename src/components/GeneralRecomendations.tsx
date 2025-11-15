import CardContainer from "./Recomendation/CardContainer";
import HeadLine from "./Recomendation/HeadLine";
import MoreButton from "./Recomendation/MoreButton";

const GeneralRecomendations = () => {
  const hotels = [
    {
      id: 1,
      name: "Valeriia Bugaiova",
      location: "Garung, Indonesia",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 2,
      name: "Christian Lambert",
      location: "Selomerto, Indonesia",
      img: "https://images.unsplash.com/photo-1549294413-26f195200c16?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 3,
      name: "Vojtech Bruzek",
      location: "Sidojoyo, Indonesia",
      img: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 4,
      name: "Ciudad Maderas",
      location: "Bugangan, Indonesia",
      img: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 5,
      name: "Jorg Angeli",
      location: "Sapen, Indonesia",
      img: "https://images.unsplash.com/photo-1506059612708-99d6c258160e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGhvdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
    {
      id: 6,
      name: "Jennifer Latuperisa",
      location: "Kertek, Indonesia",
      img: "https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
      ratingStars: "★★★★★",
      ratingNumbers: "4.8 stars",
    },
  ];

  return (
    <div className="w-full px-6 md:px-16 my-16 mt-30">
      {/* Header */}
      <HeadLine
        title={
          <>
            EXPLORE OUR BEST LIST <br /> 5-STARS HOTEL
          </>
        }
        description="We understand that very important has different preferences. That’s why we provide lots of choice."
      />

      {/* Card Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {hotels.map((item) => (
          <CardContainer
            key={item.id}
            name={item.name}
            location={item.location}
            img={item.img}
            ratingStars={item.ratingStars}
            ratingNumbers={item.ratingNumbers}
          />
        ))}

        <div className="col-span-full flex justify-center mt-8">
          <MoreButton />
        </div>
      </div>
    </div>
  );
};

export default GeneralRecomendations;
