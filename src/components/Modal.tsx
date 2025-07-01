import React, { useState } from 'react'
import { useAppointments } from '../context/AppointmentContext'
import GlassCard from './GlassCard'
import type { Appointment } from '../types/type'
interface Props {
    appointment: Appointment | null 
    onClose: () => void
}

const Modal: React.FC<Props> = ({ appointment, onClose }) => {
    const { setAppointments, addAppointment, rescheduleAppointment } = useAppointments()
    const isNew = !appointment

    const [patient, setpatient] = useState(appointment?.patient || "")
    const [time, setTime] = useState(appointment?.time || "")
    const [status, setStatus] = useState<"pending" | "confirmed" | "completed">(appointment?.status || "pending")

    const handleSubmit = async () => {
        if (!time || !patient) return

        if (isNew) {
            const newAppointment = {
                patient,
                time,
                status,
            }

            await addAppointment(newAppointment)
            setAppointments(prev => [...prev, newAppointment])
        } else {
            await rescheduleAppointment(appointment?.id ?? 0, time)
        }

        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <GlassCard>
                <h3 className="font-bold mb-4">
                    {isNew ? "Add Appointment" : "Reschedule Appointment"}
                </h3>

                <input
                    type="text"
                    placeholder="Enter patient"
                    value={patient}
                    onChange={e => setpatient(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <input
                    type="datetime-local"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <select
                    value={status}
                    onChange={e => setStatus(e.target.value as "pending" | "confirmed")}
                    className="w-full border p-2 mb-4"
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                </select>

                <div className="flex justify-end gap-2">
                    <button onClick={onClose} className="text-gray-500">Cancel</button>
                    <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded">
                        {isNew ? "Add" : "Save"}
                    </button>
                </div>
            </GlassCard>
        </div>
    )
}

export default Modal
