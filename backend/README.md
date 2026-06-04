# Placement Preparation Portal - Backend Phase 1

Phase 1 implements the Express backend foundation, MongoDB Atlas connection, User model, JWT authentication, register/login APIs, protected profile route, middleware, and environment setup.

## Requirements

- Node.js 18+
- MongoDB Atlas cluster
- npm

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create an `.env` file from `.env.example`:

```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB Atlas URI and a strong JWT secret:

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/placement_preparation_portal?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

4. Run the development server:

```bash
npm run dev
```

## API Endpoints

### Register

`POST /api/auth/register`

```json
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "Password@123"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "student@example.com",
  "password": "Password@123"
}
```

### Profile

`GET /api/auth/profile`

Header:

```text
Authorization: Bearer <jwt_token>
```

## Seed Data

After configuring `.env`, insert starter admin and student users:

```bash
npm run seed
```

Seed accounts:

- Admin: `admin@placementportal.com` / `Admin@123`
- Student: `student@placementportal.com` / `Student@123`

## Testing Instructions

1. Start the server with `npm run dev`.
2. Visit `http://localhost:5000/api/health`.
3. Use Postman, Thunder Client, or curl to call register and login.
4. Copy the returned token and call `/api/auth/profile` with the `Authorization` header.

Example curl:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test Student\",\"email\":\"test@example.com\",\"password\":\"Password@123\"}"
```
