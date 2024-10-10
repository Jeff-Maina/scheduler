import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";

// zod yo
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, Minus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  subject: z.string().min(2).max(50),
  description: z.string().min(6),
  startDateTime: z.date(),
  endDateTime: z.date(),
  coach: z.string(),
  recurring: z.boolean(),
  meetingMode: z.enum(["in-person", "online"]),
  meetingType: z.enum(["group", "individual"]),
  location: z.string(),
  wholeDay: z.boolean(),
  color: z.string(),
  eventActivity: z.string(),
  startTime: z.string().time(),
  endTime: z.string(),
});

type TEventProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
  selectedDate: Date | undefined;
};

const NewEventModal = ({
  isModalOpen,
  toggleModal,
  selectedDate,
}: TEventProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDateTime: selectedDate,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleModal}>
      <DialogContent className=" p-3">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
          <DialogDescription className="sr-only">
            Create new event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="h-[70vh]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col">
                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Subject <span className="text-red-500">*</span>
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Subject"
                            className="!ring-transparent !outline-0 bg-neutral-100 h-10  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Description
                        </FormLabel>

                        <FormControl>
                          <Textarea
                            placeholder="Event description"
                            className="!ring-transparent resize-none  !outline-0 bg-neutral-100 h-32  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="font-semibold mt-6 mb-4">Date and Time</p>
                <div className="flex flex-col gap-3">
                  <div className="w-full flex items-center gap-3 justify-between">
                    <div className="flex w-full items-center gap-2 ">
                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem className="w-full flex gap-2 items-center">
                            <FormControl>
                              <Input
                                type="time"
                                placeholder="Time"
                                className="!ring-transparent !outline-0 bg-neutral-100 h-10  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />{" "}
                      <Minus className="shrink-0" />
                      <FormField
                        control={form.control}
                        name="endTime"
                        render={({ field }) => (
                          <FormItem className="w-full flex gap-2 items-center">
                            <FormControl>
                              <Input
                                type="time"
                                placeholder="Time"
                                className="!ring-transparent !outline-0 bg-neutral-100 h-10  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <p className="font-semibold mt-6 mb-4">Coach and Location</p>

                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="coach"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Coach <span className="text-red-500">*</span>
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Coach"
                            className="!ring-transparent !outline-0 bg-neutral-100 h-10  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Location
                        </FormLabel>

                        <FormControl>
                          <Input
                            placeholder="Location"
                            className="!ring-transparent !outline-0 bg-neutral-100 h-10  focus:!border-blue-200 placeholder:font-semibold placeholder:text-neutral-400"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <p className="font-semibold mt-6 mb-4">Additional details</p>

                <div className="flex flex-col gap-3">
                  <FormField
                    control={form.control}
                    name="wholeDay"
                    render={({ field }) => (
                      <FormItem className="flex flex-row !items-center justify-between rounded-lg border px-3 pt-1 pb-3 shadow-sm">
                        <div className="!translate-y-1">
                          <FormLabel className="">All day</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recurring"
                    render={({ field }) => (
                      <FormItem className="flex flex-row !items-center justify-between rounded-lg border px-3 pt-1 pb-3 shadow-sm">
                        <div className="!translate-y-1">
                          <FormLabel className="">Recurring</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetingMode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Meeting mode <span className="text-red-500">*</span>
                        </FormLabel>

                        <Select {...field}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Meeting mode" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="physical">Physical</SelectItem>
                            <SelectItem value="online">Online</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="meetingType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-500">
                          Meeting type <span className="text-red-500">*</span>
                        </FormLabel>

                        <Select {...field}>
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Meeting type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="h-10 bg-blue-500 w-full rounded-md font-medium text-white hover:bg-blue-600"
              >
                create event
              </button>
            </form>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventModal;
