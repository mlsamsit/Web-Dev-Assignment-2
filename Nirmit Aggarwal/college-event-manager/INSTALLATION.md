# Installation & Setup Guide

## System Requirements

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **MongoDB**: v5.0 or higher (running locally or remote connection)
- **Browser**: Modern browser with ES6 support

## Step-by-Step Installation

### Option 1: Automated Setup (Windows)

Simply run the setup script:

```bash
cd college-event-manager
setup.bat
```

### Option 2: Automated Setup (macOS/Linux)

```bash
cd college-event-manager
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup

#### Backend Setup

```bash
# 1. Navigate to backend
cd backend

# 2. Install dependencies
npm install

# 3. Verify .env file exists
# PORT=5000
# NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/college-events
# JWT_SECRET=your_super_secret_key_change_in_production
```

#### Frontend Setup

```bash
# 1. Navigate to frontend
cd ../frontend

# 2. Install dependencies
npm install
```

## Running the Application

### Step 1: Start MongoDB

Make sure MongoDB is running:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Windows (Command Prompt as Admin)
net start MongoDB

# Linux
sudo systemctl start mongod

# Or start MongoDB server manually
mongod
```

### Step 2: Seed Database (First Time Only)

```bash
cd backend
node seed.js
```

Expected output:

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

### Step 3: Start Backend Server

```bash
# In backend directory
npm run dev
```

Expected output:

```
🚀 Server running on http://localhost:5000
✅ MongoDB connected
```

### Step 4: Start Frontend Server

Open a new terminal:

```bash
# In frontend directory
npm run dev
```

Expected output:

```
  ➜  Local:   http://localhost:3000/
```

### Step 5: Access the Application

Open your browser and visit: **http://localhost:3000**

## Testing the Application

### 1. Login as Student

1. Click "CREATE ACCOUNT" or use existing account
2. Email: `john@college.edu`
3. Password: `student123`
4. You'll be redirected to events list

### 2. Browse Events

- View all upcoming events on the Events List page
- Each event shows title, description, date, time, and venue
- Click "REGISTER" to sign up for an event
- Click "VIEW" for detailed event information

### 3. View Registrations

- Click "MY REGISTRATIONS" in navigation
- See all events you've registered for
- Click "VIEW DETAILS" to see event information

### 4. Login as Admin

1. Logout from current account
2. Login with:
   - Email: `admin@college.edu`
   - Password: `admin123`

### 5. Admin Dashboard

- View dashboard with event statistics
- Total events, registrations, and averages
- Create new events with "+ CREATE EVENT"
- Edit existing events
- Delete events
- View registration count per event

### 6. Create Event (Admin)

1. Click "+ NEW EVENT" or "+ CREATE EVENT"
2. Fill in:
   - Event Title
   - Description
   - Date (YYYY-MM-DD)
   - Time (HH:MM)
   - Venue
3. Click "CREATE EVENT"

### 7. Edit Event (Admin)

1. Go to Admin Dashboard
2. Click "EDIT" on any event
3. Modify details
4. Click "SAVE CHANGES"

### 8. Delete Event (Admin)

1. Go to Admin Dashboard
2. Click "DELETE" on any event
3. Confirm deletion

## Troubleshooting

### MongoDB Connection Error

**Error**: `MongoDB connection failed: ECONNREFUSED`

**Solution**:

1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env`: should be `mongodb://localhost:27017/college-events`
3. If using remote MongoDB, update connection string

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solution**:

1. Change port in backend `.env`:
   ```
   PORT=5001
   ```
2. Or kill the process using the port

### CORS Error

**Error**: `Access to XMLHttpRequest from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**:

- This is already configured in backend (`cors()` middleware)
- Ensure backend is running on port 5000
- Check API endpoints in `frontend/src/api.js`

### Module Not Found

**Error**: `Cannot find module 'express'`

**Solution**:

```bash
# Make sure you're in the correct directory
cd backend
npm install
```

### Blank Page on Frontend

**Solution**:

1. Check browser console (F12) for errors
2. Verify backend is running: visit `http://localhost:5000/health`
3. Clear browser cache and refresh

## Environment Variables

### Backend (.env)

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/college-events
JWT_SECRET=your_super_secret_key_change_in_production
```

### Frontend (no .env needed, API is hardcoded to localhost:5000)

## Production Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Update environment variables with production values
2. Set `NODE_ENV=production`
3. Use production MongoDB URI
4. Deploy: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Update API endpoint to production backend URL
2. Edit `frontend/src/api.js`:
   ```javascript
   const API_BASE_URL = "https://your-production-backend.com";
   ```
3. Build: `npm run build`
4. Deploy dist folder

## Performance Tips

1. **Enable Caching**: Add browser caching headers in production
2. **Lazy Load Components**: Use React.lazy() for route-based code splitting
3. **Optimize Images**: Compress event images if added
4. **Database Indexing**: Ensure MongoDB indexes are set (already configured)
5. **API Response Caching**: Implement cache headers for GET requests

## Common Development Tasks

### Add New Event Type

1. Update Event model in `backend/models/Event.js`
2. Update frontend components to display new fields
3. Update admin form

### Change Styling

1. Edit `frontend/tailwind.config.js` for theme colors
2. Edit `frontend/src/index.css` for component styles
3. Update Brutalist utility classes

### Add Authentication

JWT is already implemented. To enhance:

1. Add 2FA in `backend/routes/auth.js`
2. Add OAuth providers (Google, GitHub)

### Connect to Remote MongoDB

Update `.env`:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/college-events
```

## Support & Resources

- **MongoDB**: https://docs.mongodb.com
- **Express**: https://expressjs.com
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com
- **GSAP**: https://gsap.com/docs
- **Mongoose**: https://mongoosejs.com

---

**Happy coding! 🚀**
