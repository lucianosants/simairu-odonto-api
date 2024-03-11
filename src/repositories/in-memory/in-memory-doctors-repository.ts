import { Doctor, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import { DoctorsRepository } from '../doctors-repository';

export class InMemoryDoctorsRepository implements DoctorsRepository {
	public items: Doctor[] = [];

	public async create(data: Prisma.DoctorCreateInput): Promise<Doctor> {
		const doctor: Doctor = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			available: data.available,
			created_at: new Date(),
		};

		this.items.push(doctor);

		return doctor;
	}

	public async findByEmail(email: string): Promise<Doctor | null> {
		const doctor = this.items.find((doctor) => doctor.email === email);

		if (!doctor) return null;

		return doctor;
	}

	public async findByName(name: string): Promise<Doctor | null> {
		const doctor = this.items.find((doctor) => doctor.name === name);

		if (!doctor) return null;

		return doctor;
	}
}
