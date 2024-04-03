import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { AvailabilitiesRepository } from '@/repositories/availabilities-repository';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryAvailabilitiesRepository } from '@/repositories/in-memory/in-memory-availabilities-repository';
import { FindAllAvailabilitiesUseCase } from './find-all-availabilities';

let doctorsRepository: DoctorsRepository;
let availabilitiesRepository: AvailabilitiesRepository;
let sut: FindAllAvailabilitiesUseCase;

describe('Find All Availabilities Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		availabilitiesRepository = new InMemoryAvailabilitiesRepository();
		sut = new FindAllAvailabilitiesUseCase(availabilitiesRepository);
	});

	it('should be able to show an availabilities list', async () => {
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
			day: new Date('04-30-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
		});

		const availabilities = await sut.execute({ skip: 0, take: 20 });

		expect(availabilities?.availabilities).toHaveLength(2);
		expect(availabilities?.count).toEqual(2);
		expect(availabilities?.totalPages).toEqual(1);
	});

	it('should be able to show an empty list', async () => {
		const availabilities = await sut.execute({ skip: 0, take: 20 });

		expect(availabilities?.availabilities).toHaveLength(0);
		expect(availabilities?.count).toEqual(0);
		expect(availabilities?.totalPages).toEqual(0);
	});
});
