import fastify from 'fastify'
import { z } from 'zod';
import apiRoutes from './routes/api.routes';
import webhookRoutes from './routes/webhook.routes';
import fastifyCors from '@fastify/cors';

const api = fastify()

const PORT = process.env.PORT || 3002;

api.register(fastifyCors, {
  origin: '*'
});

api.register(apiRoutes, { prefix: '/api' });

api.register(webhookRoutes, { prefix: '/webhook' });

api.setErrorHandler((err, req, res) => {
  if (err instanceof z.ZodError)
    return res.status(422).send({
      errors: err.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });

  return res.status(err.statusCode || 500).send({ message: err.message });
});

const start = async () => {
  try {
    await api.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

process.on('SIGINT', async () => {
  console.log('Closing server...');
  await api.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing server...');
  await api.close();
  process.exit(0);
});
