const DateBox = () => {
  return (
    <div className="flex flex-col sm:flex-row flex-1 gap-3 w-full md:w-auto">
      <div className="flex flex-col flex-1">
        <label className="text-xs text-gray-500 mb-1">Check-in</label>
        <input type="date" className="flex-1 border rounded-lg p-3 text-sm" />
      </div>
      <div className="flex flex-col flex-1">
        <label className="text-xs text-gray-500 mb-1">Check-out</label>
        <input type="date" className="flex-1 border rounded-lg p-3 text-sm" />
      </div>
    </div>
  );
};

export default DateBox;
