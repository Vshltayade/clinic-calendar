import { useState } from "react";
import { format } from "date-fns";
import AppointmentForm from "./AppointmentForm";
import doctors from "../utils/doctors.json";
import patients from "../utils/patients.json";
import { v4 as uuidv4 } from "uuid";

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
      // Update existing appointment by id
      const updated = appointments.map((a) =>
        a.id === formData.id ? { ...newAppt, id: formData.id } : a
      );
      setAppointments(updated);
    } else {
      // Add new appointment with unique id
      setAppointments([...appointments, { ...newAppt, id: uuidv4() }]);
    }
    setFormData(null);
    setShowForm(false);
  };

  const deleteAppointment = (apptToDelete) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((a) => a.id !== apptToDelete.id));
    }
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
          disabled={showForm}
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
            <option key={doc} value={doc}>
              {doc}
            </option>
          ))}
        </select>
        <select
          className="border px-2 py-1 rounded"
          value={patientFilter}
          onChange={(e) => setPatientFilter(e.target.value)}
        >
          <option value="">All Patients</option>
          {patients.map((pat) => (
            <option key={pat} value={pat}>
              {pat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filteredAppointments.length === 0 ? (
          <p className="text-gray-500">No appointments for this day.</p>
        ) : (
          filteredAppointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white p-2 rounded shadow text-sm flex justify-between items-start"
            >
              <div>
                <div className="font-semibold">{appt.time}</div>
                <div>
                  {appt.patient} with {appt.doctor}
                </div>
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
