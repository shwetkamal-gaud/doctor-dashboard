import { useState } from 'react'
import { useAppointments } from '../context/AppointmentContext'
import FilterBar from '../components/FilterBar'
import AppointmentCard from '../components/AppointmentCard'
import Modal from '../components/Modal'
import { type Appointment } from '../types/type'
import { endOfDay, isWithinInterval, startOfDay } from 'date-fns'
import { Skeleton } from './ui/skeleton'
import Timeline from './Timeline'
import GlassCard from './GlassCard'


const Dashboard = () => {
    const { appointments, loading } = useAppointments()
    const [statusFilter, setStatusFilter] = useState('')
    const [range, setRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
        from: undefined,
        to: undefined,
    })
    const [selected, setSelected] = useState<Appointment | null>(null)
    const [showModal, setShowModal] = useState(false)
    const filtered = appointments.filter(app => {
        const inStatus = statusFilter.trim() ? app.status === statusFilter : true
        const appDate = new Date(app.time)
        const from = range.from ? startOfDay(range.from) : undefined
        const to = range.to ? endOfDay(range.to) : undefined
        console.log("appDate:", appDate.toString())
        console.log("from:", from?.toString())
        console.log("to:", to?.toString())

        const inDateRange = from && to
            ? isWithinInterval(appDate, { start: from, end: to })
            : true
        return inStatus && inDateRange
    })

    const counts = appointments.reduce((acc, cur) => {
        acc[cur.status] = (acc[cur.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)

    console.log(filtered)
    return (
        <div className="p-4 w-full flex flex-col gap-2">
            <div className='flex justify-between items-start'>
                <FilterBar
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                    dateRange={range}
                    setDateRange={setRange}
                />
                <button
                    onClick={() => {
                        setSelected(null)
                        setShowModal(true)
                    }}
                    className="bg-[#eeb2b6] dark:bg-[#310320]  text-white px-4 py-2 rounded"
                >
                    Add Appointment
                </button>
            </div>
            <div className="mb-4 text-sm text-gray-700 dark:text-white/70">
                {Object.entries(counts).map(([status, count]) => (
                    <span key={status} className="mr-4 capitalize">{count} {status}</span>
                ))}
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 h-full gap-4 '>
                <GlassCard className='space-y-2 max-h-[74vh] scrollbar-none overflow-y-auto'>
                    <h1 className='text-2xl font-medium'>Appointments</h1>
                    {loading ? (
                        <div className="space-y-2">
                            <Skeleton className="h-20 w-3/4 bg-[#eeb2b6] dark:bg-[#310320]" />
                            <Skeleton className="h-20 w-3/4 bg-[#eeb2b6] dark:bg-[#310320]" />
                        </div>
                    ) : filtered.length === 0 ? (
                            <div className="text-center py-10 dark:text-white text-black">
                            <p>No appointments found for selected filters.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">

                            {filtered.map(app => (
                                <AppointmentCard setIsOpen={setShowModal} key={app.id} appointment={app} onReschedule={setSelected} />
                            ))}

                        </div>

                    )}
                </GlassCard>
                <GlassCard className="self-start space-y-2 max-h-[74vh] scrollbar-none overflow-y-auto">
                    <h1 className='text-2xl font-medium'>Timeline</h1>
                    <Timeline appointments={appointments} loading={loading} />
                </GlassCard>
            </div>

            {showModal && (
                <Modal appointment={selected} onClose={() => { setShowModal(false); setSelected(null) }} />
            )}
        </div>
    )
}

export default Dashboard
