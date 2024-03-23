import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';

import { makeFindAllAppointmentsUseCase } from '@/use-cases/factories/make-find-all-appointments-use-case';

export async function findAllAppointments(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const findAllAppointmentsQuerySchema = z.object({
		skip: z.string(),
		take: z.string(),
	});

	const { skip, take } = findAllAppointmentsQuerySchema.parse(request.query);

	try {
		const findAllAppointmentsUseCase = makeFindAllAppointmentsUseCase();

		const appointments = await findAllAppointmentsUseCase.execute({
			skip: Number(skip),
			take: Number(take),
		});

		return reply.status(200).send(appointments);
	} catch (error) {
		throw error;
	}
}
