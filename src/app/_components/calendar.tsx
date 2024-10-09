"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, startOfToday } from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";

const Scheduler = () => {
  let today = startOfToday();

  const [date, setDate] = useState<Date | undefined>(today);

  return (
    <div className="max-w-7xl w-full h-[70vh] border border-neutral-200 rounded-md">
      <div className="w-full h-16 border-b flex items-center p-4">
        <CurrentDate date={date} setDate={setDate} />
      </div>
    </div>
  );
};

// ************************** MINI COMPONENTS ************************************** //

const CurrentDate = ({
  date,
  setDate,
}: {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  return (
    <div>
      {" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              " justify-start text-left font-semibold text-xl tracking-tight",
              !date && "text-muted-foreground"
            )}
          >
            {date ? format(date, "MMMM yyyy") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Scheduler;
