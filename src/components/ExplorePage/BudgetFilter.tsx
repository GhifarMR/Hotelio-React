import FilterTitle from "./FilterTitle";
import ResetBtn from "./ResetBtn";

const BudgetBox = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <FilterTitle title="Budget"></FilterTitle>
        <ResetBtn></ResetBtn>
      </div>
      <p className="text-sm text-gray-600 mb-4">Per Room / Per Night</p>

      <div className="block items-center gap-4 mt-2">
        {["Min", "Max"].map((item) => (
          <div className="flex items-center gap-4 mt-2">
            <p>{item}</p>
            <input type="search" className="border-2 rounded-lg py-1 px-2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetBox;
