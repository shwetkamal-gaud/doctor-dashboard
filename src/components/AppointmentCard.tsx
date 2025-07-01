import React from 'react'
import { type Appointment } from '../types/type'
import { useAppointments } from '../context/AppointmentContext'
import GlassCard from './GlassCard'

interface Props {
    appointment: Appointment
    onReschedule: (a: Appointment) => void
}

const AppointmentCard: React.FC<Props> = ({ appointment, onReschedule }) => {
    const { setAppointments } = useAppointments()

    const markCompleted = () => {
        setAppointments(prev =>
            prev.map(a => a.id === appointment.id ? { ...a, status: 'completed' } : a)
        )
    }

    return (
        <GlassCard>
            <div>
                <p className="font-semibold">{appointment.patient}</p>
                <p>{new Date(appointment.time).toLocaleString()}</p>
                <p className="capitalize text-sm text-gray-500">{appointment.status}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
                {appointment.status !== 'completed' && (
                    <button onClick={markCompleted} className="bg-green-500 text-white px-3 py-1 rounded">Complete</button>
                )}
                <button onClick={() => onReschedule(appointment)} className="bg-blue-500 text-white px-3 py-1 rounded">Reschedule</button>
            </div>
        </GlassCard>
    )
}

export default AppointmentCard
