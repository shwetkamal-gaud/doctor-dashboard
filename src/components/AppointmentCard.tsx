import React from 'react'
import { type Appointment } from '../types/type'
import { useAppointments } from '../context/AppointmentContext'
import GlassCard from './GlassCard'

interface Props {
    appointment: Appointment
    onReschedule: (a: Appointment) => void
    setIsOpen: (value: boolean) => void
}

const AppointmentCard: React.FC<Props> = ({ appointment, onReschedule, setIsOpen }) => {
    const { setAppointments, markAsCompleted } = useAppointments()

    const markCompleted = () => {
        setAppointments(prev =>
            prev.map(a => a.id === appointment.id ? { ...a, status: 'completed' } : a)
        )
        markAsCompleted(appointment?.id ?? 0)
    }

    return (
        <GlassCard className='w-full'>
            <div>
                <p className="font-semibold">{appointment.patient}</p>
                <p>{new Date(appointment.time).toLocaleString()}</p>
                <p className="capitalize text-sm text-gray-500">{appointment.status}</p>
            </div>
            <div className="flex gap-2 mt-2 sm:mt-0">
                {appointment.status !== 'completed' && (
                    <button onClick={markCompleted} className="bg-[#eeb2b6] dark:bg-[#310320] text-white px-3 py-1 rounded">Complete</button>
                )}
                <button onClick={() => { onReschedule(appointment); setIsOpen(true) }} className="dark:bg-[#eeb2b6] bg-[#310320] text-white px-3 py-1 rounded">Reschedule</button>
            </div>
        </GlassCard>
    )
}

export default AppointmentCard
