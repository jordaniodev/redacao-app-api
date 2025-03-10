import { FastifyInstance } from "fastify";
import { TemaController } from "./Tema.controller";
import { IPaginateParams } from "knex-paginate";
import { IZodPaginateParams, paginateValidatorSchema } from "../../@shared/validator/paginate.validator";
import { ITemas } from "../../models/Temas.model";
import { validateIdExistsByRouteParam, validateParams } from "../../@shared/utils/validate-params";
import { createTemaSchema } from "./Tema.validator";

export async function TemaRoutes(app: FastifyInstance) {

    const temaController = new TemaController();

    app.get(`/`, { preHandler: [validateParams<IZodPaginateParams>(paginateValidatorSchema)]}, async (req, res) => {
        const requestParams = req.query as IPaginateParams;
        const temas = await temaController.paginate(requestParams)
        res.send(temas);
    })


    app.get(`/:id`, { preHandler: [validateIdExistsByRouteParam(`temas`)]} ,async (req, res) => {
        const { id } = req.params as { id: string };
        const tema = await temaController.getById(id);
        res.send(tema);
    })

    app.post(`/`, { preHandler: [validateParams<Omit<ITemas, 'id'>>(createTemaSchema)]}, async (req, res) => {
        const temaBodyData = req.body as Omit<ITemas, 'id'>;
        const tema = await temaController.create(temaBodyData);
        res.status(201).send(tema);
    });
}