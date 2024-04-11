import { Patient } from '@prisma/client';

import { PatientsRepository } from '@/repositories/patients-repository';
import { PatientNotFoundError } from '../errors/patient-not-found-error';

interface GetPatientsByNameUseCaseRequest {
	name: string;
}

interface GetPatientsByNameUseCaseResponse {
	patients: Patient[];
}

export class GetPatientsByNameUseCase {
	constructor(private patientsRepository: PatientsRepository) {}

	public async execute({
		name,
	}: GetPatientsByNameUseCaseRequest): Promise<GetPatientsByNameUseCaseResponse> {
		const patients = await this.patientsRepository.findByName(name);

		if (!patients?.length) throw new PatientNotFoundError();

		return { patients: patients! };
	}
}
