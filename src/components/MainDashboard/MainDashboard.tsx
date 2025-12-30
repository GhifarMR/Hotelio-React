import SearchBox from "../SearchBox/SearchBox";

const MainDashboard: React.FC = () => {
  return (
    <div className="relative mt-[9vh] w-[99%] h-[88vh] md:h-[90vh] mx-auto rounded-3xl overflow-hidden">
      
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0')",
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-5 md:px-16 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find The Best Hotel <br />
            With <span className="text-yellow-400">HOTELIO</span>
          </h1>
          <p className="text-sm md:text-lg leading-relaxed text-gray-100">
            Discover comfortable stays, exclusive deals, and unforgettable
            experiences at top hotels only with HOTELIO.
          </p>
        </div>

        <SearchBox />
      </div>
    </div>
  );
};

export default MainDashboard;
