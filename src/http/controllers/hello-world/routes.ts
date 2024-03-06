import { FastifyInstance } from 'fastify';
import { HelloWorld } from './hello-world';

export async function helloRoutes(app: FastifyInstance) {
	app.get('/hello', HelloWorld);

	// app.get('/hello', (req, reply) => {
	// 	reply.send({ message: 'Hello World!' });
	// });
}
