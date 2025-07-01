import React from 'react'
import { DatePicker } from './DatePicker'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'


interface Props {
    statusFilter: string
    setStatusFilter: (s: string) => void
    dateRange: {from: Date | undefined; to: Date | undefined }
    setDateRange: (value: {
        from: Date | undefined;
        to: Date | undefined;
    }) => void
}

const FilterBar: React.FC<Props> = ({ statusFilter, setStatusFilter, dateRange, setDateRange }) => (
    <div className="flex flex-wrap items-start gap-4 mb-4">
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value)}>
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
        </Select>

        <DatePicker date={dateRange} setDate={setDateRange} />

    </div>
)

export default FilterBar
