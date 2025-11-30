# Employee Manager (MERN Stack)

A full-stack **MERN Employee Management System** with authentication, CRUD operations, profile photo upload, and full Docker support.
Frontend is deployed on **Vercel** and backend on **Render**.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [https://employee-manager-umber.vercel.app](https://employee-manager-umber.vercel.app)
* **Backend API (Render):** [https://employee-manager-backend-og31.onrender.com](https://employee-manager-backend-og31.onrender.com)

Example endpoints:
`GET /` → backend health check
`GET /api/v1/emp/employees` → list employees (requires JWT)

---

## ✨ Features

* User **Signup & Login** with JWT
* **Protected Routes** for employee operations
* **Add, Update, View, Delete** employees
* **Profile Photo Upload** using Multer
* **Search & Filter** employees
* **Docker Compose** setup for local dev
* Fully responsive UI with **black + gold** theme

---

## 🛠 Tech Stack

**Frontend:** React (CRA), Axios, React Router
**Backend:** Node.js, Express, MongoDB Atlas, Mongoose
**Auth:** JWT, bcryptjs
**Uploads:** Multer
**DevOps:** Docker, Docker Compose, Vercel, Render

---

## 📁 Project Structure

```
101514172_COMP3123_Assignment02/
│
├── backend/
│   ├── models/ (User, Employee)
│   ├── routes/ (user, employee)
│   ├── middleware/auth.js
│   ├── uploads/        # profile photos
│   ├── server.js
│   └── Dockerfile
│
├── frontend/
│   ├── src/pages/ (Login, Signup, Employees, Add, View, Update)
│   ├── src/config.js
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

## 🧪 Running Locally (Without Docker)

### 1️⃣ Backend

```
cd backend
npm install
```

Create **backend/.env**:

```
SERVER_PORT=3001
DB_CONNECTION_STRING=<your-mongodb-atlas-uri>
JWT_SECRET=supersecret123
```

Start backend:

```
npm start
```

Runs at: **[http://localhost:3001](http://localhost:3001)**

---

### 2️⃣ Frontend

```
cd frontend
npm install
```

Create **frontend/.env**:

```
REACT_APP_API_BASE_URL=http://localhost:3001
```

Start frontend:

```
npm start
```

Runs at: **[http://localhost:3000](http://localhost:3000)**

---

## 🐳 Running with Docker Compose

From project root:

```
docker compose up --build
```

Services that start:

* **MongoDB:** mongodb://mongo:27017/yourdbname
* **Backend:** [http://localhost:3001](http://localhost:3001)
* **Frontend:** [http://localhost:3000](http://localhost:3000)

Simplified `docker-compose.yml`:

```
version: "3.9"

services:
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      MONGODB_URI: mongodb://mongo:27017/yourdbname
      JWT_SECRET: supersecret123

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      REACT_APP_API_BASE_URL: http://backend:3001

volumes:
  mongo-data:
```

---

## 🌐 Environment Setup

### Frontend `src/config.js`

```js
const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  (isLocalhost ? "http://localhost:3001" : "http://backend:3001");
```

---

## 🔐 API Overview

### Auth

| Method | Endpoint              | Description         |
| ------ | --------------------- | ------------------- |
| POST   | `/api/v1/user/signup` | Register a new user |
| POST   | `/api/v1/user/login`  | Login & get JWT     |

### Employees (JWT required)

| Method | Endpoint                           | Description  |
| ------ | ---------------------------------- | ------------ |
| GET    | `/api/v1/emp/employees`            | List all     |
| POST   | `/api/v1/emp/employees`            | Add employee |
| GET    | `/api/v1/emp/employees/:eid`       | View single  |
| PUT    | `/api/v1/emp/employees/:eid`       | Update       |
| DELETE | `/api/v1/emp/employees?eid=<id>`   | Delete       |
| POST   | `/api/v1/emp/employees/:eid/photo` | Upload photo |

---

## 📝 Notes

* Render free tier may cause **cold starts** (first request takes longer).
* Ensure `backend/uploads` exists locally for image saving.
* JWT tokens do **not** work across environments with different secrets.

---
