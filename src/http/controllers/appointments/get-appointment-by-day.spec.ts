import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { getUserToken } from '@/utils/test/get-user-token';
import { prisma } from '@/lib/prisma';

describe('Get Appointment By Day (e2e)', () => {
	beforeAll(async () => app.ready());
	afterAll(async () => app.close());

	it('should get an appointment list by day', async () => {
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
				name: 'John Doe',
				email: 'john@mail.com',
				doctorId: doctor.id,
			},
		});

		await prisma.appointment.create({
			data: {
				day: new Date('04-26-2024').toLocaleDateString(),
				doctor_id: doctor.id,
				patient_id: patient.id,
			},
		});

		const response = await request(app.server)
			.post(`/appointments/day`)
			.set(auth.field, auth.val)
			.send({ day: '4/26/2024', skip: '0', take: '20' });

		expect(response.statusCode).toEqual(200);
	});
});
