import { Appointment, Prisma } from '@prisma/client';
import { FindAllAppointmentsProps, PaginationParamsProps } from '@/@types';

export interface AppointmentsRepository {
	create(data: Prisma.AppointmentCreateInput): Promise<Appointment>;
	findById(id: string): Promise<Appointment | null>;
	findAll(
		props: PaginationParamsProps
	): Promise<FindAllAppointmentsProps | null>;
}
