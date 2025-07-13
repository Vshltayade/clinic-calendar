import { useState } from "react";
import { format } from "date-fns";
import AppointmentForm from "./AppointmentForm";
import doctors from "../utils/doctors.json";
import patients from "../utils/patients.json";

export default function CalendarD({ appointments, setAppointments }) {
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(null);
  const [doctorFilter, setDoctorFilter] = useState("");
  const [patientFilter, setPatientFilter] = useState("");

  const dailyAppointments = appointments.filter((appt) => appt.date === selectedDate);

  const filteredAppointments = dailyAppointments.filter(
    (a) =>
      (!doctorFilter || a.doctor === doctorFilter) &&
      (!patientFilter || a.patient === patientFilter)
  );

  const openForm = (appt = null) => {
    setFormData(appt);
    setShowForm(true);
  };

  const saveAppointment = (newAppt) => {
    if (formData) {
      const updated = appointments.map((a) =>
        a === formData ? newAppt : a
      );
      setAppointments(updated);
    } else {
      setAppointments([...appointments, newAppt]);
    }
    setFormData(null);
  };

  const deleteAppointment = (apptToDelete) => {
    const updated = appointments.filter((a) => a !== apptToDelete);
    setAppointments(updated);
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
          onClick={() => openForm()}
        >
          + Add
        </button>
      </div>

      <div className="flex gap-2">
        <select
          className="border px-2 py-1 rounded"
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
        >
          <option value="">All Doctors</option>
          {doctors.map((doc) => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
        >
          <option value="">All Patients</option>
          {patients.map((pat) => (
            <option key={pat} value={pat}>{pat}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments for this day.</p>
        ) : (
          filteredAppointments.map((appt, index) => (
            <div
              key={index}
              className="bg-white p-2 rounded shadow text-sm flex justify-between items-start"
            >
              <div>
                <div className="font-semibold">{appt.time}</div>
                <div>{appt.patient} with {appt.doctor}</div>
              </div>
              <div className="space-x-1">
                <button
                  onClick={() => openForm(appt)}
                  className="text-blue-500 text-xs"
                >
                  ✎
                </button>
                <button
                  onClick={() => deleteAppointment(appt)}
                  className="text-red-500 text-xs"
                >
                  ✖
                </button>
              </div>
            </div>
          ))
        )}
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
    </div>
  );
}