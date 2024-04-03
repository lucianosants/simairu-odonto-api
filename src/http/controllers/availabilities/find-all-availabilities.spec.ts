import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';

import { getUserToken } from '@/utils/test/get-user-token';

describe('Find All Availabilities (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all availabilities', async () => {
		const { token } = await getUserToken(app);

		const response = await request(app.server)
			.get('/availabilities')
			.set('Authorization', `Bearer ${token}`)
			.query({ skip: '0', take: '20' });

		console.log(response.body);
		expect(response.statusCode).toEqual(200);
	});
});
