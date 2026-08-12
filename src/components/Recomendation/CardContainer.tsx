import { Link } from "@tanstack/react-router";
import { formatRatingLabel, getRatingStars } from "@/lib/rating";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface CardContainerProps {
  id?: string;
  name?: string;
  location?: string;
  img?: string;
  stars?: number;
  ratingNumbers?: number;
  isLoading?: boolean;
}

const CardContainer = ({
  id = "",
  name = "",
  location = "",
  img = "",
  stars = 0,
  ratingNumbers = 0,
  isLoading = false,
}: CardContainerProps) => {
  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl bg-white p-0">
        <Skeleton className="h-[220px] w-full rounded-2xl" />
        <div className="space-y-3 p-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="mt-4 h-10 w-[100px] rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white transition-all duration-300">
      <div className="overflow-hidden rounded-t-2xl">
        <Link to="/hotels/$id" params={{ id: String(id) }}>
          <img
            src={img}
            alt={name}
            className="h-[220px] w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4">
        <Link to="/hotels/$id" params={{ id: String(id) }}>
          <h3 className="inline-block text-2xl font-semibold hover:bg-yellow-300">
            {name}
          </h3>
        </Link>
        <Link to="/hotels/$id" params={{ id: String(id) }}>
          <p className="text-lg text-gray-500">{location}</p>
        </Link>
        <Link to="/hotels/$id" params={{ id: String(id) }}>
          <div className="mt-1 text-lg">
            <span className="mr-2 text-yellow-400">
              {getRatingStars(stars)}
            </span>
            {formatRatingLabel(ratingNumbers)}
          </div>
        </Link>
        <Button
          variant="outline"
          className="mt-4 cursor-pointer rounded-2xl opacity-100 transition hover:bg-black hover:text-white active:bg-purple-950 active:text-white md:opacity-0 md:group-hover:opacity-100"
        >
          <Link to="/hotels/$id" params={{ id: String(id) }}>
            Book Now
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default CardContainer;
