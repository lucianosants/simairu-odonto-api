import { FindAllAvailabilitiesProps, PaginationParamsProps } from '@/@types';
import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';

interface FindAllAvailabilitiesUseCaseRequest extends PaginationParamsProps {}

interface FindAllAvailabilitiesUseCaseResponse
	extends FindAllAvailabilitiesProps {}

export class FindAllAvailabilitiesUseCase {
	constructor(private availabilitiesRepository: AvailabilitiesRepository) {}

	public async execute({
		skip,
		take,
	}: FindAllAvailabilitiesUseCaseRequest): Promise<FindAllAvailabilitiesUseCaseResponse | null> {
		const availabilities = await this.availabilitiesRepository.findAll({
			skip,
			take,
		});

		if (!availabilities) return null;

		return {
			availabilities: availabilities.availabilities,
			count: availabilities.count,
			totalPages: availabilities.totalPages,
		};
	}
}
