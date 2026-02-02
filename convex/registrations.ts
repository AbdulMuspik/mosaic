import { v } from "convex/values";
import type { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

// Register for an event
export const register = mutation({
  args: { eventId: v.id("events") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    // Check for existing registration
    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_user_and_event", (q) =>
        q.eq("userId", user._id).eq("eventId", args.eventId),
      )
      .filter((q) => q.neq(q.field("status"), "cancelled"))
      .unique();

    if (existing) {
      throw new Error("Already registered for this event");
    }

    // Check event capacity
    const event = await ctx.db.get(args.eventId);
    if (!event) throw new Error("Event not found");

    if (event.registeredCount >= event.capacity) {
      throw new Error("Event is full");
    }

    // Create registration and update event count atomically
    const now = Date.now();
    const registrationId = await ctx.db.insert("registrations", {
      userId: user._id,
      eventId: args.eventId,
      status: "pending",
      registeredAt: now,
      updatedAt: now,
    });

    await ctx.db.patch(args.eventId, {
      registeredCount: event.registeredCount + 1,
      updatedAt: now,
    });

    return registrationId;
  },
});

// Cancel registration
export const cancel = mutation({
  args: { registrationId: v.id("registrations") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) throw new Error("User not found");

    const registration = await ctx.db.get(args.registrationId);
    if (!registration) throw new Error("Registration not found");

    // Verify ownership (students can only cancel their own)
    if (user.role !== "admin" && registration.userId !== user._id) {
      throw new Error("Unauthorized");
    }

    if (registration.status === "cancelled") {
      throw new Error("Registration already cancelled");
    }

    // Update registration and event count atomically
    const now = Date.now();
    await ctx.db.patch(args.registrationId, {
      status: "cancelled",
      updatedAt: now,
    });

    const event = await ctx.db.get(registration.eventId);
    if (event) {
      await ctx.db.patch(registration.eventId, {
        registeredCount: Math.max(0, event.registeredCount - 1),
        updatedAt: now,
      });
    }
  },
});

// Get user's registrations
export const listByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) return [];

    const registrations = await ctx.db
      .query("registrations")
      .withIndex("by_user", (q) => q.eq("userId", user._id))
      .collect();

    // Join with events
    return Promise.all(
      registrations.map(async (reg) => {
        const event = await ctx.db.get(reg.eventId);
        return { ...reg, event };
      }),
    );
  },
});

// Get all registrations (admin only)
export const listAll = query({
  args: {
    eventId: v.optional(v.id("events")),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("confirmed"),
        v.literal("cancelled"),
      ),
    ),
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

    let registrations: Doc<"registrations">[];

    if (args.eventId !== undefined) {
      const eventId = args.eventId;
      registrations = await ctx.db
        .query("registrations")
        .withIndex("by_event", (q) => q.eq("eventId", eventId))
        .collect();
    } else if (args.status !== undefined) {
      const status = args.status;
      registrations = await ctx.db
        .query("registrations")
        .withIndex("by_status", (q) => q.eq("status", status))
        .collect();
    } else {
      registrations = await ctx.db.query("registrations").collect();
    }

    // Join with events and users
    return Promise.all(
      registrations.map(async (reg) => {
        const event = await ctx.db.get(reg.eventId);
        const regUser = await ctx.db.get(reg.userId);
        return { ...reg, event, user: regUser };
      }),
    );
  },
});

// Update registration status (admin only)
export const updateStatus = mutation({
  args: {
    registrationId: v.id("registrations"),
    status: v.union(
      v.literal("pending"),
      v.literal("confirmed"),
      v.literal("cancelled"),
    ),
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

    const registration = await ctx.db.get(args.registrationId);
    if (!registration) throw new Error("Registration not found");

    // Handle capacity changes when transitioning to/from cancelled
    const event = await ctx.db.get(registration.eventId);
    if (event) {
      const now = Date.now();

      if (registration.status !== "cancelled" && args.status === "cancelled") {
        // Cancelling: decrement count
        await ctx.db.patch(registration.eventId, {
          registeredCount: Math.max(0, event.registeredCount - 1),
          updatedAt: now,
        });
      } else if (
        registration.status === "cancelled" &&
        args.status !== "cancelled"
      ) {
        // Un-cancelling: increment count
        if (event.registeredCount >= event.capacity) {
          throw new Error("Cannot un-cancel: event is full");
        }
        await ctx.db.patch(registration.eventId, {
          registeredCount: event.registeredCount + 1,
          updatedAt: now,
        });
      }
    }

    await ctx.db.patch(args.registrationId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});
