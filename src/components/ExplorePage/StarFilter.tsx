import ResetBtn from "./ResetBtn";
import FilterTitle from "./FilterTitle";

const StarFilter = () => {

  return (
    <div className="bg-white rounded-xl p-6">
      
      <div className="flex justify-between items-center mb-4">
        <FilterTitle title="Rating"></FilterTitle>
        <ResetBtn></ResetBtn>
      </div>

      <div className="space-y-3">
        {[
          "★★★★★",
          "★★★★",
          "★★★",
          "★★",
          "★",
        ].map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-yellow-400">{item}</span>
          </label>
        ))}
      </div>

    </div>
  );
};

export default StarFilter;
