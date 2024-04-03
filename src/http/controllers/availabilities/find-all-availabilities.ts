import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFindAllAvailabilitiesUseCase } from '@/use-cases/factories/make-find-all-availabilities-use-case';

export async function findAllAvailabilities(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findAllAvailabilitiesQuerySchema = z.object({
		take: z.string().default('20'),
		skip: z.string().default('0'),
	});

	const { skip, take } = findAllAvailabilitiesQuerySchema.parse(
		request.query
	);

	try {
		const findAllAvailabilitiesUseCase = makeFindAllAvailabilitiesUseCase();

		const availabilities = await findAllAvailabilitiesUseCase.execute({
			skip: Number(skip),
			take: Number(take),
		});

		return reply.status(200).send(availabilities);
	} catch (error) {
		throw error;
	}
}
