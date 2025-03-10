import { ITextosTemas } from "./TextosTemas.model";

export interface ITemas {
    id: string;
    nome: string;
    is_custom?: boolean;
    textos_tema?: Partial<ITextosTemas>[]
}