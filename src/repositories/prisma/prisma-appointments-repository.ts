import { Prisma, Appointment, $Enums } from '@prisma/client';

import { AppointmentsRepository } from '../appointments-repository';
import { prisma } from '@/lib/prisma';
import {
	PaginationParamsProps,
	FindAllAppointmentsProps,
	GetAppointmentsByDayProps,
} from '@/@types';

export class PrismaAppointmentsRepository implements AppointmentsRepository {
	public async create(
		data: Prisma.AppointmentCreateInput
	): Promise<Appointment> {
		const appointment = await prisma.appointment.create({ data });

		return appointment;
	}

	public async findById(id: string): Promise<Appointment | null> {
		const appointment = await prisma.appointment.findUnique({
			where: { id },
		});

		return appointment;
	}

	public async findAll({
		skip,
		take,
	}: PaginationParamsProps): Promise<FindAllAppointmentsProps | null> {
		const [appointments, count] = await prisma.$transaction([
			prisma.appointment.findMany({
				skip,
				take,
				orderBy: { day: 'asc' },
			}),
			prisma.appointment.count(),
		]);

		const totalPages = Math.ceil(count / take);

		return { appointments, totalPages, count };
	}

	public async findByDay(
		day: string,
		{ skip, take }: PaginationParamsProps
	): Promise<GetAppointmentsByDayProps | null> {
		const [appointments, count] = await prisma.$transaction([
			prisma.appointment.findMany({
				where: { day: day },
				orderBy: { day: 'asc' },
				skip,
				take,
			}),
			prisma.appointment.count({ where: { day } }),
		]);

		const totalPages = Math.ceil(count / take);

		return { appointments, totalPages, count };
	}

	public async update(
		id: string,
		data: Prisma.AppointmentUpdateInput
	): Promise<Appointment> {
		const appointment = await prisma.appointment.update({
			where: { id },
			data,
		});

		return appointment;
	}
}
