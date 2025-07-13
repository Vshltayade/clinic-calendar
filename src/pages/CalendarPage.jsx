import { useEffect, useState } from "react";
import CalendarM from "../components/CalendarM";
import CalendarD from "../components/CalendarD";

export default function CalendarPage() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [appointments, setAppointments] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("appointments");
    if (saved) {
      setAppointments(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Appointment Calendar</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-sm px-3 py-1 rounded bg-gray-300 dark:bg-gray-700"
          >
            Toggle {darkMode ? "Light" : "Dark"} Mode
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("login");
              window.location.href = "/login";
            }}
            className="ml-2 text-sm px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        {windowWidth >= 768 ? (
          <CalendarM
            appointments={appointments}
            setAppointments={setAppointments}
          />
        ) : (
          <CalendarD
            appointments={appointments}
            setAppointments={setAppointments}
          />
        )}
      </div>
    </div>
  );
}
