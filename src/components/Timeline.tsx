import type { Appointment } from "@/types/type"
import { format } from "date-fns"
import GlassCard from "./GlassCard"
import { Skeleton } from "./ui/skeleton"


const Timeline = ({ appointments, loading }: { appointments: Appointment[], loading: boolean }) => {

    const today = new Date()

    const todayAppointments = appointments.filter(app => {
        const date = new Date(app.time)
        return date.toDateString() === today.toDateString()
    })



    return (
        <div>
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-14 w-3/4 bg-[#eeb2b6] dark:bg-[#310320]" />
                    <Skeleton className="h-14 w-3/4 bg-[#eeb2b6] dark:bg-[#310320]" />
                </div>
            ) : todayAppointments.length === 0 ? (
                <div className="text-center py-10 dark:text-white text-black">
                    <p>There is no appointments for today!</p>
                </div>
            ) : (
                todayAppointments.map(app => (
                    <GlassCard key={app.id} className="mb-4 ">
                        
                        <p className="text-sm font-medium">{app.patient}</p>
                        <p className="text-xs text-muted-foreground">
                            {format(new Date(app.time), "hh:mm a")} – {app.status}
                        </p>
                    </GlassCard>
                ))

            )}
        </div>
    )
}

export default Timeline