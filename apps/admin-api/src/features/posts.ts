import { FastifyInstance } from 'fastify';

type GetOneParams = {
  id: string;
};

export default async function (fastify: FastifyInstance) {
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'Content 1',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'Content 2',
    },
  ];

  fastify.get('/posts', async function () {
    return { data: posts, total: posts.length };
  });

  fastify.get<{
    Params: GetOneParams;
  }>('/posts/:id', async function (request) {
    const id = Number(request.params.id);
    const post = posts.find((p) => p.id === id);
    return { data: post };
  });
}
