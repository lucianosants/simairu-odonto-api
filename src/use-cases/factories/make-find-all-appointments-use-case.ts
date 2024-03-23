import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { FindAllAppointmentUseCase } from '../appointments/find-all-appointments';

export function makeFindAllAppointmentsUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const useCase = new FindAllAppointmentUseCase(appointmentsRepository);

	return useCase;
}
