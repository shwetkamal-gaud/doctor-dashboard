import React, { createContext, useContext, useState, useEffect } from "react"
import type { Appointment } from "../types/type"


interface ContextProps {
    appointments: Appointment[]
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
    fetchAppointments: () => void
    loading: boolean
    error: string | null
    rescheduleAppointment: (id: number, newTime: string) => Promise<void>
    markAsCompleted: (id: number) => Promise<void>
    addAppointment: (value: Appointment) => Promise<void>
}
const BASE_URL = "https://682f12cc746f8ca4a47fb4a8.mockapi.io/api/v1/appointment"

const AppointmentsContext = createContext<ContextProps | undefined>(undefined)

export const useAppointments = () => {
    const context = useContext(AppointmentsContext)
    if (!context) throw new Error("Wrap inside AppointmentsProvider")
    return context
}

export const AppointmentsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const fetchAppointments = async () => {
        try {
            setLoading(true)
            const res = await fetch(BASE_URL)
            if (!res.ok) throw new Error("Failed to fetch appointments")
            const data = await res.json()
            setAppointments(data)
            setError(null)
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }
  
    const rescheduleAppointment = async (id: number, newTime: string) => {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ time: newTime }),
            })

            if (!res.ok) throw new Error("Failed to reschedule appointment")
            const updated = await res.json()

            // Update local state
            setAppointments(prev =>
                prev.map(app => (app.id === id ? { ...app, time: updated.time } : app))
            )
        } catch (err) {
            console.error("Error:", err)
        }
    }
    const markAsCompleted = async (id: number) => {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "completed" }),
            })

            if (!res.ok) throw new Error("Failed to update status")

            const updated = await res.json()

            setAppointments(prev =>
                prev.map(app => (app.id === id ? { ...app, status: updated.status } : app))
            )
        } catch (err) {
            console.error("Error marking as completed:", err)
        }
    }
    const addAppointment = async (value: Appointment) => {
        try {
            const res = await fetch(`${BASE_URL}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            })

            if (!res.ok) throw new Error("Failed to add appointment")

        } catch (err) {
            console.error("Error marking as completed:", err)
        }
    }
    useEffect(() => {
        fetchAppointments()
    }, [])

    return (
        <AppointmentsContext.Provider value={{
            appointments,
            setAppointments,
            fetchAppointments,
            rescheduleAppointment,
            markAsCompleted,
            addAppointment,
            loading,
            error,
        }}>
            {children}
        </AppointmentsContext.Provider>
    )
}
