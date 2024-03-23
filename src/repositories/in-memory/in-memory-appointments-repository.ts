import { randomUUID } from 'node:crypto';
import { Prisma, Appointment } from '@prisma/client';

import { AppointmentsRepository } from '../appointments-repository';
import { PaginationParamsProps, FindAllAppointmentsProps } from '@/@types';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
	public items: Appointment[] = [];

	public async create(
		data: Prisma.AppointmentCreateInput
	): Promise<Appointment> {
		const appointment: Appointment = {
			id: randomUUID(),
			created_at: new Date(),
			day: data.day as Date,
			doctor_id: data.doctor.connect?.id!,
			patient_id: data.patient.connect?.id!,
			status: data.status!,
		};

		this.items.push(appointment);

		return appointment;
	}

	public async findById(id: string): Promise<Appointment | null> {
		const appointment = this.items.find((item) => item.id === id);

		return appointment ?? null;
	}

	public async findAll(
		props: PaginationParamsProps
	): Promise<FindAllAppointmentsProps | null> {
		const appointments = this.items;

		if (!appointments) return null;

		return {
			appointments,
			count: appointments.length,
			totalPages: Math.ceil(appointments.length / props.take),
		};
	}
}
