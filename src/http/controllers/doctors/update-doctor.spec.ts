import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Update Doctor (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to update a doctor', async () => {
		const { auth } = await getUserToken(app);

		const { id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: false,
			},
		});

		const response = await request(app.server)
			.patch(`/doctors/${id}`)
			.set(auth.field, auth.val)
			.send({ available: true });

		expect(response.statusCode).toEqual(201);
	});
});
