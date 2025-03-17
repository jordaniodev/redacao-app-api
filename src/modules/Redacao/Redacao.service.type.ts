import { IItemsCriterioAvaliacao } from "../../models/ItemsCriterioAvaliacao.model";

export interface RedacaoGenerated {
    items_criterios_avaliacao: Required<Pick<IItemsCriterioAvaliacao , 'id' | 'nota'>>[],
    comentario: string;
}
