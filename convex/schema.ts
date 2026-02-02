import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerId: v.string(),
    importStatus: v.optional(
      v.union(
        v.literal("imported"),
        v.literal("completed"),
        v.literal("failed"),
      ),
    ),
  }).index("by_ownerId", ["ownerId"]),

  events: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.union(
      v.literal("Music"),
      v.literal("Dance"),
      v.literal("Drama"),
      v.literal("Art"),
      v.literal("Sports"),
      v.literal("Technical"),
      v.literal("Literary"),
      v.literal("Other"),
    ),
    date: v.string(), // ISO 8601 date string
    time: v.string(), // HH:MM format
    venue: v.string(),
    capacity: v.number(),
    registeredCount: v.number(), // Denormalized for performance
    createdBy: v.id("users"),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_date", ["date"])
    .searchIndex("search_events", {
      searchField: "name",
      filterFields: ["category"],
    }),

  registrations: defineTable({
    userId: v.id("users"),
    eventId: v.id("events"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
    registeredAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_event", ["eventId"])
    .index("by_status", ["status"])
    .index("by_user_and_event", ["userId", "eventId"]),

  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("student"), v.literal("admin")),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_role", ["role"]),
});
