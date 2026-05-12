import { Funnel } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import FilterBox from "../ExplorePage/FilterBox";

const FilterSheet = () => {
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full gap-2">
            <Funnel size={16} />
            Filter
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-auto rounded-t-2xl pb-10">
          <div className="pt-4">
            <FilterBox />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FilterSheet;