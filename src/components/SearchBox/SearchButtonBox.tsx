import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchButtonBox = () => {
  return (
    <Button variant={"outline"} className="h-10.5 px-8 rounded-lg cursor-pointer text-black">
      <Search size={16} className="mr-2" />
      Search
    </Button>
  );
};

export default SearchButtonBox;
