import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeRegisterPatientUseCase } from '@/use-cases/factories/make-register-patient-use-case';
import { PatientAlreadyExistsError } from '@/use-cases/errors/patient-already-exists.error';
import { DoctorNotFoundError } from '@/use-cases/errors/doctor-not-found-error';

export async function registerPatient(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const registerPatientBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		current_doctor: z.string(),
	});

	const { name, email, current_doctor } = registerPatientBodySchema.parse(
		request.body
	);

	try {
		const registerPatientUseCase = makeRegisterPatientUseCase();

		await registerPatientUseCase.execute({
			name,
			email,
			current_doctor,
		});
	} catch (error) {
		if (
			error instanceof PatientAlreadyExistsError ||
			error instanceof DoctorNotFoundError
		) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(201)
		.send({ message: 'Patient registered successfully!' });
}
