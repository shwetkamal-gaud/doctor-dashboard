import  { useState } from 'react'
import { useAppointments } from '../context/AppointmentContext'
import FilterBar from '../components/FilterBar'
import AppointmentCard from '../components/AppointmentCard'
import Modal from '../components/Modal'
import { type Appointment } from '../types/type'
import type { RangeKeyDict, Range } from 'react-date-range'

const Dashboard = () => {
    const { appointments } = useAppointments()
    const [statusFilter, setStatusFilter] = useState('')
    const[dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    const [selected, setSelected] = useState<Appointment | null>(null)

    const filtered = appointments.filter(app => {
        const inStatus = statusFilter ? app.status === statusFilter : true
        const inDateRange =
            (!dateRange.startDate || new Date(app.time) >= dateRange.startDate) &&
            (!dateRange.endDate || new Date(app.time) <= dateRange.endDate)
        return inStatus && inDateRange
    })

    const counts = appointments.reduce((acc, cur) => {
        acc[cur.status] = (acc[cur.status] || 0) + 1
        return acc
    }, {} as Record<string, number>)
    const handleDateChange = (ranges: RangeKeyDict) => {
        setDateRange(ranges.selection)
      }
      console.log(filtered
        
      )
    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
            <FilterBar
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                dateRange={dateRange}
                setDateRange={handleDateChange}
            />

            <div className="mb-4 text-sm text-gray-700">
                {Object.entries(counts).map(([status, count]) => (
                    <span key={status} className="mr-4 capitalize">{count} {status}</span>
                ))}
            </div>

            <div className="grid gap-4">
                {filtered.map(app => (
                    <AppointmentCard key={app.id} appointment={app} onReschedule={setSelected} />
                ))}
            </div>

            {selected && (
                <Modal appointment={selected} onClose={() => setSelected(null)} />
            )}
        </div>
    )
}

export default Dashboard
