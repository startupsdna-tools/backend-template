/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
});

server.listen(3000, () => {
  console.log('Listening at http://localhost:3000');
});
