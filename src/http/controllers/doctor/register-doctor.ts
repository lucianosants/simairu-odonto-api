import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeRegisterDoctorUseCase } from '@/use-cases/factories/make-register-doctor-use-case';

export async function RegisterDoctor(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const registerDoctorBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		available: z.coerce.boolean().default(true),
	});

	const { available, email, name } = registerDoctorBodySchema.parse(
		request.body
	);

	try {
		const registerDoctorUseCase = makeRegisterDoctorUseCase();

		await registerDoctorUseCase.execute({
			available,
			email,
			name,
		});
	} catch (error) {
		if (error instanceof Error) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}

	return reply
		.status(201)
		.send({ message: 'Doctor registered successfully!' });
}
