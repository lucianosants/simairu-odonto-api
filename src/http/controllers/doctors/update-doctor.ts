import { DoctorNotFoundError } from '@/use-cases/errors/doctor-not-found-error';
import { makeUpdateDoctorUseCase } from '@/use-cases/factories/make-update-doctor-use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export async function updateDoctor(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const updateDoctorParamsSchema = z.object({
		id: z.string(),
	});

	const updateDoctorbodySchema = z.object({
		available: z.coerce.boolean(),
	});

	const { available } = updateDoctorbodySchema.parse(request.body);
	const { id } = updateDoctorParamsSchema.parse(request.params);

	try {
		const updateDoctorUseCase = makeUpdateDoctorUseCase();

		await updateDoctorUseCase.execute({ id, data: { available } });
	} catch (error) {
		if (error instanceof DoctorNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(201).send({ message: 'Doctor updated successfully!' });
}
