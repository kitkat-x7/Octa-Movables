# Octa-Movables

Octa-Movables is a full-stack vehicle booking and admin management system built with Node.js, Express, React, TypeScript, and Prisma. It features a multi-step booking form for customers, and a secure admin dashboard for managing vehicle types, models, and bookings. The app includes real-time analytics powered by WebSockets, efficient data caching using Node-cache, and role-based access control via JWT. Designed for performance and usability, Octa-Movables serves as a production-ready solution for rental platforms, logistics services, or internal fleet management.

---

## 🛠 Tech Stack

| Category       | Tech Used                          |
|----------------|------------------------------------|
| Backend        | Node.js, Express, Prisma           |
| Frontend       | React, TypeScript, Material UI     |
| Database       | PostgreSQL                         |
| Caching        | Node-cache                         |
| Auth           | JWT                                |
| Realtime       | WebSocket                          |

---

## Features

- **User Booking Form:** Multi-step vehicle booking with type/model selection and date range.
- **Admin Panel:**
  - **Signup & Login** (JWT-based authentication)
  - **CRUD for Vehicle Types and Models**
  - **WebSocket Dashboard** for real-time analytics (admin only)
- **Node-cache Caching:** Speeds up backend API for frequently accessed data.
- **Role Separation:** User and admin flows are separated.
- **REST API:** All data managed via RESTful endpoints.
- **Token-based Security:** Admin actions require a valid JWT.

---

## Getting Started

### 1. **Clone the repository**

```bash
git clone 
cd Octa-Movables
```

---

### 2. **Backend Setup**

```bash
cd backend
npm install
```

- **Environment Variables:**  
  Create a `.env` file in `/backend` with:
  ```
  DATABASE_URL=postgresql://:@localhost:5432/
  JWT_SECRET=your_jwt_secret
  PORT=5000
  ```
- **Prisma:**  
  Run migrations and seed data if needed:
  ```bash
  npx prisma migrate dev
  npx prisma generate
  ```

- **Start the backend:**
  ```bash
  npm run dev
  ```
  The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. **Frontend Setup**

```bash
cd frontend
npm install
```

- **Start the frontend:**
  ```bash
  npm start
  ```
  The frontend will run on [http://localhost:3000](http://localhost:3000).

---

## Usage

### **User Booking**

- Go to [http://localhost:3000](http://localhost:3000)
- Fill out the multi-step booking form to book a vehicle.

### **Admin Panel**

- Go to [http://localhost:3000](http://localhost:3000)
- Use the admin login/signup forms at the top of the homepage.
- After login, access the admin dashboard to manage vehicle types and models.

### **WebSocket Dashboard**

- After admin login, access the WebSocket dashboard via the "Dashboard" link in the navbar for real-time analytics.

---

## Caching with Node-cache

**Why?**  
Caching improves performance by storing frequently requested data in memory, reducing database load and speeding up responses.

**How it works:**  
- The backend uses the [node-cache](https://www.npmjs.com/package/node-cache) package.
- Example: Vehicle types are cached after the first DB fetch:
  ```js
  const NodeCache = require('node-cache');
  const myCache = new NodeCache({ stdTTL: 60 }); // 60 seconds

  app.get('/api/v1/type', async (req, res) => {
    let types = myCache.get('vehicleTypes');
    if (!types) {
      types = await prisma.type.findMany();
      myCache.set('vehicleTypes', types);
    }
    res.json({ payload: types });
  });
  ```
- Subsequent requests within 60 seconds are served from cache, making the admin dashboard and booking form much faster[5].

---

## WebSocket Dashboard

**What is it?**  
A real-time dashboard for admins, powered by WebSockets.

**How it works:**  
- Only authenticated admins can connect (token required).
- The frontend connects to `ws://localhost:5000/?token=`.
- The backend verifies the token and streams live analytics or updates.
- This enables instant feedback for admin actions and real-time monitoring[6][7].

---

## Admin Privileges

- **Only admins** (after login) can:
  - Access the admin dashboard
  - Perform CRUD operations on vehicle types and models
  - Access the WebSocket dashboard for real-time analytics
- **JWT-based authentication:**  
  - Admin must log in to receive a token.
  - All admin API requests and WebSocket connections require a valid token.
  - The backend checks the token for every protected route and WebSocket connection[6][7].

---

## API Endpoints (Backend)

- **Admin:**  
  - `POST /api/v1/admin/signup` - Register admin  
  - `POST /api/v1/admin/signin` - Login admin (returns JWT)  
  - `GET /api/v1/admin` - Get admin details (requires `token` header)

- **Vehicle Types:**  
  - `GET /api/v1/type`  
  - `POST /api/v1/type`  
  - `PATCH /api/v1/type/:id`  
  - `DELETE /api/v1/type/:id`  
  - `GET /api/v1/type/wheel/:wheel`

- **Vehicle Models:**  
  - `GET /api/v1/model/type/:typeid`  
  - `POST /api/v1/model`  
  - `PATCH /api/v1/model/:id`  
  - `DELETE /api/v1/model/:id`

- **Bookings:**  
  - `POST /api/v1/booking`  
  - `GET /api/v1/booking/:bookingid` (admin only)

---

## Security & Access Control

- **JWT Token** is returned on admin login and must be sent as a `token` header for all admin-protected routes.
- **WebSocket connections** require the token as a query parameter (`ws://localhost:5000/?token=`).
- **Backend middleware** verifies the token for both REST and WebSocket connections, enforcing admin-only access[6].

---

## License

MIT

---

**For any issues, please open an issue on the repository.**

---
