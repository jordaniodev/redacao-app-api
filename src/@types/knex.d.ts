import { Knex } from 'knex'
import { IUser } from '../models/User.model'
import { IRedacao } from '../models/Redacao.model'
import { IUtmTracking } from '../models/UtmTracking.model';
import { ITemas } from '../models/Temas.model';
import { ITextosTemas } from '../models/TextosTemas.model';
import { ICriteriosAvaliacao } from '../models/CriteriosAvaliacao.model';
import { IItemsCriterioAvaliacao } from '../models/ItemsCriterioAvaliacao.model';
import { IItemsAtencao } from '../models/ItemsAtencao.model';
import { IItemsAtencaoRedacao } from '../models/ItemsAtencaoRedacao.model';
import { IRedacaoItemsCriterioAvaliacao } from '../models/RedacaoItemsCriterioAvaliacao.model';


declare module 'knex/types/tables' {
    export interface Tables {
        users: IUser;
        redacoes: IRedacao;
        utm_tracking: IUtmTracking;
        temas: ITemas;
        textos_tema: ITextosTemas;
        criterios_avaliacao: ICriteriosAvaliacao;
        items_criterios_avaliacao: IItemsCriterioAvaliacao;
        items_atencao: IItemsAtencao;
        items_atencao_redacao: IItemsAtencaoRedacao;
        redacoes_items_criterio_avaliacao: IRedacaoItemsCriterioAvaliacao;
    }
}