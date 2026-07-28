import ResetBtn from "./ResetBtn";
import FilterTitle from "./FilterTitle";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  selected: number[];
  onChange: (selected: number[]) => void;
  onReset: () => void;
}

const FilterStar = ({ selected, onChange, onReset }: Props) => {
  const toggle = (val: number) => {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <FilterTitle title="Hotel Stars" />
        <ResetBtn onClick={onReset} />
      </div>
      <div className="space-y-3">
        {[5, 4, 3, 2, 1].map((n) => (
          <label key={n} className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={selected.includes(n)} onCheckedChange={() => toggle(n)} />
            <span className="text-yellow-400">{"★".repeat(n)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterStar;