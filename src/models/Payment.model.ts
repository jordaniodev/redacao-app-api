export interface IPayment {
    id: string;
    created_at: string;
    expires_at?: string;
    paid_at?: string;
    txid?: string;
    code?: string;
    image?: string;
    redacoes_id: string;
    value: number;
}