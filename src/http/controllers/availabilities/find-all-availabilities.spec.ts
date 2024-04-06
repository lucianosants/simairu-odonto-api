import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Find All Availabilities (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all availabilities', async () => {
		const { auth } = await getUserToken(app);

		const { id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		await prisma.availability.create({
			data: {
				day: new Date('05-26-2024').toLocaleDateString(),
				doctor_id: id,
			},
		});

		const response = await request(app.server)
			.get('/availabilities')
			.set(auth.field, auth.val)
			.query({ skip: '0', take: '20' });

		expect(response.statusCode).toEqual(200);
	});
});
