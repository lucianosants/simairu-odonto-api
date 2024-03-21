import { $Enums, Appointment } from '@prisma/client';

import { AppointmentsRepository } from '@/repositories/appointments-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';
import { PatientsRepository } from '@/repositories/patients-repository';

import { DoctorNotFoundError } from '../errors/doctor-not-found-error';
import { PatientNotFoundError } from '../errors/patient-not-found-error';

interface CreateAppointmentUseCaseRequest {
	day: Date | string;
	doctorId: string;
	patientId: string;
	status: $Enums.Status;
}

interface CreateAppointmentUseCaseResponse {
	appointment: Appointment;
}

export class CreateAppointmentUseCase {
	constructor(
		private appointmentsRepository: AppointmentsRepository,
		private doctorsRepository: DoctorsRepository,
		private patientsRepository: PatientsRepository
	) {}

	public async execute(
		data: CreateAppointmentUseCaseRequest
	): Promise<CreateAppointmentUseCaseResponse> {
		const [doctorFound, patientFound] = [
			await this.doctorsRepository.findById(data.doctorId),
			await this.patientsRepository.findById(data.patientId),
		];

		if (!doctorFound) throw new DoctorNotFoundError();
		if (!patientFound) throw new PatientNotFoundError();

		const appointment = await this.appointmentsRepository.create({
			day: data.day,
			doctor: { connect: { id: data.doctorId } },
			patient: { connect: { id: data.patientId } },
			status: data.status,
		});

		return { appointment };
	}
}
