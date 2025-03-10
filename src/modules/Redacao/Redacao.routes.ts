import { FastifyInstance } from "fastify";
import { validateIdExistsByRouteParam, validateParams } from "../../@shared/utils/validate-params";
import { CreateRedacaoData, createRedacaoSchema } from "./Redacao.validator";
import { RedacaoController } from "./Redacao.controller";

export async function RedacaoRoutes(app: FastifyInstance) {

    const redacaoController = new RedacaoController();

    app.post(`/`, { preHandler: [validateParams<CreateRedacaoData>(createRedacaoSchema)] }, async (req, res) => {
        const redacaoBodyData = req.body as CreateRedacaoData;
        const redacao = await redacaoController.create(redacaoBodyData);
        res.status(201).send(redacao);
    });


    app.get(`/:id`, { preHandler: [validateIdExistsByRouteParam(`redacoes`)] }, async (req, res) => {
        const { id } = req.params as { id: string };
        const redacao = await redacaoController.getById(id);
        res.send(redacao);
    })
}