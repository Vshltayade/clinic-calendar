import { useState } from "react";
import { startOfMonth, startOfWeek, addDays, format, isSameMonth } from "date-fns";
import AppointmentForm from "./AppointmentForm";

export default function CalendarM({ appointments, setAppointments }){

    const [currentDate] = useState(new Date());
    const [showForm, setShowForm] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });

    const handleDayClick = (dateStr) => {
        setSelectedDate(dateStr);
        setShowForm(true);
    };

    const saveAppointment = (newAppt) => {
        setAppointments([...appointments, newAppt]);
    };

    const days = [];

    for (let i = 0; i < 42; i++) {
        const thisDate = addDays(startDate, i);
        const dateStr = format(thisDate, "yyyy-MM-dd");
        const dayAppointments = appointments.filter((appt) => appt.date === format(thisDate, "yyyy-MM-dd"));

        days.push(
        <div
            key={i}
            onClick={() => isSameMonth(thisDate, currentDate) && handleDayClick(dateStr)}
            className={`border h-28 p-1 overflow-auto text-sm cursor-pointer ${
            !isSameMonth(thisDate, currentDate) ? "bg-gray-200 text-gray-400" : "bg-white hover:bg-blue-50"
            }`}
        >
            <div className="font-bold">{format(thisDate, "d")}</div>
            {dayAppointments.map((appt, index) => (
            <div key={index} className="text-xs mt-1">
                <span className="font-medium">{appt.time}</span> - {appt.patient}
            </div>
            ))}
        </div>
        );
    }        

    return (
        <div>
        <div className="grid grid-cols-7 gap-px bg-gray-300">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="bg-white font-semibold text-center p-2 border">
                {d}
            </div>
            ))}
            {days}
        </div>

        {showForm && (
            <AppointmentForm date={selectedDate} onSave={saveAppointment} onClose={() => setShowForm(false)} />
        )}
        </div>
    );
}