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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// zod yo
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
      <DialogContent className="w-[350px] p-3">
        <DialogHeader>
          <DialogTitle>Create new event</DialogTitle>
          <DialogDescription className="sr-only">
            Create new event.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Event Title"
                      className="!ring-transparent !outline-0 bg-neutral-100 p-4 h-10  focus:!border-blue-200"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
