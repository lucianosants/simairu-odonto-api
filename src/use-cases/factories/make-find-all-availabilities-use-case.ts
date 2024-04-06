import { PrismaAvailabilitiesRepository } from '@/repositories/prisma/prisma-availabilities-repository';
import { FindAllAvailabilitiesUseCase } from '../availabilities/find-all-availabilities';

export function makeFindAllAvailabilitiesUseCase() {
	const availabilitiesRepository = new PrismaAvailabilitiesRepository();
	const useCase = new FindAllAvailabilitiesUseCase(availabilitiesRepository);

	return useCase;
}
