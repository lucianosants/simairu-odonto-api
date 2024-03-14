import { Patient, Prisma } from '@prisma/client';

export interface PatientsRepository {
	create(data: Prisma.PatientCreateInput): Promise<Patient>;
	findByEmail(email: string): Promise<Patient | null>;
	findByName(name: string): Promise<Patient | null>;
}