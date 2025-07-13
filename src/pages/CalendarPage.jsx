import { useEffect, useState } from "react";
import CalendarM from "../components/CalendarM";
import CalendarD from "../components/CalendarD";

export default function CalendarPage(){

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
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Appointment Calendar</h1>
      {windowWidth >= 768 ? (
        <CalendarM appointments={appointments} setAppointments={setAppointments} />
      ) : (
        <CalendarD appointments={appointments} setAppointments={setAppointments} />
      )}
    </div>
  );
    
}