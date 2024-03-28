import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeGetAppointmentsByDayUseCase } from '@/use-cases/factories/make-get-appointments-by-day-use-case';
import { AppointmentNotFoundError } from '@/use-cases/errors/appointment-not-found-error';

export async function getAppointmentByDay(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getAppointmentByDayBodySchema = z.object({
		day: z.string(),
		take: z.coerce.number().default(20),
		skip: z.coerce.number().default(0),
	});

	const { day, skip, take } = getAppointmentByDayBodySchema.parse(
		request.body
	);

	try {
		const getAppointmentByIdUseCase = makeGetAppointmentsByDayUseCase();

		const appointment = await getAppointmentByIdUseCase.execute({
			day,
			skip,
			take,
		});

		return reply.status(200).send(appointment);
	} catch (error) {
		if (error instanceof AppointmentNotFoundError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}
}
