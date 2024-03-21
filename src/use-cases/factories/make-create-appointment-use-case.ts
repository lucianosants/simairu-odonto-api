import { PrismaAppointmentsRepository } from '@/repositories/prisma/prisma-appointments-repository';
import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';
import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository';

import { CreateAppointmentUseCase } from '../appointments/create-appointment';

export function makeCreateAppointmentUseCase() {
	const appointmentsRepository = new PrismaAppointmentsRepository();
	const doctorsRepository = new PrismaDoctorsRepository();
	const patientsRepository = new PrismaPatientsRepository();

	const useCase = new CreateAppointmentUseCase(
		appointmentsRepository,
		doctorsRepository,
		patientsRepository
	);

	return useCase;
}
