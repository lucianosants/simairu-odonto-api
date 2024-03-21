import { Prisma, Appointment } from '@prisma/client';
import { AppointmentsRepository } from '../appointments-repository';
import { prisma } from '@/lib/prisma';

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
}
