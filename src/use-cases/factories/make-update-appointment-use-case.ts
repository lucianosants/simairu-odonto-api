import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { UpdateAppointmentUseCase } from '../appointments/update-appointment';

export function makeUpdateAppointmentUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const useCase = new UpdateAppointmentUseCase(appointmentsRepository);

	return useCase;
}
