import BudgetBox from "./BudgetFilter";
import StarFilter from "./StarFilter";
import FacilitiesFilter from "./FacilitiesFilter";
import FilterButton from "./FilterButton";

const FilterBox = () => {
  return (
    <div className="lg:w-80 space-y-8 md:block">
      <BudgetBox />
      <StarFilter />
      <FacilitiesFilter />

      <div className="flex gap-5">
        <FilterButton>Clear</FilterButton>
        <FilterButton>Select</FilterButton>
      </div>
    </div>
  );
};

export default FilterBox;
