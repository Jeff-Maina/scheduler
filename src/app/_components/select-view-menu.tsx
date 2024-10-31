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

const ViewsList: { view: TView; icon: React.ReactNode }[] = [
  {
    view: "day",
    icon: <Calendar size={16} />,
  },
  {
    view: "week",
    icon: <Table2 size={16} />,
  },
  {
    view: "month",
    icon: <Grid3X3 size={16} />,
  },
];

const SelectViewMenu = ({ selectedView, changeView }: TSelectViewMenuProps) => {
  return (
    <div className="h-9 border rounded flex items-center p-1">
      {ViewsList.map(({ view, icon }, index) => (
        <TooltipWrapper label={`${view} view`} className="font-semibold">
          <button
            onClick={() => changeView(view)}
            className={cn(
              "h-full px-3 rounded text-neutral-600 hover:bg-neutral-100 hover:text-black",
              selectedView === view ? "!bg-neutral-300 !text-black" : ""
            )}
          >
            {icon}
          </button>
        </TooltipWrapper>
      ))}
    </div>
  );
};

export default SelectViewMenu;
