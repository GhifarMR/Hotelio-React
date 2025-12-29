const LocationBox = () => {
  return (
    <div className="flex flex-col flex-1 w-full md:w-auto">
      <label className="text-xs text-black mb-1">Location</label>
      <input
        type="search"
        placeholder="Enter location"
        className="flex-1 border rounded-lg p-3 text-sm w-full"
      />
    </div>
  );
};

export default LocationBox;
