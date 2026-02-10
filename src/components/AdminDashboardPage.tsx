import { useState } from "react";

interface Hotel {
  id: number;
  name: string;
  city: string;
  status: "active" | "inactive";
  image: string;
}

const AdminDashboardPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([
    {
      id: 1,
      name: "Great Ghifar Hotel",
      city: "Wonosobo",
      status: "active",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    },
    {
      id: 2,
      name: "Ocean View Resort",
      city: "Bali",
      status: "inactive",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
    },
  ]);

  const toggleStatus = (id: number) => {
    setHotels((prev) =>
      prev.map((hotel) =>
        hotel.id === id
          ? {
              ...hotel,
              status: hotel.status === "active" ? "inactive" : "active",
            }
          : hotel,
      ),
    );
  };

  const [showLogMenu, setShowLogMenu] = useState(false);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <button
              className="text-3xl font-bold cursor-pointer"
              onClick={() => setShowLogMenu(!showLogMenu)}
            >
              BABA.CO
            </button> 

            {showLogMenu && (
              <div className="absolute bg-white bottom rounded p-2 cursor-pointer shadow">
                <a href="/">Log Out</a>
              </div>
            )}
            
          </div>

          <div>
            <a
              href="/admin-dashboard-add"
              className="bg-black text-white px-5 py-2 rounded-lg cursor-pointer"
            >
              Add Hotel
            </a>
          </div>
        </div>

        {/* HOTEL LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img src={hotel.image} className="h-44 w-full object-cover" />

              <div className="p-5">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>

                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      hotel.status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {hotel.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mb-4">{hotel.city}</p>

                {/* ACTIONS */}
                <div className="flex flex-wrap gap-3 text-sm">
                  <a
                    href="/admin-dashboard-edit"
                    className="border px-3 py-1 rounded hover:bg-gray-100"
                  >
                    Edit
                  </a>

                  <button
                    onClick={() => toggleStatus(hotel.id)}
                    className={`px-3 py-1 rounded cursor-pointer ${
                      hotel.status === "active"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {hotel.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
