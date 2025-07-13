import { useState } from "react";
import { startOfMonth, endOfMonth, startOfWeek, addDays, format, isSameMonth } from "date-fns";

export default function CalendarM({ appointments, setAppointments }){

    const [currentDate, setCurrentDate] = useState(new Date());
    const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
    const endDate = endOfMonth(currentDate);

    const days = [];
    let date = startDate;

    for (let i = 0; i < 42; i++) {
        const thisDate = addDays(startDate, i);
        const dayAppointments = appointments.filter((appt) => appt.date === format(thisDate, "yyyy-MM-dd"));

        days.push(
        <div key={i} className={`border h-28 p-1 overflow-auto text-sm ${ !isSameMonth(thisDate, currentDate) ? "bg-gray-200 text-gray-500" : "bg-white" }`} >
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
        </div>
    );
}