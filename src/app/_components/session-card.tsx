import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { differenceInMinutes, format, parseISO } from "date-fns";

import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock,
  Copy,
  Dices,
  Edit,
  Link,
  Mail,
  MapPin,
  Pencil,
  Repeat,
  Scroll,
  Tag,
  Trash,
  User,
  UserRound,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { TSessionType, coaches } from "../utils/dummy-data";
import TooltipWrapper from "./tooltip-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";

type TSessionCardPropsType = {
  session: TSessionType;
  type?: "month" | "week" | "day";
  updateSession: (val: TSessionType) => void;
};

export default function SessionCard({
  session,
  type,
  updateSession,
}: TSessionCardPropsType) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  const toggleEditSheet = () => setSheetOpen((prev) => !prev);

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const toggleDetailsPopover = () => setPopoverOpen((prev) => !prev);

  const [isDeletingClass, setDeletingClass] = useState(false);
  const toggleDeleteModal = () => setDeletingClass((prev) => !prev);

  const [isMailingSessionDetails, setMailingSessionDetails] = useState(false);
  const toggleMailDetailsModal = () =>
    setMailingSessionDetails((prev) => !prev);

  const sessionActions = {
    deleteSession: () => toggleDeleteModal(),
    editSession: () => toggleEditSheet(),
    mailDetails: () => toggleMailDetailsModal(),
  };

  const start = parseISO(session.startTime);
  const end = parseISO(session.endTime);

  const totalMinutes = differenceInMinutes(end, start);

  return (
    <>
      <div className="w-full h-full">
        <SessionContextMenu toggleEditSheet={toggleEditSheet}>
          <div
            onClick={toggleDetailsPopover}
            className={cn(
              "flex w-full h-full min-h-9 items-center cursor-pointer gap-1 pr-3  opacity-80 hover:opacity-100 rounded",
              type === "week" && "items-start p-2 gap-2 opacity-100",
              isPopoverOpen && "shadow-lg",
              type === "month" && "h-9"
            )}
            style={{
              color: `hsl(${session.colorCode})`,
              backgroundColor: `hsl(${session.colorCode}, 10%)`,
            }}
          >
            <div
              className="h-full w-1 shrink-0 rounded-full"
              style={{
                backgroundColor: `hsl(${session.colorCode})`,
              }}
            />
            {type === "month" && (
              <p className="text-xs font-semibold line-clamp-1">
                <span className="opacity-60 text-[10px] mx-1">
                  {format(parseISO(session.startTime), "h:mm a ")}
                </span>{" "}
                {session.title}
              </p>
            )}
            {type === "week" && (
              <div
                className={cn(
                  " h-full flex flex-col",
                  totalMinutes <= 60 ? "justify-center" : ""
                )}
              >
                <p className="text-sm font-semibold line-clamp-2">
                  {session.title}
                </p>
                {totalMinutes > 60 ? (
                  <div className="flex items-center gap-2 leading-none">
                    <span className="text-[10px] font-semibold tracking-tight mr-1">
                      {format(parseISO(session.startTime), "h:mm a ")}
                    </span>
                    -
                    <span className="text-[10px] font-semibold tracking-tight mr-1">
                      {format(parseISO(session.endTime), "h:mm a ")}
                    </span>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </SessionContextMenu>
      </div>
      <SessionEditSheet
        isSheetOpen={isSheetOpen}
        session={session}
        toggleEditSheet={toggleEditSheet}
        updateSession={updateSession}
      />
      <SessionMoreDetails
        isPopoverOpen={isPopoverOpen}
        session={session}
        toggleDetailsPopover={toggleDetailsPopover}
        sessionActions={sessionActions}
      />
      <DeleteSessionModal
        isDeletingClass={isDeletingClass}
        toggleDelete={toggleDeleteModal}
        session={session}
      />
      <MailDetailsModal
        isMailingDetails={isMailingSessionDetails}
        session={session}
        toggleMailingDetails={toggleMailDetailsModal}
      />
    </>
  );
}

type TContextMenuProps = {
  children: React.ReactNode;
  toggleEditSheet: () => void;
};

const SessionContextMenu = ({
  children,
  toggleEditSheet,
}: TContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-44">
        <ContextMenuItem
          onClick={toggleEditSheet}
          className="flex  items-center justify-between hover:bg-neutral-100 cursor-pointer "
        >
          <div className="flex items-center gap-2">
            <Pencil size={12} />
            Edit
          </div>
        </ContextMenuItem>
        <ContextMenuItem className="flex  items-center justify-between hover:bg-neutral-100 cursor-pointer ">
          <div className="flex items-center gap-2">
            <Copy size={12} />
            Copy
          </div>
          <small className="text-neutral-500">Ctrl C</small>
        </ContextMenuItem>
        <ContextMenuItem className="flex hover:bg-red-50 hover:text-red-700 cursor-pointer  items-center justify-between text-red-600">
          <div className="flex items-center gap-2">
            <Trash size={12} />
            Delete
          </div>
          <small className="text-neutral-500">Ctrl D</small>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

type TSessionEditType = {
  isSheetOpen: boolean;
  toggleEditSheet: () => void;
  session: TSessionType;
  updateSession: (val: TSessionType) => void;
};

const SessionEditSheet = ({
  isSheetOpen,
  toggleEditSheet,
  session,
  updateSession,
}: TSessionEditType) => {
  const [date, setDate] = useState<Date | undefined>(
    new Date(session.startTime)
  );
  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  // Assuming you have a session object to initialize the state from
  const [title, setTitle] = useState(session.title);
  const [activityName, setActivityName] = useState(session.activityName);
  const [instructorName, setInstructorName] = useState(session.instructorName);
  const [startTime, setStartTime] = useState(
    format(session.startTime, "HH:mm")
  );
  const [endTime, setEndTime] = useState(format(session.endTime, "HH:mm"));
  const [location, setLocation] = useState(session.location || "");
  const [sessionType, setSessionType] = useState(session.sessionType);
  const [groupType, setGroupType] = useState(session.groupType);
  const [participants, setParticipants] = useState(session.participants);
  const [description, setDescription] = useState(session.description || "");
  const [isAllDay, setIsAllDay] = useState(session.isAllDay);
  const [link, setLink] = useState(session.link || "");
  const [colorCode, setColorCode] = useState(session.colorCode || "");
  const [notes, setNotes] = useState(session.notes || "");
  const [recurrence, setRecurrence] = useState(session.recurrence);

  const updatedSession = {
    id: session.id,
    title,
    activityName,
    instructorName,
    startTime: date
      ? `${format(date, "yyyy-MM-dd")}T${startTime}`
      : session.startTime,
    endTime: date
      ? `${format(date, "yyyy-MM-dd")}T${endTime}`
      : session.endTime,
    location: location || null,
    sessionType,
    groupType,
    participants,
    description,
    isAllDay,
    link: link || undefined,
    colorCode: colorCode || undefined,
    notes,
    recurrence,
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleEditSheet}>
      <SheetContent className="min-w-[500px] bg-transparent p-3 border-none shadow-none !ring-none !outline-none">
        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-lg justify-between">
          <SheetHeader className="px-4 py-2 h-12 flex flex-col justify-center border-b">
            <SheetTitle className="text-base tracking-tight">
              Edit details
            </SheetTitle>
            <SheetDescription className="sr-only">
              session details
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className=" flex flex-col max-h-full border-b  rounded-b-none rounded-md">
            <div className="flex flex-col py-3 gap-4 w-full">
              {/* input */}
              <div className="px-4  flex flex-col gap-3">
                <Label
                  htmlFor="title"
                  className=" text-xs font-medium flex items-center gap-2 text-orange-900"
                >
                  Class title
                </Label>
                <Input
                  name="title"
                  className=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-col px-4 gap-2">
                <p className="text-xs font-medium flex items-center gap-2 text-orange-900">
                  Activity
                </p>

                <Select
                  value={activityName}
                  onValueChange={(value) => setActivityName(activityName)}
                >
                  <SelectTrigger className="w-full  placeholder:text-neutral-700">
                    <SelectValue className="text-neutral-400" />
                  </SelectTrigger>
                  <SelectContent className="w-44">
                    <SelectItem value="chess">Chess</SelectItem>
                    <SelectItem value="scrabble">Scrabble</SelectItem>
                    <SelectItem value="coding">Coding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col px-4 gap-2">
                <p className="text-xs font-medium flex items-center gap-2 text-orange-900">
                  Description
                </p>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="   h-20 resize-none"
                  placeholder="Description"
                />
              </div>
              <div className="flex flex-col px-4 gap-2">
                <p className="text-xs font-medium flex items-center gap-2 text-orange-900">
                  Instructor
                </p>

                <Select
                  value={instructorName}
                  onValueChange={(value) => setInstructorName(value)}
                >
                  <SelectTrigger className="w-full placeholder:text-neutral-700">
                    <SelectValue
                      className="text-neutral-400"
                      aria-label={instructorName}
                    />
                  </SelectTrigger>
                  <SelectContent className="w-64">
                    <ScrollArea className="flex flex-col max-h-[190px]">
                      {coaches.map((coach, index) => {
                        const name =
                          coach.split(" ")[0] +
                          " " +
                          coach.split(" ")[1].slice(0, 1);
                        return (
                          <SelectItem
                            key={index}
                            value={coach}
                            className="cursor-pointer"
                          >
                            {coach}
                          </SelectItem>
                        );
                      })}{" "}
                    </ScrollArea>
                  </SelectContent>
                </Select>
              </div>{" "}
              <hr className="border-neutral-200" />
              {/* time */}
              <div className=" flex flex-col gap-2">
                <p className="px-4 text-xs font-medium flex items-center gap-2 text-orange-900">
                  {/* <Clock size={16} /> */}
                  Date and time
                </p>
                <div className="px-4 flex items-center justify-between gap-4">
                  <div className="w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"ghost"}
                          className={cn(
                            " justify-center w-full  text-center gap-2 font-normal text-neutral-800 border h-9 border-neutral-200 text-sm px-2   tracking-tight",
                            !session.startTime && "text-muted-foreground"
                          )}
                        >
                          <CalendarDays size={16} />
                          {date ? (
                            format(date, "dd MMMM yyyy")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex  items-center gap-2 h-10 rounded-lg">
                    <Input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="max-w-fit px-2 hover:bg-neutral-100  shadow-none border-neutral-200 !outline-none !ring-0"
                    />
                    <ArrowRight size={14} />
                    <Input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="max-w-fit px-2 hover:bg-neutral-100  shadow-none border-neutral-200 !outline-none !ring-0"
                    />
                  </div>
                </div>
              </div>
              <div className="px-4 flex  gap-4 w-full">
                <div className="flex w-2/4 items-center space-x-2">
                  <Switch
                    checked={isAllDay}
                    onCheckedChange={setIsAllDay}
                    id="all-day"
                  />
                  <Label htmlFor="all-day" className="font-normal">
                    Session runs all day
                  </Label>
                </div>
                <div className="w-2/4">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full">
                      <div className="w-full border rounded text-sm font-medium hover:bg-neutral-100 text-neutral-700 border-transparent hover:border-neutral-200 h-10 px-2 flex items-center justify-between group/btn">
                        <div className="flex items-center gap-2">
                          <Repeat size={14} />
                          <span>Repeat</span>
                        </div>
                        <ChevronDown
                          size={14}
                          className="opacity-0 group-hover/btn:opacity-100 transition-all"
                        />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      side="left"
                      align="start"
                      className="w-[250px] rounded-md text-sm"
                    >
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black">
                        Every day
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black">
                        Every weekday
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black flex items-center gap-2">
                        <span>Every week</span>
                        <span className="text-neutral-400 font-medium">
                          on sat
                        </span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black flex items-center gap-2">
                        <span>Every 2 weeks</span>
                        <span className="text-neutral-400 font-medium">
                          on sat
                        </span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black flex items-center gap-2">
                        <span>Every month</span>
                        <span className="text-neutral-400 font-medium">
                          on the 20th
                        </span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black flex items-center gap-2">
                        <span>Every month</span>
                        <span className="text-neutral-400 font-medium">
                          on the last sat
                        </span>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator className="bg-neutral-200" />
                      <DropdownMenuCheckboxItem className="hover:bg-neutral-200/80 cursor-pointer text-neutral-700 hover:text-black">
                        Custom...
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <hr className="border-neutral-200" />
              <div className="flex flex-col px-4 gap-2">
                <Label
                  htmlFor="session-type"
                  className=" text-xs font-medium flex items-center gap-2 text-orange-900"
                >
                  Session type
                </Label>
                <Select
                  name="session-type"
                  value={sessionType}
                  onValueChange={(value) =>
                    setSessionType(value as "physical" | "online")
                  }
                >
                  <SelectTrigger className="w-full  placeholder:text-neutral-700">
                    <SelectValue
                      className="text-neutral-400"
                      placeholder="Group type"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-44">
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="physical">Physical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {sessionType === "physical" ? (
                <div className="flex flex-col px-4 gap-2">
                  <p className="text-xs font-medium flex items-center gap-2 text-orange-900">
                    Location
                  </p>

                  <Input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className=" !border-neutral-200 !ring-0 outline-none"
                    placeholder="Add location"
                  />
                </div>
              ) : (
                <div className="flex flex-col px-4 gap-2">
                  <p className="text-xs font-medium flex items-center gap-2 text-orange-900">
                    Meeting link
                  </p>
                  <Input
                    type="url"
                    className=""
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="Add meeting link"
                  />
                </div>
              )}
              <hr className="border-neutral-200" />
              {/* group type */}
              <div className="flex flex-col px-4 gap-2">
                <Label
                  htmlFor="group-type"
                  className=" text-xs font-medium flex items-center gap-2 text-orange-900"
                >
                  Group type
                </Label>
                <Select
                  name="group-type"
                  value={groupType}
                  onValueChange={(value) => setGroupType(groupType)}
                >
                  <SelectTrigger className="w-full  placeholder:text-neutral-700">
                    <SelectValue
                      className="text-neutral-400"
                      placeholder="Group type"
                    />
                  </SelectTrigger>
                  <SelectContent className="w-44">
                    <SelectItem value="individual">Individual</SelectItem>
                    <SelectItem value="group">Group</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="px-4  flex flex-col gap-3">
                <Label
                  htmlFor="participants"
                  className=" text-xs font-medium flex items-center gap-2 text-orange-900"
                >
                  Participants
                </Label>
                <Input
                  name="title"
                  type="number"
                  className=""
                  value={participants}
                  onChange={(e) => setParticipants(Number(e.target.value))}
                />
              </div>
            </div>
          </ScrollArea>
          <SheetFooter className="p-2 h-12 pt-0 shrink-0 py-0 flex items-center">
            <SheetClose className="!min-w-fit w-36">
              <Button
                variant={"outline"}
                className="w-full  px-4  rounded-md  font-medium text-sm"
              >
                cancel
              </Button>
            </SheetClose>
            <Button
              onClick={() => {
                updateSession(updatedSession);
                toggleEditSheet();
              }}
              className=" bg-blue-500 px-4  rounded-md hover:bg-blue-600 text-white font-medium text-sm"
            >
              save changes
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};
type TSessionPopoverType = {
  isPopoverOpen: boolean;
  toggleDetailsPopover: () => void;
  sessionActions: {
    editSession: () => void;
    deleteSession: () => void;
    mailDetails: () => void;
  };
  session: TSessionType;
};
const SessionMoreDetails = ({
  isPopoverOpen,
  toggleDetailsPopover,
  session,
  sessionActions,
}: TSessionPopoverType) => {
  const [isLinkCopied, setLinkCopied] = useState(false);
  const copyIcon = isLinkCopied ? (
    <Check size={12} strokeWidth={3} />
  ) : (
    <Copy size={12} strokeWidth={3} />
  );

  const copyLink = () => {
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  return (
    <Dialog open={isPopoverOpen} onOpenChange={toggleDetailsPopover}>
      <DialogTrigger className="sr-only">Open</DialogTrigger>
      <DialogContent className="p-0 py-4 pb-2 w-[350px] ">
        {" "}
        <div className="flex flex-col gap-2.5 text-start">
          <div className="px-4">
            <h1 className="font-semibold">{session.title}</h1>
            <p className="text-sm text-neutral-600">{session.description}</p>
          </div>
          <hr />
          <div className="flex px-4  text-sm text-neutral-600 items-center gap-4 leading-none">
            <CalendarDays size={16} />
            <p className="text-sm text-neutral-600">
              {format(session.startTime, "dd MMMM yyyy")}
            </p>
          </div>
          <div className="flex px-4  text-sm items-center text-neutral-600 gap-4 leading-none">
            <Clock size={16} />
            <p className="text-sm text-neutral-600 flex items-center gap-2">
              {format(session.startTime, "hh:mm a")}
              <ArrowRight size={16} />
              {format(session.endTime, "hh:mm a")}
            </p>
          </div>
          <div className="flex  px-4 text-sm items-center text-neutral-600 gap-4 leading-none">
            <MapPin size={16} />
            <p className="text-sm text-neutral-600 flex items-center gap-2">
              Consolata Primary school
            </p>
          </div>
          <hr />
          <div className="flex  px-4 text-sm items-center text-neutral-600 gap-4 leading-none">
            <User size={16} />
            <p className="text-sm text-neutral-600 flex items-center gap-2">
              Coach {session.instructorName}
            </p>
          </div>
          {session.link && (
            <div className="flex  px-4 text-sm items-center text-neutral-600 gap-4 leading-none">
              <Link size={16} />
              <div className="flex items-center gap-3 justify-between">
                <a
                  href={session.link}
                  className="text-sm  text-blue-500 hover:underline flex line-clamp-1 items-center gap-2"
                >
                  {session.link}
                </a>
                <TooltipWrapper
                  label={isLinkCopied ? "copied" : "copy"}
                  className="font-semibold p-1 px-2 rounded"
                >
                  <button
                    onClick={copyLink}
                    className="size-6 text-neutral-500 hover:text-black hover:bg-neutral-100 border shrink-0 rounded grid place-items-center"
                  >
                    {copyIcon}
                  </button>
                </TooltipWrapper>
              </div>
            </div>
          )}
          <div className="flex  px-4 text-sm items-center text-neutral-600 gap-4 leading-none">
            <Users size={16} />
            <p className="text-sm text-neutral-600  flex items-center gap-2">
              {session.participants}{" "}
              {session.participants === 1 ? "participant" : "participants"}
            </p>
          </div>
          <div className="flex  px-4 text-sm items-center text-neutral-600 gap-4 leading-none">
            <Dices size={16} />
            <p className="text-sm text-neutral-600 capitalize  flex items-center gap-2">
              {session.activityName}
            </p>
          </div>
          <hr />
          <div className="w-full px-4  flex items-center justify-between">
            <div>
              <small className="text-neutral-600">
                Last updated : 23 Oct 2024
              </small>
            </div>
            <div className="flex itemes-center">
              <TooltipWrapper
                label="Edit class"
                className="font-semibold p-1 px-2 rounded"
              >
                <Button
                  variant={"ghost"}
                  className="text-neutral-600 hover:text-black !ring-0 !outline-none"
                  size={"icon"}
                  onClick={() => {
                    sessionActions.editSession();
                    toggleDetailsPopover();
                  }}
                >
                  <Pencil size={14} />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper
                label="Delete class"
                className="font-semibold p-1 px-2 rounded"
              >
                <Button
                  variant={"ghost"}
                  className="text-neutral-600 hover:text-red-500 hover:bg-red-50"
                  size={"icon"}
                  onClick={() => {
                    sessionActions.deleteSession();
                    toggleDetailsPopover();
                  }}
                >
                  <Trash size={14} />
                </Button>
              </TooltipWrapper>
              <TooltipWrapper
                label="Email class details"
                className="font-semibold p-1 px-2 rounded"
              >
                <Button
                  variant={"ghost"}
                  className="text-neutral-600 hover:text-black !ring-0 !outline-none"
                  size={"icon"}
                  onClick={() => {
                    sessionActions.mailDetails();
                    toggleDetailsPopover();
                  }}
                >
                  <Mail size={14} />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

type TDeleteModalProps = {
  isDeletingClass: boolean;
  toggleDelete: () => void;
  session: TSessionType;
};

const DeleteSessionModal = ({
  isDeletingClass,
  toggleDelete,
  session,
}: TDeleteModalProps) => {
  return (
    <Dialog open={isDeletingClass} onOpenChange={toggleDelete}>
      <DialogContent className="w-[450px] p-4">
        <DialogHeader>
          <DialogTitle>Delete class</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-black font-medium">{session.title}</span>{" "}
            class and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full flex items-center justify-end">
          <button className="w-1/4 text-sm h-7 hover:bg-neutral-100 text-neutral-700 rounded-md border font-medium">
            cancel
          </button>
          <button className="w-1/4 text-sm h-7 bg-red-500 hover:bg-red-600 rounded-md text-white font-medium">
            Delete
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

type TMailDetailsModalProps = {
  isMailingDetails: boolean;
  toggleMailingDetails: () => void;
  session: TSessionType;
};
const MailDetailsModal = ({
  isMailingDetails,
  toggleMailingDetails,
  session,
}: TMailDetailsModalProps) => {
  return (
    <Dialog open={isMailingDetails} onOpenChange={toggleMailingDetails}>
      <DialogContent className="w-[450px] p-0 flex flex-col gap-3">
        <DialogHeader className="p-4">
          <DialogTitle>Email guests</DialogTitle>
          <DialogDescription className="sr-only">
            send session details to guests
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="px-4  flex flex-col gap-3">
            <Input name="title" className="" placeholder="Add Email" />
          </div>
          <div className="px-4  flex flex-col gap-3">
            <Label
              htmlFor="subject"
              className="text-xs text-neutral-700 font-medium flex items-center gap-2"
            >
              Subject
            </Label>{" "}
            <Input
              name="subject"
              className=""
              placeholder="Subject"
              value={session.title}
            />
          </div>
          <div className="px-4  flex flex-col gap-3">
            <Label
              htmlFor="message"
              className="text-sm text-neutral-700 font-medium flex items-center gap-2"
            >
              Message
            </Label>{" "}
            <Textarea name="message" placeholder="Message" />
          </div>
        </div>
        <DialogFooter className="w-full p-4 flex items-center justify-end">
          <button className="w-1/4 text-sm h-7 hover:bg-neutral-100 text-neutral-700 rounded-md border font-medium">
            cancel
          </button>
          <button className="px-5 text-sm h-7 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-medium">
            Send details
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
