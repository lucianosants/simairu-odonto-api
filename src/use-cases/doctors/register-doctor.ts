import { DoctorsRepository } from '@/repositories/doctors-repository';
import { Doctor } from '@prisma/client';
import { DoctorAlreadyExistsError } from '../errors/doctor-already-exists-error';

interface RegisterDoctorUseCaseRequest {
	name: string;
	email: string;
	available: boolean;
}

interface RegisterDoctorUseCaseResponse {
	doctor: Doctor;
}

export class RegisterDoctorUseCase {
	constructor(private doctorsRepository: DoctorsRepository) {}

	public async execute(
		data: RegisterDoctorUseCaseRequest
	): Promise<RegisterDoctorUseCaseResponse> {
		const nameAlreadyExists = await this.doctorsRepository.findByName(
			data.name
		);

		const emailAlreadyExists = await this.doctorsRepository.findByEmail(
			data.email
		);

		const doctorAlreadyExists = nameAlreadyExists || emailAlreadyExists;

		if (doctorAlreadyExists) {
			throw new DoctorAlreadyExistsError();
		}

		const doctor = await this.doctorsRepository.create(data);

		if (!doctor) throw new DoctorAlreadyExistsError();

		return { doctor };
	}
}
