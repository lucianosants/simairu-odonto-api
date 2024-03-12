import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Find All Doctors (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able to find all and show Doctors', async () => {
		const { token } = await getUserToken(app);

		const response = await request(app.server)
			.get('/doctors')
			.set('Authorization', `Bearer ${token}`)
			.query({ take: 2, skip: 0 });

		expect(response.statusCode).toEqual(200);
	});
});
