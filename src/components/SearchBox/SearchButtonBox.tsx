import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchButtonBox = () => {
  return (
    <Button className="h-10.5 px-8 bg-black hover:bg-gray-800 text-white rounded-lg">
      <Search size={16} className="mr-2" />
      Search
    </Button>
  );
};

export default SearchButtonBox;
