import { useState } from "react";
import AppointmentForm from "./AppointmentForm";
import { format } from "date-fns";

export default function CalendarD({ appointments, setAppointments }) {

  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [showForm, setShowForm] = useState(false);

  const dailyAppointments = appointments.filter(
    (appt) => appt.date === selectedDate
  );
  
  const saveAppointment = (newAppt) => {
    setAppointments([...appointments, newAppt]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <input
          type="date"
          className="border p-2 rounded"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-600 text-white px-3 py-1 rounded"
          onClick={() => setShowForm(true)}
        >
          + Add
        </button>
      </div>

      <div className="space-y-2">
        {dailyAppointments.length === 0 && (
          <p className="text-gray-500">No appointments for this day.</p>
        )}
        {dailyAppointments.map((appt, index) => (
          <div key={index} className="bg-white p-2 rounded shadow text-sm">
            <div className="font-semibold">{appt.time}</div>
            <div>{appt.patient} with {appt.doctor}</div>
          </div>
        ))}
      </div>

      {showForm && (
        <AppointmentForm
          date={selectedDate}
          onSave={saveAppointment}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
}