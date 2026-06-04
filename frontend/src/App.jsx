import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import AptitudeTest from "./pages/AptitudeTest.jsx";
import AptitudeTestResult from "./pages/AptitudeTestResult.jsx";
import TechnicalSubjects from "./pages/TechnicalSubjects.jsx";
import TechnicalTest from "./pages/TechnicalTest.jsx";
import TechnicalResult from "./pages/TechnicalResult.jsx";
import ModulePlaceholder from "./pages/ModulePlaceholder.jsx";
import CodingQuestions from "./pages/CodingQuestions.jsx";
import CodingQuestionDetail from "./pages/CodingQuestionDetail.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminAptitudeQuestions from "./pages/AdminAptitudeQuestions.jsx";
import AdminTechnicalQuestions from "./pages/AdminTechnicalQuestions.jsx";
import AdminCodingQuestions from "./pages/AdminCodingQuestions.jsx";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/Profile.jsx";
import Register from "./pages/Register.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude-tests"
          element={
            <ProtectedRoute>
              <AptitudeTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/aptitude-tests/result"
          element={
            <ProtectedRoute>
              <AptitudeTestResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technical-tests"
          element={
            <ProtectedRoute>
              <TechnicalSubjects />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technical-tests/:subject"
          element={
            <ProtectedRoute>
              <TechnicalTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technical-tests/result"
          element={
            <ProtectedRoute>
              <TechnicalResult />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coding-questions"
          element={
            <ProtectedRoute>
              <CodingQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coding-questions/:id"
          element={
            <ProtectedRoute>
              <CodingQuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/aptitude-questions"
          element={
            <ProtectedRoute>
              <AdminAptitudeQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/technical-questions"
          element={
            <ProtectedRoute>
              <AdminTechnicalQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/coding-questions"
          element={
            <ProtectedRoute>
              <AdminCodingQuestions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/interview-questions"
          element={
            <ProtectedRoute>
              <ModulePlaceholder title="Interview Questions" />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
