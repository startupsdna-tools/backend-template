/**
 * Server entry point for serving the admin UI.
 */
import { dirname } from 'node:path';
import fastify from 'fastify';
import fastifyStatic from '@fastify/static';

const app = fastify();

const root = dirname(new URL(import.meta.url).pathname);
console.log('Serving static files from', root);

app.register(fastifyStatic, {
  root,
});

app.setNotFoundHandler((_, res) => {
  res.sendFile('index.html');
});

const host = '0.0.0.0';
const port = process.env.PORT ?? 3000;

app.listen({ host, port }, (err, address) => {
  if (err) {
    throw err;
  }
  console.log(`Listening at http://localhost:${port}`);
});
