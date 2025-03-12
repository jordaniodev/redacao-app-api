import { ICriteriosAvaliacao } from "./CriteriosAvaliacao.model";
import { IRedacaoItemsCriterioAvaliacao } from "./RedacaoItemsCriterioAvaliacao.model";
import { ITemas } from "./Temas.model";

export interface IRedacao {
    id: string;
    users_id: string;
    criterios_avaliacao_id?: string | null;
    criterio_avaliacao?: Omit<ICriteriosAvaliacao, 'id'> | null;
    temas_id?: string | null;
    tema?: Omit<ITemas, 'id'> | null;
    nota?: number;
    conteudo?: string;
    comentario?: string;
    finished?: boolean;
    redacoes_items_criterio_avaliacao?: Omit<IRedacaoItemsCriterioAvaliacao, 'id'>[];

}