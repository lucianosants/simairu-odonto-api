import { beforeEach, describe, expect, it } from 'vitest';

import { PatientsRepository } from '@/repositories/patients-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';

import { FindAllPatientsUseCase } from './find-all-patients';

let patientsRepository: PatientsRepository;
let doctorsRepository: DoctorsRepository;
let sut: FindAllPatientsUseCase;

describe('Find All Doctors Use Case', () => {
	beforeEach(() => {
		patientsRepository = new InMemoryPatientsRepository();
		doctorsRepository = new InMemoryDoctorsRepository();
		sut = new FindAllPatientsUseCase(patientsRepository);
	});

	it('should be able to find all Patients', async () => {
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

		await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: { connect: { id: doctor.id } },
		});

		await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: { connect: { id: doctor.id } },
		});

		const patients = await sut.execute({ take: 5, skip: 0 });

		expect(patients?.patients).toHaveLength(3);
		expect(patients?.count).toEqual(3);
		expect(patients?.totalPages).toEqual(1);
	});

	it('should be able to find a empty list', async () => {
		const patients = await sut.execute({ take: 20, skip: 0 });

		expect(patients?.patients).toHaveLength(0);
		expect(patients?.count).toEqual(0);
		expect(patients?.totalPages).toEqual(0);
	});
});
