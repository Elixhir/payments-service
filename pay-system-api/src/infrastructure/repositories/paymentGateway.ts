import axios from "axios";
import { PaymentGateway } from "../../domain/repositories/payment";
import { PaymentStatus } from "../../domain/entities/payment";

export class HttpPaymentGateway implements PaymentGateway {
  async process(amount: number): Promise<PaymentStatus> {
    const response = await axios.post(process.env.PAYMENT_SERVICE_URL!, {
      amount,
    });

    return response.data.status;
  }
}
