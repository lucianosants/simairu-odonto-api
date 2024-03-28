import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';
import { AppointmentsRepository } from '@/repositories/appointments-repository';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';

import { FindAllAppointmentUseCase } from './find-all-appointments';

let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let appointmentsRepository: AppointmentsRepository;
let sut: FindAllAppointmentUseCase;

describe('Find All Appointments Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		patientsRepository = new InMemoryPatientsRepository();
		appointmentsRepository = new InMemoryAppointmentsRepository();
		sut = new FindAllAppointmentUseCase(appointmentsRepository);
	});

	it('should be able to find all appointments', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const patient = await patientsRepository.create({
			current_doctor: { connect: { id: doctor.id } },
			email: 'john@mail.com',
			name: 'John Doe',
		});

		await appointmentsRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
			patient: { connect: { id: patient.id } },
			status: 'PENDING',
		});

		const appointments = await sut.execute({
			skip: 0,
			take: 10,
		});

		expect(appointments?.appointments).toHaveLength(1);
		expect(appointments?.count).toEqual(1);
		expect(appointments?.totalPages).toEqual(1);
	});

	it('should be able to find an empty list', async () => {
		const appointments = await sut.execute({
			skip: 0,
			take: 10,
		});

		expect(appointments?.appointments).toHaveLength(0);
		expect(appointments?.count).toEqual(0);
		expect(appointments?.totalPages).toEqual(0);
	});
});
