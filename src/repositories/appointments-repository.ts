import { Appointment, Prisma } from '@prisma/client';
import {
	FindAllAppointmentsProps,
	GetAppointmentsByDayProps,
	PaginationParamsProps,
} from '@/@types';

export interface AppointmentsRepository {
	create(data: Prisma.AppointmentCreateInput): Promise<Appointment>;
	findById(id: string): Promise<Appointment | null>;
	findByDay(
		day: string,
		props: PaginationParamsProps
	): Promise<GetAppointmentsByDayProps | null>;
	findAll(
		props: PaginationParamsProps
	): Promise<FindAllAppointmentsProps | null>;
	update(
		id: string,
		data: Prisma.AppointmentUpdateInput
	): Promise<Appointment>;
}
