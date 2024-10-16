"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { motion, useMotionValue } from "framer-motion";
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
  getMonth,
} from "date-fns";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TooltipWrapper from "./tooltip-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { meetings } from "../_data/meetings";
import NewEventModal from "./new-event-modal";

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
  let [currentMonth, setCurrentMonth] = useState(
    format(date as Date, "MMM-yyyy")
  );

  // update current month whenever the date changes
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
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setDate(firstDayNextMonth);
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  // drag logic
  const [isAnItemBeingDragged, setItemBeingDragged] = useState(false);
  const [draggedCardColor, setDraggedCardColor] = useState<string>("");

  const setBeingDragged = (value: boolean) => {
    setItemBeingDragged(value);
  };

  const [hoveredDate, setHoveredDate] = useState<Date | undefined>();

  function formatDateString(dateString: Date | undefined) {
    if (!dateString) return;

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  const setNewDate = (activity: TClassProps) => {
    activity.startDateTime = formatDateString(hoveredDate) || "";
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  // new event logic

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <>
      <div className="max-w-[90rem] w-full flex flex-col min-h-[70vh] border border-neutral-200 rounded-md">
        <div className="w-full h-12 shrink-0 border-b border-neutral-200 flex items-center p-4">
          <CurrentDatePicker
            previousMonth={prevMonth}
            nextMonth={nextMonth}
            date={date}
            setDate={setDate}
          />
        </div>
        <div ref={containerRef} className="h-full w-full p-4">
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
            {days.map((day, index) => {
              const isItemDraggedAndDayHovered =
                isAnItemBeingDragged && isSameDay(day, hoveredDate as Date);
              return (
                <div
                  onDoubleClick={() => {
                    setModalOpen(true);
                    setSelectedDate(day);
                  }}
                  key={index}
                  onMouseEnter={() =>
                    !isAnItemBeingDragged ? null : setHoveredDate(day)
                  }
                  onMouseLeave={() => setHoveredDate(undefined)}
                  className={cn(
                    " w-full h-36 p-2 border-t border-r",
                    index === 0 && colStartClasses[getDay(day)],
                    !isSameMonth(day, firstDayCurrentMonth) && "bg-neutral-100",
                    isToday(day) &&
                      "bg-neutral-100 border-neutral-300  border-x border-y",
                    isSameDay(day, date as Date) &&
                      "border-neutral-900 bg-neutral-100 border-x border-y",
                    isItemDraggedAndDayHovered &&
                      "border-x border-y cursor-grabbing"
                  )}
                  style={{
                    backgroundColor: isItemDraggedAndDayHovered
                      ? `hsl(${draggedCardColor}, 10%)`
                      : "",
                    borderColor: isItemDraggedAndDayHovered
                      ? `hsl(${draggedCardColor})`
                      : "",
                  }}
                >
                  <div className="flex items-center gap-2">
                    {" "}
                    <time
                      dateTime={format(day, "yyyy-MM-dd")}
                      className="text-xs shrink-0 font-bold text-neutral-500"
                    >
                      {format(day, "d")}
                    </time>
                    <small className="uppercase font-bold text-neutral-500 text-xs">
                      {" "}
                      {isToday(day)
                        ? " TODAY"
                        : format(day, "d") === "1"
                        ? format(day, "MMMM").slice(0, 3)
                        : ""}
                    </small>
                  </div>

                  <ScrollArea className="w-full h-28 pb-2 pt-1 overflow-y-auto ">
                    {meetings.map((meeting, index, array) => {
                      const meetingCount = meetings.filter(
                        (meeting) =>
                          meeting.startDateTime === formatDateString(day)
                      ).length;
                      return (
                        isSameDay(parseISO(meeting.startDateTime), day) && (
                          <MeetingCard
                            setDraggedCardColor={setDraggedCardColor}
                            setBeingDragged={setBeingDragged}
                            hoveredDate={hoveredDate}
                            meeting={meeting}
                            setNewDate={setNewDate}
                            containerRef={containerRef}
                            meetingCount={meetingCount}
                            key={index}
                          />
                        )
                      );
                    })}
                  </ScrollArea>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <NewEventModal
        isModalOpen={isModalOpen}
        toggleModal={() => setModalOpen(!isModalOpen)}
        selectedDate={date}
      />
    </>
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
  const occupiedDates = meetings.map(
    (meeting) => new Date(meeting.startDateTime)
  );

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };
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
            defaultMonth={date}
            classNames={{
              day_selected: "bg-blue-200",
            }}
            modifiers={{
              occupied: occupiedDates,
            }}
            modifiersClassNames={{
              occupied: "occupied-dates",
            }}
            onSelect={handleDateSelect}
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

type MeetingCardProps = {
  meeting: TClassProps;
  setBeingDragged: (value: boolean) => void;
  setDraggedCardColor: Dispatch<SetStateAction<string>>;
  setNewDate: (value: TClassProps) => void;
  hoveredDate: Date | undefined;
  containerRef: React.RefObject<HTMLDivElement>;
  meetingCount: number;
};

const MeetingCard = ({
  meeting,
  setBeingDragged,
  setDraggedCardColor,
  setNewDate,
  hoveredDate,
  containerRef,
  meetingCount,
}: MeetingCardProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0}
      dragSnapToOrigin
      dragConstraints={containerRef}
      dragTransition={{ bounceStiffness: 500, bounceDamping: 40 }}
      onDragStart={(event, info) => {
        setDraggedCardColor(meeting.color);
        setIsDragging(true);
        setBeingDragged(true);
      }}
      onDragEnd={(event, info) => {
        setDraggedCardColor("");
        setIsDragging(false);
        setBeingDragged(false);
        if (hoveredDate && hoveredDate !== parseISO(meeting.startDateTime)) {
          setNewDate(meeting);
        }
      }}
      animate={{
        rotate: isDragging ? 1 : 0,
      }}
      style={{
        backgroundColor: `hsl(${meeting.color},20%)`,
        pointerEvents: isDragging ? "none" : "auto",
        position: isDragging ? "fixed" : "relative",
        zIndex: isDragging ? 100 : 0,
        borderColor: isDragging
          ? `hsl(${meeting.color})`
          : `hsl(${meeting.color},10%)`,
      }}
      className={cn(
        "w-full text-left max-w-44 p-1 mb-1 border cursor-grab active:cursor-grabbing  rounded-md flex gap-1.5 items-stretch !opacity-100"
      )}
    >
      <div
        style={{
          backgroundColor: `hsl(${meeting.color})`,
        }}
        className="w-1 shrink-0 bg-neutral-500 rounded-full"
      ></div>
      <div className="min-h-fit flex flex-col gap-1 items-start">
        <p
          style={{
            color: `hsl(${meeting.color},200%)`,
          }}
          className="text-xs font-medium text- line-clamp-1"
        >
          {meeting.subject}
        </p>
        {meetingCount <= 2 && (
          <p
            style={{
              color: `hsl(${meeting.color},200%)`,
            }}
            className="text-xs font-medium"
          >
            {" "}
            <time dateTime={meeting.startDateTime}>
              {format(meeting.startDateTime, "h:mm a")}
            </time>{" "}
            -{" "}
            <time dateTime={meeting.startDateTime}>
              {format(meeting.startDateTime, "h:mm a")}
            </time>
          </p>
        )}
      </div>
    </motion.div>
  );
};

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];


export default Scheduler;

