# Quick Reference Guide

## 🚀 Fast Setup (< 5 minutes)

### Windows

```bash
cd college-event-manager
setup.bat
```

### macOS/Linux

```bash
cd college-event-manager
chmod +x setup.sh
./setup.sh
```

## 📝 Running the Application

### Terminal 1: MongoDB

```bash
mongod
```

### Terminal 2: Backend

```bash
cd backend
node seed.js        # First time only
npm run dev         # Runs on http://localhost:5000
```

### Terminal 3: Frontend

```bash
cd frontend
npm run dev         # Runs on http://localhost:3000
```

## 🔐 Test Credentials

| Role    | Email             | Password   |
| ------- | ----------------- | ---------- |
| Admin   | admin@college.edu | admin123   |
| Student | john@college.edu  | student123 |

## 📱 Features Demo

### As a Student

1. Login → Browse Events → Register → View Dashboard
2. Registrations appear in "MY REGISTRATIONS"
3. Can view details of any event

### As an Admin

1. Login → Admin Dashboard (see statistics)
2. Create Event → Fill form → Event appears in list
3. Edit Event → Update details → Changes saved
4. Delete Event → Confirm → Event removed
5. View registration count per event

## 🎨 Styling Quick Reference

### Colors

```css
bg-yellow-300          /* Primary Yellow */
bg-green-400           /* Success Green */
bg-purple-500          /* Accent Purple */
bg-white               /* Base White */
border-black           /* All borders */
```

### Buttons

```html
<button variant="primary">Yellow Button</button>
<button variant="success">Green Button</button>
<button variant="purple">Purple Button</button>
<button variant="secondary">White Button</button>
```

### Cards

```html
<Card>Content inside card</Card>
<!-- Includes hover animation and shadow -->
```

## 🎞️ Animation Triggers

| Animation       | Trigger     | Effect                    |
| --------------- | ----------- | ------------------------- |
| Page Transition | Page load   | Slide in from right       |
| Card Hover      | Mouse enter | Lift up + shadow expand   |
| Card Leave      | Mouse exit  | Return to original        |
| Button Press    | Mouse down  | Move down + shadow shrink |
| Button Release  | Mouse up    | Return to original        |
| Stagger         | List render | Cards appear one by one   |

## 🔗 Important URLs

| Component    | URL                          |
| ------------ | ---------------------------- |
| Frontend     | http://localhost:3000        |
| Backend API  | http://localhost:5000        |
| Health Check | http://localhost:5000/health |

## 📂 Key Files

| Purpose          | File                               |
| ---------------- | ---------------------------------- |
| Backend Server   | backend/server.js                  |
| Database Seeding | backend/seed.js                    |
| React App        | frontend/src/App.jsx               |
| Tailwind Config  | frontend/tailwind.config.js        |
| GSAP Hooks       | frontend/src/hooks/useAnimation.js |
| API Calls        | frontend/src/api.js                |
| Auth Context     | frontend/src/AuthContext.js        |

## 🛠️ Common Commands

```bash
# Backend Development
npm run dev              # Watch mode
npm start               # Production mode

# Frontend Development
npm run dev             # Dev server
npm run build           # Production build
npm run preview         # Preview production build

# Database
node seed.js            # Reset & seed database

# Dependencies
npm install             # Install dependencies
npm install <package>   # Install new package
npm uninstall <package> # Remove package
```

## 🐛 Quick Troubleshooting

| Problem                | Solution                               |
| ---------------------- | -------------------------------------- |
| MongoDB not connecting | Run `mongod` in separate terminal      |
| Port 5000/3000 in use  | Kill process or change port in .env    |
| Blank page             | Check browser console (F12) for errors |
| Can't register         | Ensure backend is running              |
| CORS error             | Backend must run on 5000               |

## 📚 File Locations

### Backend Models

- `backend/models/User.js` - User schema
- `backend/models/Event.js` - Event schema
- `backend/models/Registration.js` - Registration schema

### Backend Routes

- `backend/routes/auth.js` - Login/Signup
- `backend/routes/events.js` - Event CRUD
- `backend/routes/registrations.js` - Registrations

### Frontend Pages

- `frontend/src/pages/LoginSignup.jsx` - Auth
- `frontend/src/pages/EventsList.jsx` - Events
- `frontend/src/pages/EventDetails.jsx` - Details
- `frontend/src/pages/AdminDashboard.jsx` - Admin stats
- `frontend/src/pages/CreateEvent.jsx` - Create form
- `frontend/src/pages/EditEvent.jsx` - Edit form

### Frontend Components

- `frontend/src/components/Button.jsx` - Button with animation
- `frontend/src/components/Card.jsx` - Card with animation
- `frontend/src/components/Header.jsx` - Navigation header

## 🔑 Environment Variables

### Backend (.env)

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/college-events
JWT_SECRET=your_super_secret_key_change_in_production
NODE_ENV=development
```

### Frontend

No .env needed - API hardcoded to localhost:5000

## 📊 Database Collections

### Users

```
_id: ObjectId
name: String
email: String (unique)
passwordHash: String
role: String (student|admin)
createdAt: Date
```

### Events

```
_id: ObjectId
title: String
description: String
date: String (YYYY-MM-DD)
time: String (HH:MM)
venue: String
adminId: ObjectId
createdAt: Date
```

### Registrations

```
_id: ObjectId
userId: ObjectId
eventId: ObjectId
timestamp: Date
unique: [userId, eventId]
```

## 🎯 Project Stats

| Metric               | Value   |
| -------------------- | ------- |
| Backend Routes       | 10      |
| Frontend Pages       | 7       |
| React Components     | 8       |
| Database Collections | 3       |
| API Endpoints        | 10      |
| GSAP Animations      | 4 types |
| Lines of Code        | ~2000+  |
| Bundle Size          | ~150KB  |

## 🌟 Feature Checklist

### Student Features

- [x] Login/Signup
- [x] View events
- [x] View event details
- [x] Register for events
- [x] View registrations
- [x] Unique registration prevention

### Admin Features

- [x] Login/Signup
- [x] Create events
- [x] Edit events
- [x] Delete events
- [x] View registration count
- [x] Dashboard statistics

### Technical Features

- [x] JWT authentication
- [x] Role-based access control
- [x] MongoDB with Mongoose
- [x] RESTful API
- [x] Neo-Brutalism UI
- [x] GSAP animations
- [x] Error handling
- [x] Form validation

## 💡 Tips & Tricks

1. **Clear Cache**: Press `Ctrl+Shift+Del` to clear browser data
2. **Reset Database**: Run `node seed.js` anytime
3. **Watch Mode**: Backend auto-restarts with `npm run dev`
4. **Hot Reload**: Frontend auto-refreshes on save
5. **API Testing**: Use Postman with JWT token
6. **Debug**: Check console (F12) and network tab

## 📖 Documentation Files

- `README.md` - Main project overview
- `INSTALLATION.md` - Detailed setup guide
- `ARCHITECTURE.md` - System design & flows
- `CODE_QUALITY.md` - Best practices & guidelines

---

**Quick Reference v1.0** | Perfect for getting started in minutes!
