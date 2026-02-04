type FilterButtonProps = {
  children: React.ReactNode;
};

const FilterButton = ({ children }: FilterButtonProps) => {
  return (
    <button className="w-full bg-black text-white py-4 rounded-xl font-medium active:bg-blue-950 transition cursor-pointer">
      {children}
    </button>
  );
};

export default FilterButton;
