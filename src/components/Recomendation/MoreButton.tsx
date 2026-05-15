import { Link } from "@tanstack/react-router";
import { Button } from "../ui/button";

const MoreButton = () => {
  return (
    <Button
      variant={"outline"}
      className="bg-white text-black px-8 py-5 rounded-2xl font-semibold hover:bg-black hover:text-white active:bg-purple-950 active:text-white cursor-pointer transition"
    >
      <Link
        to="/explore"
        
      >
        View More
      </Link>
    </Button>
  );
};

export default MoreButton;
