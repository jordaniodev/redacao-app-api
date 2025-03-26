import fastify from 'fastify'
import { z } from 'zod';
import apiRoutes from './routes/api.routes';
import webhookRoutes from './routes/webhook.routes';
import fastifyCors from '@fastify/cors';
import fs from 'fs';
import path from 'path';

const httpsOptions = {
  cert: fs.readFileSync(path.resolve(`src/certs/cert.pem`)),
  key: fs.readFileSync(path.resolve(`src/certs/private.pem`)),
  ca: fs.readFileSync(path.resolve(`src/certs/certificate-chain-homolog.crt`)),
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: true,
};

const api = fastify()

const webhook = fastify({
  https: {
    cert: fs.readFileSync(path.resolve(`src/certs/cert.pem`)),
    key: fs.readFileSync(path.resolve(`src/certs/private.pem`)),
    ca: fs.readFileSync(path.resolve(`src/certs/certificate-chain-homolog.crt`)),
    rejectUnauthorized: true,
    requestCert: true,
    minVersion: "TLSv1.2",
  }
})

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
    await webhook.listen({ port: 3003, host: '0.0.0.0' });
    console.log(`Server running on http://localhost:${PORT} and 3003`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();

process.on('SIGINT', async () => {
  console.log('Closing server...');
  await api.close();
  await webhook.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing server...');
  await api.close();
  await webhook.close();
  process.exit(0);
});
