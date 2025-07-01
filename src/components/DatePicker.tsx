import * as React from "react"
import { format, subDays, startOfMonth, endOfMonth, startOfDay, endOfDay } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Props {
    date: { from: Date | undefined; to: Date | undefined }
    setDate: (value: { from: Date | undefined; to: Date | undefined }) => void
}

const presetOptions = {
    Today: {
        from: startOfDay(new Date()),
        to: endOfDay(new Date())
    },
    Yesterday: {
        from: startOfDay(subDays(new Date(), 1)),
        to: endOfDay(subDays(new Date(), 1))
    },
    "Last 7 Days": {
        from: startOfDay(subDays(new Date(), 6)),
        to: endOfDay(new Date())
    },
    "This Month": {
        from: startOfDay(startOfMonth(new Date())),
        to: endOfDay(endOfMonth(new Date()))
    },
    "Custom Range": null,
}

export function DatePicker({ date, setDate }: Props) {
    const [openPopover, setOpenPopover] = React.useState(false)
    const [selectedPreset, setSelectedPreset] = React.useState<string | null>(null)

    const handlePresetChange = (selected: string) => {
        setSelectedPreset(selected)
        const preset = presetOptions[selected as keyof typeof presetOptions]
        if (preset) {
            setDate(preset)
            setOpenPopover(false)
        } else {
            setTimeout(() => {
                setOpenPopover(true)
            }, 0)
        }
    }

    return (
        <div className="flex gap-4 items-start">
            <Select onValueChange={handlePresetChange}>
                <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                    {Object.keys(presetOptions).map((label) => (
                        <SelectItem key={label} value={label}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedPreset === "Custom Range" && (
                <Popover open={openPopover} onOpenChange={setOpenPopover}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className={cn(
                                "w-[250px] justify-start text-left font-normal",
                                !date.from && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date.from ? (
                                date.to ? (
                                    <>
                                        {format(date.from, "MMM d")} - {format(date.to, "MMM d")}
                                    </>
                                ) : (
                                    format(date.from, "MMM d")
                                )
                            ) : (
                                <span>Select date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date.from}
                            selected={date}
                            onSelect={(range) =>
                                setDate(range as { from: Date | undefined; to: Date | undefined })
                            }
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            )}
        </div>
    )
}
