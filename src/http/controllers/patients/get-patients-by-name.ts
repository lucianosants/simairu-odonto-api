import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PatientNotFoundError } from '@/use-cases/errors/patient-not-found-error';
import { makeGetPatientsByNameUseCase } from '@/use-cases/factories/make-get-patients-by-name-use-case';

export async function getPatientsByName(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const getPatientsByNameParamsSchema = z.object({
		name: z.string(),
	});

	const { name } = getPatientsByNameParamsSchema.parse(request.params);

	try {
		const getPatientsByNameUseCase = makeGetPatientsByNameUseCase();

		const patients = await getPatientsByNameUseCase.execute({ name });

		return reply.status(200).send(patients);
	} catch (error) {
		if (error instanceof PatientNotFoundError) {
			return reply.status(404).send({ message: error.message });
		}

		throw error;
	}
}
