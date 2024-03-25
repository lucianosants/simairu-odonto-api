import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { GetAppointmentByIdUseCase } from '../appointments/get-appointment-by-id';

export function makeGetAppointmentByIdUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const useCase = new GetAppointmentByIdUseCase(appointmentsRepository);

	return useCase;
}
