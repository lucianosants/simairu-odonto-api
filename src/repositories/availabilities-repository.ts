import { Availability, Prisma } from '@prisma/client';

import { FindAllAvailabilitiesProps, PaginationParamsProps } from '@/@types';

export interface AvailabilitiesRepository {
	create(data: Prisma.AvailabilityCreateInput): Promise<Availability>;
	findById(id: string): Promise<Availability | null>;
	findByDay(
		day: string,
		props: PaginationParamsProps
	): Promise<FindAllAvailabilitiesProps | null>;
	findAll(
		props: PaginationParamsProps
	): Promise<FindAllAvailabilitiesProps | null>;
}
