import { Patient, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { PatientsRepository } from '../patients-repository';

export class InMemoryPatientsRepository implements PatientsRepository {
	public items: Patient[] = [];

	public async create(data: Prisma.PatientCreateInput): Promise<Patient> {
		const patient: Patient = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			created_at: new Date(),
			doctorId: String(data.current_doctor.connect?.id),
		};

		this.items.push(patient);

		return patient;
	}

	public async findByEmail(email: string): Promise<Patient | null> {
		const patient = this.items.find((item) => item.email === email);

		if (!patient) return null;

		return patient;
	}

	public async findByName(name: string): Promise<Patient | null> {
		const patient = this.items.find((item) => item.name === name);

		if (!patient) return null;

		return patient;
	}
}
