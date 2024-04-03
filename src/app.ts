import fastify from 'fastify';
import { ZodError } from 'zod';
import fastifyJwt from '@fastify/jwt';

import { env } from './env';

import { usersRoutes } from './http/controllers/users/routes';
import { doctorRoutes } from './http/controllers/doctors/routes';
import { patientsRoutes } from './http/controllers/patients/routes';
import { appointmentsRoutes } from './http/controllers/appointments/routes';
import { availabilitiesRoutes } from './http/controllers/availabilities/routes';

export const app = fastify();

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
});

app.register(usersRoutes);
app.register(doctorRoutes);
app.register(patientsRoutes);
app.register(appointmentsRoutes);
app.register(availabilitiesRoutes);

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
