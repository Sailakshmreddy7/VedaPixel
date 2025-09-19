# Pixel Vibe Events

Pixel Vibe Events is a full-stack web application for managing and booking events. It features a React frontend (client) and a Node.js/Express backend (server) with MongoDB for data storage.

## Features

- User authentication (signup, login, protected routes)
- Role-based access (admin, guest)
- Event creation, update, and deletion (admin)
- Event listing and details (all users)
- Booking events (guests)
- Admin panel for managing users, events, and bookings

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

---

## Project Structure

```
project/
  client/    # React frontend
  server/    # Node.js/Express backend
```

---

## 1. Clone the Repository

```bash
git clone <repo-url>
cd project
```

---

## 2. Backend Setup (server)

### a. Install dependencies

```bash
cd server
npm install
```

### b. Configure Environment Variables

Create a `.env` file in the `server/` directory with the following variables:

```
PORT=5000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-secret-key>
```

### c. Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:5000` by default.

---

## 3. Frontend Setup (client)

### a. Install dependencies

```bash
cd ../client
npm install
```

### b. Configure API Endpoint

If needed, update the API base URL in `client/src/api.js` to match your backend server (default: `http://localhost:5000`).

### c. Start the Frontend

```bash
npm run dev
```

The app will run on `http://localhost:5173` by default (Vite).

---

## 4. Usage

- Open [http://localhost:5173](http://localhost:5173) in your browser.
- Sign up as a new user or log in.
- Admin users can access the admin panel to manage events and bookings.
- Guests can browse events and make bookings.

---

## 5. Scripts

### Backend (from `server/`):

- `npm start` — Start the server
- `npm run dev` — Start server with nodemon (if configured)

### Frontend (from `client/`):

- `npm run dev` — Start the Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## 6. Folder Structure

```
client/
  src/
    components/      # Reusable React components
    pages/           # Page components
    store/           # Redux store and slices
    api.js           # API calls
    ...
server/
  controllers/       # Route controllers
  models/            # Mongoose models
  routes/            # Express routes
  middlewares/       # Custom middleware
  validations/       # validation schemas
  config/            # Database config
  ...
```

---

## 7. Environment Variables

- `PORT`: Port for backend server (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT authentication

---

## 8. Troubleshooting

- Ensure MongoDB is running and accessible.
- Check `.env` variables for typos.
- If ports are in use, change them in `.env` or Vite config.

---

## API Endpoints & Example cURL Commands

All API endpoints are prefixed with `/api`.

### Authentication (`/api/auth`)

#### Register

**POST** `/api/auth/register`

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**cURL:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"yourpassword"}'
```

#### Login

**POST** `/api/auth/login`

**Body:**

```json
{
  "email": "john@example.com",
  "password": "yourpassword"
}
```

**cURL:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"yourpassword"}'
```

#### Update Profile

**PUT** `/api/auth/profile` _(Requires JWT)_

**Body:**

```json
{
  "name": "New Name",
  "email": "newemail@example.com"
}
```

**cURL:**

```bash
curl -X PUT http://localhost:5000/api/auth/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"name":"New Name","email":"newemail@example.com"}'
```

---

### User (`/api/user`)

#### Get Profile

**GET** `/api/user/profile` _(Requires JWT)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

### Events (`/api/events`)

#### Create Event _(Admin only)_

**POST** `/api/events/create` _(Requires JWT & Admin)_

**Body:**

```json
{
  "title": "Event Title",
  "description": "Event description",
  "date": "2025-09-30T18:00:00.000Z",
  "location": "Venue Name"
}
```

**cURL:**

```bash
curl -X POST http://localhost:5000/api/events/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{"title":"Event Title","description":"Event description","date":"2025-09-30T18:00:00.000Z","location":"Venue Name"}'
```

#### Update Event _(Admin only)_

**PUT** `/api/events/update/:id` _(Requires JWT & Admin)_

**Body:**

```json
{
  "title": "Updated Title"
}
```

**cURL:**

```bash
curl -X PUT http://localhost:5000/api/events/update/<EVENT_ID> \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>" \
  -d '{"title":"Updated Title"}'
```

#### Delete Event _(Admin only)_

**DELETE** `/api/events/delete/:id` _(Requires JWT & Admin)_

**cURL:**

```bash
curl -X DELETE http://localhost:5000/api/events/delete/<EVENT_ID> \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

#### Get All Events

**GET** `/api/events/events` _(Requires JWT)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/events/events \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Get Event By ID

**GET** `/api/events/event/:id` _(Requires JWT)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/events/event/<EVENT_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Get All Events (Admin)

**GET** `/api/events/all-events` _(Requires JWT & Admin)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/events/all-events \
  -H "Authorization: Bearer <ADMIN_JWT_TOKEN>"
```

---

### Booking (`/api/booking`)

#### Get My Bookings

**GET** `/api/booking/bookings` _(Requires JWT)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/booking/bookings \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

#### Book an Event

**POST** `/api/booking/book` _(Requires JWT)_

**Body:**

```json
{
  "eventId": "<EVENT_ID>"
}
```

**cURL:**

```bash
curl -X POST http://localhost:5000/api/booking/book \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"eventId":"<EVENT_ID>"}'
```

#### Cancel a Booking

**POST** `/api/booking/cancel` _(Requires JWT)_

**Body:**

```json
{
  "bookingId": "<BOOKING_ID>"
}
```

**cURL:**

```bash
curl -X POST http://localhost:5000/api/booking/cancel \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"bookingId":"<BOOKING_ID>"}'
```

#### Get My Bookings for an Event

**GET** `/api/booking/bookings/:eventId` _(Requires JWT)_

**cURL:**

```bash
curl -X GET http://localhost:5000/api/booking/bookings/<EVENT_ID> \
  -H "Authorization: Bearer <JWT_TOKEN>"
```
