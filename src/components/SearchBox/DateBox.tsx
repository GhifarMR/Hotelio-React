import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";
const isMobile = window.innerWidth < 768;

const DateBox = () => {
   const [dateRange, setDateRange] = useState<DateRange | undefined>();

   const dateLabel =
    dateRange?.from && dateRange?.to
      ? `${format(dateRange.from, "dd MMM")} - ${format(dateRange.to, "dd MMM yyyy")}`
      : dateRange?.from
        ? format(dateRange.from, "dd MMM yyyy")
        : "Check-in - Check-out";
  

  return (
    <div className="flex flex-col flex-1">
      <label className="text-xs text-gray-500 mb-1 font-medium">Date</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-start font-normal text-sm h-10.5 text-gray-800"
          >
            {dateLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={isMobile ? 1 : 2}
            disabled={{ before: new Date() }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateBox;
