import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryAvailabilitiesRepository } from '@/repositories/in-memory/in-memory-availabilities-repository';
import { DeleteAvailabilityUseCase } from './delete-availability';

import { AvailabilityNotFoundError } from '../errors/availability-not-found-error';

let doctorsRepository: DoctorsRepository;
let availabilitiesRepository: AvailabilitiesRepository;
let sut: DeleteAvailabilityUseCase;

describe('Delete Availability Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		availabilitiesRepository = new InMemoryAvailabilitiesRepository();
		sut = new DeleteAvailabilityUseCase(availabilitiesRepository);
	});

	it('should be able to delete a availability', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		await availabilitiesRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
		});

		await availabilitiesRepository.create({
			day: new Date('04-27-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
		});

		const { id } = await availabilitiesRepository.create({
			day: new Date('04-28-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
		});

		const { availability } = await sut.execute({
			id,
		});

		const availabilities = await availabilitiesRepository.findAll({
			skip: 0,
			take: 20,
		});

		expect(availability?.id).toEqual(expect.any(String));
		expect(availabilities?.availabilities).toHaveLength(2);
	});

	it('should not be able to delete non-existent-availability', async () => {
		await expect(
			sut.execute({ id: 'non-existent-id' })
		).rejects.toBeInstanceOf(AvailabilityNotFoundError);
	});
});
