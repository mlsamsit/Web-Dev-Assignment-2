# 📑 College Event Manager - Complete File Index

## 📋 Project Files Organization

### Root Directory (10 files)

```
college-event-manager/
│
├── 📄 README.md                      ← START HERE: Main overview
├── 📄 QUICK_START.md                 ← Fast setup reference
├── 📄 INSTALLATION.md                ← Detailed installation guide
├── 📄 ARCHITECTURE.md                ← System design & data flow
├── 📄 CODE_QUALITY.md                ← Best practices & guidelines
├── 📄 FEATURES.md                    ← Complete feature walkthrough
├── 📄 PROJECT_SUMMARY.md             ← Executive summary
├── 📄 COMPLETION_CHECKLIST.md        ← Verification checklist
├── 🔧 setup.bat                      ← Windows setup script
├── 🔧 setup.sh                       ← macOS/Linux setup script
└── 📄 .gitignore                     ← Git ignore rules
```

---

## 🔧 Backend Directory (18 files)

### Root Backend Files

```
backend/
├── 📄 server.js                 (40 lines)
│   └─ Express app, MongoDB connection, route registration
│
├── 📄 seed.js                   (95 lines)
│   └─ Database initialization with sample data
│
├── 📄 package.json
│   └─ Dependencies: express, cors, mongoose, bcryptjs, jwt
│
├── 📄 .env
│   └─ PORT=5000, MONGODB_URI, JWT_SECRET
│
└── 📄 .gitignore
    └─ node_modules/, .env, *.log
```

### Models (3 files)

```
models/
├── 📄 User.js                   (22 lines)
│   └─ Schema: name, email, passwordHash, role, createdAt
│
├── 📄 Event.js                  (28 lines)
│   └─ Schema: title, description, date, time, venue, adminId
│
└── 📄 Registration.js           (19 lines)
    └─ Schema: userId, eventId, timestamp (unique compound index)
```

### Routes (3 files)

```
routes/
├── 📄 auth.js                   (75 lines)
│   ├─ POST /auth/signup
│   └─ POST /auth/login
│
├── 📄 events.js                 (100 lines)
│   ├─ GET /events              (all events)
│   ├─ GET /events/:id          (single event)
│   ├─ POST /events             (create - admin)
│   ├─ PUT /events/:id          (update - admin)
│   └─ DELETE /events/:id       (delete - admin)
│
└── 📄 registrations.js          (68 lines)
    ├─ POST /register/:eventId
    ├─ GET /register/my-registrations
    └─ GET /register/admin/count/:eventId
```

### Middleware (1 file)

```
middleware/
└── 📄 auth.js                   (24 lines)
    ├─ authMiddleware (JWT verification)
    └─ adminMiddleware (role check)
```

---

## 🎨 Frontend Directory (28+ files)

### Root Frontend Files

```
frontend/
├── 📄 index.html                (20 lines)
│   └─ HTML entry point with root div
│
├── 📄 vite.config.js            (15 lines)
│   └─ Vite config with React plugin & proxy
│
├── 📄 tailwind.config.js        (20 lines)
│   └─ Theme colors, shadows, fonts, spacing
│
├── 📄 postcss.config.js         (5 lines)
│   └─ PostCSS with Tailwind & Autoprefixer
│
├── 📄 package.json
│   └─ Dependencies: react, react-router-dom, gsap, axios, tailwindcss
│
└── 📄 .gitignore
    └─ node_modules/, dist/, .env
```

### Source - Main Files (4 files)

```
src/
├── 📄 main.jsx                  (7 lines)
│   └─ React DOM render entry point
│
├── 📄 App.jsx                   (126 lines)
│   ├─ BrowserRouter setup
│   ├─ Route definitions (7 pages)
│   ├─ ProtectedRoute wrapper
│   └─ Layout component
│
├── 📄 index.css                 (75 lines)
│   ├─ Tailwind directives
│   ├─ Global typography styles
│   ├─ Button variants
│   ├─ Card styles
│   ├─ Form styles
│   └─ Animation keyframes
│
├── 📄 api.js                    (30 lines)
│   ├─ Axios instance
│   ├─ JWT interceptor
│   ├─ authAPI (signup, login)
│   ├─ eventsAPI (CRUD)
│   └─ registrationsAPI
│
└── 📄 AuthContext.js            (40 lines)
    ├─ AuthProvider wrapper
    ├─ User state management
    ├─ Token persistence
    └─ useAuth hook
```

### Components (3 files)

```
components/
├── 📄 Button.jsx                (20 lines)
│   ├─ Reusable button component
│   ├─ 4 variants (primary, secondary, success, purple)
│   ├─ GSAP press animation hook
│   └─ useButtonPressAnimation
│
├── 📄 Card.jsx                  (14 lines)
│   ├─ Reusable card component
│   ├─ 4px border + shadow
│   ├─ GSAP hover animation
│   └─ useCardHoverAnimation
│
└── 📄 Header.jsx                (32 lines)
    ├─ Navigation header
    ├─ Logo ("EVENT MANAGER")
    ├─ User info & role display
    ├─ Logout button
    └─ Border styling
```

### Hooks (1 file)

```
hooks/
└── 📄 useAnimation.js           (95 lines)
    ├─ useGSAPAnimation() - Stagger entrance
    ├─ useCardHoverAnimation() - Lift + shadow
    ├─ useButtonPressAnimation() - Press effect
    └─ usePageTransition() - Slide-in animation
```

### Pages (7 files)

```
pages/
├── 📄 LoginSignup.jsx           (130 lines)
│   ├─ Signup form with validation
│   ├─ Login form with validation
│   ├─ Toggle between modes
│   ├─ Demo credentials display
│   ├─ Error handling
│   └─ Page transition animation
│
├── 📄 EventsList.jsx            (95 lines)
│   ├─ Grid of all events
│   ├─ Event cards with details
│   ├─ Staggered entrance animation
│   ├─ Registration status badges
│   ├─ View/Register buttons
│   └─ Create event link (admin)
│
├── 📄 EventDetails.jsx          (140 lines)
│   ├─ Full event information
│   ├─ Centered card layout
│   ├─ Registration status
│   ├─ Register button (students)
│   ├─ Edit/Delete buttons (admin)
│   ├─ Registration count (admin)
│   └─ Navigation controls
│
├── 📄 StudentDashboard.jsx      (85 lines)
│   ├─ List of registered events
│   ├─ Event cards with details
│   ├─ Staggered animation
│   ├─ View details button
│   ├─ Browse events button
│   └─ Empty state message
│
├── 📄 AdminDashboard.jsx        (135 lines)
│   ├─ Statistics cards (3 total)
│   ├─ Color-coded stats (yellow, green, purple)
│   ├─ Event grid with registration counts
│   ├─ Edit/Delete buttons per event
│   ├─ Create event link
│   ├─ Live count updates
│   └─ Staggered animation
│
├── 📄 CreateEvent.jsx           (115 lines)
│   ├─ Event creation form
│   ├─ Fields: title, description, date, time, venue
│   ├─ Form validation
│   ├─ Loading state
│   ├─ Error display
│   ├─ Submit/Cancel buttons
│   └─ API integration
│
└── 📄 EditEvent.jsx             (135 lines)
    ├─ Event editing form
    ├─ Pre-filled fields
    ├─ Form validation
    ├─ Loading/submitting states
    ├─ Error display
    ├─ Save/Cancel buttons
    └─ API integration
```

---

## 📊 File Statistics

### Code Files

| Type          | Count  | Total Lines |
| ------------- | ------ | ----------- |
| Backend .js   | 11     | 470+        |
| Frontend .jsx | 10     | 950+        |
| Config Files  | 5      | 60+         |
| CSS           | 1      | 75+         |
| JSON          | 4      | 40+         |
| Markdown      | 9      | 1500+       |
| **Total**     | **44** | **3100+**   |

### By Category

- Backend Files: 11
- Frontend Components: 3
- Frontend Pages: 7
- Frontend Utilities: 5 (hooks, api, context)
- Configuration: 5
- Documentation: 9

---

## 🎯 Key File Purposes

### Must-Read Documentation

1. **README.md** - Start here! Main overview & quick links
2. **QUICK_START.md** - Fast reference for commands
3. **INSTALLATION.md** - Detailed setup instructions
4. **FEATURES.md** - Complete feature walkthrough

### Important Code Files

1. **backend/server.js** - Express app entry point
2. **backend/seed.js** - Database setup script
3. **frontend/src/App.jsx** - React app with routing
4. **frontend/src/AuthContext.js** - Authentication state
5. **frontend/src/hooks/useAnimation.js** - GSAP animations

### Configuration Files

1. **backend/.env** - Backend environment variables
2. **frontend/tailwind.config.js** - Tailwind theme
3. **frontend/vite.config.js** - Frontend build config
4. **setup.bat** / **setup.sh** - Automated installation

---

## 🔍 How to Navigate

### For Setup

1. Read: QUICK_START.md (2 min)
2. Run: setup.bat or setup.sh (2 min)
3. Run: `mongod` + seed database (2 min)
4. Run: backend & frontend (1 min each)

### For Development

1. Backend changes → backend/\*.js files
2. Frontend pages → frontend/src/pages/\*.jsx
3. Components → frontend/src/components/\*.jsx
4. Styling → frontend/src/index.css
5. Animations → frontend/src/hooks/useAnimation.js

### For Understanding

1. Architecture: ARCHITECTURE.md
2. Features: FEATURES.md
3. Code quality: CODE_QUALITY.md
4. API: ARCHITECTURE.md (API section)

### For Deployment

1. Build frontend: `npm run build`
2. Set env vars for production
3. Deploy dist/ to static host (Vercel, Netlify)
4. Deploy backend (Heroku, Railway, Render)

---

## 📦 Dependencies Summary

### Backend

- express (web framework)
- mongoose (MongoDB ORM)
- bcryptjs (password hashing)
- jsonwebtoken (JWT)
- cors (cross-origin)
- dotenv (config)

### Frontend

- react (UI library)
- react-router-dom (routing)
- vite (bundler)
- tailwindcss (styling)
- gsap (animations)
- axios (HTTP client)

---

## 🎨 File Organization Principles

✅ **Separation of Concerns**

- Models in /models
- Routes in /routes
- Components in /components
- Pages in /pages

✅ **Clear Naming**

- User.js (model)
- auth.js (routes)
- Button.jsx (component)
- EventsList.jsx (page)

✅ **Logical Structure**

- Backend: server → models → routes → middleware
- Frontend: App → pages → components → hooks

✅ **Comprehensive Documentation**

- 9 markdown files
- 3100+ lines of documentation
- Code examples
- Troubleshooting guides

---

## 🚀 Project Ready for:

✅ Development (all files organized)  
✅ Deployment (production configs)  
✅ Scaling (stateless architecture)  
✅ Maintenance (clear documentation)  
✅ Collaboration (organized structure)

---

**File Index Version**: 1.0  
**Total Files**: 44  
**Status**: Complete ✅  
**Last Updated**: November 26, 2025

---

## 📞 Quick Links

- **Getting Started**: README.md
- **Setup Guide**: INSTALLATION.md
- **API Reference**: ARCHITECTURE.md (API section)
- **Feature Guide**: FEATURES.md
- **Code Standards**: CODE_QUALITY.md

---

**Everything you need is here! 🎉**
