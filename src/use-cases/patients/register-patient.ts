import { Patient } from '@prisma/client';

import { PatientsRepository } from '@/repositories/patients-repository';
import { DoctorsRepository } from '@/repositories/doctors-repository';

import { PatientAlreadyExistsError } from '../errors/patient-already-exists.error';
import { DoctorNotFoundError } from '../errors/doctor-not-found-error';

interface RegisterPatientUseCaseRequest {
	name: string;
	email: string;
	current_doctor: string;
}

interface RegisterPatientUseCaseResponse {
	patient: Patient;
}

export class RegisterPatientUseCase {
	constructor(
		private patientsRepository: PatientsRepository,
		private doctorsRepository: DoctorsRepository
	) {}

	public async execute(
		data: RegisterPatientUseCaseRequest
	): Promise<RegisterPatientUseCaseResponse> {
		const [someEmailFound, someNameFound, doctorFound] = [
			await this.patientsRepository.findByEmail(data.email),
			await this.patientsRepository.findByName(data.name),
			await this.doctorsRepository.findById(data.current_doctor),
		];

		const patientAlready = someEmailFound || someNameFound;

		if (!doctorFound) throw new DoctorNotFoundError();
		if (patientAlready) throw new PatientAlreadyExistsError();

		const patient = await this.patientsRepository.create({
			...data,
			current_doctor: { connect: { id: data.current_doctor } },
		});

		if (!patient) throw new PatientAlreadyExistsError();

		return { patient };
	}
}
