import ResetBtn from "./ResetBtn";
import { Checkbox } from "@/components/ui/checkbox";
import { HOTEL_FACILITIES } from "@/constants/facilities";

interface Props {
  selected: string[];
  onChange: (selected: string[]) => void;
  onReset: () => void;
}

const FilterFacilities = ({ selected, onChange, onReset }: Props) => {
  const toggle = (val: string) => {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Popular Facilities</h3>
        <ResetBtn onClick={onReset} />
      </div>
      <div className="space-y-3">
        {HOTEL_FACILITIES.map((f) => (
          <label key={f.value} className="flex items-center gap-3 cursor-pointer">
            <Checkbox checked={selected.includes(f.value)} onCheckedChange={() => toggle(f.value)} />
            <span className="text-sm text-gray-800">{f.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterFacilities;