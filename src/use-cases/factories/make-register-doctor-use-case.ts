import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';
import { RegisterDoctorUseCase } from '../doctors/register-doctor';

export function makeRegisterDoctorUseCase() {
	const doctorsRepository = new PrismaDoctorsRepository();
	const useCase = new RegisterDoctorUseCase(doctorsRepository);

	return useCase;
}
