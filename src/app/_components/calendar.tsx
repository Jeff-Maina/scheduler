"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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

// * data yo



const meetings = [
  {
    subject: "Scrabble Practice",
    description: "Weekly Scrabble practice with all players.",
    startDateTime: "2024-09-12T10:00",
    endDateTime: "2024-09-12T12:00",
    coach: "John Doe",
    recurring: true,
    meetingMode: "in-person",
    meetingType: "group",
    invitedGuests: ["Jane Smith", "Albert Brown"],
    location: "Room 12, Building A",
    isAllDay: false,
    color: "200, 50%, 50%",
    eventActivity: "scrabble",
  },
  {
    subject: "Chess Masterclass",
    description: "Advanced tactics in chess for top players.",
    startDateTime: "2024-09-15T15:00",
    endDateTime: "2024-09-15T17:00",
    coach: "Alice Lee",
    recurring: false,
    meetingMode: "online",
    meetingType: "group",
    invitedGuests: ["Mark Turner", "Samantha Green"],
    location: null,
    isAllDay: false,
    color: "120, 60%, 40%",
    eventActivity: "chess",
  },
  {
    subject: "Coding Bootcamp Intro",
    description: "Introduction to coding concepts for beginners.",
    startDateTime: "2024-09-20T09:00",
    endDateTime: "2024-09-20T12:00",
    coach: "Emma Davis",
    recurring: false,
    meetingMode: "in-person",
    meetingType: "group",
    invitedGuests: ["Lucas Grey"],
    location: "Room 15, Building B",
    isAllDay: false,
    color: "250, 50%, 45%",
    eventActivity: "coding",
  },
  {
    subject: "Chess Open Session",
    description: "Open chess practice for all levels.",
    startDateTime: "2024-10-01T13:00",
    endDateTime: "2024-10-01T15:00",
    coach: "Bob Carter",
    recurring: true,
    meetingMode: "in-person",
    meetingType: "group",
    invitedGuests: ["Sarah Johnson", "Chris Blue"],
    location: "Room 8, Building C",
    isAllDay: false,
    color: "340, 40%, 60%",
    eventActivity: "chess",
  },
  {
    subject: "Custom Strategy Planning",
    description: "Planning strategies for upcoming events.",
    startDateTime: "2024-10-12T11:00",
    endDateTime: "2024-10-12T13:00",
    coach: "Michael Lee",
    recurring: false,
    meetingMode: "online",
    meetingType: "individual",
    invitedGuests: ["Robert Thompson"],
    location: null,
    isAllDay: false,
    color: "30, 55%, 50%",
    eventActivity: "custom",
  },
  {
    subject: "Scrabble Tournament",
    description: "Monthly Scrabble tournament for all players.",
    startDateTime: "2024-10-18T14:00",
    endDateTime: "2024-10-18T18:00",
    coach: "Anna White",
    recurring: false,
    meetingMode: "in-person",
    meetingType: "group",
    invitedGuests: ["Emily Fox", "James Bond"],
    location: "Room 7, Building A",
    isAllDay: false,
    color: "280, 50%, 45%",
    eventActivity: "scrabble",
  },
];

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
    console.log(firstDayNextMonth);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const prevMonth = () => {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
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
                  "bg-orange-100 border-orange-400  border-x border-y"
              )}
            >
              <time
                dateTime={format(day, "yyyy-MM-dd")}
                className="text-xs shrink-0 font-bold text-neutral-500"
              >
                {format(day, "d")}
              </time>

              <ScrollArea className="w-full h-28 pb-2 pr-3">
                {meetings.map((meeting, index) => {
                  return (
                    <>
                      {isSameDay(parseISO(meeting.startDateTime), day) && (
                        <MeetingCard />
                      )}
                    </>
                  );
                })}
              </ScrollArea>
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

const MeetingCard = ({}) => {
  return (
    <button className="w-full text-left p-1 mb-1 bg-neutral-200 rounded-md flex gap-1.5 items-stretch">
      <div className="w-1 shrink-0 bg-neutral-500 rounded-full"></div>
      <div className="min-h-fit flex items-center">
        <p className="text-xs font-medium text-neutral-800 line-clamp-1">
          Weekly Scrabble Practice
        </p>
      </div>
    </button>
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
