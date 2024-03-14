import { beforeEach, describe, expect, it } from 'vitest';
import { randomUUID } from 'node:crypto';

import { PatientsRepository } from '@/repositories/patients-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

import { RegisterPatientUseCase } from './register-patient';

import { DoctorNotFoundError } from '../errors/doctor-not-found-error';
import { PatientAlreadyExistsError } from '../errors/patient-already-exists.error';

let patientsRepository: PatientsRepository;
let doctorsRepository: DoctorsRepository;
let sut: RegisterPatientUseCase;

describe('Register Patient Use Case', () => {
	beforeEach(() => {
		patientsRepository = new InMemoryPatientsRepository();
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new RegisterPatientUseCase(patientsRepository, doctorsRepository);
	});

	it('should be able to register Patient', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		const { patient } = await sut.execute({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: doctor.id,
		});

		expect(patient).contain({
			name: 'John Doe',
			email: 'john@mail.com',
		});
		expect(patient.id).toEqual(expect.any(String));
	});

	it('should be register Patient with correct Doctor ID', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		const { patient } = await sut.execute({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: doctor.id,
		});

		expect(patient.doctorId).toEqual(doctor.id);
	});

	it('should not be possible register with incorrect Doctor ID', async () => {
		await expect(
			sut.execute({
				name: 'John Doe',
				email: 'john@mail.com',
				current_doctor: randomUUID(),
			})
		).rejects.toBeInstanceOf(DoctorNotFoundError);
	});

	it('should not be possible register same patient', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		await sut.execute({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: doctor.id,
		});

		await expect(
			sut.execute({
				name: 'John Doe',
				email: 'john@mail.com',
				current_doctor: doctor.id,
			})
		).rejects.toBeInstanceOf(PatientAlreadyExistsError);
	});
});
