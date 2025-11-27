# College Event Manager - Full-Stack MVP

A modern, production-ready event management system built with React, Node.js/Express, MongoDB, TailwindCSS, and GSAP animations. Features a stunning Neo-Brutalism Light UI theme with smooth, tactile animations.

## 🎯 Features

### Student Features

- ✅ View all upcoming events
- ✅ View detailed event information
- ✅ Register for events
- ✅ View registered events dashboard
- ✅ Real-time registration status

### Admin Features

- ✅ Create new events
- ✅ Edit existing events
- ✅ Delete events
- ✅ View registration counts per event
- ✅ Admin dashboard with event statistics
- ✅ View total and average registrations

### Technical Features

- ✅ JWT-based authentication
- ✅ Role-based access control (Student/Admin)
- ✅ MongoDB with Mongoose ORM
- ✅ RESTful API
- ✅ Neo-Brutalism Light UI theme
- ✅ GSAP animations (hover lift, button press, page transitions)
- ✅ Responsive design
- ✅ Error handling & validation
- ✅ Seed data included

## 🛠️ Tech Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Port**: 5000

### Frontend

- **UI Library**: React 18
- **Router**: React Router v6
- **Styling**: TailwindCSS 3
- **Animations**: GSAP 3
- **HTTP Client**: Axios
- **Bundler**: Vite
- **Port**: 3000

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- MongoDB installed and running locally (or connection string ready)

## 🚀 Quick Start

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Setup MongoDB & Seed Data

Ensure MongoDB is running on `localhost:27017`, then seed the database:

```bash
node seed.js
```

Output:

```
✅ Connected to MongoDB
✅ Admin user created
✅ Student users created
✅ Seed events created

📊 Database seeded successfully!
Test credentials:
  Admin: admin@college.edu / admin123
  Student: john@college.edu / student123
```

### 3. Start Backend Server

```bash
npm run dev
```

Server runs at: `http://localhost:5000`

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 5. Start Frontend Development Server

```bash
npm run dev
```

Frontend runs at: `http://localhost:3000`

## 📚 API Endpoints

### Authentication

- `POST /auth/signup` - Create new account
- `POST /auth/login` - Login and get JWT token

### Events

- `GET /events` - List all events
- `GET /events/:id` - Get event details
- `POST /events` - Create event (admin only)
- `PUT /events/:id` - Update event (admin only)
- `DELETE /events/:id` - Delete event (admin only)

### Registrations

- `POST /register/:eventId` - Register for event
- `GET /register/my-registrations` - Get user's registrations
- `GET /register/admin/count/:eventId` - Get registration count (admin only)

## 🎨 Neo-Brutalism Design System

### Color Palette

- **Primary**: Yellow (#FFE500)
- **Success**: Green (#00FF00)
- **Accent**: Purple (#9D4EDD)
- **Base**: Black borders on white background

### Design Elements

- 3-4px solid black borders
- Hard offset shadows: `8px 8px 0px rgba(0,0,0,1)`
- Courier New / monospace font
- UPPERCASE headings with wide letter spacing
- No border-radius (sharp corners)
- Chunky buttons & boxy cards
- High contrast UI

### Animation Library: GSAP

- **Card Hover**: Lift effect + shadow offset
- **Button Press**: Shadow retract + downward tap
- **Page Transitions**: Slide/wipe block effects
- **Staggered Entrance**: Animated event cards

## 📁 Project Structure

```
college-event-manager/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Event.js
│   │   └── Registration.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── events.js
│   │   └── registrations.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── LoginSignup.jsx
    │   │   ├── EventsList.jsx
    │   │   ├── EventDetails.jsx
    │   │   ├── StudentDashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── CreateEvent.jsx
    │   │   └── EditEvent.jsx
    │   ├── components/
    │   │   ├── Button.jsx
    │   │   ├── Card.jsx
    │   │   └── Header.jsx
    │   ├── hooks/
    │   │   └── useAnimation.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── api.js
    │   ├── AuthContext.js
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 🔐 Database Schema

### Users

```
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  passwordHash: String,
  role: String (enum: ['student', 'admin']),
  createdAt: Date
}
```

### Events

```
{
  _id: ObjectId,
  title: String,
  description: String,
  date: String (YYYY-MM-DD),
  time: String (HH:MM),
  venue: String,
  adminId: ObjectId (ref: User),
  createdAt: Date
}
```

### Registrations

```
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  eventId: ObjectId (ref: Event),
  timestamp: Date,
  unique index: [userId, eventId]
}
```

## 🧪 Testing Credentials

### Admin

- **Email**: admin@college.edu
- **Password**: admin123

### Student

- **Email**: john@college.edu
- **Password**: student123

## 🚨 Common Issues & Solutions

### MongoDB Connection Error

```
❌ MongoDB connection failed: ECONNREFUSED
```

**Solution**: Ensure MongoDB is running: `mongod` or check connection string in `.env`

### CORS Error

```
Access to XMLHttpRequest has been blocked by CORS policy
```

**Solution**: Backend CORS is configured. Ensure both servers are running on correct ports.

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**: Change port in `.env` file or kill process using the port.

## 🎞️ Animation Details

### GSAP Hooks

#### `usePageTransition()`

Slide-in animation when page loads

```javascript
gsap.from(pageRef.current, {
  duration: 0.4,
  x: 50,
  opacity: 0,
  ease: "power2.out",
});
```

#### `useCardHoverAnimation()`

Lift card on hover with shadow shift

```javascript
// On hover
gsap.to(card, { y: -8, boxShadow: "12px 12px 0px rgba(0,0,0,1)" });
// On leave
gsap.to(card, { y: 0, boxShadow: "8px 8px 0px rgba(0,0,0,1)" });
```

#### `useButtonPressAnimation()`

Press effect with shadow retract

```javascript
// On press
gsap.to(button, { y: 4, boxShadow: "4px 4px 0px rgba(0,0,0,1)" });
// On release
gsap.to(button, { y: 0, boxShadow: "8px 8px 0px rgba(0,0,0,1)" });
```

## 📦 Build for Production

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## 📝 License

MIT - Open source project

## 👨‍💻 Development Notes

- **Environment**: Use `.env` files for configuration
- **Authentication**: JWT tokens are stored in localStorage
- **Error Handling**: All API calls include error boundaries
- **Animations**: GSAP runs only on DOM elements present in viewport
- **Database**: Mongoose handles schema validation

## 🎯 Roadmap / Future Enhancements

- [ ] Email notifications for event reminders
- [ ] File uploads (event banners/images)
- [ ] Search and filter events
- [ ] Event categories
- [ ] User profile customization
- [ ] Event cancellation
- [ ] Waitlist for full events
- [ ] Event reviews and ratings
- [ ] Export registrations to CSV
- [ ] Dark mode theme

---

**Built with ❤️ using React, Express, MongoDB, TailwindCSS & GSAP**
