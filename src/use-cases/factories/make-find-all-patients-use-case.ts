import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository';
import { FindAllPatientsUseCase } from '../patients/find-all-patients';

export function makeFindAllPatientsUseCase() {
	const patientsRepository = new PrismaPatientsRepository();
	const useCase = new FindAllPatientsUseCase(patientsRepository);

	return useCase;
}
