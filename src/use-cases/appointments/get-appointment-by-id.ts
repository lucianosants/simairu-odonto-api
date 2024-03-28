import { Appointment } from '@prisma/client';

import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { AppointmentNotFoundError } from '../errors/appointment-not-found-error';

interface GetAppointmentByIdUseCaseRequest {
	id: string;
}

interface GetAppointmentByIdUseCaseResponse {
	appointment: Appointment;
}

export class GetAppointmentByIdUseCase {
	constructor(private appointmentsRepository: AppointmentsRepository) {}

	public async execute({
		id,
	}: GetAppointmentByIdUseCaseRequest): Promise<GetAppointmentByIdUseCaseResponse> {
		const appointment = await this.appointmentsRepository.findById(id);

		if (!appointment) throw new AppointmentNotFoundError();

		return { appointment };
	}
}
