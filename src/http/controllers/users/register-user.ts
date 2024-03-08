import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { userAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case';

export async function registerUser(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const registerUserBodySchema = z.object({
		email: z.string().email(),
		name: z.string(),
		password: z.string().min(8),
	});

	const { email, name, password } = registerUserBodySchema.parse(
		request.body
	);

	try {
		const registerUserUseCase = makeRegisterUserUseCase();

		await registerUserUseCase.execute({
			email,
			name,
			password,
		});
	} catch (error) {
		if (error instanceof userAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(201).send({ message: 'User registered successfully!' });
}
