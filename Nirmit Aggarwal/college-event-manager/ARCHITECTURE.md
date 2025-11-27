# Architecture & Technical Documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React + Vite)                   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  User Interface (Neo-Brutalism Light Theme)         │   │
│  │  - Login/Signup Pages                               │   │
│  │  - Events List (Staggered GSAP animations)          │   │
│  │  - Event Details                                    │   │
│  │  - Student Dashboard                                │   │
│  │  - Admin Dashboard & Forms                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  State Management (React Context API)               │   │
│  │  - AuthContext (JWT tokens, user info)              │   │
│  │  - useAuth hook for protected routes                │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Animation System (GSAP Hooks)                      │   │
│  │  - usePageTransition (slide-in)                     │   │
│  │  - useCardHoverAnimation (lift effect)              │   │
│  │  - useButtonPressAnimation (tap feedback)           │   │
│  │  - useGSAPAnimation (stagger entrance)              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  HTTP Client (Axios)                                │   │
│  │  - API interceptors for JWT attachment              │   │
│  │  - Error handling & logging                         │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                  HTTP/REST API
                         │
┌────────────────────────┴────────────────────────────────────┐
│                 Backend (Node.js + Express)                 │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Authentication Middleware                          │   │
│  │  - JWT verification                                 │   │
│  │  - Role-based access control (RBAC)                 │   │
│  │  - Protected routes (authMiddleware, adminMiddleware)│  │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  API Routes (RESTful)                               │   │
│  │  - /auth/signup, /auth/login                        │   │
│  │  - /events (CRUD operations)                        │   │
│  │  - /register (event registration)                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Data Models (Mongoose)                             │   │
│  │  - User (name, email, passwordHash, role)           │   │
│  │  - Event (title, description, date, time, venue)    │   │
│  │  - Registration (userId, eventId, timestamp)        │   │
│  │  - Validation & indexing built-in                   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Business Logic                                     │   │
│  │  - Event CRUD                                       │   │
│  │  - User registration/login                          │   │
│  │  - Registration management                          │   │
│  │  - Registration counting                            │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │
                    Connection
                         │
┌────────────────────────┴────────────────────────────────────┐
│              MongoDB (NoSQL Database)                        │
│                                                              │
│  Collections:                                               │
│  - users (indexed on email)                                 │
│  - events                                                   │
│  - registrations (unique compound index: userId, eventId)   │
│                                                              │
│  Connections: Mongoose ODM with schema validation           │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Authentication Flow

```
User Signup/Login
        ↓
   Input Form
        ↓
   Frontend Form Handler
        ↓
   axios POST to /auth/login or /auth/signup
        ↓
   Backend Route Handler
        ↓
   Validate Input → Hash Password (bcrypt) → Query MongoDB
        ↓
   Generate JWT Token
        ↓
   Return Token + User Info
        ↓
   Frontend stores token in localStorage
        ↓
   All future requests include: Authorization: Bearer <token>
```

### Event Registration Flow

```
Student Clicks "REGISTER"
        ↓
   EventDetails Component
        ↓
   registrationsAPI.register(eventId)
        ↓
   Axios POST /register/:eventId (with JWT)
        ↓
   Backend verifies JWT (authMiddleware)
        ↓
   Check duplicate registration
        ↓
   Insert into Registrations collection
        ↓
   Return success
        ↓
   Frontend updates UI (button state change)
```

## Security Implementation

### Password Security

- **Bcryptjs**: Salted password hashing (10 rounds)
- Never store plain text passwords
- Passwords validated on login with bcrypt.compare()

### JWT Tokens

- **Algorithm**: HS256 (HMAC with SHA-256)
- **Expiration**: 7 days
- **Secret**: Environment variable (change in production)
- **Payload**: userId, role

### Role-Based Access Control

```javascript
// Protected routes example
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  // Only authenticated admins can create events
});
```

### Input Validation

- Required field checks
- Email format validation
- Mongoose schema validation
- CORS enabled

## API Response Format

### Success Response (200 OK)

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@college.edu",
    "role": "student"
  }
}
```

### Error Response (4xx/5xx)

```json
{
  "error": "Email already exists"
}
```

## Database Indexes

```javascript
// Automatic Indexes (Mongoose):
users.email (unique)
registrations [userId, eventId] (unique compound)

// Query Optimization:
- Events sorted by date for listing
- Fast email lookups for authentication
- Prevent duplicate registrations
```

## Performance Considerations

### Frontend Optimization

- **Code Splitting**: Routes can be lazy-loaded
- **Caching**: API responses stored in component state
- **Animations**: GSAP only animates visible elements
- **Bundle Size**: ~150KB (React + TailwindCSS + GSAP)

### Backend Optimization

- **Database Indexing**: Indexes on frequently queried fields
- **Response Time**: <100ms typical for most operations
- **Memory**: Mongoose connection pooling
- **Scalability**: Stateless design (ready for load balancing)

## Error Handling

### Frontend

```javascript
try {
  const response = await eventsAPI.getAll();
  // Success handling
} catch (error) {
  setError(error.response?.data?.error || "An error occurred");
  // Error UI
}
```

### Backend

```javascript
try {
  // Operation
} catch (error) {
  res.status(500).json({ error: error.message });
}
```

## Testing Scenarios

### Authentication Tests

- [x] Signup new user
- [x] Login with valid credentials
- [x] Login with invalid credentials
- [x] JWT token validation
- [x] Protected route access

### Event Management Tests

- [x] List all events
- [x] Get event details
- [x] Create event (admin)
- [x] Edit event (admin)
- [x] Delete event (admin)
- [x] Non-admin cannot create events

### Registration Tests

- [x] Register for event
- [x] Prevent duplicate registration
- [x] View registrations
- [x] Get registration count (admin)

## Deployment Checklist

- [ ] Update JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Configure production MongoDB URI
- [ ] Enable HTTPS
- [ ] Set CORS allowed origins
- [ ] Environment variables secured
- [ ] Database backups configured
- [ ] Error logging/monitoring set up
- [ ] Rate limiting implemented
- [ ] API documentation deployed

## Future Enhancement Architecture

### Notification System

```
Event Created/Updated → Email Service → Student Email
```

### File Upload

```
Event Banner Upload → AWS S3 → URL Stored in DB → Display
```

### Analytics

```
User Behavior → Dashboard Analytics → Insights Display
```

### Caching Layer

```
Frequent Queries → Redis Cache → Faster Response
```

---

**Technical Documentation Version**: 1.0  
**Last Updated**: November 2025
