import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeGetAppointmentByIdUseCase } from '@/use-cases/factories/make-get-appointment-by-id-use-case';
import { AppointmentNotFoundError } from '@/use-cases/errors/appointment-not-found-error';

export async function getAppointmentById(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getAppointmentByIdParamsSchema = z.object({
		id: z.string(),
	});

	const { id } = getAppointmentByIdParamsSchema.parse(request.params);

	try {
		const getAppointmentByIdUseCase = makeGetAppointmentByIdUseCase();

		const appointment = await getAppointmentByIdUseCase.execute({ id });

		return reply.status(200).send(appointment);
	} catch (error) {
		if (error instanceof AppointmentNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
