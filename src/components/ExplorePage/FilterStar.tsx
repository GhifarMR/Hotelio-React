import { useState } from "react";
import ResetBtn from "./ResetBtn";
import FilterTitle from "./FilterTitle";
import { Checkbox } from "@/components/ui/checkbox";

const FilterStar = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <FilterTitle title="Rating" />
        <ResetBtn />
      </div>
      <div className="space-y-3">
        {["★★★★★", "★★★★", "★★★", "★★", "★"].map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={selected.includes(item)}
              onCheckedChange={() => toggle(item)}
            />
            <span className="text-yellow-400">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterStar;