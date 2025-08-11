import { IItemsAtencao } from "../../models/ItemsAtencao.model";
import { IItemsCriterioAvaliacao } from "../../models/ItemsCriterioAvaliacao.model";

export interface RedacaoGenerated {
    items_criterios_avaliacao: Required<Pick<IItemsCriterioAvaliacao , 'id' | 'nota'>>[],
    comentario: string;
    items_atencao: Omit<IItemsAtencao, 'id'>[]
}
