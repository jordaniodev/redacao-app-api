import EfiPay from "sdk-node-apis-efi";
import { CriteriosAvaliacaoRoutes } from "./modules/CriteriosAvaliacao/CriteriosAvaliacao.routes";
import { RedacaoRoutes } from "./modules/Redacao/Redacao.routes";
import { TemaRoutes } from "./modules/Tema/Tema.routes";
import { UserRoutes } from "./modules/User/User.routes";
import efiCrendentials from "./env/efiCrendentials";


export default async function (app, options) {
  app.get('/', async () => {
    return { message: 'Hello Redação' };
  });

  app.get('/testApi', async (req, res) => {
    const efiPay = new EfiPay(efiCrendentials)
    try {

      const payment = await efiPay.pixCreateImmediateCharge({}, {
        "calendario": {
          "expiracao": 3600
        },
        "devedor": {
          "cpf": "12345678909",
          "nome": "Francisco da Silva"
        },
        "valor": {
          "original": "124.45"
        },
        "chave": "3",
        "solicitacaoPagador": "Informe o número ou identificador do pedido."
      })

      const qrCode = await efiPay.pixGenerateQRCode({ id: payment.loc.id })
      return qrCode;
    } catch (e) {
      return e;
    }
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
