import React from 'react'
import { DateRangePicker, type Range, type RangeKeyDict } from 'react-date-range';

interface Props {
    statusFilter: string
    setStatusFilter: (s: string) => void
    dateRange: Range
    setDateRange: (r: RangeKeyDict) => void
}

const FilterBar: React.FC<Props> = ({ statusFilter, setStatusFilter, dateRange, setDateRange }) => (
    <div className="flex flex-wrap gap-4 mb-4">
        <select className="border p-2" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
        </select>

        <DateRangePicker ranges={[dateRange]} onChange={setDateRange}/>
    </div>
)

export default FilterBar
