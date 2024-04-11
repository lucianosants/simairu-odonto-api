import { Patient, Prisma } from '@prisma/client';

import { FindAllPatientsProps, PaginationParamsProps } from '@/@types';

export interface PatientsRepository {
	create(data: Prisma.PatientCreateInput): Promise<Patient>;
	findById(id: string): Promise<Patient | null>;
	findByEmail(email: string): Promise<Patient | null>;
	findByName(name: string): Promise<Patient[] | null>;
	findAll(props: PaginationParamsProps): Promise<FindAllPatientsProps | null>;
}
