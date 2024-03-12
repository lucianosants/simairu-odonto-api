import { PrismaDoctorsRepository } from '@/repositories/prisma/prisma-doctors-repository';
import { FindAllDoctorsUseCase } from '../doctors/find-all-doctors';

export function makeFindAllDoctorsUseCase() {
	const doctorsRepository = new PrismaDoctorsRepository();
	const useCase = new FindAllDoctorsUseCase(doctorsRepository);

	return useCase;
}
