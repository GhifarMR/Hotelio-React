import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const GuestSelector: React.FC = () => {

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const guestLabel = `${adults} adults · ${children} children · ${rooms} rooms`;

  return (
    <div>

    <label className="text-xs text-gray-500 mb-1 font-medium">
          Guest & Room
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start font-normal text-sm h-10.5 text-gray-800"
            >
              {guestLabel}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-72">
            {[
              {
                label: "Adults",
                sub: "Age 13+",
                value: adults,
                setter: setAdults,
                min: 1,
              },
              {
                label: "Children",
                sub: "Age 0–12",
                value: children,
                setter: setChildren,
                min: 0,
              },
              {
                label: "Rooms",
                sub: "",
                value: rooms,
                setter: setRooms,
                min: 1,
              },
            ].map(({ label, sub, value, setter, min }) => (
              <div
                key={label}
                className="flex justify-between items-center py-3 border-b last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">{label}</p>
                  {sub && <p className="text-xs text-gray-400">{sub}</p>}
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 text-gray-800"
                    onClick={() => setter(Math.max(min, value - 1))}
                    disabled={value <= min}
                  >
                    -
                  </Button>
                  <span className="w-4 text-center text-sm text-gray-800">
                    {value}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 text-gray-800"
                    onClick={() => setter(value + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </PopoverContent>
        </Popover>
    </div>
  );
};

export default GuestSelector;
