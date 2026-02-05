const DescriptionBoxAdd = () => {
  return (
    <div>
      <label className="font-medium">Description</label>
      <textarea
        placeholder="Describe your Hotel"
        className="w-full border rounded-lg px-3 py-2 mt-1 min-h-[120px]"
      />
    </div>
  );
};

export default DescriptionBoxAdd;
