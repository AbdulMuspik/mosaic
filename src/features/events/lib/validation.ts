// src/features/events/lib/validation.ts
import { z } from "zod";

export const eventFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  category: z.enum([
    "Music",
    "Dance",
    "Drama",
    "Art",
    "Sports",
    "Technical",
    "Literary",
    "Other",
  ]),
  date: z.string().refine((date) => {
    const eventDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  }, "Event date cannot be in the past"),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)"),
  venue: z.string().min(3, "Venue must be at least 3 characters"),
  capacity: z.number().int().positive("Capacity must be a positive integer"),
});

export type EventFormData = z.infer<typeof eventFormSchema>;
