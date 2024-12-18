import Fastify, { FastifyLoggerOptions } from 'fastify';
import { createGcpLoggingPinoConfig } from '@google-cloud/pino-logging-gcp-config';
import { app } from './app/app';

const isGcp = process.env.K_SERVICE !== undefined;
const host = process.env.HOST ?? '0.0.0.0';
const port = Number(process.env.ADMIN_API_PORT ?? process.env.PORT ?? 3000);
const prefix = process.env.ADMIN_API_PREFIX ?? '/api';

// Configure logging
const loggerOptions: FastifyLoggerOptions = {
  level: process.env.LOGGER_LEVEL || 'info',
};

const logger = isGcp
  ? createGcpLoggingPinoConfig(
      {
        serviceContext: {
          service: 'admin-api',
        },
      },
      loggerOptions,
    )
  : loggerOptions;

// Instantiate Fastify with some config
const server = Fastify({
  logger: logger,

  // Disable request logging when running on GCP,
  // since all requests are logged by Cloud Run automatically.
  disableRequestLogging: isGcp,
});

// Add additional error logging for GCP by hooking into the onError lifecycle.
// This is necessary because we disable request logging when running on GCP.
if (isGcp) {
  server.addHook('onError', async (_, __, error) => {
    server.log.error(error);
  });
}

// Register your application as a normal plugin.
server.register(app, { prefix });

// Start listening.
server.listen({ port, host }, (err) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
