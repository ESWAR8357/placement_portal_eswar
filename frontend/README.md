# Placement Preparation Portal - Frontend Phase 2

Phase 2 implements the React frontend foundation using Vite, React Router DOM, Axios, Tailwind CSS, and React Icons.

## Setup

Install dependencies:

```bash
npm install
```

Create `.env` from `.env.example` if needed:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app runs at:

```text
http://localhost:5173
```

## Pages

- `/` - Home
- `/login` - Login
- `/register` - Register
- `/dashboard` - Protected dashboard
- `*` - NotFound

## Auth Flow

- Login calls `POST /api/auth/login`.
- Register calls `POST /api/auth/register`.
- JWT and user data are stored in localStorage.
- Axios sends the JWT automatically with protected requests.
- Refreshing the page reloads the user session using `GET /api/auth/profile`.

## Build

```bash
npm run build
```
