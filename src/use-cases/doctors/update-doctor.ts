import { DoctorsRepository } from '@/repositories/doctors-repository';
import { Doctor } from '@prisma/client';
import { DoctorNotFoundError } from '../errors/doctor-not-found-error';

interface UpdateDoctorUseCaseRequest {
	id: string;
	data: {
		available: boolean;
	};
}

interface UpdateDoctorUseCaseResponse {
	doctor: Doctor;
}

export class UpdateDoctorUseCase {
	constructor(private doctorsRepository: DoctorsRepository) {}

	public async execute({
		id,
		data,
	}: UpdateDoctorUseCaseRequest): Promise<UpdateDoctorUseCaseResponse> {
		const doctorFound = await this.doctorsRepository.findById(id);

		if (!doctorFound) throw new DoctorNotFoundError();

		const doctor = await this.doctorsRepository.updateDoctor(id, data);

		if (!doctor) throw new DoctorNotFoundError();

		return { doctor };
	}
}
