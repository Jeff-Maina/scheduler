import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, Grid3X3, Table2 } from "lucide-react";
import { TView } from "./types";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "./tooltip-wrapper";
import { cn } from "@/lib/utils";

type TSelectViewMenuProps = {
  selectedView: TView;
  changeView: (value: TView) => void;
};

const SelectViewMenu = ({ selectedView, changeView }: TSelectViewMenuProps) => {
  return (
    // <DropdownMenu>
    //   <DropdownMenuTrigger asChild>
    //     <Button
    //       variant={"outline"}
    //       size={'sm'}
    //       className="flex bg-white items-center gap-1 border border-neutral-200 text-sm hover:bg-neutral-100 p-1 px-3  hover:text-black rounded"
    //     >
    //       <p className="capitalize">{selectedView}</p>
    //       <ChevronDown size={14} strokeWidth={3} />
    //     </Button>
    //   </DropdownMenuTrigger>
    //   <DropdownMenuContent align="end" className="rounded-md shadow-sm w-36">
    //     <DropdownMenuCheckboxItem
    //       checked={selectedView === "day"}
    //       onCheckedChange={() => changeView("day")}
    //       className="cursor-pointer data-[state='checked']:bg-neutral-200/70 text-neutral-800 hover:text-black"
    //     >
    //       Day
    //     </DropdownMenuCheckboxItem>
    //     <DropdownMenuCheckboxItem
    //       checked={selectedView === "week"}
    //       onCheckedChange={() => changeView("week")}
    //       className="cursor-pointer data-[state='checked']:bg-neutral-200/70 text-neutral-800 hover:text-black"
    //     >
    //       Week
    //     </DropdownMenuCheckboxItem>
    //     <DropdownMenuCheckboxItem
    //       checked={selectedView === "month"}
    //       onCheckedChange={() => changeView("month")}
    //       className="cursor-pointer data-[state='checked']:bg-neutral-200/70 text-neutral-800 hover:text-black"
    //     >
    //       Month
    //     </DropdownMenuCheckboxItem>
    //   </DropdownMenuContent>
    // </DropdownMenu>
    <div className="h-9 border rounded flex items-center p-1">
      <TooltipWrapper label="day view" className="font-semibold">
        <button
          onClick={() => changeView("day")}
          className={cn(
            "h-full px-3 rounded text-neutral-600 hover:bg-neutral-100 hover:text-black",
            selectedView === "day" ? "!bg-neutral-300 !text-black" : ""
          )}
        >
          <Calendar size={16} />
        </button>
      </TooltipWrapper>
      <TooltipWrapper label="week view" className="font-semibold">
        <button
          onClick={() => changeView("week")}
          className={cn(
            "h-full px-3 rounded text-neutral-600 hover:bg-neutral-100 hover:text-black",
            selectedView === "week" ? "!bg-neutral-300 !text-black" : ""
          )}
        >
          <Table2 size={16} />
        </button>
      </TooltipWrapper>
      <TooltipWrapper label="month view" className="font-semibold">
        <button
          onClick={() => changeView("month")}
          className={cn(
            "h-full px-3 rounded text-neutral-600 hover:bg-neutral-100 hover:text-black",
            selectedView === "month" ? "!bg-neutral-300 !text-black" : ""
          )}
        >
          <Grid3X3 size={16} />
        </button>
      </TooltipWrapper>
    </div>
  );
};

export default SelectViewMenu;
