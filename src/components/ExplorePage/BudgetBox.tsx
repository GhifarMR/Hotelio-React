const BudgetBox = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Your Budget</h3>
        <button className="text-indigo-600 text-sm">Reset</button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Per Room / Per Night</p>

      <div className="block items-center gap-4 mt-2">
        {["Min", "Max"].map((item) => (
          <div className="flex items-center gap-4 mt-2">
            <p>{item}</p>
            <input type="search" className="border-2 rounded-lg p-1" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetBox;
