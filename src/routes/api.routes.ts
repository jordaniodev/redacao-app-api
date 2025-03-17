import { FastifyInstance } from "fastify";
import { CriteriosAvaliacaoRoutes } from "../modules/CriteriosAvaliacao/CriteriosAvaliacao.routes";
import { RedacaoRoutes } from "../modules/Redacao/Redacao.routes";
import { TemaRoutes } from "../modules/Tema/Tema.routes";
import { UserRoutes } from "../modules/User/User.routes";



export default async function (app: FastifyInstance) {
  app.get('/', async () => {
    return { message: 'Hello Redação' };
  });

  app.get('/testApi', async () => {

  });

  app.register(UserRoutes, {
    prefix: '/users'
  });

  app.register(TemaRoutes, {
    prefix: '/temas'
  });

  app.register(RedacaoRoutes, {
    prefix: '/redacoes'
  });

  app.register(CriteriosAvaliacaoRoutes, {
    prefix: '/criterios-avaliacao'
  });

}
