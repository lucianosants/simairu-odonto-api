import { DoctorsRepository } from '@/repositories/doctors-repository';
import { FindAllDoctorsProps, PaginationParamsProps } from '@/@types';

interface FindAllDoctorsUseCaseRequest extends PaginationParamsProps {}
interface FindAllDoctorsUseCaseResponse extends FindAllDoctorsProps {}

export class FindAllDoctorsUseCase {
	constructor(private doctorsRepository: DoctorsRepository) {}

	public async execute({
		skip,
		take,
	}: FindAllDoctorsUseCaseRequest): Promise<FindAllDoctorsUseCaseResponse | null> {
		const doctors = await this.doctorsRepository.findAll({
			skip: skip,
			take: take,
		});

		if (!doctors) return null;

		return {
			doctors: doctors.doctors,
			count: doctors.count,
			totalPages: doctors.totalPages,
		};
	}
}
