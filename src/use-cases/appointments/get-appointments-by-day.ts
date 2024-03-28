import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { AppointmentNotFoundError } from '../errors/appointment-not-found-error';
import { GetAppointmentsByDayProps, PaginationParamsProps } from '@/@types';

interface GetAppointmentsByDayUseCaseRequest extends PaginationParamsProps {
	day: string;
}

interface GetAppointmentsByDayUseCaseResponse
	extends GetAppointmentsByDayProps {}

export class GetAppointmentsByDayUseCase {
	constructor(private appointmentsRepository: AppointmentsRepository) {}

	public async execute({
		day,
		skip,
		take,
	}: GetAppointmentsByDayUseCaseRequest): Promise<GetAppointmentsByDayUseCaseResponse> {
		const appointments = await this.appointmentsRepository.findByDay(day, {
			skip,
			take,
		});

		if (!appointments) throw new AppointmentNotFoundError();

		return {
			appointments: appointments.appointments,
			count: appointments.count,
			totalPages: appointments.totalPages,
		};
	}
}
