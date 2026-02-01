# Implementation Plan: Event Registration System

## Overview

This implementation plan breaks down the Event Registration System into discrete, incremental coding tasks. Each task builds on previous work, with testing integrated throughout to catch errors early. The implementation follows a bottom-up approach: database schema → backend mutations/queries → UI components → integration.

## Tasks

- [ ] 1. Set up Convex schema and database structure
  - Define users, events, and registrations tables in `convex/schema.ts`
  - Create indexes for efficient queries (by_email, by_date, by_user, by_event, by_user_and_event)
  - Add validation helpers for email and phone number formats
  - _Requirements: 1.1, 1.2, 1.3, 1.5, 2.1, 3.1, 4.1, 5.1, 5.2_

- [ ] 2. Implement user management mutations and queries
  - [ ] 2.1 Create `convex/users.ts` with createUser mutation
    - Implement email format validation
    - Implement phone number validation
    - Check for duplicate emails using by_email index
    - Validate non-empty required fields
    - Create user record with timestamp
    - _Requirements: 1.1, 1.2, 1.3, 1.5, 5.1, 5.2_
  
  - [ ]* 2.2 Write property test for valid user creation
    - **Property 1: Valid User Creation**
    - **Validates: Requirements 1.1**
  
  - [ ]* 2.3 Write property test for duplicate email rejection
    - **Property 2: Duplicate Email Rejection**
    - **Validates: Requirements 1.2**
  
  - [ ]* 2.4 Write property test for invalid email rejection
    - **Property 3: Invalid Email Rejection**
    - **Validates: Requirements 1.3, 5.1**
  
  - [ ]* 2.5 Write property test for user data persistence round-trip
    - **Property 4: User Data Persistence Round-Trip**
    - **Validates: Requirements 1.4, 7.1, 7.3**
  
  - [ ]* 2.6 Write property test for empty field rejection
    - **Property 5: Empty Field Rejection**
    - **Validates: Requirements 1.5**
  
  - [ ]* 2.7 Write property test for phone number validation
    - **Property 17: Phone Number Validation**
    - **Validates: Requirements 5.2**
  
  - [ ] 2.8 Create getUserProfile query
    - Fetch user by ID
    - Return user profile data
    - _Requirements: 7.1, 7.3_
  
  - [ ]* 2.9 Write property test for user data isolation
    - **Property 21: User Data Isolation**
    - **Validates: Requirements 7.2**

- [ ] 3. Implement event management mutations and queries
  - [ ] 3.1 Create `convex/events.ts` with event creation and queries
    - Implement createEvent mutation with validation (positive capacity, future date)
    - Implement listEvents query with chronological ordering
    - Include capacity status calculation (isFull flag)
    - _Requirements: 2.1, 2.3, 2.4, 5.3, 5.4_
  
  - [ ]* 3.2 Write property test for event listing completeness
    - **Property 6: Event Listing Completeness**
    - **Validates: Requirements 2.1**
  
  - [ ]* 3.3 Write property test for event capacity status accuracy
    - **Property 8: Event Capacity Status Accuracy**
    - **Validates: Requirements 2.3**
  
  - [ ]* 3.4 Write property test for event chronological ordering
    - **Property 9: Event Chronological Ordering**
    - **Validates: Requirements 2.4**
  
  - [ ]* 3.5 Write property test for event capacity validation
    - **Property 18: Event Capacity Validation**
    - **Validates: Requirements 5.3**
  
  - [ ]* 3.6 Write property test for future date validation
    - **Property 19: Future Date Validation**
    - **Validates: Requirements 5.4**

- [ ] 4. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implement registration mutations and queries
  - [ ] 5.1 Create `convex/registrations.ts` with registerForEvent mutation
    - Check event exists and has available capacity
    - Check for duplicate registration using by_user_and_event index
    - Create registration record
    - Atomically increment event registeredCount
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  
  - [ ]* 5.2 Write property test for successful registration creation
    - **Property 10: Successful Registration Creation**
    - **Validates: Requirements 3.1**
  
  - [ ]* 5.3 Write property test for capacity limit enforcement
    - **Property 11: Capacity Limit Enforcement**
    - **Validates: Requirements 3.2**
  
  - [ ]* 5.4 Write property test for duplicate registration prevention
    - **Property 12: Duplicate Registration Prevention**
    - **Validates: Requirements 3.3**
  
  - [ ]* 5.5 Write property test for registration count invariant
    - **Property 7: Registration Count Invariant**
    - **Validates: Requirements 2.2, 3.4, 4.3**
  
  - [ ]* 5.6 Write property test for registration persistence round-trip
    - **Property 13: Registration Persistence Round-Trip**
    - **Validates: Requirements 3.5**
  
  - [ ] 5.7 Create getUserRegistrations query
    - Fetch all registrations for a user using by_user index
    - Join with events table to return full event details
    - _Requirements: 4.1_
  
  - [ ]* 5.8 Write property test for user registration query completeness
    - **Property 14: User Registration Query Completeness**
    - **Validates: Requirements 4.1**
  
  - [ ] 5.9 Create cancelRegistration mutation
    - Find registration by userId and eventId
    - Delete registration record
    - Atomically decrement event registeredCount
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [ ]* 5.10 Write property test for registration cancellation removal
    - **Property 15: Registration Cancellation Removal**
    - **Validates: Requirements 4.2**
  
  - [ ]* 5.11 Write property test for capacity restoration after cancellation
    - **Property 16: Capacity Restoration After Cancellation**
    - **Validates: Requirements 4.4**

- [ ] 6. Checkpoint - Ensure all backend tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 7. Create user registration UI components
  - [ ] 7.1 Create RegistrationForm component
    - Build form with name, email, phone number fields using shadcn/ui
    - Add client-side validation with visual feedback
    - Call createUser mutation on submit
    - Handle success state (show user ID or redirect)
    - Handle error states with user-friendly messages
    - _Requirements: 1.1, 1.2, 1.3, 1.5_
  
  - [ ]* 7.2 Write unit tests for RegistrationForm component
    - Test form validation
    - Test successful submission
    - Test error handling

- [ ] 8. Create event listing UI components
  - [ ] 8.1 Create EventCard component
    - Display event details (name, description, date, time, location)
    - Show capacity information (X/Y registered)
    - Show "Full" badge when at capacity
    - Add "Register" button (disabled when full)
    - _Requirements: 2.1, 2.3_
  
  - [ ] 8.2 Create EventList component
    - Use listEvents query with Convex's useQuery hook
    - Render EventCard for each event
    - Handle loading and empty states
    - Display events in chronological order
    - _Requirements: 2.1, 2.4_
  
  - [ ]* 8.3 Write unit tests for EventList and EventCard components
    - Test rendering with various event states
    - Test capacity display logic
    - Test empty state handling

- [ ] 9. Create event registration functionality
  - [ ] 9.1 Add registration action to EventCard component
    - Call registerForEvent mutation on button click
    - Implement optimistic UI updates
    - Handle success state (update button to "Registered")
    - Handle error states (capacity full, duplicate, etc.)
    - Show loading state during mutation
    - _Requirements: 3.1, 3.2, 3.3_
  
  - [ ]* 9.2 Write integration tests for registration flow
    - Test successful registration
    - Test capacity limit errors
    - Test duplicate registration errors

- [ ] 10. Create user dashboard components
  - [ ] 10.1 Create UserDashboard component
    - Display user profile information using getUserProfile query
    - List user's registered events using getUserRegistrations query
    - Add "Cancel Registration" button for each event
    - Handle loading states
    - _Requirements: 4.1, 7.1, 7.3_
  
  - [ ] 10.2 Implement registration cancellation in UserDashboard
    - Call cancelRegistration mutation on button click
    - Implement optimistic UI updates
    - Handle success state (remove event from list)
    - Handle error states
    - Show confirmation dialog before canceling
    - _Requirements: 4.2, 4.3, 4.4_
  
  - [ ]* 10.3 Write unit tests for UserDashboard component
    - Test profile display
    - Test registration list rendering
    - Test cancellation flow

- [ ] 11. Checkpoint - Ensure all UI tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 12. Add concurrent registration handling
  - [ ] 12.1 Enhance registerForEvent mutation with transaction safety
    - Wrap capacity check and registration creation in Convex transaction
    - Add retry logic for transient conflicts
    - Return specific error for race conditions
    - _Requirements: 6.1_
  
  - [ ]* 12.2 Write property test for concurrent registration correctness
    - **Property 20: Concurrent Registration Correctness**
    - **Validates: Requirements 6.1**
    - Note: This test simulates concurrent requests and may be challenging to implement reliably

- [ ] 13. Create main application pages
  - [ ] 13.1 Create registration page (`app/register/page.tsx`)
    - Integrate RegistrationForm component
    - Add page layout and styling
    - Handle post-registration navigation
  
  - [ ] 13.2 Create events page (`app/events/page.tsx`)
    - Integrate EventList component
    - Add page layout and styling
    - Add filters/search if needed
  
  - [ ] 13.3 Create dashboard page (`app/dashboard/page.tsx`)
    - Integrate UserDashboard component
    - Add page layout and styling
    - Add navigation between pages

- [ ] 14. Add error handling and user feedback
  - [ ] 14.1 Create error display components
    - Create ErrorMessage component for validation errors
    - Create Toast notifications for success/error feedback
    - Implement error boundary for unexpected errors
  
  - [ ] 14.2 Integrate error handling across all components
    - Add error handling to all mutation calls
    - Display user-friendly error messages
    - Add loading states to all async operations

- [ ] 15. Final checkpoint - End-to-end testing
  - Ensure all tests pass, ask the user if questions arise.
  - Verify complete user flows work correctly
  - Test error scenarios manually

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation throughout implementation
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples, edge cases, and UI behavior
- Convex's built-in transaction support handles concurrency automatically
- Use fast-check library for property-based testing in TypeScript
