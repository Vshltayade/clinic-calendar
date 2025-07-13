import { useState } from "react";
import { format } from "date-fns";

export default function CalendarD({ appointments, setAppointments }) {

  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const dailyAppointments = appointments.filter(
    (appt) => appt.date === selectedDate
  );

  return (
    <div className="space-y-4">
      <input type="date" className="border p-2 rounded" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
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
    </div>
  );
}