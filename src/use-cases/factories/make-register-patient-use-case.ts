import { PrismaPatientsRepository } from '@/repositories/prisma/prisma-patients-repository';
import { RegisterPatientUseCase } from '../patients/register-patient';
import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';

export function makeRegisterPatientUseCase() {
	const patientsRepository = new PrismaPatientsRepository();
	const doctorsRepository = new PrismaDoctorsRepository();
	const useCase = new RegisterPatientUseCase(
		patientsRepository,
		doctorsRepository
	);

	return useCase;
}
