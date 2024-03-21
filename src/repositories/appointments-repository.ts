import { Appointment, Prisma } from '@prisma/client';

export interface AppointmentsRepository {
	create(data: Prisma.AppointmentCreateInput): Promise<Appointment>;
	findById(id: string): Promise<Appointment | null>;
}
