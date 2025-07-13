import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import CalendarPage from "./pages/CalendarPage";

export default function App() {
  const [auth, setAuth] = useState(localStorage.getItem("login") === "true");

  useEffect(() => {
    const handleStorageChange = () => {
      setAuth(localStorage.getItem("login") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage onLogin={() => setAuth(true)} />} />
        <Route
          path="/calendar"
          element={auth ? <CalendarPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
