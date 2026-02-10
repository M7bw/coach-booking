# Coach Booking (Sport)

This project contains:
- **Backend** (Express + MongoDB) in the root folder.
- **Frontend** (React + Vite) in `./frontend`.

## Backend

```bash
cd coach-booking
npm install
npm run dev
```

Optional environment variables:
- `MONGO_URL` (default: `mongodb://127.0.0.1:27017/coach-booking`)
- `PORT` (default: `3000`)

### Added endpoints
- `POST /users` (register)
- `POST /users/login` (login **without JWT**)
- `GET /services`, `GET /services/:id`, `GET /services/provider/:providerId`
- `GET /bookings`, `GET /bookings/user/:userId`, `GET /bookings/service/:serviceId`
- `GET /reviews/service/:serviceId` (now populates user)

## Frontend

```bash
cd coach-booking/frontend
npm install
npm run dev
```

The frontend uses **Axios only**.

### Configure API URL

Create a `.env` file in `frontend/` if you want a different backend URL:

```bash
VITE_API_URL=http://localhost:3000
```

## Notes

- No JWT/auth middleware is used (per request). The frontend stores the logged-in user in `localStorage`.
- Passwords are currently stored in plain text. For production you should hash passwords and add proper auth.
