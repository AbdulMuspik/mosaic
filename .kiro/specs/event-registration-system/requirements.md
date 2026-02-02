# Requirements Document: Event Registration System

## Introduction

The Event Registration System enables students to discover and register for cultural fest events at IILM University Greater Noida (2026), while providing administrators with comprehensive tools to manage events, registrations, and platform operations. The system leverages real-time data synchronization to ensure students receive immediate feedback on event availability and registration status.

## Glossary

- **System**: The Event Registration System
- **Student**: A user with student role who can browse and register for events
- **Admin**: A user with administrator role who can manage events and registrations
- **Event**: A cultural fest activity with defined capacity, schedule, and details
- **Registration**: A student's enrollment in a specific event
- **Event_Manager**: The component responsible for event CRUD operations
- **Registration_Manager**: The component responsible for registration operations
- **Auth_Service**: Clerk authentication service integrated with Convex
- **Database**: Convex real-time database backend
- **Capacity**: The maximum number of students allowed to register for an event
- **Category**: The classification of events (e.g., Music, Dance, Drama, Art, Sports)

## Requirements

### Requirement 1: Event Discovery

**User Story:** As a student, I want to browse available cultural fest events, so that I can discover activities I'm interested in participating in.

#### Acceptance Criteria

1. WHEN a student accesses the events page, THE System SHALL display all published events with their basic information
2. WHEN displaying events, THE System SHALL show event name, category, date, time, venue, and available capacity
3. WHEN a student filters by category, THE System SHALL display only events matching the selected category
4. WHEN a student searches by keyword, THE System SHALL return events where the keyword matches the name or description
5. WHEN an event reaches full capacity, THE System SHALL display a "Full" indicator and disable registration

### Requirement 2: Event Registration

**User Story:** As a student, I want to register for events I'm interested in, so that I can participate in the cultural fest activities.

#### Acceptance Criteria

1. WHEN a student clicks register on an available event, THE System SHALL create a registration with "pending" status
2. WHEN a registration is created, THE System SHALL verify the event has not reached capacity
3. IF an event is at full capacity, THEN THE System SHALL reject the registration and display an error message
4. WHEN a registration is successful, THE System SHALL update the event's available capacity immediately
5. WHEN a student attempts to register for an event they're already registered for, THE System SHALL prevent duplicate registration
6. THE Auth_Service SHALL verify the user is authenticated before allowing registration

### Requirement 3: Student Registration Management

**User Story:** As a student, I want to view and manage my event registrations, so that I can track which events I'm participating in and cancel if needed.

#### Acceptance Criteria

1. WHEN a student accesses their registrations page, THE System SHALL display all their registrations with event details
2. WHEN displaying registrations, THE System SHALL show registration status, event name, date, time, and venue
3. WHEN a student cancels a registration, THE System SHALL update the registration status to "cancelled"
4. WHEN a registration is cancelled, THE System SHALL increment the event's available capacity
5. WHEN a student cancels a registration, THE System SHALL prevent re-cancellation of already cancelled registrations

### Requirement 4: Admin Event Management

**User Story:** As an admin, I want to create and manage events, so that I can organize the cultural fest schedule and activities.

#### Acceptance Criteria

1. WHEN an admin creates an event, THE System SHALL require name, description, date, time, venue, capacity, and category
2. WHEN an admin creates an event, THE Event_Manager SHALL validate all required fields are present
3. WHEN an admin updates an event, THE System SHALL preserve existing registrations
4. WHEN an admin deletes an event, THE System SHALL cancel all associated registrations
5. THE Auth_Service SHALL verify the user has admin role before allowing event management operations
6. WHEN event details are updated, THE System SHALL reflect changes immediately to all connected clients

### Requirement 5: Admin Registration Oversight

**User Story:** As an admin, I want to view and manage all event registrations, so that I can monitor participation and handle registration issues.

#### Acceptance Criteria

1. WHEN an admin accesses the registrations dashboard, THE System SHALL display all registrations across all events
2. WHEN displaying registrations, THE System SHALL show student name, event name, registration status, and timestamp
3. WHEN an admin filters by event, THE System SHALL display only registrations for the selected event
4. WHEN an admin filters by status, THE System SHALL display only registrations matching the selected status
5. WHEN an admin updates a registration status, THE System SHALL validate the status transition is valid
6. WHEN an admin confirms a registration, THE System SHALL update the status from "pending" to "confirmed"

### Requirement 6: Real-time Capacity Updates

**User Story:** As a student, I want to see real-time updates on event capacity, so that I know immediately if an event becomes full or spots become available.

#### Acceptance Criteria

1. WHEN any student registers for an event, THE System SHALL update the available capacity for all connected clients
2. WHEN any student cancels a registration, THE System SHALL update the available capacity for all connected clients
3. WHEN an event reaches full capacity, THE System SHALL disable the registration button for all connected clients
4. WHEN capacity becomes available, THE System SHALL enable the registration button for all connected clients
5. THE Database SHALL use Convex reactivity to propagate capacity changes immediately

### Requirement 7: Role-Based Access Control

**User Story:** As a system architect, I want clear separation between student and admin capabilities, so that the platform maintains security and appropriate access levels.

#### Acceptance Criteria

1. WHEN a user without admin role attempts to access admin routes, THE System SHALL redirect to the student view
2. WHEN a user without admin role attempts admin operations, THE System SHALL reject the request with an authorization error
3. THE Auth_Service SHALL provide role information in the authentication token
4. THE System SHALL validate user roles on both client and server for all protected operations
5. WHEN an unauthenticated user attempts any operation, THE System SHALL redirect to the login page

### Requirement 8: Data Export

**User Story:** As an admin, I want to export registration data, so that I can analyze participation and create reports for the fest organizers.

#### Acceptance Criteria

1. WHEN an admin requests a registration export, THE System SHALL generate a CSV file with all registration data
2. WHEN exporting registrations, THE System SHALL include student name, email, event name, category, status, and timestamp
3. WHEN an admin filters registrations before export, THE System SHALL export only the filtered subset
4. THE System SHALL complete the export operation within 10 seconds for up to 10,000 registrations

### Requirement 9: Event Categories

**User Story:** As an admin, I want to organize events into categories, so that students can easily find events by type of activity.

#### Acceptance Criteria

1. THE System SHALL support predefined categories: Music, Dance, Drama, Art, Sports, Technical, Literary, and Other
2. WHEN creating an event, THE Event_Manager SHALL require exactly one category selection
3. WHEN displaying events, THE System SHALL group events by category
4. WHEN a student filters by category, THE System SHALL use the event's assigned category for matching

### Requirement 10: Input Validation

**User Story:** As a developer, I want comprehensive input validation, so that the system maintains data integrity and provides clear error messages.

#### Acceptance Criteria

1. WHEN validating event data, THE System SHALL ensure capacity is a positive integer
2. WHEN validating event data, THE System SHALL ensure the event date is not in the past
3. WHEN validating event data, THE System SHALL ensure name is between 3 and 100 characters
4. WHEN validating event data, THE System SHALL ensure description is between 10 and 1000 characters
5. WHEN validation fails, THE System SHALL return specific error messages indicating which fields are invalid
6. THE System SHALL perform validation on both client and server to ensure data integrity
