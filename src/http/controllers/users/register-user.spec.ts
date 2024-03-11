import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

describe('Register User (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register a new user', async () => {
		const response = await request(app.server)
			.post('/users/auth/register')
			.send({
				name: 'John Doe',
				email: 'john@mail.com',
				password: '12345678',
			});

		expect(response.statusCode).toEqual(201);
	});
});
