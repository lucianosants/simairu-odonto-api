import { hash } from 'bcryptjs';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';

describe('Authenticate User (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able authenticate user', async () => {
		await prisma.user.create({
			data: {
				name: 'John Doe',
				email: 'john@mail.com',
				password_hash: await hash('12345678', 8),
			},
		});

		const response = await request(app.server)
			.post('/users/auth/login')
			.send({
				email: 'john@mail.com',
				password: '12345678',
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
