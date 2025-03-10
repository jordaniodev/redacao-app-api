import fastify from 'fastify'
import { UserRoutes } from './modules/User/User.routes';
import apiRoutes from './api.routes';
import { z } from 'zod';
import fs from "fs";
import efiCrendentials from './env/efiCrendentials';

const app = fastify()

const PORT = process.env.PORT || 3002;


app.register(apiRoutes, { prefix: '/api' });

app.setErrorHandler((err, req, res) => {
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
    await app.listen({ port: Number(PORT), host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

process.on('SIGINT', async () => {
  console.log('Closing server...');
  await app.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing server...');
  await app.close();
  process.exit(0);
});
