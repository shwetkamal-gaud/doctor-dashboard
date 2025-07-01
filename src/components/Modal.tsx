import React, { useState } from 'react'
import { useAppointments } from '../context/AppointmentContext'
import GlassCard from './GlassCard'
import type { Appointment } from '../types/type'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'

interface Props {
    appointment: Appointment | null
    onClose: () => void
}

const Modal: React.FC<Props> = ({ appointment, onClose }) => {
    const { setAppointments, addAppointment, rescheduleAppointment } = useAppointments()
    const isNew = !appointment
    console.log(appointment)
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
        <div className="fixed inset-0 text-white  bg-black/30 flex justify-center items-center z-50">
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
                    disabled={!isNew}
                />

                <input
                    type="datetime-local"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full border p-2 mb-2"
                />

                <Select
                    value={status}
                    onValueChange={(value) =>
                        setStatus(value as "pending" | "confirmed" | "completed")
                    }
                    disabled={!isNew}
                >
                    <SelectTrigger className="w-full border p-2 mb-4">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                </Select>

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
