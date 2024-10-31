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
import { format, parseISO } from "date-fns";

import {
  ArrowRight,
  CalendarDays,
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
import { TSessionType } from "../utils/dummy-data";
import TooltipWrapper from "./tooltip-wrapper";

type TSessionCardPropsType = {
  session: TSessionType;
  type?: "month" | "week" | "day";
};

export default function SessionCard({ session, type }: TSessionCardPropsType) {
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

  return (
    <>
      <div className="w-full h-full">
        <SessionContextMenu>
          <div
            onClick={toggleDetailsPopover}
            className={cn(
              "flex w-full h-full min-h-5 items-center cursor-pointer gap-1 pr-3  opacity-80 hover:opacity-100 rounded",
              type === "week" && "items-start p-2 gap-2 opacity-100",
              isPopoverOpen && "shadow-lg"
            )}
            style={{
              color: `hsl(${session.colorCode})`,
              backgroundColor: `hsl(${session.colorCode}, 10%)`,
            }}
          >
            <div
              className="h-full w-1 rounded-full"
              style={{
                backgroundColor: `hsl(${session.colorCode})`,
              }}
            />
            {type === "day" && (
              <p className="text-xs font-semibold line-clamp-1">
                <span className="opacity-60 text-[10px] mr-1">
                  {format(parseISO(session.startTime), "h:mm a ")}
                </span>{" "}
                {session.title}
              </p>
            )}
            {type === "week" && (
              <div>
                <p className="text-sm font-semibold line-clamp-2">
                  {session.title}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium tracking-tight mr-1">
                    {format(parseISO(session.startTime), "h:mm a ")}
                  </span>
                  -
                  <span className="text-xs font-medium tracking-tight mr-1">
                    {format(parseISO(session.endTime), "h:mm a ")}
                  </span>{" "}
                </div>
              </div>
            )}
          </div>
        </SessionContextMenu>
      </div>
      <SessionEditSheet
        isSheetOpen={isSheetOpen}
        session={session}
        toggleEditSheet={toggleEditSheet}
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
};

const SessionContextMenu = ({ children }: TContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="">{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-44">
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

type TSessionContextType = {
  isSheetOpen: boolean;
  toggleEditSheet: () => void;
  session: TSessionType;
};

const SessionEditSheet = ({
  isSheetOpen,
  toggleEditSheet,
  session,
}: TSessionContextType) => {
  const [date, setDate] = useState<Date | undefined>(
    new Date(session.startTime)
  );

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleEditSheet}>
      <SheetContent className="min-w-[500px] bg-transparent p-3 border-none shadow-none !ring-none !outline-none">
        <div className="w-full h-full flex flex-col gap-2 bg-white rounded-md shadow-lg">
          <SheetHeader className="p-4">
            <SheetTitle className=" text-base">Edit class</SheetTitle>
            <SheetDescription className="sr-only">
              session details
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-4 w-full">
            {/* input */}
            <div className="px-4  flex flex-col gap-3">
              <Label
                htmlFor="title"
                className="text-xs text-neutral-700 font-medium flex items-center gap-2"
              >
                Class title
              </Label>
              <Input name="title" className="" value={session.title} />
            </div>
            <hr className="border-neutral-200/60" />
            {/* time */}
            <div className=" flex flex-col gap-2">
              <p className="px-4 text-sm font-medium flex items-center gap-2">
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
                        {session.startTime ? (
                          format(session.startTime, "dd MMMM yyyy")
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
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex  items-center gap-2 h-10 rounded-lg">
                  <Input
                    type="time"
                    className="max-w-fit px-2 hover:bg-neutral-100  shadow-none border-neutral-200 !outline-none !ring-0"
                  />
                  <ArrowRight size={14} />
                  <Input
                    type="time"
                    className="max-w-fit px-2 hover:bg-neutral-100  shadow-none border-neutral-200 !outline-none !ring-0"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 flex  gap-4 w-full">
              <div className="flex w-2/4 items-center space-x-2">
                <Switch id="all-day" />
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

            {/* participants,notes,colorCode */}
            {/* Description */}
            <div className="flex flex-col px-4 gap-2">
              <p className="text-sm font-medium flex items-center gap-2">
                Description
              </p>
              <Textarea
                className="   h-20 resize-none"
                placeholder="Description"
              />
            </div>
            {/* instructor */}
            <div className="flex flex-col px-4 gap-2">
              <p className="text-sm font-medium flex items-center gap-2">
                Instructor
              </p>

              <Select>
                <SelectTrigger className="w-full placeholder:text-neutral-700">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder="Instructor"
                  />
                </SelectTrigger>
                <SelectContent className="w-44">
                  <SelectItem value="Jeff">Jeff Gichuki</SelectItem>
                  <SelectItem value="Joan">Joan Watiri</SelectItem>
                  <SelectItem value="coding">Marcus Rashford</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* location */}
            <div className="flex flex-col px-4 gap-2">
              <p className="text-sm font-medium flex items-center gap-2">
                Location
              </p>

              <Input
                type="text"
                className=" !border-neutral-200 !ring-0 outline-none"
                placeholder="Add location"
              />
            </div>
            {/* activity */}
            <div className="flex flex-col px-4 gap-2">
              <p className="text-sm font-medium flex items-center gap-2">
                Activity
              </p>

              <Select>
                <SelectTrigger className="w-full  placeholder:text-neutral-700">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder="Activity"
                  />
                </SelectTrigger>
                <SelectContent className="w-44">
                  <SelectItem value="chess">Chess</SelectItem>
                  <SelectItem value="scrabble">Scrabble</SelectItem>
                  <SelectItem value="coding">Coding</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* group type */}
            <div className="flex flex-col px-4 gap-2">
              <p className="text-sm  flex items-center gap-2">Group type</p>

              <Select>
                <SelectTrigger className="w-full  placeholder:text-neutral-700">
                  <SelectValue
                    className="text-neutral-400"
                    placeholder="Group type"
                  />
                </SelectTrigger>
                <SelectContent className="w-44">
                  <SelectItem value="Individual">Individual</SelectItem>
                  <SelectItem value="Group">Group</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* link */}
            <div className="flex flex-col px-4 gap-2">
              <small className="text-neutral-700  flex items-center gap-2">
                {/* <MapPin size={16} /> */}
                Link
              </small>

              <Input type="url" className="" placeholder="Add location" />
            </div>
          </div>
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
  return (
    <Popover open={isPopoverOpen} onOpenChange={toggleDetailsPopover}>
      <PopoverTrigger className="sr-only">Open</PopoverTrigger>
      <PopoverContent
        side="top"
        align="center"
        // alignOffset={50}
        className="p-0 py-4 pb-2 w-[350px] flex flex-col gap-2.5"
      >
        {" "}
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
            <a
              href={session.link}
              className="text-sm  text-blue-500 hover:underline flex items-center gap-2"
            >
              {session.link}
            </a>
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
                }}
              >
                <Mail size={14} />
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      </PopoverContent>
    </Popover>
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
