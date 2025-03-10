import path from "path";
import { env } from ".";

console.log(env.EFI_BANK_API_ENV);
export default {
    sandbox: true,
    client_id: env.EFI_BANK_API_CLIENT_ID,
    client_secret: env.EFI_BANK_API_CLIENT_SECRET,
    certificate: env.EFI_BANK_API_ENV === `HMG` ? path.resolve(`src/certs/redacao-hmg.app.p12`) : path.resolve(`../certs/redacao.app.p12`),
};