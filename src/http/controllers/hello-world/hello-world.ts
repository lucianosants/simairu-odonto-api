import { FastifyReply, FastifyRequest } from 'fastify';

export async function HelloWorld(request: FastifyRequest, reply: FastifyReply) {
	const message = { message: 'Hello World! 03' };

	try {
		return reply.status(200).send(message);
	} catch (error) {
		throw error;
	}
}
