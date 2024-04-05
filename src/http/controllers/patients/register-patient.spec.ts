import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Register Patient (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to register a new patient', async () => {
		const { auth } = await getUserToken(app);

		const { id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const response = await request(app.server)
			.post('/patients')
			.set(auth.field, auth.val)
			.send({
				name: 'John Doe',
				email: 'john@mail.com',
				current_doctor: id,
			});

		expect(response.statusCode).toEqual(201);
	});
});
