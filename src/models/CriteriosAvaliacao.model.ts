import { IItemsCriterioAvaliacao } from "./ItemsCriterioAvaliacao.model";

export interface ICriteriosAvaliacao {
    id: string;
    nome: string;
    descricao?: string;
    items_criterios_avaliacao?: Partial<IItemsCriterioAvaliacao>[];
}