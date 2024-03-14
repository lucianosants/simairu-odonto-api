import { FindAllPatientsProps, PaginationParamsProps } from '@/@types';
import { PatientsRepository } from '@/repositories/patients-repository';

interface FindAllPatientsUseCaseRequest extends PaginationParamsProps {}
interface FindAllPatientsUseCaseResponse extends FindAllPatientsProps {}

export class FindAllPatientsUseCase {
	constructor(private patientsRepository: PatientsRepository) {}

	async execute({
		skip,
		take,
	}: FindAllPatientsUseCaseRequest): Promise<FindAllPatientsUseCaseResponse | null> {
		const patients = await this.patientsRepository.findAll({ skip, take });

		if (!patients) return null;

		return { ...patients };
	}
}
