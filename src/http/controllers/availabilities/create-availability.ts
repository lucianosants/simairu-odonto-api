import { DoctorNotFoundError } from '@/use-cases/errors/doctor-not-found-error';
import { makeCreateAvailabilityUseCase } from '@/use-cases/factories/make-create-availability-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function createAvailability(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const createAvailabilityBodySchema = z.object({
		day: z.string(),
		doctorId: z.string(),
	});

	const { day, doctorId } = createAvailabilityBodySchema.parse(request.body);

	try {
		const createAvailabilityUseCase = makeCreateAvailabilityUseCase();

		await createAvailabilityUseCase.execute({
			day: new Date(day).toLocaleDateString(),
			doctorId,
		});
	} catch (error) {
		if (error instanceof DoctorNotFoundError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(201)
		.send({ message: 'Availability created successfully!' });
}
