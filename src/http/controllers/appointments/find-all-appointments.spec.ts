import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { prisma } from '@/lib/prisma';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Find All Appointments (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all appointments', async () => {
		const { auth } = await getUserToken(app);

		const doctor = await prisma.doctor.create({
			data: {
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
				available: true,
			},
		});

		const patients = await prisma.patient.create({
			data: {
				name: 'Linus Torvalds',
				email: 'linus_t@mail.com',
				doctorId: doctor.id,
			},
		});

		await prisma.appointment.create({
			data: {
				day: new Date('04-26-2024').toLocaleDateString(),
				doctor_id: doctor.id,
				patient_id: patients.id,
			},
		});

		const response = await request(app.server)
			.get('/appointments')
			.set(auth.field, auth.val)
			.query({ skip: '0', take: '20' });

		expect(response.statusCode).toEqual(200);
	});
});
