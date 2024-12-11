/**
 * Server entry point for serving the admin UI.
 */
import * as http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, world!');
});

server.listen(process.env.PORT ?? 3000, () => {
  console.log('Listening at http://localhost:3000');
});
