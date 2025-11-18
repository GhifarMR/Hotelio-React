import LocationBox from "./LocationBox";
import DateBox from "./DateBox";
import GuestSelectorBox from "./GuestSelectorBox";
import SearchButtonBox from "./SearchButtonBox";

const SearchBox = () => {
  return (
    <div
      className="
            bg-white rounded-xl p-5 flex flex-col gap-4
            md:flex-row md:items-end md:gap-3
            w-full md:max-w-fit text-black mt-8 relative
          "
    >
      <LocationBox />
      <DateBox />
      <GuestSelectorBox />
      <SearchButtonBox />
    </div>
  );
};

export default SearchBox;
