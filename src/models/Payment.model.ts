export interface IPayment {
    id: string;
    created_at: string;
    expires_at: string;
    code?: string;
    image?: string;
}