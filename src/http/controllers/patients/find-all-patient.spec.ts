import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Find All Patients (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all patients', async () => {
		const { auth } = await getUserToken(app);

		const { id } = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		await prisma.patient.create({
			data: {
				email: 'john@mail.com',
				name: 'John Doe',
				doctorId: id,
			},
		});

		const response = await request(app.server)
			.get('/patients')
			.set(auth.field, auth.val)
			.query({ take: '20', skip: '0' });

		expect(response.statusCode).toEqual(200);
	});
});
