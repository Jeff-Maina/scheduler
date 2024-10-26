import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Dices, Filter, ListFilter, User } from "lucide-react";

const coaches = ["John", "Adam", "Sarah", "Matt", "Emma", "Chris", "Michael"];
const activities = ["chess", "scrabble", "coding"];
const statuses = ["completed", "pending", "cancelled"];

type TFilterProps = {
  filters: {
    coaches: string[];
    activities: string[];
    status: string[];
  };
  updateFilter: (
    param: "activities" | "coaches" | "status",
    value: string
  ) => void;
};

const SessionFilterMenu = ({ filters, updateFilter }: TFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="flex bg-white items-center gap-2 border border-neutral-200 text-sm hover:bg-neutral-100 p-1 px-3  hover:text-black rounded"
        >
          <p className="capitalize">Filter</p>
          <ListFilter size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="shadow-sm w-44 rounded-lg">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="ring-0 flex items-center justify-between outline-none text-sm px-2 py-1.5 hover:!bg-neutral-200/60 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <User size={16} />
              Coach
            </div>
            <ChevronRight size={16} />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white rounded-md border w-44 p-1">
            {coaches.map((coach, index) => {
              return (
                <div
                  className="capitalize p-2 flex items-center gap-2 hover:bg-neutral-100 "
                  key={index}
                >
                  <Checkbox
                    onCheckedChange={() => updateFilter("coaches", coach)}
                    checked={filters.coaches.includes(coach)}
                    id={`${coach}-${index}`}
                    className=""
                  />
                  <Label htmlFor={`${coach}-${index}`}>{coach}</Label>
                </div>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="ring-0 flex items-center justify-between outline-none text-sm px-2 py-1.5 hover:!bg-neutral-200/60 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <Dices size={16} />
              Activities
            </div>
            <ChevronRight size={16} />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white rounded-md border w-44 p-1">
            {activities.map((activity, index) => {
              return (
                <div
                  className="capitalize p-2 flex items-center gap-2 hover:bg-neutral-100 "
                  key={index}
                >
                  <Checkbox
                    onCheckedChange={() => updateFilter("activities", activity)}
                    checked={filters.activities.includes(activity)}
                    id={`${activity}-${index}`}
                    className=""
                  />
                  <Label htmlFor={`${activity}-${index}`}>{activity}</Label>
                </div>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="ring-0 flex items-center justify-between outline-none text-sm px-2 py-1.5 hover:!bg-neutral-200/60 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <Dices size={16} />
              Status
            </div>
            <ChevronRight size={16} />
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="bg-white rounded-md border w-44 p-1">
            {statuses.map((status, index) => {
              return (
                <div
                  className="capitalize p-2 flex items-center gap-2 hover:bg-neutral-100 "
                  key={index}
                >
                  <Checkbox
                    onCheckedChange={() => updateFilter("status", status)}
                    checked={filters.status.includes(status)}
                    id={`${status}-${index}`}
                    className=""
                  />
                  <Label htmlFor={`${status}-${index}`}>{status}</Label>
                </div>
              );
            })}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SessionFilterMenu;
