import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Get all published events with computed fields
export const list = query({
  args: {
    category: v.optional(
      v.union(
        v.literal("Music"),
        v.literal("Dance"),
        v.literal("Drama"),
        v.literal("Art"),
        v.literal("Sports"),
        v.literal("Technical"),
        v.literal("Literary"),
        v.literal("Other"),
      ),
    ),
    searchQuery: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let events: Doc<"events">[];

    if (args.searchQuery) {
      if (args.category !== undefined) {
        const category = args.category;
        events = await ctx.db
          .query("events")
          .withSearchIndex("search_events", (q) =>
            q.search("name", args.searchQuery || "").eq("category", category),
          )
          .collect();
      } else {
        events = await ctx.db
          .query("events")
          .withSearchIndex("search_events", (q) =>
            q.search("name", args.searchQuery || ""),
          )
          .collect();
      }
    } else if (args.category !== undefined) {
      const category = args.category;
      events = await ctx.db
        .query("events")
        .withIndex("by_category", (q) => q.eq("category", category))
        .collect();
    } else {
      events = await ctx.db.query("events").collect();
    }

    // Add computed fields
    return events.map((event) => ({
      ...event,
      availableSpots: event.capacity - event.registeredCount,
      isFull: event.registeredCount >= event.capacity,
    }));
  },
});

// Get single event by ID
export const getById = query({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const event = await ctx.db.get(args.eventId);
    if (!event) return null;

    return {
      ...event,
      availableSpots: event.capacity - event.registeredCount,
      isFull: event.registeredCount >= event.capacity,
    };
  },
});

// Create new event (admin only)
export const create = mutation({
  args: {
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
    date: v.string(),
    time: v.string(),
    venue: v.string(),
    capacity: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Validation happens on client, but double-check critical fields
    if (args.capacity <= 0) {
      throw new Error("Capacity must be positive");
    }

    const now = Date.now();
    return await ctx.db.insert("events", {
      ...args,
      registeredCount: 0,
      createdBy: user._id,
      createdAt: now,
      updatedAt: now,
    });
  },
});

// Update event (admin only)
export const update = mutation({
  args: {
    eventId: v.id("events"),
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
    date: v.string(),
    time: v.string(),
    venue: v.string(),
    capacity: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    const { eventId, ...updates } = args;
    await ctx.db.patch(eventId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

// Delete event (admin only)
export const remove = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user || user.role !== "admin") {
      throw new Error("Unauthorized: Admin access required");
    }

    // Cancel all registrations for this event
    const registrations = await ctx.db
      .query("registrations")
      .withIndex("by_event", (q) => q.eq("eventId", args.eventId))
      .collect();

    for (const registration of registrations) {
      await ctx.db.patch(registration._id, {
        status: "cancelled",
        updatedAt: Date.now(),
      });
    }

    await ctx.db.delete(args.eventId);
  },
});
