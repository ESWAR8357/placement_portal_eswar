# 🚀 Placement Preparation Portal

![MERN](https://img.shields.io/badge/MERN-Stack-3DA5FF?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=for-the-badge&logo=react)
![Node](https://img.shields.io/badge/Backend-Node%20%2B%20Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-f97316?style=for-the-badge&logo=auth0)

A full-stack **MERN** application designed to help students prepare for placements using **timer-based Aptitude and Technical tests**, automatic scoring, and answer reviews. 🎯

---

## ✨ Project Description
The **Placement Preparation Portal** provides:
- Secure **user registration and login** using **JWT**
- **Aptitude Test** & **Technical Test** modules
- **Timer-based assessments** with automatic score calculation
- A **Review Answers** section after submission
- A **Dashboard** for viewing results
- A responsive UI built with **React + TailwindCSS**

---

## 🧩 Features
- ✅ User Registration and Login
- ✅ JWT Authentication (Protected Routes)
- ✅ Aptitude Test Module (MCQs)
- ✅ Technical Test Module (Subject-based MCQs)
- ⏱️ Timer-based Assessments (auto-submit when time ends)
- 📊 Automatic Score Calculation
- 📝 Review Answers after Submission
- 🏠 Dashboard for Test Results
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack
**Frontend**
- React.js (Vite)
- React Router DOM
- Axios
- TailwindCSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas (Mongoose)
- JWT Authentication

**Tooling**
- dotenv
- cors, helmet
- express-rate-limit

---

## 🏗️ Project Architecture
A standard MERN architecture:
- **Frontend** calls REST APIs from the backend.
- Backend validates requests using JWT middleware.
- MongoDB stores:
  - Users
  - Question banks (Aptitude/Technical)
  - Test results

**Key flow**
1. User logs in → receives JWT
2. Protected routes require `Authorization: Bearer <token>`
3. Test page loads questions from APIs
4. User submits answers → backend calculates score
5. Frontend displays summary + review answers

---

## 📁 Folder Structure
```text
d:/placement-preparation-portal/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── utils/
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── services/
    │   ├── context/
    │   └── utils/
    └── index.html
```

---

## ✅ Prerequisites
- Node.js **18+**
- MongoDB Atlas account/cluster
- npm

---

## 📦 Installation Steps
### 1) Backend
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables (`.env` example)
Create `.env` inside `backend/`.

```env
PORT=5000
NODE_ENV=development

MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/placement_preparation_portal?retryWrites=true&w=majority

JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

If needed for frontend:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ▶️ Running Frontend and Backend
- **Backend**: `http://localhost:5000`
- **Frontend**: `http://localhost:5173`

---

## 🔌 API Overview
**Authentication**
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/profile` (Protected)

**Tests**
- `GET /api/tests/aptitude/questions` (Protected)
- `POST /api/tests/aptitude/submit` (Protected)

- `GET /api/tests/technical/subjects` (Protected)
- `GET /api/tests/technical/questions/:subject` (Protected)
- `POST /api/tests/technical/submit` (Protected)

**Coding Questions**
- `GET /api/coding-questions`
- `GET /api/coding-questions/:id`

**Admin & Analytics**
- `GET /api/admin/dashboard` (Admin only)
- `GET /api/admin/users` (Admin only)
- `GET /api/admin/analytics/overview` (Admin only)
- `GET /api/admin/analytics/tests` (Admin only)
- `GET /api/admin/analytics/users` (Admin only)

---

## 🖼️ Screenshots
> Add your own screenshots here.

### UI Screens
- **Login / Register**
  - ![Login](./screenshots/login.png)
- **Dashboard**
  - ![Dashboard](./screenshots/dashboard.png)
- **Aptitude Test**
  - ![Aptitude Test](./screenshots/aptitude-test.png)
- **Technical Test**
  - ![Technical Test](./screenshots/technical-test.png)
- **Review Answers**
  - ![Review Answers](./screenshots/review-answers.png)

---

## 🔮 Future Enhancements
- Add coding test execution (with sandbox/code runner)
- Admin panel improvements (question import/export)
- Better analytics dashboards (charts + trends)
- User-specific question difficulty adaptation
- Multi-language support

---

## 🤝 Contributing
Contributions are welcome! 🎉

1. Fork the repo
2. Create your feature branch
3. Commit changes
4. Open a Pull Request

---

## 📝 License
Licensed under the **MIT License**.

---

## 👤 Author
**Placement Preparation Portal**

---

### ⭐ Show Your Support
If this project helped you, please consider starring the repository! 🌟

