"use client";

import { format, getHours, getMinutes } from "date-fns";
import { useEffect, useState } from "react";
import { TClockSys } from "./types";

const MINS_IN_DAY = 24 * 60;

const CurrentTimeIndicator = ({ clockSys }: { clockSys: TClockSys }) => {
  const currentTime = new Date();

  const [time, setTime] = useState(currentTime);
  const indicatorTop = (getHours(time) * 60 + getMinutes(time)) / MINS_IN_DAY;

  useEffect(() => {
    setTime(currentTime);
  }, []);

  return (
    <div
      style={{
        top: `${indicatorTop * 100}%`,
      }}
      className="absolute pointer-events-none w-full h-2 -translate-y-1 flex items-center z-20 top-2/4"
    >
      <time className="text-[10px] bg-white font-semibold absolute leading-none -translate-x-[110%]">
        {clockSys === '12h' ? format(currentTime, "hh:mm a") : format(currentTime, "kk:mm")}
      </time>
      <div className="w-full h-[1px] bg-neutral-700" />
    </div>
  );
};

export default CurrentTimeIndicator;
