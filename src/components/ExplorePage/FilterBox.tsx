import BudgetBox from "./BudgetFilter";

import FilterStar from "./FilterStar";
import FilterFacilities from "./FilterFacilities";


const FilterBox = () => {
  return (
    <div className="lg:w-80 space-y-8 md:block">
      <BudgetBox />
      <FilterStar />
      <FilterFacilities />
    </div>
  );
};

export default FilterBox;
