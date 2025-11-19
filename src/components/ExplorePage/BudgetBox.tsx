const BudgetBox = () => {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Your Budget</h3>
        <button className="text-indigo-600 text-sm">Reset</button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Per Room / Per Night</p>
      <div className="flex items-center gap-4">
        <p>Min</p>
        <input type="search" className="border-2 rounded-lg p-2" />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <p>Max</p>
        <input type="search" className="border-2 rounded-lg p-2" />
      </div>
    </div>
  );
};

export default BudgetBox;
