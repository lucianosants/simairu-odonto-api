import { hash } from 'bcryptjs';
import { FastifyInstance } from 'fastify';
import request from 'supertest';

import { prisma } from '@/lib/prisma';

type GetUserTokenProps = {
	auth: {
		field: string;
		val: string;
	};
};

export async function getUserToken(
	app: FastifyInstance
): Promise<GetUserTokenProps> {
	const user = await prisma.user.create({
		data: {
			name: 'John Doe',
			password_hash: await hash('12345678', 8),
			email: 'john@mail.com',
		},
	});

	const response = await request(app.server)
		.post('/users/auth/login')
		.send({ email: user.email, password: '12345678' });

	return {
		auth: { field: 'Authorization', val: `Bearer ${response.body.token}` },
	};
}
