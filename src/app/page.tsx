import Calendar from "./_components/calendar";
import Scheduler from "./_components/scheduler";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex justify-center px-20 pt-4">
      <Scheduler />
    </div>
  );
}
