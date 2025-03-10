import { FastifyInstance } from "fastify";

import { IPaginateParams } from "knex-paginate";
import { IZodPaginateParams, paginateValidatorSchema } from "../../@shared/validator/paginate.validator";
import { IUser } from "../../models/User.model";
import { createUserSchema } from "./User.validator";
import { UserController } from "./User.controller";
import { z } from "zod";
import { validateParams } from "../../@shared/utils/validate-params";

const userController = new UserController();



export async function UserRoutes(app: FastifyInstance) {

    app.post(`/`, { preHandler: [validateParams<Omit<IUser, 'id'>>(createUserSchema)]}, async (req, res) => {
        const userRequestBody = req.body as Omit<IUser, 'id'>;
        const user = await userController.firstOrCreate(userRequestBody)
        res.status(201).send(user);
    })

}