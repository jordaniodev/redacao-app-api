import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ITemas } from "../../models/Temas.model";

export const createTemaSchema = z.object({
    nome: z.string(),
    textos_tema: z.array(z.object({
        conteudo: z.string()
    }))
})