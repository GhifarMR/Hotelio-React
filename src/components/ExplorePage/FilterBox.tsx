import BudgetBox from "./BudgetFilter"
import StarFilter from "./StarFilter"
import FacilitiesFilter from "./FacilitiesFilter"

const FilterBox = () => {
    return (
        <div className="lg:w-80 space-y-8 hidden md:block">
          <BudgetBox />
          <StarFilter />
          <FacilitiesFilter />

          <button className="w-full bg-black text-white py-4 rounded-xl font-medium hover:bg-gray-900 transition cursor-pointer">
            Clear All Filters
          </button>
        </div>
    )
}

export default FilterBox;