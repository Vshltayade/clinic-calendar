import { useState } from "react";
import {startOfMonth, startOfWeek, addDays, format, isSameMonth} from "date-fns";
import AppointmentForm from "./AppointmentForm";

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
      // Editing
      const updated = appointments.map((a) =>
        a === formData ? newAppt : a
      );
      setAppointments(updated);
    } else {
      // Adding
      setAppointments([...appointments, newAppt]);
    }
  };

  const deleteAppointment = (apptToDelete) => {
    const updated = appointments.filter((a) => a !== apptToDelete);
    setAppointments(updated);
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
            : "bg-white hover:bg-blue-50"
        }`}
      >
        <div className="font-bold">{format(thisDate, "d")}</div>
        {dayAppointments.map((appt, index) => (
          <div
            key={index}
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
          <div key={d} className="bg-white font-semibold text-center p-2 border">
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