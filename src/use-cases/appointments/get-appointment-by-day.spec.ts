import { beforeEach, describe, expect, it } from 'vitest';

import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';

import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

import { GetAppointmentsByDayUseCase } from './get-appointments-by-day';

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsREpository: PatientsRepository;
let sut: GetAppointmentsByDayUseCase;

describe('Get Appointments by Day', () => {
	beforeEach(() => {
		appointmentsRepository = new InMemoryAppointmentsRepository();
		doctorsRepository = new InMemoryDoctorsRepository();
		patientsREpository = new InMemoryPatientsRepository();
		sut = new GetAppointmentsByDayUseCase(appointmentsRepository);
	});

	it('should be able to get all appointment by day', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const patient = await patientsREpository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: { connect: { id: doctor.id } },
		});

		const appointment = await appointmentsRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
			patient: { connect: { id: patient.id } },
			status: 'PENDING',
		});

		await appointmentsRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
			patient: { connect: { id: patient.id } },
			status: 'PENDING',
		});

		const { appointments, count, totalPages } = await sut.execute({
			day: new Date('04-26-2024').toLocaleDateString(),
			skip: 0,
			take: 20,
		});

		expect(appointments).toHaveLength(2);
		expect(count).toEqual(2);
		expect(totalPages).toEqual(1);

		expect(appointments[0].doctor_id).toEqual(doctor.id);
		expect(appointments[0].patient_id).toEqual(patient.id);
		expect(appointments[0].id).toEqual(appointment.id);
	});
});
