import { PrismaAvailabilitiesRepository } from '@/repositories/prisma/prisma-availabilities-repository';
import { DeleteAvailabilityUseCase } from '../availabilities/delete-availability';

export function makeDeleteAvailabilityUseCase() {
	const availabilitiesRepository = new PrismaAvailabilitiesRepository();
	const useCase = new DeleteAvailabilityUseCase(availabilitiesRepository);

	return useCase;
}
