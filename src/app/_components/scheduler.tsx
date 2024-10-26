"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TView } from "./types";
import SelectViewMenu from "./select-view-menu";
import CalendarComp from "./calendar";
import {
  format,
  startOfToday,
  addMonths,
  parse,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  startOfWeek,
  add,
  isSameMonth,
  isToday,
  isSameDay,
  parseISO,
  getMonth,
} from "date-fns";
import TooltipWrapper from "./tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, View } from "lucide-react";
import SessionFilterMenu from "./sessions-filter-menu";

export default function Scheduler() {
  const [selectedView, setSelectedView] = useState<TView>("week");
  const changeView = (value: TView) => {
    setSelectedView(value);
  };

  // time logic
  let today = startOfToday();
  const [date, setDate] = useState<Date | undefined>(today);
  let [currentMonth, setCurrentMonth] = useState(
    format(date as Date, "MMM-yyyy")
  );
  useEffect(() => {
    if (date) {
      setCurrentMonth(format(date, "MMM-yyyy"));
    }
  }, [date]);

  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  let days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  const nextMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setDate(firstDayNextMonth);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const prevMonth = () => {
    let firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setDate(firstDayPreviousMonth);
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  };

  const nextWeek = () => {
    let firstDayNextWeek = add(startOfWeek(date as Date), { weeks: 1 });
    setDate(firstDayNextWeek);
    setCurrentMonth(format(firstDayNextWeek, "MMM-yyyy"));
  };

  const prevWeek = () => {
    let firstDayPreviousWeek = add(startOfWeek(date as Date), { weeks: -1 });
    setDate(firstDayPreviousWeek);
    setCurrentMonth(format(firstDayPreviousWeek, "MMM-yyyy"));
  };

  const nextDay = () => {
    let nextDay = add(date as Date, { days: 1 });
    setDate(nextDay);
    setCurrentMonth(format(nextDay, "MMM-yyyy"));
  };

  const prevDay = () => {
    let previousDay = add(date as Date, { days: -1 });
    setDate(previousDay);
    setCurrentMonth(format(previousDay, "MMM-yyyy"));
  };

  const [filters, setFilters] = useState({
    activities: [],
    coaches: [],
  });

  return (
    <main className="flex flex-col gap-3  w-full">
      <nav className="w-full h-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CurrentDatePicker
            selectedView={selectedView}
            prevDuration={
              selectedView === "month"
                ? prevMonth
                : selectedView === "week"
                ? prevWeek
                : prevDay
            }
            nextDuration={
              selectedView === "month"
                ? nextMonth
                : selectedView === "week"
                ? nextWeek
                : nextDay
            }
            date={date}
            setDate={setDate}
          />
        </div>
        <div className="flex items-center gap-2">
          <SessionFilterMenu />
          <SelectViewMenu selectedView={selectedView} changeView={changeView} />
          <Button
            variant={"outline"}
            onClick={() => setDate(today)}
            size={"sm"}
            className="flex bg-white items-center gap-1 border border-neutral-200 text-sm hover:bg-neutral-100 p-1 px-3  hover:text-black rounded"
          >
            Today
          </Button>
        </div>
      </nav>
        <CalendarComp
          currentDate={date}
          days={days}
          selectedView={selectedView}
        />
    </main>
  );
}

type CurrentDatePickerProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  prevDuration: () => void;
  nextDuration: () => void;
  selectedView: string;
};

const CurrentDatePicker = ({
  date,
  setDate,
  prevDuration,
  nextDuration,
  selectedView,
}: CurrentDatePickerProps) => {
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  const nextPeriodLabel =
    selectedView === "day" ? "Tomorrow" : `Next ${selectedView}`;
  const prevPeriodLabel =
    selectedView === "day" ? "Yesterday" : `Last ${selectedView}`;

  return (
    <div className="flex items-center gap-2">
      {" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              " justify-center  text-center font-semibold w-48 text-xl tracking-tight",
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
            defaultMonth={date}
            classNames={{
              day_selected: "bg-blue-200 hover:!bg-blue-200",
            }}
            onSelect={handleDateSelect}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <div className="flex items-center gap-1">
        <TooltipWrapper label={prevPeriodLabel}>
          <Button
            onClick={prevDuration}
            size={"icon"}
            variant={"outline"}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} strokeWidth={3} />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label={nextPeriodLabel}>
          <Button
            onClick={nextDuration}
            size={"icon"}
            variant={"outline"}
            className="h-8 w-8"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
};
