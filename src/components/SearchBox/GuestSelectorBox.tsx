import { useState } from "react";

const GuestSelector: React.FC = () => {
  const [showGuestBox, setShowGuestBox] = useState(false);
  const [adults, setAdults] = useState<number>(1);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);

  const toggleGuestBox = () => setShowGuestBox(!showGuestBox);
  const handleDone = () => setShowGuestBox(false);

  return (
    <div className="flex flex-col flex-1 relative w-full">
      <label className="text-xs text-gray-500 mb-1">Guest & Room</label>
      <button
        onClick={toggleGuestBox}
        className="w-full border rounded-lg p-3 text-left whitespace-nowrap overflow-hidden text-ellipsis"
      >
        {adults} adults · {children} children · {rooms} rooms
      </button>

      {showGuestBox && (
        <div
          className="
            absolute left-0 mt-2 w-full bg-white border rounded-2xl shadow-lg p-4 z-30
            md:left-full md:ml-2 md:w-64
          "
        >
          {/* Adults */}
          <div className="flex justify-between items-center mb-3">
            <span>Adults</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="border px-2 rounded"
              >
                -
              </button>
              <span>{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center mb-3">
            <span>Children</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="border px-2 rounded"
              >
                -
              </button>
              <span>{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>
          </div>

          {/* Rooms */}
          <div className="flex justify-between items-center mb-4">
            <span>Rooms</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRooms(Math.max(1, rooms - 1))}
                className="border px-2 rounded"
              >
                -
              </button>
              <span>{rooms}</span>
              <button
                onClick={() => setRooms(rooms + 1)}
                className="border px-2 rounded"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleDone}
            className="w-full border rounded-lg py-2 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestSelector;
