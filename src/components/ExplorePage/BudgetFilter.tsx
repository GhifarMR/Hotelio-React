import { useState } from "react";
import FilterTitle from "./FilterTitle";
import ResetBtn from "./ResetBtn";
import { Slider } from "@/components/ui/slider";

const BudgetBox = () => {
  const [range, setRange] = useState([200000, 800000]);

  const format = (val: number) =>
    "Rp. " + val.toLocaleString("id-ID");

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-2">
        <FilterTitle title="Budget" />
        <ResetBtn />
      </div>
      <p className="text-sm text-gray-500 mb-6">Per Room / Per Night</p>

      <Slider
        min={0}
        max={5000000}
        step={50000}
        value={range}
        onValueChange={setRange}
        className="mb-4"
      />

      <div className="flex justify-between text-sm text-gray-700">
        <span>{format(range[0])}</span>
        <span>{format(range[1])}</span>
      </div>
    </div>
  );
};

export default BudgetBox;