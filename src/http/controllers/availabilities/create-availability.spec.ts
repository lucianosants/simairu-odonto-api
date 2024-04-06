import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Create Availability (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should be able to create an Availability', async () => {
		const { auth } = await getUserToken(app);

		const { id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const response = await request(app.server)
			.post('/availabilities')
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId: id,
			});

		expect(response.statusCode).toEqual(201);
	});
});
