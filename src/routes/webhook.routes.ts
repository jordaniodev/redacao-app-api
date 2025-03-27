import { FastifyInstance } from "fastify";
import { PaymentController } from "../modules/Payment/Payment.controller";
import { ResponsePixPaymentWebhook } from "../modules/Payment/Payment.service.type";

export default async function (app: FastifyInstance) {
  const paymentController = new PaymentController();
   app.post(`/`, async (req, res) => {
      const bodyData = req.body as ResponsePixPaymentWebhook;
      console.log('bodyData', bodyData);
      const paymentData = await paymentController.payRedacao(bodyData.pix[0].txid);
      return res.status(200).send(paymentData);
    })
}
  