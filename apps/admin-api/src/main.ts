import Fastify from 'fastify';
import { app } from './app/app';

const isGcp = process.env.K_SERVICE !== undefined;
const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.ADMIN_API_PORT ?? process.env.PORT ?? 3000);
const prefix = process.env.ADMIN_API_PREFIX ?? '/api';

// Instantiate Fastify with some config
const server = Fastify({
  logger: true,
  disableRequestLogging: isGcp,
});

// Register your application as a normal plugin.
server.register(app, { prefix });

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  } else {
    console.log(`[ ready ] http://${host}:${port}`);
  }
});
