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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";

// zod yo
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
});

type TEventProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const NewEventModal = ({ isModalOpen, toggleModal }: TEventProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={toggleModal}>
      <DialogContent className="w-[450px] p-3">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
          <DialogDescription className="sr-only">
            Create new event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-500">Subject <span className="text-red-500">*</span></FormLabel>

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
              <div className="w-full grid grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="startDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-500">
                        Start date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full bg-neutral-100 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endDateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-neutral-500">
                        End date <span className="text-red-500">*</span>
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full bg-neutral-100 pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            defaultMonth={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="coach"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-500">Coach <span className="text-red-500">*</span></FormLabel>

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
                    <FormLabel className="text-neutral-500">Location</FormLabel>

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
            </div>
            <button
              type="submit"
              className="h-10 bg-blue-500 w-full rounded-md font-medium text-white hover:bg-blue-600"
            >
              create event
            </button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewEventModal;
