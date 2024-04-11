import { $Enums, Appointment } from '@prisma/client';

import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { AppointmentNotFoundError } from '../errors/appointment-not-found-error';

interface UpdateAppointmentUseCaseRequest {
	id: string;
	data: {
		day?: string;
		status?: $Enums.Status;
	};
}
interface UpdateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class UpdateAppointmentUseCase {
	constructor(private appointmentsRepository: AppointmentsRepository) {}

	public async execute({
		id,
		data,
	}: UpdateAppointmentUseCaseRequest): Promise<UpdateAppointmentUseCaseResponse> {
		const appointmentFound = await this.appointmentsRepository.findById(id);

		if (!appointmentFound) throw new AppointmentNotFoundError();

		const appointment = await this.appointmentsRepository.update(id, data);

		return { appointment };
	}
}
