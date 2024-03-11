import { Doctor, Prisma } from '@prisma/client';

export interface DoctorsRepository {
	create(data: Prisma.DoctorCreateInput): Promise<Doctor>;
	findByName(name: string): Promise<Doctor | null>;
	findByEmail(email: string): Promise<Doctor | null>;
}
