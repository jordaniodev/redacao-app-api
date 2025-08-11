import path from "path";
import { env } from ".";

export default {
    sandbox: true,
    client_id: env.EFI_BANK_API_CLIENT_ID,
    client_secret: env.EFI_BANK_API_CLIENT_SECRET,
    // certificate: env.EFI_BANK_API_ENV === `HMG` ? path.resolve(`certs/redacao-hmg.app.p12`) : path.resolve(`certs/redacao.app.p12`),
};