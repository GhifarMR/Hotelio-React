import GuestSelector from "./MainDashboard/GuestSelector";

const MainDashboard: React.FC = () => {
  return (
    <div className="relative mt-[9vh] w-[99%] h-[90vh] mx-auto rounded-3xl overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-5 md:px-16 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Find The Best Hotel <br />
            With <span className="text-yellow-400">HOTELIO</span>
          </h1>
          <p className="text-sm md:text-lg leading-relaxed text-gray-100">
            Discover comfortable stays, exclusive deals, and unforgettable
            experiences at top hotels only with HOTELIO.
          </p>
        </div>

        {/* Search Box */}
        <div
          className="
            bg-white rounded-xl p-5 flex flex-col gap-4
            md:flex-row md:items-end md:gap-3
            w-full md:max-w-fit text-black mt-8 relative shadow-lg
          "
        >
          {/* Location */}
          <div className="flex flex-col flex-1 w-full md:w-auto">
            <label className="text-xs text-gray-500 mb-1">Location</label>
            <input
              type="search"
              placeholder="Enter location"
              className="flex-1 border rounded-lg p-3 text-sm w-full"
            />
          </div>

          {/* Dates */}
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

          {/* Guest Selector */}
          <GuestSelector />

          {/* Search Button */}
          <div className="flex flex-col justify-end w-full md:w-auto">
            <button className="text-black border border-black hover:bg-black hover:text-white transition-colors px-6 py-3 rounded-lg cursor-pointer w-full md:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
