import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryDoctorsRepository } from '@/repositories/in-memory/in-memory-doctors-repository';
import { InMemoryPatientsRepository } from '@/repositories/in-memory/in-memory-patients-repository';
import { InMemoryAppointmentsRepository } from '@/repositories/in-memory/in-memory-appointments-repository';

import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';
import { AppointmentsRepository } from '@/repositories/appointments-repository';

import { UpdateAppointmentUseCase } from './update-appointment';

import { AppointmentNotFoundError } from '../errors/appointment-not-found-error';

let doctorsRepository: DoctorsRepository;
let patientsRepository: PatientsRepository;
let appointmentsRepository: AppointmentsRepository;
let sut: UpdateAppointmentUseCase;

describe('Update Appointment Use Case', () => {
	beforeEach(() => {
		doctorsRepository = new InMemoryDoctorsRepository();
		patientsRepository = new InMemoryPatientsRepository();
		appointmentsRepository = new InMemoryAppointmentsRepository();
		sut = new UpdateAppointmentUseCase(appointmentsRepository);
	});

	it('should be able to update appointment', async () => {
		const doctor = await doctorsRepository.create({
			name: 'Hans Chucrutte',
			email: 'hans@email.com',
			available: false,
		});

		const patient = await patientsRepository.create({
			email: 'john@mail.com',
			name: 'John Doe',
			current_doctor: { connect: { id: doctor.id } },
		});

		const { id } = await appointmentsRepository.create({
			day: new Date('04-26-2024').toLocaleDateString(),
			doctor: { connect: { id: doctor.id } },
			patient: { connect: { id: patient.id } },
			status: 'PENDING',
		});

		const { appointment } = await sut.execute({
			id,
			data: {
				day: new Date('04-30-2024').toLocaleDateString(),
				status: 'HELD',
			},
		});

		expect(appointment.id).toEqual(expect.any(String));
		expect(appointment.status).toEqual('HELD');
		expect(appointment.day).toEqual(
			new Date('04-30-2024').toLocaleDateString()
		);
	});

	it('should not be update non-existent-appointment', async () => {
		await expect(
			sut.execute({
				id: 'non-existent-id',
				data: {
					day: new Date('04-30-2024').toLocaleDateString(),
					status: 'HELD',
				},
			})
		).rejects.toBeInstanceOf(AppointmentNotFoundError);
	});
});
