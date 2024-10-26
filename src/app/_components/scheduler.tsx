"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { TView } from "./types";
import SelectViewMenu from "./select-view-menu";
import CalendarComp from "./calendar";
import {
  format,
  startOfToday,
  parse,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfWeek,
  add,
} from "date-fns";
import TooltipWrapper from "./tooltip-wrapper";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Dices,
  User,
  View,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

// DATA
const coaches = ["John", "Adam", "Sarah", "Matt", "Emma", "Chris", "Michael"];
const activities = ["Chess", "Scrabble", "Coding"];
const statuses = ["Completed", "Pending", "Cancelled"];

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
    activities: [] as string[],
    coaches: [] as string[],
    status: [] as string[],
  });

  const updateFilter = (param: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [param]: prev[param].includes(value)
        ? prev[param].filter((v) => v !== value)
        : [...prev[param], value],
    }));
  };

  const resetFilter = (param: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [param]: [],
    }));
  };

  return (
    <main className="flex flex-col gap-3  w-full">
      <nav className="w-full h-10 flex items-center justify-between">
        <div className="flex h-full items-center gap-4">
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

          <div className="h-4 rounded-full w-[2px] bg-neutral-300" />

          <div className="flex items-center gap-3">
            <FilterBox
              activeFilters={filters.coaches}
              filterActions={{ resetFilter, updateFilter }}
              filterDetails={{
                filterType: "coaches",
                filterIcon: <User size={14} />,
              }}
              filterOptions={coaches}
            />
            <FilterBox
              activeFilters={filters.activities}
              filterActions={{ resetFilter, updateFilter }}
              filterDetails={{
                filterType: "activities",
                filterIcon: <Dices size={14} />,
              }}
              filterOptions={activities}
            />
            <FilterBox
              activeFilters={filters.status}
              filterActions={{ resetFilter, updateFilter }}
              filterDetails={{
                filterType: "status",
                filterIcon: <CircleCheck size={14} />,
              }}
              filterOptions={statuses}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
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

type TActivity = "activities" | "coaches" | "status";

type TFiltersProps = {
  activeFilters: string[];
  filterOptions: string[];
  filterDetails: {
    filterType: TActivity;
    filterIcon: React.ReactNode;
  };
  filterActions: {
    resetFilter: (param: TActivity) => void;
    updateFilter: (param: TActivity, value: string) => void;
  };
};

const FilterBox = ({
  activeFilters,
  filterActions,
  filterDetails,
  filterOptions,
}: TFiltersProps) => {
  const { filterIcon, filterType } = filterDetails;
  const { resetFilter, updateFilter } = filterActions;

  const [stateOptions, setOptions] = useState(filterOptions);
  const [searchTerm, setSearchTerm] = useState<null | string>(null);

  const SearchOptions = (value: string) => {
    setSearchTerm(value);
    const results =
      value === ""
        ? filterOptions
        : filterOptions.filter((f) =>
            f.toLowerCase().includes(value.toLowerCase() as string)
          );
    setOptions(results);
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");

    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="">
        <Button
          variant={"outline"}
          size={"sm"}
          className="text-sm border-dashed border-neutral-200 flex items-center gap-2"
        >
          <span className="capitalize flex items-center gap-1">
            {filterIcon}
            {filterType}
          </span>
          {activeFilters.length > 0 ? (
            <>
              <span className="text-neutral-500">|</span>
              <div className="flex items-center gap-1">
                {activeFilters.length <= 2 ? (
                  activeFilters.map((fil, index) => (
                    <span
                      key={index}
                      className="p-0.5 bg-neutral-100 text-sm font-normal rounded-lg px-2"
                    >
                      {fil}
                    </span>
                  ))
                ) : (
                  <span className="p-0.5 px-2 rounded-lg bg-neutral-100">
                    {activeFilters.length} selected
                  </span>
                )}
              </div>
            </>
          ) : null}{" "}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[13rem] flex flex-col gap-1"
        align="start"
      >
        <div className="w-full border-b">
          <Input
            placeholder={`Search ${filterType}`}
            className="!border-none !ring-0 !outline-none"
            value={searchTerm || ""}
            onChange={(e) => SearchOptions(e.target.value)}
          />
        </div>
        <ScrollArea className="flex max-h-[190px] flex-col w-full">
          {stateOptions.length > 0 ? (
            stateOptions.map((fil, index) => {
              return (
                <div
                  className="p-2 flex items-center gap-2 hover:bg-neutral-100 "
                  key={index}
                >
                  <Checkbox
                    onCheckedChange={() => updateFilter(filterType, fil)}
                    checked={activeFilters.includes(fil)}
                    id={`${fil}-${index}`}
                    className="cursor-pointer"
                  />
                  <Label htmlFor={`${fil}-${index}`} className="cursor-pointer">
                    {highlightSearchTerm(fil)}
                  </Label>
                </div>
              );
            })
          ) : (
            <div className="flex h-8 items-center p-2 text-sm text-neutral-500">
              No results
            </div>
          )}
        </ScrollArea>
        <hr />
        <div className="p-2 pb-1">
          <button
            onClick={() => resetFilter(filterType)}
            disabled={!(activeFilters.length > 0)}
            className="w-full h-7 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:!bg-neutral-900 text-sm rounded-sm bg-neutral-900 hover:bg-black font-medium text-white flex items-center justify-center gap-2"
          >
            Reset filters
          </button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
