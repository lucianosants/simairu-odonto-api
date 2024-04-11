import { beforeEach, describe, expect, it } from 'vitest';

import { PatientsRepository } from '@/repositories/patients-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';

import { GetPatientsByNameUseCase } from './get-patients-by-name';
import { PatientNotFoundError } from '../errors/patient-not-found-error';

let patientsRepository: PatientsRepository;
let doctorsRepository: DoctorsRepository;
let sut: GetPatientsByNameUseCase;

describe('Find Patients by name Use Case', () => {
	beforeEach(() => {
		patientsRepository = new InMemoryPatientsRepository();
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new GetPatientsByNameUseCase(patientsRepository);
	});

	it('should be able to find Patients by name', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: { connect: { id: doctor.id } },
		});

		const { patients } = await sut.execute({ name: 'john doe' });

		expect(patients).toHaveLength(1);
	});

	it('should be able to find a empty list', async () => {
		await expect(sut.execute({ name: 'John Doe' })).rejects.toBeInstanceOf(
			PatientNotFoundError
		);
	});
});
