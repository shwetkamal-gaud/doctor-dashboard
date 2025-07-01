export type Status = 'confirmed' | 'pending' | 'completed'

export interface Appointment {
    id?: number
    patient: string
    time: string 
    status: Status
}