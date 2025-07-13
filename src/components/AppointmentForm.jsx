import { useState } from "react";

const patients = ["John Doe", "Jane Smith", "Alice Johnson"];
const doctors = ["Dr. Patel", "Dr. Adams", "Dr. Lee"];

export default function AppointmentForm({ date, onSave, onClose, initialData }){

  const [patient, setPatient] = useState(initialData?.patient || "");
  const [doctor, setDoctor] = useState(initialData?.doctor || "");
  const [time, setTime] = useState(initialData?.time || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patient || !doctor || !time) return;

    onSave({
      date,
      patient,
      doctor,
      time,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96 space-y-4">
        <h2 className="text-xl font-bold">Add Appointment</h2>

        <div>
          <label className="block text-sm mb-1">Patient</label>
          <select value={patient} onChange={(e) => setPatient(e.target.value)} className="w-full border px-2 py-1 rounded">
            <option value="">-- Select --</option>
            {patients.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Doctor</label>
          <select value={doctor} onChange={(e) => setDoctor(e.target.value)} className="w-full border px-2 py-1 rounded">
            <option value="">-- Select --</option>
            {doctors.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full border px-2 py-1 rounded" />
        </div>

        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="px-4 py-1 bg-gray-300 rounded">Cancel</button>
          <button type="submit" className="px-4 py-1 bg-blue-600 text-white rounded">Save</button>
        </div>
      </form>
    </div>
  );
}