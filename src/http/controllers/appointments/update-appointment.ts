import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeUpdateAppointmentUseCase } from '@/use-cases/factories/make-update-appointment-use-case';

import { AppointmentNotFoundError } from '@/use-cases/errors/appointment-not-found-error';

export async function updateAppointment(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const updateAppointmentParamsSchema = z.object({
		id: z.string(),
	});

	const updateAppointmentBodySchema = z.object({
		day: z.string(),
		status: z.enum(['PENDING', 'HELD', 'NOT_HELD']),
	});

	const { id } = updateAppointmentParamsSchema.parse(request.params);
	const { day, status } = updateAppointmentBodySchema.parse(request.body);

	try {
		const updateAppointmentUseCase = makeUpdateAppointmentUseCase();

		await updateAppointmentUseCase.execute({ id, data: { day, status } });
	} catch (error) {
		if (error instanceof AppointmentNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(201)
		.send({ message: 'Appointment updated successfully!' });
}
