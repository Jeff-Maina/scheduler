"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { motion } from "framer-motion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
} from "date-fns";
import { Dispatch, SetStateAction, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TooltipWrapper from "./tooltip-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { meetings } from "../_data/meetings";

// * data yo

type TClassProps = {
  subject: string;
  description?: string;
  startDateTime: string;
  endDateTime: string;
  coach: string;
  recurring: boolean;
  meetingMode: "in-person" | "online";
  meetingType: "group" | "individual";
  invitedGuests: string[];
  location: string | null;
  wholeDay: boolean;
  color: string;
  eventActivity: string;
};

const Scheduler = () => {
  let today = startOfToday();

  const [date, setDate] = useState<Date | undefined>(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
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
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setDate(firstDayNextMonth);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  return (
    <div className="max-w-[90rem] w-full flex flex-col min-h-[70vh] border border-neutral-200 rounded-md">
      <div className="w-full h-12 shrink-0 border-b border-neutral-200 flex items-center p-4">
        <CurrentDatePicker
          previousMonth={prevMonth}
          nextMonth={nextMonth}
          date={date}
          setDate={setDate}
        />
      </div>
      <div className="h-full w-full p-4">
        <div className="w-full font-medium text-neutral-500 text-sm grid grid-cols-7">
          <div className="p-4 rounded-md w-full">Sun</div>
          <div className="p-4 rounded-md w-full">Mon</div>
          <div className="p-4 rounded-md w-full">Tue</div>
          <div className="p-4 rounded-md w-full">Wed</div>
          <div className="p-4 rounded-md w-full">Thur</div>
          <div className="p-4 rounded-md w-full">Fri</div>
          <div className="p-4 rounded-md w-full">Sat</div>
        </div>
        <div className="w-full h-full grid grid-cols-7 border-b border-l">
          {days.map((day, index) => (
            <div
              key={index}
              className={cn(
                " w-full h-36 p-2 border-t border-r",
                index === 0 && colStartClasses[getDay(day)],
                !isSameMonth(day, firstDayCurrentMonth) && "bg-neutral-100",
                isToday(day) &&
                  "bg-neutral-100 border-neutral-400  border-x border-y"
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className="text-xs shrink-0 font-bold text-neutral-500"
              >
                {format(day, "d")}
              </time>

              <div className="w-full h-28 pb-2 pr-3 overflow-visible">
                {meetings.map((meeting, index) => {
                  return (
                    <>
                      {isSameDay(parseISO(meeting.startDateTime), day) && (
                        <MeetingCard meeting={meeting} key={index} />
                      )}
                    </>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ************************** MINI COMPONENTS ************************************** //

type CurrentDatePickerProps = {
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
  previousMonth: () => void;
  nextMonth: () => void;
};

const CurrentDatePicker = ({
  date,
  setDate,
  previousMonth,
  nextMonth,
}: CurrentDatePickerProps) => {
  return (
    <div className="flex items-center gap-2">
      {" "}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"ghost"}
            className={cn(
              " justify-start  text-left font-semibold text-xl tracking-tight",
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
      <div className="flex items-center gap-1">
        <TooltipWrapper label="Previous month">
          <Button
            onClick={previousMonth}
            size={"icon"}
            variant={"ghost"}
            className="h-8 w-8"
          >
            <ChevronLeft size={16} strokeWidth={3} />
          </Button>
        </TooltipWrapper>
        <TooltipWrapper label="Next month">
          <Button
            onClick={nextMonth}
            size={"icon"}
            variant={"ghost"}
            className="h-8 w-8"
          >
            <ChevronRight size={16} strokeWidth={3} />
          </Button>
        </TooltipWrapper>
      </div>
    </div>
  );
};

const MeetingCard = ({ meeting }: { meeting: TClassProps }) => {
  const [isDragging, setIsDragging] = useState(false);
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragSnapToOrigin
      dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        backgroundColor: `hsl(${meeting.color},20%)`,
        borderColor: isDragging
          ? `hsl(${meeting.color})`
          : `hsl(${meeting.color},10%)`,
      }}
      className={cn(
        "w-full text-left max-w-44 p-1 mb-1 border-2  rounded-md flex gap-1.5 items-stretch"
      )}
    >
      <div
        style={{
          backgroundColor: `hsl(${meeting.color})`,
        }}
        className="w-1 shrink-0 bg-neutral-500 rounded-full"
      ></div>
      <div className="min-h-fit flex items-center">
        <p
          style={{
            color: `hsl(${meeting.color},200%)`,
          }}
          className="text-xs font-semibold text- line-clamp-1"
        >
          {meeting.subject}
          {isDragging.toString()}
        </p>
      </div>
    </motion.div>
  );
};

export default Scheduler;

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
