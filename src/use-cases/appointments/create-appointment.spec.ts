import { beforeEach, describe, expect, it } from 'vitest';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';
import { AppointmentsRepository } from '@/repositories/appointments-repository';

import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';
import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';

import { CreateAppointmentUseCase } from './create-appointment';

import { DoctorNotFoundError } from '../errors/doctor-not-found-error';
import { PatientNotFoundError } from '../errors/patient-not-found-error';

let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let appointmentsRepository: AppointmentsRepository;
let sut: CreateAppointmentUseCase;

describe('Create Appointment Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		patientsRepository = new InMemoryPatientsRepository();
		appointmentsRepository = new InMemoryAppointmentsRepository();
		sut = new CreateAppointmentUseCase(
			appointmentsRepository,
			doctorsRepository,
			patientsRepository
		);
	});

	it('should be able to create appointment', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const patient = await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: {
				connect: { id: doctor.id },
			},
		});

		const { appointment } = await sut.execute({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctorId: doctor.id,
			patientId: patient.id,
			status: 'PENDING',
		});

		expect(appointment.id).toEqual(expect.any(String));
		expect(appointment.doctor_id).toEqual(doctor.id);
		expect(appointment.patient_id).toEqual(patient.id);
		expect(appointment.status).toEqual('PENDING');
	});

	it('should not be to create without doctor', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		const patient = await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: {
				connect: { id: doctor.id },
			},
		});

		await expect(
			sut.execute({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId: 'non-existent-doctor',
				patientId: patient.id,
				status: 'PENDING',
			})
		).rejects.toBeInstanceOf(DoctorNotFoundError);
	});

	it('should not be to create without patient', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: true,
		});

		await expect(
			sut.execute({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId: doctor.id,
				patientId: 'non-existent-patient',
				status: 'PENDING',
			})
		).rejects.toBeInstanceOf(PatientNotFoundError);
	});
});
