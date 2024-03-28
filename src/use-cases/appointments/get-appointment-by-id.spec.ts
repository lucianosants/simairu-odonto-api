import { beforeEach, describe, expect, it } from 'vitest';

import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';

import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

import { GetAppointmentByIdUseCase } from './get-appointment-by-id';

import { AppointmentNotFoundError } from '../errors/appointment-not-found-error';

let appointmentsRepository: AppointmentsRepository;
let doctorsRepository: DoctorsRepository;
let patientsREpository: PatientsRepository;
let sut: GetAppointmentByIdUseCase;

describe('Get Appointment by Id', () => {
	beforeEach(() => {
		appointmentsRepository = new InMemoryAppointmentsRepository();
		doctorsRepository = new InMemoryDoctorsRepository();
		patientsREpository = new InMemoryPatientsRepository();
		sut = new GetAppointmentByIdUseCase(appointmentsRepository);
	});

	it('should be able to get  an appointment by id', async () => {
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

		const { id: appointmentId } = await appointmentsRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
			patient: { connect: { id: patient.id } },
			status: 'PENDING',
		});

		const { appointment } = await sut.execute({ id: appointmentId });

		expect(appointment.id).toEqual(expect.any(String));
		expect(appointment.day).toEqual(expect.any(String));
		expect(appointment).contains({
			doctor_id: doctor.id,
			patient_id: patient.id,
			status: 'PENDING',
		});
	});

	it('should not be able to get an appointment with incorrect id', async () => {
		await expect(
			sut.execute({ id: 'non-existent-id' })
		).rejects.toBeInstanceOf(AppointmentNotFoundError);
	});
});
