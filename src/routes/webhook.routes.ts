import { FastifyInstance } from "fastify";

export default async function (app: FastifyInstance) {
  app.post('/', async (req, res) => {
    return res.status(200).send();
  });
  app.post('pix', async (req, res) => {
    return res.status(200).send();
  });
}
  