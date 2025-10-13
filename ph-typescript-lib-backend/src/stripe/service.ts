import Stripe from "stripe";
import { IService } from "../utils";
import { StripeConstants, STRIPE_DEFAULT_EVENTS } from "./constants";
import {
  IStripeOptions,
  IStripePaymentIntentData,
  IStripePaymentIntentOptions,
  IStripeWebhookData,
} from "./interfaces";

export class StripeService implements IService<IStripeOptions, Stripe> {
  private readonly options: IStripeOptions;
  private readonly client: Stripe;

  constructor(options: IStripeOptions) {
    this.options = options;
    this.client = new Stripe(this.options.secretApiKey, {
      apiVersion: this.options.apiVersion,
    });
  }

  get config(): IStripeOptions {
    return this.options;
  }

  get instance(): Stripe {
    return this.client;
  }

  async test(): Promise<boolean> {
    return await new Promise(async (resolve) => {
      this.client.accounts
        .list({ limit: 1 })
        .then(() => resolve(true))
        .catch(() => resolve(false));
    });
  }

  async createWebhook(
    endpoint: string,
    events?: Stripe.WebhookEndpointCreateParams.EnabledEvent[],
  ): Promise<boolean> {
    const webhookEndpoint = await this.client.webhookEndpoints.create({
      url: endpoint,
      enabled_events: events ? events : STRIPE_DEFAULT_EVENTS,
    });
    return (
      webhookEndpoint && webhookEndpoint.status === StripeConstants.ENABLED
    );
  }

  deleteWebhook(id: string) {
    return this.client.webhookEndpoints.del(id);
  }

  async createOrUpdatePaymentIntent(
    options: IStripePaymentIntentOptions,
  ): Promise<IStripePaymentIntentData> {
    const min = options.min;
    const max = options.max;
    const amountF = parseFloat(options.amount.toString());
    if (amountF < min || amountF > max) {
      return {
        created: false,
        id: "",
        clientSecret: "",
        returnUrl: "",
      };
    }
    let paymentIntent: Stripe.Response<Stripe.PaymentIntent>;
    if (options.paymentIntentId) {
      paymentIntent = await this.client.paymentIntents.update(
        options.paymentIntentId,
        {
          amount: options.amount * 100,
          currency: options.currency,
          metadata: {
            ...options.metadata,
            secretApiKey: this.options.secretApiKey,
            webhookSecret: options.webhookSecret,
          },
          receipt_email: options.receiptEmail,
        },
      );
    } else {
      paymentIntent = await this.client.paymentIntents.create({
        amount: options.amount * 100,
        currency: options.currency,
        metadata: { ...options.metadata },
        payment_method_types: ["card"],
        receipt_email: options.receiptEmail,
      });
    }
    return {
      created: true,
      id: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
      returnUrl: options.returnUrl,
    };
  }

  async cancelPaymentIntent(id: string): Promise<boolean> {
    return (
      (await this.client.paymentIntents.cancel(id)).status ===
      StripeConstants.CANCELED
    );
  }

  async getPaymentIntentFee(id: string): Promise<number> {
    const paymentIntent = await this.client.paymentIntents.retrieve(id, {
      expand: [StripeConstants.FEE_PATH],
    });
    if (paymentIntent?.status !== StripeConstants.SUCCEEDED) return 0;
    const charge = paymentIntent.latest_charge as Stripe.Charge;
    const transaction = charge.balance_transaction as Stripe.BalanceTransaction;
    const feeDetails = transaction.fee_details;
    let sum = 0;
    feeDetails?.forEach((fd) => {
      if (fd.type === StripeConstants.FEE_TYPE) {
        sum += fd.amount / 100;
      }
    });
    return sum;
  }

  async constructEvent(
    signature: string,
    secret: string,
    body: string | Buffer,
  ): Promise<IStripeWebhookData> {
    return (await this.client.webhooks.constructEventAsync(
      body,
      signature,
      secret,
    )) as unknown as IStripeWebhookData;
  }
}
