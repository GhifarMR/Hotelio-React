import { useState } from "react";
import ResetBtn from "./ResetBtn";
import { Checkbox } from "@/components/ui/checkbox";

const FilterFacilities = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (val: string) => {
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
  };

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Popular Facilities</h3>
        <ResetBtn />
      </div>
      <div className="space-y-3">
        {["Restaurant", "Breakfast Available", "Gym", "Pools", "Spa", "WiFi Included"].map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={selected.includes(item)}
              onCheckedChange={() => toggle(item)}
            />
            <span className="text-sm text-gray-800">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default FilterFacilities;