import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeFindAllDoctorsUseCase } from '@/use-cases/factories/make-find-all-doctors-use-case';

export async function findAllDoctors(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const paramsSchema = z.object({
		take: z.string().optional().default('20'),
		skip: z.string().optional().default('0'),
	});

	const { skip, take } = paramsSchema.parse(request.query);

	try {
		const FindAllDoctorsUseCase = makeFindAllDoctorsUseCase();

		const doctors = await FindAllDoctorsUseCase.execute({
			skip: Number(skip),
			take: Number(take),
		});

		return reply.status(200).send(doctors);
	} catch (error) {
		throw error;
	}
}
