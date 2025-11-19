const FacilitiesFilter = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Popular Facilities</h3>
        <button className="text-indigo-600 text-sm">Reset</button>
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
              className="w-4 h-4 text-indigo-600 rounded"
            />
            <span className="text-gray-700">{item}</span>
          </label>
        ))}
      </div>
      
      {/*   <button className="text-indigo-600 text-sm mt-4 block">
              See All →
            </button> */}
    </div>
  );
};

export default FacilitiesFilter;
