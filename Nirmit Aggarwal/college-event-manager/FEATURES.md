# Feature Walkthrough & User Guide

## 🎯 Complete Feature Overview

### 1. Authentication System

#### Signup Flow

```
Homepage → Signup Form
├── Enter Name
├── Enter Email
├── Enter Password
└── Click "CREATE ACCOUNT"
    ├── Password hashed with bcryptjs
    ├── User saved to MongoDB
    ├── JWT token generated
    └── Redirected to Events List
```

**Form Validation:**

- ✓ All fields required
- ✓ Email format validation
- ✓ Duplicate email prevention
- ✓ Error messages displayed

#### Login Flow

```
Homepage → Login Form
├── Enter Email
├── Enter Password
└── Click "LOGIN"
    ├── Credentials validated
    ├── JWT token generated
    └── Redirected based on role:
        ├── Admin → Admin Dashboard
        └── Student → Events List
```

**Security Features:**

- JWT tokens stored in localStorage
- Tokens included in all API requests (authMiddleware)
- 7-day expiration
- Password hashed (never stored plain)

---

### 2. Event Management (Student View)

#### Browse Events

```
Events List Page
├── View all upcoming events
├── Each event shows:
│   ├── Title (bold, uppercase)
│   ├── Description (truncated)
│   ├── Date (📅 icon)
│   ├── Time (🕐 icon)
│   ├── Venue (📍 icon)
│   ├── "VIEW" button → Event Details
│   └── "REGISTER" button → Register
├── Events sorted by date
├── Staggered entrance animation (GSAP)
└── Cards lift on hover with shadow shift
```

**Animations:**

- Page slides in from right
- Cards fade in with stagger (100ms between each)
- Card hover lifts 8px up
- Button press triggers tap effect

#### View Event Details

```
Event Details Page
├── Full event information
├── Title (large, bold)
├── Yellow info box showing:
│   ├── Date
│   ├── Time
│   └── Venue
├── Full description displayed
└── Action buttons:
    ├── If registered: Green "✓ REGISTERED" badge
    ├── If not: Green "REGISTER NOW" button
    └── "← BACK" button
```

**Registration:**

- Click "REGISTER NOW" → Instant registration
- Success alert → Button changes to "✓ REGISTERED"
- Prevents duplicate registrations (backend validation)
- Registration saved with timestamp

#### Student Dashboard

```
My Registrations Page
├── View all registered events
├── If no registrations:
│   └── "Register for events" button → Events List
├── If registered:
│   ├── Grid of registered events
│   ├── Each card shows full event details
│   ├── "VIEW DETAILS" button → Event Details
│   └── Staggered entrance animation
└── "BROWSE EVENTS" button to find more
```

**Features:**

- Only shows events user registered for
- Real-time list after registration
- Click event to see details or unregister

---

### 3. Event Management (Admin View)

#### Admin Dashboard

```
Admin Dashboard Page
├── Statistics Cards (animated):
│   ├── TOTAL EVENTS (yellow)
│   ├── TOTAL REGISTRATIONS (green)
│   └── AVG REGISTRATIONS PER EVENT (purple)
│
├── Events List:
│   ├── Each event card shows:
│   │   ├── Title
│   │   ├── Description
│   │   ├── Blue box with registration count
│   │   ├── Date, Time, Venue
│   │   ├── "EDIT" button (purple)
│   │   └── "DELETE" button (gray)
│   │
│   └── Staggered entrance animation
│
├── "+ CREATE EVENT" button (purple)
└── Cards show live registration counts
```

**Statistics:**

- Real-time count of total events
- Sum of all registrations
- Average registrations per event
- Color-coded for visual hierarchy

#### Create Event

```
Create Event Page (Admin Only)
├── Form with fields:
│   ├── Event Title (text input)
│   ├── Description (large textarea)
│   ├── Date (date picker)
│   ├── Time (time picker)
│   └── Venue (text input)
│
├── Form Validation:
│   ├── All fields required
│   ├── Date in ISO format
│   ├── Time in HH:MM format
│   └── Error messages if invalid
│
├── Submit Actions:
│   ├── "CREATE EVENT" button (green) → Save to DB
│   ├── "CANCEL" button → Back to dashboard
│   └── Success → Redirect to dashboard
│
└── Page animates in from right
```

**Data Saved:**

- Event created with admin's ID
- Timestamp recorded
- Added to events list immediately

#### Edit Event

```
Edit Event Page (Admin Only)
├── Pre-filled form with existing data
├── All fields editable
├── Same validation as create
├── "SAVE CHANGES" button
├── "CANCEL" button
└── Redirect to dashboard on success
```

**Restrictions:**

- Only admin who created event can edit
- Cannot edit if not authorized
- Changes reflected immediately

#### Delete Event

```
Delete Event (from Dashboard or Details)
├── Click "DELETE" button
├── Confirmation dialog
├── If confirmed:
│   ├── Event removed from database
│   ├── All registrations cascade delete
│   └── UI updates
├── If cancelled → No action
└── Works from dashboard & event details
```

---

### 4. Registration System

#### How Registration Works

**Backend Flow:**

```
Click "REGISTER"
    ↓
POST /register/:eventId with JWT
    ↓
Check if already registered (compound index)
    ↓
If duplicate: Return error 409
    ↓
If new: Create registration with timestamp
    ↓
Return success to frontend
    ↓
Frontend updates UI
```

**Prevention of Duplicates:**

- MongoDB unique compound index: [userId, eventId]
- Backend duplicate check before insert
- UI prevents button click if already registered

#### Viewing Registrations

**As Student:**

- "MY REGISTRATIONS" in header → Dashboard
- Shows all events registered for
- Click to view full details

**As Admin:**

- View count on Admin Dashboard
- View count on Event Details page
- Admin endpoint: `GET /register/admin/count/:eventId`

---

### 5. Navigation & Header

#### Header Components

```
┌─────────────────────────────────────────┐
│  EVENT MANAGER  (logo)    User Info     │
│                          Role [admin]   │
│                          LOGOUT button  │
└─────────────────────────────────────────┘
```

#### Header Buttons (Student)

- Title: "EVENT MANAGER"
- Right side: Name, Role badge, Logout

#### Header Buttons (Admin)

- Title: "EVENT MANAGER"
- Right side: Name, "[admin]" badge, Logout

#### Hidden Routes (Student Can't Access)

- `/admin-dashboard`
- `/admin/create-event`
- `/admin/edit-event/:id`
  → Redirected to `/events` if attempted

#### Hidden Routes (Non-Authenticated Can't Access)

- `/events`
- `/my-registrations`
- Any protected route
  → Redirected to `/login` if attempted

---

### 6. Design & Animations

#### Neo-Brutalism Theme

**Visual Elements:**

```
┌─────────────────────────┐
│   HEADING IN UPPERCASE  │
│ ════════════════════════  ← 4px border
│                         │
│ All text is monospace   │
│ and uppercase with      │
│ wide letter spacing     │
│                         │
│ Borders: 2-4px solid   │
│ Corners: Sharp (0px    │
│ border-radius)          │
│                         │
│ Shadows: 8px 8px 0px   │
│ rgba(0,0,0,1)          │
└─────────────────────────┘
```

**Color Scheme:**

- Yellow (#FFE500) - Primary actions
- Green (#00FF00) - Success/positive
- Purple (#9D4EDD) - Special actions
- White - Background
- Black - Borders & text

#### GSAP Animations

**1. Page Transitions**

```
New page loads
    ↓
Slide in from right (x: +50px)
    ↓
Fade in (opacity: 0 → 1)
    ↓
Duration: 0.4s
    ↓
Ease: power2.out (smooth)
```

**2. Card Hover**

```
Mouse enters card
    ↓
Lift up (y: 0 → -8px)
    ↓
Shadow expands (8px → 12px)
    ↓
Duration: 0.2s
    ↓
On leave: Reverse animation
```

**3. Button Press**

```
Mouse down on button
    ↓
Move down (y: 0 → 4px)
    ↓
Shadow shrinks (8px → 4px)
    ↓
Duration: 0.05s (instant)
    ↓
On release: Reverse animation (0.1s)
```

**4. Staggered Entry**

```
Event cards render
    ↓
Each card fades in (opacity 0 → 1)
    ↓
Each card slides up (y: +30px → 0)
    ↓
100ms delay between each card (stagger: 0.1)
    ↓
Duration: 0.5s per card
```

---

### 7. Error Handling

#### Frontend Error Messages

**Authentication Errors:**

- "Missing required fields"
- "Email already exists"
- "Invalid credentials"
- "No token provided"

**Event Errors:**

- "Event not found"
- "Failed to load event"
- "Failed to create event"
- "Not authorized to update/delete"

**Registration Errors:**

- "Already registered for this event"
- "Failed to register"
- "Failed to load registrations"

#### Error Display

```
┌─────────────────────────────┐
│ ⚠️ ERROR MESSAGE HERE        │
│ (red background, red border) │
└─────────────────────────────┘
```

All errors are:

- Red background (#fca5a5)
- Red border (3px)
- Bold uppercase font
- Displayed above form

---

### 8. API Communication

#### Request/Response Cycle

**Example: Register for Event**

**Frontend:**

```javascript
await registrationsAPI.register(eventId);
// Calls: POST /register/:eventId
```

**Backend:**

```javascript
POST /register/:eventId
Headers: Authorization: Bearer <JWT>
Body: (empty, eventId in URL)

Response:
{
  _id: "507f...",
  userId: "507f...",
  eventId: "507f...",
  timestamp: "2025-11-26T10:30:00Z"
}
```

**Frontend:**

```javascript
// Update UI
setRegistered(true);
// Show success alert
alert("Successfully registered!");
// Button changes to green "✓ REGISTERED"
```

#### JWT Token Flow

**On Every Request:**

```javascript
const token = localStorage.getItem("token");

headers: {
  Authorization: `Bearer ${token}`;
}
```

**Backend Verification:**

```javascript
const token = req.headers.authorization?.split(" ")[1];
// "Bearer eyJh..." → extract "eyJh..."

jwt.verify(token, process.env.JWT_SECRET);
// Verify signature
// Check expiration
// Return payload: { userId, role }
```

---

### 9. Data Persistence

#### What Gets Saved

**User Data:**

- Name, email, password hash, role
- Saved on signup

**Login Session:**

- Token stored in localStorage
- Persists across page refreshes
- Expires after 7 days (backend)

**Events:**

- All events in database
- Synced when page loads

**Registrations:**

- Each registration (userId + eventId)
- Retrieved when user views dashboard
- Updated on new registration

#### Data Deletion

**On Logout:**

- localStorage.token removed
- localStorage.user removed
- User redirected to login

**On Delete Event:**

- Event removed from events collection
- Associated registrations cascade deleted
- Admin dashboard stats update

---

### 10. Responsive Design

#### Breakpoints

**Mobile (< 640px)**

- Single column layout
- Full width forms
- Stack buttons vertically
- Simplified header

**Tablet (640px - 1024px)**

- 2 column grid for events
- Adjusted spacing
- Touch-friendly buttons

**Desktop (> 1024px)**

- 3 column grid for events
- Full sidebar potential
- Optimized spacing

#### Mobile Optimizations

- Touch-friendly button sizes (48px minimum)
- Large form inputs
- Readable text (16px minimum)
- Proper spacing for thumb navigation

---

## 🎮 Example User Journeys

### Journey 1: Student Registration

```
1. Open http://localhost:3000
2. Click "CREATE ACCOUNT"
3. Fill signup form:
   - Name: "Jane Smith"
   - Email: "jane@example.com"
   - Password: "secure123"
4. Click "CREATE ACCOUNT"
5. ✓ Logged in, redirected to Events List
6. See 5 events displayed
7. Click "REGISTER" on "Web Development Workshop"
8. ✓ Registration successful, button changes
9. Click "MY REGISTRATIONS"
10. ✓ See registered event in dashboard
11. Click "VIEW DETAILS"
12. ✓ See full event information
13. Click "← BACK"
14. ✓ Return to dashboard
15. Click "BROWSE EVENTS"
16. ✓ See all events again, already registered one shown as ✓
```

### Journey 2: Admin Management

```
1. Login with admin@college.edu / admin123
2. ✓ Redirected to Admin Dashboard
3. See statistics:
   - 5 events total
   - 42 total registrations
   - 8.4 average per event
4. Click "+ CREATE EVENT"
5. Fill form:
   - Title: "Cybersecurity Workshop"
   - Description: "Learn security best practices"
   - Date: 2026-01-20
   - Time: 14:00
   - Venue: Security Lab
6. Click "CREATE EVENT"
7. ✓ Event created, back to dashboard
8. ✓ See 6 events now, stats updated
9. Click "EDIT" on new event
10. Change time to 15:00
11. Click "SAVE CHANGES"
12. ✓ Updated successfully
13. Click "DELETE" on an old event
14. Confirm deletion
15. ✓ Event deleted, stats updated
```

---

## 🔧 Troubleshooting User Issues

### "Can't see my registration"

- **Solution:** Refresh page (F5)
- **Why:** Frontend caches registrations

### "Button says 'REGISTER' but I'm already registered"

- **Solution:** Refresh page or navigate away and back
- **Why:** Frontend UI cache

### "Can't create event as admin"

- **Solution:** Check that you logged in as admin (role badge shows [admin])
- **Why:** Regular students can't access admin routes

### "Login fails with valid email"

- **Solution:** Check database was seeded (`node seed.js`)
- **Why:** Users table might be empty

### "Page won't load"

- **Solution:**
  1. Check backend is running (http://localhost:5000/health)
  2. Check MongoDB is running (mongod in terminal)
  3. Open browser console (F12) for errors
- **Why:** Missing dependencies

---

**Feature Documentation v1.0** | Complete user guide for all features
