import { Patient, Prisma } from '@prisma/client';

import { PatientsRepository } from '../patients-repository';
import { prisma } from '@/lib/prisma';

export class PrismaPatientsRepository implements PatientsRepository {
	public async create(data: Prisma.PatientCreateInput): Promise<Patient> {
		const patient = await prisma.patient.create({ data });

		return patient;
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		const patient = prisma.patient.findUnique({ where: { email } });

		return patient;
	}

	public async findByName(name: string): Promise<Patient | null> {
		const patient = await prisma.patient.findUnique({ where: { name } });

		return patient;
	}
}
