import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository';
import { GetPatientsByNameUseCase } from '../patients/get-patients-by-name';

export function makeGetPatientsByNameUseCase() {
	const patientsRepository = new PrismaPatientsRepository();
	const useCase = new GetPatientsByNameUseCase(patientsRepository);

	return useCase;
}
