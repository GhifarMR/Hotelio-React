import BudgetBox from "./BudgetFilter";
import FilterStar from "./FilterStar";
import FilterFacilities from "./FilterFacilities";

interface Props {
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  stars: number[];
  onStarsChange: (stars: number[]) => void;
  facilities: string[];
  onFacilitiesChange: (facilities: string[]) => void;
}

const FilterBox = ({
  priceRange, onPriceChange, stars, onStarsChange, facilities, onFacilitiesChange,
}: Props) => {
  return (
    <div className="lg:w-80 space-y-8 md:block">
      <BudgetBox range={priceRange} onChange={onPriceChange} onReset={() => onPriceChange([0, 5000000])} />
      <FilterStar selected={stars} onChange={onStarsChange} onReset={() => onStarsChange([])} />
      <FilterFacilities selected={facilities} onChange={onFacilitiesChange} onReset={() => onFacilitiesChange([])} />
    </div>
  );
};

export default FilterBox;