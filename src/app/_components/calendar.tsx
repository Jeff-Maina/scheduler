import {
  addDays,
  differenceInMinutes,
  eachDayOfInterval,
  endOfWeek,
  format,
  getDay,
  getHours,
  getMinutes,
  isAfter,
  isSameDay,
  isSameMonth,
  isToday,
  parseISO,
  startOfDay,
  startOfWeek,
} from "date-fns";
import { TView } from "./types";
import { cn } from "@/lib/utils";
import { date } from "zod";
import SessionCard from "./session-card";
import { TSessionType, sessions } from "@/app/utils/dummy-data";
import CurrentTimeIndicator from "./current-time-indicator";
import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const DAY_IN_MINUTES = 24 * 60;

type TCalendarCompProps = {
  selectedView: TView;
  days: Date[];
  currentDate: Date | undefined;
  clockSys: "12h" | "24h";
};

const hoursOfDay = (clockSys: "12h" | "24h") =>
  Array.from({ length: 24 }).map((_, i) => ({
    value: i,
    label:
      clockSys === "12h"
        ? i > 12
          ? String(i - 12 + ":00").padStart(2) + " pm"
          : String(i + ":00").padStart(2) + " am"
        : String(i + ":00").padStart(2),
  }));

const MonthView = ({
  selectedView,
  days,
  sessionsState,
  updateSession,
  currentDate,
}: TCalendarCompProps & {
  sessionsState: TSessionType[];
  updateSession: (val: TSessionType) => void;
}) => {
  return (
    <div>
      <div className="w-full text-neutral-500 text-xs grid grid-cols-7">
        <div className="p-4 rounded-md w-full text-center">Sun</div>
        <div className="p-4 rounded-md w-full text-center">Mon</div>
        <div className="p-4 rounded-md w-full text-center">Tue</div>
        <div className="p-4 rounded-md w-full text-center">Wed</div>
        <div className="p-4 rounded-md w-full text-center">Thur</div>
        <div className="p-4 rounded-md w-full text-center">Fri</div>
        <div className="p-4 rounded-md w-full text-center">Sat</div>
      </div>
      <div className="w-full grid grid-cols-7 border-b border-neutral-200/60">
        {days.map((day, index) => {
          const noOfSessions = sessionsState.filter((session) =>
          isSameDay(parseISO(session.startTime), day)
        ).length
          return (
            <div
              key={index}
              className={cn(
                " w-full h-36 p-3 border-t border-r border-neutral-200/60 flex flex-col items-start justify-start gap-2",
                index === 0 && colStartClasses[getDay(day)],
                isSameDay(day, currentDate as Date) ? "animate-glow" : "",
                isSameMonth(currentDate as Date, day) || "striped"
              )}
            >
              <div
                className={cn(
                  "flex w-full shrink-0 items-center justify-end gap-2",
                  isSameMonth(currentDate as Date, day)
                    ? "text-neutral-700 "
                    : "text-neutral-400"
                )}
              >
                <small className="capitalize font-semibold  text-xs rounded">
                  {format(day, "d") === "1" ? format(day, "MMMM") : ""}
                </small>
                <time
                  dateTime={format(day, "yyyy-MM-dd")}
                  className={cn(
                    "text-xs shrink-0  text-right font-medium ",
                    isToday(day)
                      ? "bg-red-500 !text-white p-1 rounded font-semibold"
                      : ""
                  )}
                >
                  {format(day, "d")}
                </time>
              </div>
              <div className="w-full flex flex-col gap-1 relative z-20 h-[100px]">
                <div className="flex flex-col custom-scrollbar gap-1 max-h-[80px]  overflow-y-auto pr-1.5">
                  {sessionsState.map((session, index, array) => {
                    return (
                      isSameDay(parseISO(session.startTime), day) && (
                        <SessionCard
                          updateSession={updateSession}
                          session={session}
                          type="month"
                          key={index}
                        />
                      )
                    );
                  })}
                </div>

                {noOfSessions > 2 && (
                  <small className="text-xs font-medium text-neutral-600 py-0.5 bg-neutral-50 border-neutral-200 border rounded-md max-w-fit px-2 ">
                    {noOfSessions} sessions
                  </small>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const WeekView = ({
  clockSys,
  selectedView,
  days,
  currentDate,
  sessionsState,
  updateSession,
}: TCalendarCompProps & {
  sessionsState: TSessionType[];
  updateSession: (val: TSessionType) => void;
}) => {
  const daysOfWeek = eachDayOfInterval({
    start: startOfWeek(currentDate as Date),
    end: endOfWeek(currentDate as Date),
  });

  return (
    <div className="flex items-start h-full ">
      <div className="h-full w-20 shrink-0 border-r pt-14">
        {hoursOfDay(clockSys).map((hour, index) => (
          <div
            key={index}
            className={`w-full h-12  ${
              index !== 0 ? "" : " opacity-0"
            } flex items-center justify-end p-2`}
          >
            <span className="text-[10px] -translate-y-[150%] font-medium text-neutral-500">
              {hour.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-full">
        <div
          style={{ position: "sticky", top: 0 }}
          className="w-full border-b bg-white z-20 text-neutral-500 text-xs grid grid-cols-7 "
        >
          {daysOfWeek.map((day, index) => {
            return (
              <div
                key={index}
                className="p-4 flex gap-2 rounded-md w-full justify-center items-center text-center"
              >
                <p>{format(day, "EEE")}</p>
                <p
                  className={cn(
                    isToday(day)
                      ? "p-1 rounded bg-red-500 font-semibold text-white"
                      : "p-1"
                  )}
                >
                  {format(day, "d")}
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full grid grid-cols-7 divide-x divide-neutral-200/70 relative">
          <CurrentTimeIndicator clockSys={clockSys} />
          {daysOfWeek.map((day) => {
            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "relative w-full h-full grid grid-rows-24 divide-y divide-neutral-200/50",
                  isSameDay(currentDate as Date, day) && "animate-glow"
                )}
              >
                {/* Render session cards */}
                {sessionsState
                  .filter((session) =>
                    isSameDay(parseISO(session.startTime), day)
                  )
                  .map((session) => {
                    const start = parseISO(session.startTime);
                    let end = parseISO(session.endTime);

                    const midnight = startOfDay(addDays(day, 1));
                    if (isAfter(end, midnight)) {
                      end = midnight;
                    }

                    const totalMinutes = differenceInMinutes(end, start);
                    const topPosition =
                      (getHours(start) * 60 + getMinutes(start)) /
                      DAY_IN_MINUTES;

                    return (
                      <div
                        key={session.id}
                        className="absolute left-1 right-1 rounded-md bg-white "
                        style={{
                          top: `${topPosition * 100}%`,
                          height: `${(totalMinutes / DAY_IN_MINUTES) * 100}%`,
                        }}
                      >
                        <SessionCard
                          updateSession={updateSession}
                          session={session}
                          type="week"
                        />
                      </div>
                    );
                  })}

                {/* Render hourly slots */}
                {[...Array(24)].map((_, hour) => (
                  <div key={hour} className="h-12 border-neutral-300/50" />
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const DayView = ({
  clockSys,
  selectedView,
  days,
  currentDate,
  sessionsState,
  updateSession,
}: TCalendarCompProps & {
  sessionsState: TSessionType[];
  updateSession: (val: TSessionType) => void;
}) => {
  return (
    <div className="flex items-start h-full">
      <div className="h-full w-20 shrink-0 border-r">
        <div className="h-12"></div>
        {hoursOfDay(clockSys).map((hour, index) => (
          <div
            key={index}
            className={`w-full h-12  ${
              index !== 0 ? "" : " opacity-0"
            } flex items-center justify-end p-2`}
          >
            <span className="text-[10px] -translate-y-[155%] font-medium text-neutral-500">
              {hour.label}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full h-full">
        <div
          style={{ position: "sticky", top: 0 }}
          className="flex gap-2 h-12 border-b w-full z-20 bg-white justify-center items-center text-center"
        >
          <div className="flex items-center gap-2 ">
            <p>{format(currentDate as Date, "EEE")}</p>
            <p
              className={cn(
                isToday(currentDate as Date) &&
                  "bg-red-500 !px-2 py-0.5  text-white font-semibold rounded-md",
                "px-0"
              )}
            >
              {format(currentDate as Date, "d")}
            </p>
          </div>
        </div>

        <div className="relative w-full grid   divide-y divide-neutral-200/50">
          {/* Render session cards */}
          <CurrentTimeIndicator clockSys={clockSys} />
          {sessionsState
            .filter((session) =>
              isSameDay(parseISO(session.startTime), currentDate as Date)
            )
            .map((session) => {
              const start = parseISO(session.startTime);
              let end = parseISO(session.endTime);
              const midnight = startOfDay(addDays(currentDate as Date, 1));

              if (isAfter(end, midnight)) {
                end = midnight;
              }

              const totalMinutes = differenceInMinutes(end, start);
              const topPosition =
                (getHours(start) * 60 + getMinutes(start)) / DAY_IN_MINUTES;

              return (
                <div
                  key={session.id}
                  className="absolute left-1 right-1 rounded-md bg-white "
                  style={{
                    top: `${topPosition * 100}%`,
                    height: `${(totalMinutes / DAY_IN_MINUTES) * 100}%`,
                  }}
                >
                  <SessionCard
                    updateSession={updateSession}
                    session={session}
                    type="week"
                  />
                </div>
              );
            })}

          {/* Render hourly slots */}
          {[...Array(24)].map((_, hour) => (
            <div key={hour} className="h-12 border border-neutral-800" />
          ))}
        </div>
      </div>
    </div>
  );
};

const CalendarComp = ({
  selectedView,
  days,
  currentDate,
  clockSys,
}: TCalendarCompProps) => {
  const [sessionsState, setSessions] = useState(sessions);

  const updateSession = (updatedSession: TSessionType) => {
    console.log(updatedSession);
    setSessions((prevSessions) =>
      prevSessions.map((session) =>
        session.id === updatedSession.id
          ? { ...session, ...updatedSession }
          : session
      )
    );
  };
  return (
    <div className="w-full h-[90vh] overflow-y-scroll custom-scrollbar  bg-white border border-neutral-200 rounded-md">
      {selectedView === "month" && (
        <MonthView
          selectedView={selectedView}
          days={days}
          currentDate={currentDate}
          clockSys={clockSys}
          sessionsState={sessionsState}
          updateSession={updateSession}
        />
      )}
      {selectedView === "week" && (
        <WeekView
          selectedView={selectedView}
          days={days}
          currentDate={currentDate}
          clockSys={clockSys}
          sessionsState={sessionsState}
          updateSession={updateSession}
        />
      )}{" "}
      {selectedView === "day" && (
        <DayView
          selectedView={selectedView}
          days={days}
          currentDate={currentDate}
          clockSys={clockSys}
          sessionsState={sessionsState}
          updateSession={updateSession}
        />
      )}
    </div>
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

export default CalendarComp;
