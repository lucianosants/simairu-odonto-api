import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';
import { UpdateDoctorUseCase } from '../doctors/update-doctor';

export function makeUpdateDoctorUseCase() {
	const doctorsRepository = new PrismaDoctorsRepository();
	const useCase = new UpdateDoctorUseCase(doctorsRepository);

	return useCase;
}
