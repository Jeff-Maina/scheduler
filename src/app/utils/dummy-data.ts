type ActivityType = "chess" | "scrabble" | "coding";
type SessionType = "physical" | "online";
type GroupType = "individual" | "group";
type RecurrenceFrequency = "daily" | "weekly" | "monthly" | "yearly"; // For recurring events

interface Recurrence {
  frequency: RecurrenceFrequency;
  interval: number; // e.g., every 2 weeks
  daysOfWeek?: number[]; // e.g., [1, 3, 5] for Monday, Wednesday, Friday (ISO 8601: 1 = Monday)
  endDate?: string; // When the recurring session ends
}

type TSessionType = {
  id: string;
  title: string; // Title of the session
  activityName: ActivityType;
  instructorName: string;
  startTime: string; // ISO format, e.g., "2024-10-25T09:00:00Z"
  endTime: string;
  location: string | null; // Physical location or null for online
  sessionType: SessionType;
  groupType: GroupType;
  participants: number;
  description?: string; // Description of the session
  isAllDay: boolean; // Whether the session spans the entire day
  link?: string; // Meeting link if it's an online session
  colorCode?: string; // Color tag for easy identification (e.g., "#FF5733")
  notes?: string; // Additional notes about the session
  recurrence?: Recurrence; // Recurring event details
};

export const sessions: TSessionType[] = [
  {
    id: "1",
    title: "Chess Strategy Workshop",
    activityName: "chess",
    instructorName: "John Doe",
    startTime: "2024-10-25T03:00:00Z",
    endTime: "2024-10-25T20:20:00Z",
    location: "Room 101",
    sessionType: "physical",
    groupType: "group",
    participants: 8,
    description: "Intermediate chess strategies.",
    isAllDay: false,
    colorCode: "210, 50%, 40%", // A soft blue
  },
  {
    id: "2",
    title: "Personal Scrabble Coaching",
    activityName: "scrabble",
    instructorName: "Jane Smith",
    startTime: "2024-10-25T06:00:00Z",
    endTime: "2024-10-25T08:20:00Z",
    location: null,
    sessionType: "online",
    groupType: "individual",
    participants: 1,
    description: "Coaching for beginners.",
    isAllDay: false,
    link: "https://zoom.us/j/123456789",
    colorCode: "0, 65%, 50%", // A bright red
    notes: "Bring a notebook.",
    recurrence: {
      frequency: "weekly",
      interval: 1,
      daysOfWeek: [6],
      endDate: "2024-12-01T23:59:59Z",
    },
  },
  {
    id: "3",
    title: "Python Basics Session",
    activityName: "coding",
    instructorName: "Alice Johnson",
    startTime: "2024-10-30T11:00:00Z",
    endTime: "2024-10-30T12:30:00Z",
    location: "Lab A",
    sessionType: "physical",
    groupType: "group",
    participants: 10,
    description: "Introduction to Python basics.",
    isAllDay: false,
    colorCode: "120, 50%, 45%", // A vivid green
  },
  {
    id: "4",
    title: "Chess Endgame Practice",
    activityName: "chess",
    instructorName: "Michael Brown",
    startTime: "2024-11-01T16:00:00Z",
    endTime: "2024-11-01T17:00:00Z",
    location: null,
    sessionType: "online",
    groupType: "individual",
    participants: 1,
    isAllDay: false,
    link: "https://meet.google.com/xyz-defg-hij",
    colorCode: "280, 45%, 50%", // A soft purple
    recurrence: {
      frequency: "daily",
      interval: 2,
    },
  },
  {
    id: "5",
    title: "Scrabble Marathon Event",
    activityName: "scrabble",
    instructorName: "Emily Davis",
    startTime: "2024-11-05T00:00:00Z",
    endTime: "2024-11-05T23:59:59Z",
    location: "Room 203",
    sessionType: "physical",
    groupType: "group",
    participants: 6,
    isAllDay: true,
    description: "Full-day Scrabble marathon.",
    colorCode: "60, 65%, 50%", // A warm yellow
  },
  {
    id: "6",
    title: "JavaScript for Beginners",
    activityName: "coding",
    instructorName: "Chris Wilson",
    startTime: "2024-11-08T13:00:00Z",
    endTime: "2024-11-08T14:30:00Z",
    location: null,
    sessionType: "online",
    groupType: "group",
    participants: 5,
    link: "https://teams.microsoft.com/l/meetup-join/123",
    description: "Learn JavaScript basics.",
    isAllDay: false,
    
    colorCode: "200, 60%, 40%", // A calm cyan
    recurrence: {
      frequency: "monthly",
      interval: 1,
      endDate: "2025-01-01T23:59:59Z",
    },
  },
  {
    id: "7",
    title: "Advanced Chess Techniques",
    activityName: "chess",
    instructorName: "John Doe",
    startTime: "2024-10-28T15:00:00Z",
    endTime: "2024-10-28T16:30:00Z",
    location: "Room 101",
    sessionType: "physical",
    groupType: "individual",
    participants: 1,
    notes: "Focus on advanced strategies.",
    isAllDay: false,
    colorCode: "180, 50%, 35%", // A deep teal
  },
  {
    id: "8",
    title: "Scrabble Group Game",
    activityName: "scrabble",
    instructorName: "Jane Smith",
    startTime: "2024-11-10T09:30:00Z",
    endTime: "2024-11-10T11:00:00Z",
    location: "Room 102",
    sessionType: "physical",
    groupType: "group",
    participants: 8,
    isAllDay: false,
    colorCode: "30, 70%, 45%", // A soft orange
  },
  {
    id: "9",
    title: "1-on-1 Python Coaching",
    activityName: "coding",
    instructorName: "Alice Johnson",
    startTime: "2024-11-12T14:00:00Z",
    endTime: "2024-11-12T15:30:00Z",
    location: null,
    sessionType: "online",
    groupType: "individual",
    participants: 1,
    link: "https://zoom.us/j/987654321",
    isAllDay: false,
    colorCode: "350, 60%, 45%", // A bright pink
  },
  {
    id: "10",
    title: "Chess Endgame Tactics",
    activityName: "chess",
    instructorName: "Michael Brown",
    startTime: "2024-11-20T18:00:00Z",
    endTime: "2024-11-20T19:30:00Z",
    location: "Room 105",
    sessionType: "physical",
    groupType: "group",
    participants: 7,
    description: "Learn endgame tactics.",
    isAllDay: false,
    colorCode: "340, 50%, 50%", // A rich magenta
  },
];
export type { TSessionType };
