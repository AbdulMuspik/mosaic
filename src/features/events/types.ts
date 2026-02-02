// src/features/events/types.ts
export type EventCategory =
  | "Music"
  | "Dance"
  | "Drama"
  | "Art"
  | "Sports"
  | "Technical"
  | "Literary"
  | "Other";

export type RegistrationStatus = "pending" | "confirmed" | "cancelled";

export interface Event {
  _id: string;
  name: string;
  description: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  registeredCount: number;
  availableSpots: number; // Computed: capacity - registeredCount
  isFull: boolean; // Computed: registeredCount >= capacity
  createdBy: string;
  createdAt: number;
  updatedAt: number;
}

export interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  status: RegistrationStatus;
  registeredAt: number;
  updatedAt: number;
  event?: Event; // Populated via join
  user?: User; // Populated via join
}

export interface User {
  _id: string;
  clerkId: string;
  email: string;
  name: string;
  role: "student" | "admin";
  createdAt: number;
}
