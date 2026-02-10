import { useState } from "react";
import InputBoxAdd from "./AdminDashboard/InputBoxAdd";
import DescriptionBoxAdd from "./AdminDashboard/DescriptionBoxAdd";

interface Room {
  name: string;
  price: number;
  discountPrice: number;
  images: string[];
}

const AdminDashboardPageAdd = () => {
  
  // Hotel images
  const [hotelImages, setHotelImages] = useState<string[]> ([""]);

  const addHotelImage = () => setHotelImages([...hotelImages, ""]);

  const updateHotelImage = (index: number, value: string) => {
    const updated = [...hotelImages];
    updated[index] = value;
    setHotelImages(updated);
  };

  const removeHotelImage = (index: number) => {
    setHotelImages(hotelImages.filter((_, i) => i !== index));
  };

  // Rooms
  const [rooms, setRooms] = useState<Room[]>([
    {
      name: "",
      price: 0,
      discountPrice: 0,
      images: [""],
    },
  ]);

  const addRoom = () => {
    setRooms([
      ...rooms,
      { name: "", price: 0, discountPrice: 0, images: [""] },
    ]);
  };

  const removeRoom = (index: number) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const updateRoom = (index: number, field: keyof Room, value: any) => {
    const updated = [...rooms];
    updated[index] = { ...updated[index], [field]: value };
    setRooms(updated);
  };

  /* ---------- ROOM IMAGES ---------- */
  const addRoomImage = (roomIndex: number) => {
    const updated = [...rooms];
    updated[roomIndex].images.push("");
    setRooms(updated);
  };

  const updateRoomImage = (
    roomIndex: number,
    imageIndex: number,
    value: string,
  ) => {
    const updated = [...rooms];
    updated[roomIndex].images[imageIndex] = value;
    setRooms(updated);
  };

  const removeRoomImage = (roomIndex: number, imageIndex: number) => {
    const updated = [...rooms];
    updated[roomIndex].images = updated[roomIndex].images.filter(
      (_, i) => i !== imageIndex,
    );
    setRooms(updated);
  };

  /* ---------- FACILITIES ---------- */
  const facilities = [
    "Wifi",
    "AC",
    "Swimming Pool",
    "Parking Area",
    "Breakfast",
    "Restaurant",
    "Gym",
    "Pet Allowed",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-3xl font-bold mb-6">Add New Hotel</h1>

        <form className="flex flex-col gap-6">
          {/* Input Hotel */}
          <InputBoxAdd type="text">Hotel Name</InputBoxAdd>
          <InputBoxAdd type="text">City</InputBoxAdd>
          <InputBoxAdd type="text">Full Address</InputBoxAdd>

          <DescriptionBoxAdd />

          {/* HOTEL IMAGES */}
          <div>
            <label className="font-medium block mb-2">Hotel Images</label>

            {hotelImages.map((img, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Image URL"
                  value={img}
                  onChange={(e) => updateHotelImage(idx, e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />

                {/* SHOW DELETE BUTTON */}
                {hotelImages.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHotelImage(idx)}
                    className="text-red-500 text-sm"
                  >
                    Delete
                  </button>
                  
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addHotelImage}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add hotel image
            </button>
          </div>

          {/* FACILITIES */}
          <div>
            <label className="font-medium block mb-2">Facilities</label>

            <div className="grid grid-cols-2 gap-2 text-sm">
              {facilities.map((facility) => (
                <label key={facility} className="flex items-center gap-2">
                  <input type="checkbox" />
                  {facility}
                </label>
              ))}
            </div>
          </div>

          {/* ROOMS */}
          <div>
            <label className="font-medium block mb-2">Rooms</label>

            {rooms.map((room, roomIdx) => (
              <div key={roomIdx} className="border rounded-lg p-4 mb-4">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold">Room {roomIdx + 1}</span>

                  {rooms.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRoom(roomIdx)}
                      className="text-red-500 text-sm"
                    >
                      Delete Room
                    </button>
                  )}
                </div>

                {/* ROOM NAME */}
                <input
                  type="text"
                  placeholder="Room Name"
                  value={room.name}
                  onChange={(e) => updateRoom(roomIdx, "name", e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />

                {/* ROOM IMAGES */}
                <label className="text-sm font-medium block mb-1">
                  Room Images
                </label>

                {room.images.map((img, imgIdx) => (
                  <div key={imgIdx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Room Image URL"
                      value={img}
                      onChange={(e) =>
                        updateRoomImage(roomIdx, imgIdx, e.target.value)
                      }
                      className="w-full border rounded-lg px-3 py-2"
                    />

                    {room.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRoomImage(roomIdx, imgIdx)}
                        className="text-red-500 text-sm"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addRoomImage(roomIdx)}
                  className="text-sm text-blue-600 hover:underline mb-3"
                >
                  + Add room image
                </button>

                {/* PRICE */}
                <input
                  type="number"
                  placeholder="Normal Price"
                  onChange={(e) =>
                    updateRoom(roomIdx, "price", Number(e.target.value))
                  }
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                />

                {/* DISCOUNT PRICE */}
                <input
                  type="number"
                  placeholder="Discount Price"
                  onChange={(e) =>
                    updateRoom(roomIdx, "discountPrice", Number(e.target.value))
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addRoom}
              className="text-sm text-blue-600 hover:underline"
            >
              + Add another room
            </button>
          </div>

          {/* STATUS */}
          <div>
            <label className="font-medium">Status</label>
            <select className="w-full border rounded-lg px-3 py-2 mt-1">
              <option value="draft">Draft</option>
              <option value="active">Active</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-lg hover:bg-gray-900 cursor-pointer"
          >
            Save Hotel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboardPageAdd;
