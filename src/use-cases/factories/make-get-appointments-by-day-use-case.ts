import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { GetAppointmentsByDayUseCase } from '../appointments/get-appointments-by-day';

export function makeGetAppointmentsByDayUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const useCase = new GetAppointmentsByDayUseCase(appointmentsRepository);

	return useCase;
}
