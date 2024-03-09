import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case';
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error';

export async function authenticateUser(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateUserBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(8),
	});

	const { email, password } = authenticateUserBodySchema.parse(request.body);

	try {
		const authenticateUserUseCase = makeAuthenticateUserUseCase();

		const { user } = await authenticateUserUseCase.execute({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{ name: user.name },
			{ sub: user.id, expiresIn: '1d' }
		);

		return reply.status(200).send({ token });
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({ message: error.message });
		}

		throw error;
	}
}
