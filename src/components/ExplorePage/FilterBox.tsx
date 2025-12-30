import BudgetBox from "./BudgetFilter";
import StarFilter from "./StarFilter";
import FacilitiesFilter from "./FacilitiesFilter";

const FilterBox = () => {
  return (
    <div className="lg:w-80 space-y-8 md:block">
      <BudgetBox />
      <StarFilter />
      <FacilitiesFilter />

      <div className="flex gap-5">
        <button className="w-full bg-black text-white py-4 rounded-xl font-medium active:bg-blue-950 transition cursor-pointer">
          Clear
        </button>

        <button className="w-full bg-black text-white py-4 rounded-xl font-medium active:bg-blue-950 transition cursor-pointer">
          Select
        </button>
      </div>
    </div>
  );
};

export default FilterBox;
