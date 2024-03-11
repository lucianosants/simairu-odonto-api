import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';

import { app } from '@/app';
import { getUserToken } from '@/utils/test/get-user-token';

describe('Register Doctor (e2e)', () => {
	beforeAll(async () => await app.ready());
	afterAll(async () => await app.close());

	it('should be able register a Doctor', async () => {
		const { token } = await getUserToken(app);

		const response = await request(app.server)
			.post('/doctors')
			.set('Authorization', `Bearer ${token}`)
			.send({
				name: 'Hans Chucrutte',
				email: 'hans@email.com',
			});

		expect(response.statusCode).toEqual(201);
	});
});
