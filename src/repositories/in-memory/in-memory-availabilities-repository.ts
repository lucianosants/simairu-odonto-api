import { randomUUID } from 'node:crypto';
import { Availability, Prisma } from '@prisma/client';

import { AvailabilitiesRepository } from '../availabilities-repository';
import { PaginationParamsProps, FindAllAvailabilitiesProps } from '@/@types';

export class InMemoryAvailabilitiesRepository
	implements AvailabilitiesRepository
{
	public items: Availability[] = [];

	public async create(
		data: Prisma.AvailabilityCreateInput
	): Promise<Availability> {
		const availability: Availability = {
			id: randomUUID(),
			day: data.day,
			doctor_id: data.doctor.connect?.id!,
		};

		this.items.push(availability);

		return availability;
	}

	public async findAllAvailabilities(
		props: PaginationParamsProps
	): Promise<FindAllAvailabilitiesProps | null> {
		const availabilities = this.items;

		if (!availabilities) return null;

		return {
			availabilities,
			count: availabilities.length,
			totalPages: Math.ceil(availabilities.length / props.take),
		};
	}

	public async findByDay(
		day: string,
		props: PaginationParamsProps
	): Promise<FindAllAvailabilitiesProps | null> {
		const availabilities = this.items.filter(
			(availability) => availability.day === day
		);

		if (!availabilities) return null;

		return {
			availabilities,
			count: availabilities.length,
			totalPages: Math.ceil(availabilities.length / props.take),
		};
	}

	public async findById(id: string): Promise<Availability | null> {
		const availability = this.items.find((item) => item.id === id);

		return availability ?? null;
	}
}
