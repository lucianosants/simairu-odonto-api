import { PrismaAvailabilitiesRepository } from '@/repositories/prisma/prisma-availabilities-repository';
import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';

import { CreateAvailabilityUseCase } from '../availabilities/create-availability';

export function makeCreateAvailabilityUseCase() {
	const availabilitiesRepository = new PrismaAvailabilitiesRepository();
	const doctorsRepository = new PrismaDoctorsRepository();

	const useCase = new CreateAvailabilityUseCase(
		availabilitiesRepository,
		doctorsRepository
	);

	return useCase;
}
