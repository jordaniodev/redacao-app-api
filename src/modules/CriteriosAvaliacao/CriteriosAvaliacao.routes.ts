import { FastifyInstance } from "fastify";

import { IUser } from "../../models/User.model";
import { z } from "zod";
import { validateIdExistsByRouteParam, validateParams } from "../../@shared/utils/validate-params";
import { CriteriosAvaliacaoController } from "./CriteriosAvaliacao.controller";
import { IZodPaginateParams, paginateValidatorSchema } from "../../@shared/validator/paginate.validator";
import { IPaginateParams } from "knex-paginate";

const criteriosAvaliacaoController = new CriteriosAvaliacaoController();



export async function CriteriosAvaliacaoRoutes(app: FastifyInstance) {
    app.get(`/`, { preHandler: [validateParams<IZodPaginateParams>(paginateValidatorSchema)]}, async (req, res) => {
        const requestParams = req.query as IPaginateParams;
        const temas = await criteriosAvaliacaoController.paginate(requestParams)
        res.send(temas);
    })

    app.get(`/:id`, { preHandler: [validateIdExistsByRouteParam(`criterios_avaliacao`)]} , async (req, res) => {
        const { id } = req.params as { id: string };
        const criterioAvaliacao = await criteriosAvaliacaoController.getById(id);

        if (!criterioAvaliacao) {
            res.status(404).send({ 'message': 'Tema não encontrado' })
            return;
        }
        res.send(criterioAvaliacao);
    })
}