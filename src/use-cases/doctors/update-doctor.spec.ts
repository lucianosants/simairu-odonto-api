import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';

import { UpdateDoctorUseCase } from './update-doctor';

let doctorsRepository: DoctorsRepository;
let sut: UpdateDoctorUseCase;

describe('Update Doctor Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new UpdateDoctorUseCase(doctorsRepository);
	});

	it('should be able to update available of doctor', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const updateDoctor = await sut.execute({
			id: doctor.id,
			data: { available: true },
		});

		expect(updateDoctor.doctor.available).toEqual(true);
	});
});
