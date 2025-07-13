import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";

export default function App() {

  const auth = localStorage.getItem("login") === "true";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/calendar" element={auth ? <CalendarPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}