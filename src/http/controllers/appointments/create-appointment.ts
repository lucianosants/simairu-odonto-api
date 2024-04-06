import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateAppointmentUseCase } from '@/use-cases/factories/make-create-appointment-use-case';

import { DoctorNotFoundError } from '@/use-cases/errors/doctor-not-found-error';
import { PatientNotFoundError } from '@/use-cases/errors/patient-not-found-error';

export async function createAppointment(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const createAppointmentBodySchema = z.object({
		day: z.string(),
		doctorId: z.string(),
		patientId: z.string(),
		status: z.enum(['PENDING', 'HELD', 'NOT_HELD']).default('PENDING'),
	});

	const { day, doctorId, patientId, status } =
		createAppointmentBodySchema.parse(request.body);

	try {
		const createAppointmentUseCase = makeCreateAppointmentUseCase();

		await createAppointmentUseCase.execute({
			day: new Date(day).toLocaleDateString(),
			doctorId,
			patientId,
			status,
		});
	} catch (error) {
		if (
			error instanceof DoctorNotFoundError ||
			error instanceof PatientNotFoundError
		) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(201)
		.send({ message: 'Appointment created successfully!' });
}
