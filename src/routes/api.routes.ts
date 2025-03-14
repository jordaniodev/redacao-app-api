import { CriteriosAvaliacaoRoutes } from "../modules/CriteriosAvaliacao/CriteriosAvaliacao.routes";
import { RedacaoRoutes } from "../modules/Redacao/Redacao.routes";
import { TemaRoutes } from "../modules/Tema/Tema.routes";
import { UserRoutes } from "../modules/User/User.routes";
  


export default async function (app, options) {
  app.get('/', async () => {
    return { message: 'Hello Redação' };
  });

  app.get('/testApi', async (req, res) => {
    
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
