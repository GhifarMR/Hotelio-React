import ResetBtn from "./ResetBtn";

const FacilitiesFilter = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Popular Facilities</h3>
        <ResetBtn></ResetBtn>
      </div>
      <div className="space-y-3">
        {[
          "Restaurant",
          "Breakfast Available",
          "Gym",
          "Pools",
          "Spa",
          "WiFi Included",
        ].map((item) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded cursor-pointer"
            />
            <span className="text-black">{item}</span>
          </label>
        ))}
      </div>
      
    </div>
  );
};

export default FacilitiesFilter;
