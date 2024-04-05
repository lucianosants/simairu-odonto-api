import { Availability } from '@prisma/client';

import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';
import { AvailabilityNotFoundError } from '../errors/availability-not-found-error';

interface DeleteAvailabilityUseCaseRequest {
	id: string;
}

interface DeleteAvailabilityUseCaseResponse {
	availability: Availability | null;
}

export class DeleteAvailabilityUseCase {
	constructor(private availabilitiesRepository: AvailabilitiesRepository) {}

	public async execute({
		id,
	}: DeleteAvailabilityUseCaseRequest): Promise<DeleteAvailabilityUseCaseResponse> {
		const availabilityFound = await this.availabilitiesRepository.findById(
			id
		);

		if (!availabilityFound) throw new AvailabilityNotFoundError();

		const availability = await this.availabilitiesRepository.delete(id);

		return { availability };
	}
}
