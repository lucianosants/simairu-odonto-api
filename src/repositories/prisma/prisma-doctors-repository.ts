import { Doctor, Prisma } from '@prisma/client';
import { DoctorsRepository } from '../doctors-repository';
import { prisma } from '@/lib/prisma';

export class PrismaDoctorsRepository implements DoctorsRepository {
	public async create(data: Prisma.DoctorCreateInput): Promise<Doctor> {
		const doctor = await prisma.doctor.create({ data });

		return doctor;
	}

	public async findByName(name: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findUnique({ where: { name } });

		return doctor;
	}

	public async findByEmail(email: string): Promise<Doctor | null> {
		const doctor = await prisma.doctor.findUnique({ where: { email } });

		return doctor;
	}
}
