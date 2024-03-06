import fastify from 'fastify';
import { ZodError } from 'zod';

import { env } from './env';

import { helloRoutes } from './http/controllers/hello-world/routes';

export const app = fastify();

app.register(helloRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: 'Validation error', issue: error.format() });
	}

	if (env.NODE_ENV !== 'production') {
		console.error(error);
	}

	return reply.status(500).send({ message: 'Internal server error' });
});
