import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Delete Availability (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to delete availability', async () => {
		const { auth } = await getUserToken(app);

		const { id: doctor_id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const { id } = await prisma.availability.create({
			data: {
				day: new Date('05-26-2024').toLocaleDateString(),
				doctor_id,
			},
		});

		const response = await request(app.server)
			.delete(`/availabilities/${id}`)
			.set(auth.field, auth.val);

		expect(response.statusCode).toEqual(200);
	});
});
