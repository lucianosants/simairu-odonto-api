import { Availability, Prisma } from '@prisma/client';
import { AvailabilitiesRepository } from '../availabilities-repository';
import { prisma } from '@/lib/prisma';
import { PaginationParamsProps, FindAllAvailabilitiesProps } from '@/@types';

export class PrismaAvailabilitiesRepository
	implements AvailabilitiesRepository
{
	public async create(
		data: Prisma.AvailabilityCreateInput
	): Promise<Availability> {
		const availability = await prisma.availability.create({ data });

		return availability;
	}

	public async findById(id: string): Promise<Availability | null> {
		const availability = await prisma.availability.findUnique({
			where: { id },
		});

		return availability;
	}

	public async findByDay(
		day: string,
		{ skip, take }: PaginationParamsProps
	): Promise<FindAllAvailabilitiesProps | null> {
		const [availabilities, count] = [
			await prisma.availability.findMany({
				where: { day },
				orderBy: { day: 'asc' },
				skip,
				take,
			}),
			await prisma.availability.count({ where: { day } }),
		];

		const totalPages = Math.ceil(count / take);

		return { availabilities, count, totalPages };
	}

	public async findAll({
		skip,
		take,
	}: PaginationParamsProps): Promise<FindAllAvailabilitiesProps | null> {
		const [availabilities, count] = [
			await prisma.availability.findMany({
				orderBy: { day: 'asc' },
				skip,
				take,
			}),
			await prisma.availability.count(),
		];

		const totalPages = Math.ceil(count / take);

		return { availabilities, count, totalPages };
	}

	public async delete(id: string): Promise<Availability> {
		const availability = await prisma.availability.delete({
			where: { id },
		});

		return availability;
	}
}
