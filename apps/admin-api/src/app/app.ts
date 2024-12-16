import * as path from 'path';
import { FastifyInstance } from 'fastify';
import AutoLoad from '@fastify/autoload';
import { fastifyAuth } from '@fastify/auth';
import { adminAuth } from '../features/auth';
import posts from '../features/posts';

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: { ...opts },
  });
  fastify.register(fastifyAuth);
  fastify.register(adminAuth, {
    projectId: process.env.ADMIN_AUTH_PROJECT_ID,
    tenantId: process.env.ADMIN_AUTH_TENANT_ID,
  });

  // Public routes
  fastify.get('/', () => ({ message: 'works' }));

  // Protected routes
  fastify.register(async (fastify) => {
    // This hook will ensure that the request is authenticated
    fastify.addHook('onRequest', fastify.adminAuth());
    // Feature routes
    fastify.register(posts);
  });
}
