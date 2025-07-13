import { useState } from "react";
import {
  startOfMonth,
  startOfWeek,
  addDays,
  format,
  isSameMonth,
  isToday,
} from "date-fns";
import AppointmentForm from "./AppointmentForm";
import { v4 as uuidv4 } from "uuid";

export default function CalendarM({ appointments, setAppointments }) {
  const [currentDate] = useState(new Date());
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState(null);

  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });

  const openForm = (dateStr, appt = null) => {
    setSelectedDate(dateStr);
    setFormData(appt);
    setShowForm(true);
  };

  const saveAppointment = (newAppt) => {
    if (formData) {
      // Edit existing by id
      const updated = appointments.map((a) =>
        a.id === formData.id ? { ...newAppt, id: formData.id } : a
      );
      setAppointments(updated);
    } else {
      // Add new appointment with id
      setAppointments([...appointments, { ...newAppt, id: uuidv4() }]);
    }
    setFormData(null);
    setShowForm(false);
  };

  const deleteAppointment = (apptToDelete) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      const updated = appointments.filter((a) => a.id !== apptToDelete.id);
      setAppointments(updated);
    }
  };

  const days = [];

  for (let i = 0; i < 42; i++) {
    const thisDate = addDays(startDate, i);
    const dateStr = format(thisDate, "yyyy-MM-dd");

    const dayAppointments = appointments.filter((appt) => appt.date === dateStr);

    days.push(
      <div
        key={i}
        onClick={() => isSameMonth(thisDate, currentDate) && openForm(dateStr)}
        className={`border h-28 p-1 overflow-auto text-sm cursor-pointer ${
          !isSameMonth(thisDate, currentDate)
            ? "bg-gray-200 text-gray-400"
            : isToday(thisDate)
            ? "bg-blue-100"
            : "bg-white hover:bg-blue-50"
        }`}
      >
        <div className="font-bold">{format(thisDate, "d")}</div>
        {dayAppointments.map((appt) => (
          <div
            key={appt.id}
            className="flex justify-between items-center text-xs mt-1"
            onClick={(e) => {
              e.stopPropagation();
              openForm(dateStr, appt);
            }}
          >
            <div>
              <span className="font-medium">{appt.time}</span> - {appt.patient}
            </div>
            <button
              className="text-red-500 ml-1"
              onClick={(e) => {
                e.stopPropagation();
                deleteAppointment(appt);
              }}
            >
              ✖
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-7 gap-px bg-gray-300">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="bg-white font-semibold text-center p-2 border"
          >
            {d}
          </div>
        ))}
        {days}
      </div>

      {showForm && (
        <AppointmentForm
          date={selectedDate}
          initialData={formData}
          onSave={saveAppointment}
          onClose={() => {
            setFormData(null);
            setShowForm(false);
          }}
        />
      )}
    </>
  );
}
