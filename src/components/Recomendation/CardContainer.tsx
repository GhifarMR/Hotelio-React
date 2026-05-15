import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface CardContainerProps {
  name: string;
  location: string;
  img: string;
  ratingStars: string;
  ratingNumbers: string;
  isLoading?: boolean;
}

const CardContainer = ({
  name,
  location,
  img,
  ratingStars,
  ratingNumbers,
  isLoading = false,
}: CardContainerProps) => {

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden p-0">
        {/* Skeleton image */}
        <Skeleton className="w-full h-[220px] rounded-2xl" />
        
        <div className="p-4 space-y-3">
          {/* Skeleton title */}
          <Skeleton className="h-8 w-3/4" />
          {/* Skeleton location */}
          <Skeleton className="h-5 w-1/2" />
          {/* Skeleton rating */}
          <Skeleton className="h-5 w-1/4" />
          {/* Skeleton button */}
          <Skeleton className="h-10 w-[100px] mt-4 rounded-2xl" />
        </div>
      </div>
    )
  }
  return (
    <div className="group bg-white rounded-2xl overflow-hidden transition-all duration-300">
      <div className="overflow-hidden rounded-t-2xl">
        <Link to="/order">
          <img
            src={img}
            alt={name}
            className="w-full h-[220px] rounded-2xl object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link to="/order">
          <h3 className="text-2xl font-semibold hover:bg-yellow-300 inline-block">
            {name}
          </h3>
        </Link>
        <Link to="/order">
          <p className="text-lg text-gray-500">{location}</p>
        </Link>
        <Link to="/order">
          <div className="text-lg mt-1">
            <span className="text-yellow-400 mr-2">{ratingStars}</span>
            {ratingNumbers}
          </div>
        </Link>
        <Button
          variant={"outline"}
          className="cursor-pointer hover:bg-black hover:text-white active:bg-purple-950 active:text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 mt-4 rounded-2xl transition"
        >
          <Link to="/order">Book Now</Link>
        </Button>
      </div>
    </div>
  );
};

export default CardContainer;
