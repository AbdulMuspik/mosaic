# Implementation Plan: Event Registration System

## Overview

This implementation plan breaks down the Event Registration System into incremental coding tasks. Each task builds on previous work, starting with the database schema and backend functions, then moving to frontend components, and finally integrating everything together. The plan follows the feature-based architecture pattern and leverages Convex's real-time capabilities with Clerk authentication.

## Tasks

- [x] 1. Set up database schema and core types
  - Update `convex/schema.ts` to add events, registrations, and users tables with indexes
  - Create TypeScript type definitions in `src/features/events/types.ts`
  - Create validation schemas in `src/features/events/lib/validation.ts` using Zod
  - _Requirements: 1.1, 2.1, 4.1, 9.1, 10.1, 10.2, 10.3, 10.4_

- [ ]* 1.1 Write property tests for validation schemas
  - **Property 23: Capacity validation**
  - **Property 24: Date validation**
  - **Property 25: Name length validation**
  - **Property 26: Description length validation**
  - **Property 27: Validation error messages are specific**
  - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

- [x] 2. Implement event queries and mutations (Convex backend)
  - [x] 2.1 Create `convex/events.ts` with list and getById queries
    - Implement event listing with category and search filtering
    - Add computed fields (availableSpots, isFull)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 2.2 Write property tests for event queries
    - **Property 2: Category filtering returns only matching events**
    - **Property 3: Search returns matching events**
    - **Property 4: Full events display correct UI state**
    - **Validates: Requirements 1.3, 1.4, 1.5**

  - [x] 2.3 Implement event mutations (create, update, remove)
    - Add admin role validation using Clerk authentication
    - Implement cascade deletion for registrations
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

  - [ ]* 2.4 Write property tests for event mutations
    - **Property 12: Event creation requires all fields**
    - **Property 13: Event updates preserve registrations**
    - **Property 14: Event deletion cancels all registrations**
    - **Validates: Requirements 4.1, 4.2, 4.3, 4.4**

- [x] 3. Implement registration queries and mutations (Convex backend)
  - [x] 3.1 Create `convex/registrations.ts` with registration operations
    - Implement register mutation with capacity checks and duplicate prevention
    - Implement cancel mutation with capacity updates
    - Implement listByUser and listAll queries with filtering
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.3, 3.4, 3.5, 5.1, 5.3, 5.4_

  - [ ]* 3.2 Write property tests for registration operations
    - **Property 5: Successful registration creates pending status**
    - **Property 6: Registration respects capacity limits**
    - **Property 7: Registration operations maintain capacity invariant**
    - **Property 8: Duplicate registration prevention**
    - **Property 10: Registration cancellation updates status**
    - **Property 11: Cancelled registration cannot be re-cancelled**
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 3.3, 3.4, 3.5**

  - [x] 3.3 Implement admin registration management
    - Add updateStatus mutation with status transition validation
    - Add role-based authorization checks
    - _Requirements: 5.5, 5.6, 7.1, 7.2_

  - [ ]* 3.4 Write property tests for admin operations
    - **Property 18: Registration status transitions are valid**
    - **Property 19: Non-admin users cannot perform admin operations**
    - **Validates: Requirements 5.5, 7.2**

- [ ] 4. Checkpoint - Ensure backend tests pass
  - Run all Convex function tests
  - Verify schema is correctly deployed
  - Ensure all tests pass, ask the user if questions arise

- [ ] 5. Implement student event browsing UI
  - [ ] 5.1 Create event components in `src/features/events/components/`
    - Create EventCard.tsx to display individual event details
    - Create EventList.tsx with real-time Convex query
    - Create EventFilters.tsx for category and search filtering
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [ ]* 5.2 Write property tests for event display
    - **Property 1: Event display contains required fields**
    - **Validates: Requirements 1.2**

  - [ ] 5.3 Create event registration hook in `src/features/events/hooks/`
    - Implement useEventRegistration.ts with register and cancel functions
    - Add toast notifications for success/error feedback
    - _Requirements: 2.1, 2.2, 2.3, 3.3_

  - [ ]* 5.4 Write unit tests for registration hook
    - Test successful registration flow
    - Test error handling for full events
    - Test duplicate registration prevention
    - _Requirements: 2.1, 2.2, 2.5_

- [ ] 6. Implement student registration management UI
  - [ ] 6.1 Create registration components in `src/features/registrations/components/`
    - Create RegistrationCard.tsx to display registration details
    - Create RegistrationList.tsx with real-time Convex query
    - Create RegistrationStatus.tsx for status badges
    - _Requirements: 3.1, 3.2, 3.3_

  - [ ]* 6.2 Write property tests for registration display
    - **Property 9: Registration display contains required fields**
    - **Validates: Requirements 3.2**

  - [ ] 6.3 Create student pages in `src/app/`
    - Create `app/events/page.tsx` for event browsing
    - Create `app/my-registrations/page.tsx` for student registrations
    - Add navigation links in layout
    - _Requirements: 1.1, 3.1_

- [ ] 7. Checkpoint - Ensure student UI works end-to-end
  - Test event browsing with filtering and search
  - Test registration workflow
  - Test registration cancellation
  - Ensure all tests pass, ask the user if questions arise

- [ ] 8. Implement admin event management UI
  - [ ] 8.1 Create admin components in `src/features/admin/components/`
    - Create EventForm.tsx for create/edit event with React Hook Form + Zod
    - Create EventManagement.tsx to list and manage events
    - Add delete confirmation dialog
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [ ]* 8.2 Write unit tests for event form
    - Test form validation with various inputs
    - Test successful event creation
    - Test event update preserves registrations
    - _Requirements: 4.1, 4.2, 4.3_

  - [ ] 8.3 Create admin registration management components
    - Create RegistrationManagement.tsx with filtering by event and status
    - Add status update functionality with validation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [ ]* 8.4 Write property tests for admin registration management
    - **Property 15: Admin registration display contains required fields**
    - **Property 16: Admin event filter returns only matching registrations**
    - **Property 17: Admin status filter returns only matching registrations**
    - **Validates: Requirements 5.2, 5.3, 5.4**

- [ ] 9. Implement data export functionality
  - [ ] 9.1 Create export query in `convex/admin.ts`
    - Implement exportRegistrations query with filtering support
    - Format data for CSV export
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ] 9.2 Create ExportButton.tsx component
    - Add CSV download functionality using export query
    - Show loading state during export
    - _Requirements: 8.1, 8.2, 8.3_

  - [ ]* 9.3 Write property tests for export functionality
    - **Property 20: Export contains required fields**
    - **Property 21: Export respects filters**
    - **Validates: Requirements 8.2, 8.3**

- [ ] 10. Implement role-based access control
  - [ ] 10.1 Create admin route protection
    - Create `app/admin/layout.tsx` with role check
    - Redirect non-admin users to student view
    - _Requirements: 7.1, 7.2, 7.5_

  - [ ] 10.2 Create admin pages
    - Create `app/admin/events/page.tsx` for event management
    - Create `app/admin/registrations/page.tsx` for registration oversight
    - Create `app/admin/page.tsx` for admin dashboard
    - _Requirements: 4.1, 5.1, 7.1_

  - [ ]* 10.3 Write unit tests for access control
    - Test admin route protection
    - Test unauthenticated user redirection
    - Test non-admin user authorization errors
    - _Requirements: 7.1, 7.2, 7.5_

- [ ] 11. Implement real-time UI updates
  - [ ] 11.1 Add optimistic UI updates for registrations
    - Update EventCard to show real-time capacity changes
    - Update registration buttons based on capacity
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

  - [ ] 11.2 Add loading and error states
    - Implement skeleton loaders for async data
    - Add error boundaries for component failures
    - Show connection status indicators
    - _Requirements: 6.1, 6.2_

  - [ ]* 11.3 Write integration tests for real-time updates
    - Test capacity updates propagate to UI
    - Test registration button state changes
    - _Requirements: 6.1, 6.3, 6.4_

- [ ] 12. Implement event category grouping
  - [ ] 12.1 Add category grouping to EventList component
    - Group events by category in display
    - Add category headers
    - _Requirements: 9.3_

  - [ ]* 12.2 Write property tests for category grouping
    - **Property 22: Event category grouping**
    - **Validates: Requirements 9.3**

- [ ] 13. Final integration and polish
  - [ ] 13.1 Add error handling and user feedback
    - Implement toast notifications for all operations
    - Add form validation error messages
    - Add network error handling
    - _Requirements: 10.5_

  - [ ] 13.2 Add UI polish and accessibility
    - Ensure all forms are keyboard accessible
    - Add ARIA labels for screen readers
    - Test with dark/light theme
    - Ensure responsive design works on mobile

  - [ ] 13.3 Wire all components together
    - Verify navigation between all pages works
    - Test complete user workflows (student and admin)
    - Ensure all real-time updates work correctly

- [ ] 14. Final checkpoint - Complete system verification
  - Run full test suite (unit + property tests)
  - Test all user workflows end-to-end
  - Verify role-based access control
  - Test real-time synchronization
  - Ensure all tests pass, ask the user if questions arise

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties (minimum 100 iterations each)
- Unit tests validate specific examples and edge cases
- All backend functions include role-based authorization checks
- Real-time updates are handled automatically by Convex reactivity
