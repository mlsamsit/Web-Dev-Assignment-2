# Event Manager – Backend (Node.js + Express + MongoDB)

A backend system for managing college events, registrations, and admin controls.  
Built using **Node.js**, **Express**, and **MongoDB**, following a clean MVC structure.

---

## 🚀 Features

### 👨‍🎓 Students
- View all events  
- View event details  
- Register for events  
- View their registered events  
- Check registration status (for UI toggle buttons)

### 🛠 Admin
- Create new events  
- Update existing events  
- Delete events  
- View total event registrations (stats)  
- View list of students registered for any event  

### 🔐 Authentication
- JWT-based auth  
- Access + Refresh tokens  
- Role-based authorization (`student`, `admin`)  

---

## 📁 Project Structure

```
/controllers
    event.controller.js
    registration.controller.js
    auth.controller.js

/models
    user.model.js
    event.model.js
    registration.model.js

/routes
    event.routes.js
    registration.routes.js
    auth.routes.js

/middlewares
    auth.middleware.js

/utils
    asyncHandler.js
    ApiError.js
    ApiResponse.js

/config
    db.js

server.js
README.md
```

---

## 🧠 Tech Stack

- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Bcrypt.js  
- Aggregation Pipelines for stats  

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone git@github.com:garvitsingh006/Event_Manager.git
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```
PORT=8000
MONGODB_URI=your_mongo_connection_string
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SECRET=your_access_secret
ACCESS_TOKEN_EXPIRY=5h
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRY=7d
```

### 4. Start the server
```bash
npm start
```

Server runs at:
```
http://localhost:8000
```

---

## 🔗 API Routes

### 📦 Event Routes (`/api/events`)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/` | Public | Get all events |
| GET | `/:id` | Public | Get event details |
| POST | `/` | Admin | Create event |
| PUT | `/:id` | Admin | Update event |
| DELETE | `/:id` | Admin | Delete event |
| GET | `/admin/stats/all` | Admin | Get event stats |

---

### 📝 Registration Routes (`/api/registrations`)

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/register/:eventId` | Student | Register for an event |
| GET | `/my` | Student | Get user's registered events |
| GET | `/check/:eventId` | Student | Check if user is registered |
| GET | `/event/:eventId` | Admin | Get list of registered students |

---

## 🗄 Database Models

### **User**
- name  
- email  
- password  
- role  
- refreshToken  

### **Event**
- title  
- description  
- date  
- time  
- venue  
- totalRegistrations  

### **Registration**
- user_id  
- event_id  

---

## 🧪 Error Handling

Standard success response:
```json
{
  "statusCode": 200,
  "data": {},
  "message": "Success"
}
```

Standard error response:
```json
{
  "statusCode": 404,
  "message": "Event not found"
}
```

---

## 🔥 Highlights

- Clean MVC architecture  
- Full authentication module  
- Role-based permissions  
- Accurate stats using aggregation  
- Reusable `ApiError` and `ApiResponse` utils  
- Readable, scalable project structure  

---

## 📜 License

Open for personal and educational use.