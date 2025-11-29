const StarFilter = () => {

  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Rating</h3>
        <button className="text-indigo-600 text-sm">Reset</button>
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
              className="w-4 h-4 rounded"
            />
            <span className="text-yellow-400">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StarFilter;
