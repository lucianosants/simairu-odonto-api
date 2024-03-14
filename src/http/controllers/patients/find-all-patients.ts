import { makeFindAllPatientsUseCase } from '@/use-cases/factories/make-find-all-patients-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function findAllPatients(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const paramsBodySchema = z.object({
		skip: z.string().optional().default('0'),
		take: z.string().optional().default('20'),
	});

	const { skip, take } = paramsBodySchema.parse(request.query);

	try {
		const findAllPatients = makeFindAllPatientsUseCase();

		const patients = await findAllPatients.execute({
			skip: Number(skip),
			take: Number(take),
		});

		return reply.status(200).send(patients);
	} catch (error) {
		throw error;
	}
}
