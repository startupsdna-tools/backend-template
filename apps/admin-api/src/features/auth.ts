/// <reference types="@fastify/sensible" />
import { FastifyRequest } from 'fastify';
import plugin from 'fastify-plugin';
import {
  FirebaseJwtVerifier,
  FirebaseJwtVerifierOptions,
  JWTFirebasePayload,
} from '@app/firebase-jwt';
import { preHandlerMetaHookHandler } from 'fastify/types/hooks';

export const adminAuth = plugin(
  async (fastify, opts: FirebaseJwtVerifierOptions) => {
    const jwtVerifier = new FirebaseJwtVerifier(opts);

    function getTokenFromRequest(request: FastifyRequest) {
      const header = request.headers['authorization'];
      if (!header) {
        throw fastify.httpErrors.unauthorized(
          'Authorization header is missing',
        );
      }

      return header.replace('Bearer ', '');
    }

    async function verifyIdToken(request: FastifyRequest) {
      request.adminUser = await jwtVerifier.verifyIdToken(
        getTokenFromRequest(request),
      );
      return request.adminUser;
    }

    function adminAuth() {
      return fastify.auth([verifyIdToken]);
    }

    fastify.decorate('adminAuth', adminAuth, ['auth']);
    fastify.decorateRequest('adminUser', undefined);
  },
);

declare module 'fastify' {
  interface FastifyInstance {
    /**
     * Handler to authenticate admin users.
     */
    adminAuth: () => preHandlerMetaHookHandler;
  }

  interface FastifyRequest {
    adminUser?: JWTFirebasePayload;
  }
}
