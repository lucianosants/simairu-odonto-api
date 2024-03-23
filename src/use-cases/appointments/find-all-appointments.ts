import { FindAllAppointmentsProps, PaginationParamsProps } from '@/@types';
import { AppointmentsRepository } from '@/repositories/appointments-repository';

export interface FindAllAppointmentsUseCaseRequest
	extends PaginationParamsProps {}

export interface FindAllAppointmentsUseCaseResponse
	extends FindAllAppointmentsProps {}

export class FindAllAppointmentUseCase {
	constructor(private appointmentsRepository: AppointmentsRepository) {}

	public async execute({
		skip,
		take,
	}: FindAllAppointmentsUseCaseRequest): Promise<FindAllAppointmentsUseCaseResponse | null> {
		const appointments = await this.appointmentsRepository.findAll({
			skip,
			take,
		});

		if (!appointments) return null;

		return {
			appointments: appointments.appointments,
			count: appointments.count,
			totalPages: appointments.totalPages,
		};
	}
}
