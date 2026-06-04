import { Route, Routes } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import ModulePlaceholder from "./pages/ModulePlaceholder.jsx";
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
              <ModulePlaceholder title="Aptitude Tests" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/technical-tests"
          element={
            <ProtectedRoute>
              <ModulePlaceholder title="Technical Tests" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coding-questions"
          element={
            <ProtectedRoute>
              <ModulePlaceholder title="Coding Questions" />
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
