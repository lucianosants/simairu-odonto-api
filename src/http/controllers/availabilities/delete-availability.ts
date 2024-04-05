import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { AvailabilityNotFoundError } from '@/use-cases/errors/availability-not-found-error';
import { makeDeleteAvailabilityUseCase } from '@/use-cases/factories/make-delete-availability-use-case';

export async function deleteAvailability(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const deleteAvailabilityParamsSchema = z.object({
		id: z.string(),
	});

	const { id } = deleteAvailabilityParamsSchema.parse(request.params);

	try {
		const deleteAvailabilityUseCase = makeDeleteAvailabilityUseCase();
		await deleteAvailabilityUseCase.execute({ id });
	} catch (error) {
		if (error instanceof AvailabilityNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(200)
		.send({ message: 'Availability deleted successfully!' });
}
