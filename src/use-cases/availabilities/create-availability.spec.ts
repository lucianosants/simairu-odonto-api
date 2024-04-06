import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryAvailabilitiesRepository } from '@/repositories/in-memory/in-memory-availabilities-repository';

import { CreateAvailabilityUseCase } from './create-availability';

import { DoctorNotFoundError } from '../errors/doctor-not-found-error';

let doctorsRepository: DoctorsRepository;
let availabilitiesRepository: AvailabilitiesRepository;
let sut: CreateAvailabilityUseCase;

describe('Create Availability Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		availabilitiesRepository = new InMemoryAvailabilitiesRepository();
		sut = new CreateAvailabilityUseCase(
			availabilitiesRepository,
			doctorsRepository
		);
	});

	it('should be able to create availability', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const { availability } = await sut.execute({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctorId: doctor.id,
		});

		expect(availability.id).toEqual(expect.any(String));
		expect(availability.doctor_id).toEqual(doctor.id);
		expect(availability.day).toEqual('4/26/2024');
	});

	it('should not be to create without doctor', async () => {
		await expect(
			sut.execute({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId: 'non-existent-doctor',
			})
		).rejects.toBeInstanceOf(DoctorNotFoundError);
	});
});
