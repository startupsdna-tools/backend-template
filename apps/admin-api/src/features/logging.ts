import { FastifyInstance } from 'fastify';

// Endpoints to test logging configured for Google Cloud Logging
export function logging(fastify: FastifyInstance) {
  fastify.get('/logging/debug', async () => {
    fastify.log.debug(
      { additional: 'data' },
      'This is a debug log with additional data',
    );
    return { message: 'Logged debug' };
  });
  fastify.get('/logging/info', async () => {
    fastify.log.info('This is an info log');
    return { message: 'Logged info' };
  });
  fastify.get('/logging/warn', async () => {
    fastify.log.warn('This is a warn log');
    return { message: 'Logged warn' };
  });
  fastify.get('/logging/error', async () => {
    fastify.log.error(new Error('Test error'));
    return { message: 'Logged error' };
  });
  fastify.get('/logging/fatal', async () => {
    fastify.log.fatal(new Error('Test error'));
    return { message: 'Logged fatal' };
  });
  fastify.get('/logging/exception', async () => {
    throw new Error('Test exception');
  });
}
