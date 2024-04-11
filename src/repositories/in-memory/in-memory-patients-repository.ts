import { Patient, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { PatientsRepository } from '../patients-repository';
import { PaginationParamsProps, FindAllPatientsProps } from '@/@types';

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

	public async findByName(name: string): Promise<Patient[] | null> {
		const patient = this.items.filter((item) => item.name === name);

		if (!patient) return null;

		return patient;
	}

	public async findAll(
		props: PaginationParamsProps
	): Promise<FindAllPatientsProps | null> {
		const patients = this.items;

		if (!patients) return null;

		return {
			patients: patients,
			totalPages: Math.ceil(patients.length / props.take),
			count: patients.length,
		};
	}

	public async findById(id: string): Promise<Patient | null> {
		const patient = this.items.find((item) => item.id === id);

		if (!patient) return null;

		return patient;
	}
}
