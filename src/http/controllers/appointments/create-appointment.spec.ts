import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { prisma } from '@/lib/prisma';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Create Appointment (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should be able to create an appointment', async () => {
		const { auth } = await getUserToken(app);

		const doctor = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const patient = await prisma.patient.create({
			data: {
				email: 'john@mail.com',
				name: 'John Doe',
				doctorId: doctor.id,
			},
		});

		const response = await request(app.server)
			.post('/appointments')
			.set(auth.field, auth.val)
			.send({
				day: new Date('04-26-2024').toLocaleDateString(),
				doctorId: doctor.id,
				patientId: patient.id,
				status: 'PENDING',
			});

		expect(response.statusCode).toEqual(201);
	});
});
