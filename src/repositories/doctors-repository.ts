import { FindAllDoctorsProps, PaginationParamsProps } from '@/@types';
import { Doctor, Prisma } from '@prisma/client';

export interface DoctorsRepository {
	create(data: Prisma.DoctorCreateInput): Promise<Doctor>;
	findById(id: string): Promise<Doctor | null>;
	findByName(name: string): Promise<Doctor | null>;
	findByEmail(email: string): Promise<Doctor | null>;
	findAll(props: PaginationParamsProps): Promise<FindAllDoctorsProps | null>;
}
