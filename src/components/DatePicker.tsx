import React, { useState } from "react"
import { DateRange, type Range } from "react-date-range"
import { format } from "date-fns"


const predefinedRanges = [
    { label: "Today", range: () => ({ startDate: new Date(), endDate: new Date() }) },
    {
        label: "Yesterday", range: () => {
            const yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
            return { startDate: yesterday, endDate: yesterday }
        }
    },
    {
        label: "Last 7 Days", range: () => {
            const end = new Date()
            const start = new Date()
            start.setDate(end.getDate() - 6)
            return { startDate: start, endDate: end }
        }
    },
    {
        label: "This Month", range: () => {
            const now = new Date()
            return {
                startDate: new Date(now.getFullYear(), now.getMonth(), 1),
                endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0),
            }
        }
    },
    { label: "Custom Range", range: null }, // For user to select manually
]

export default function DateRangePickerDropdown() {
    const [showPicker, setShowPicker] = useState(false)
    const [selectedRange, setSelectedRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
    })

    const handleSelect = (ranges: any) => {
        setSelectedRange(ranges.selection)
    }

    const handlePredefinedSelect = (item: any) => {
        if (item.range) {
            setSelectedRange({ ...item.range(), key: "selection" })
            setShowPicker(false)
        } else {
            setShowPicker(true)
        }
    }

    return (
        <div className="relative w-[300px]">
            <select
                onChange={(e) => handlePredefinedSelect(predefinedRanges[parseInt(e.target.value)])}
                className="w-full p-2 border rounded"
            >
                {predefinedRanges.map((item, idx) => (
                    <option key={idx} value={idx}>
                        {item.label}
                    </option>
                ))}
            </select>

            {showPicker && (
                <div className="absolute z-50 mt-2 shadow-lg">
                    <DateRange
                        editableDateInputs={true}
                        onChange={handleSelect}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectedRange]}
                    />
                </div>
            )}

            <div className="mt-2 text-sm">
                Selected:{" "}
                <strong>
                    {format(selectedRange.startDate!, "MMM d, yyyy")} → {format(selectedRange.endDate!, "MMM d, yyyy")}
                </strong>
            </div>
        </div>
    )
}
