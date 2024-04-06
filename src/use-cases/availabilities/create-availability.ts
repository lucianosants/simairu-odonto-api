import { Availability } from '@prisma/client';

import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { DoctorNotFoundError } from '../errors/doctor-not-found-error';

interface CreateAvailabilityUseCaseRequest {
	day: string;
	doctorId: string;
}

interface CreateAvailabilityUseCaseResponse {
	availability: Availability;
}

export class CreateAvailabilityUseCase {
	constructor(
		private availabilitiesRepository: AvailabilitiesRepository,
		private doctorsRepository: DoctorsRepository
	) {}

	public async execute(
		request: CreateAvailabilityUseCaseRequest
	): Promise<CreateAvailabilityUseCaseResponse> {
		const doctorFound = await this.doctorsRepository.findById(
			request.doctorId
		);

		if (!doctorFound) throw new DoctorNotFoundError();

		const availability = await this.availabilitiesRepository.create({
			day: request.day,
			doctor: { connect: { id: request.doctorId } },
		});

		return { availability };
	}
}
