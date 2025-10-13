import Stripe from "stripe";

export interface IStripeOptions {
  apiVersion: Stripe.LatestApiVersion;
  secretApiKey: string;
  publicApiKey?: string;
  isLive?: boolean;
}

export interface IStripePaymentIntentOptions {
  paymentIntentId?: string;
  webhookSecret?: string;
  receiptEmail: string;
  returnUrl: string;
  currency: string;
  amount: number;
  min: number;
  max: number;
  metadata: any;
}

export interface IStripePaymentIntentData {
  created: boolean;
  id: string;
  clientSecret: string;
  returnUrl: string;
}

export interface IStripeWebhookData {
  id: string;
  type: string;
  object: string;
  api_version: string;
  created: number;
  data: {
    object: IStripePaymentIntent | IStripeCharge;
  };
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string;
    idempotency_key: string;
  };
}

export interface IStripeCharge {
  id: string;
  object: string;
  amount: number;
  amount_captured: number;
  amount_refunded: number;
  balance_transaction: string;
  billing_details: {
    address: {
      city: string;
      country: string;
      line1: string;
      line2: string;
      postal_code: string;
      state: string;
    };
    email: string;
    name: string;
    phone: string;
  };
  calculated_statement_descriptor: string;
  captured: boolean;
  created: number;
  currency: string;
  customer: string;
  description: string;
  destination: string;
  dispute: string;
  disputed: boolean;
  failure_balance_transaction: string;
  failure_code: string;
  failure_message: string;
  fraud_details: any;
  invoice: any;
  livemode: boolean;
  metadata: any;
  on_behalf_of: any;
  order: any;
  outcome: {
    network_status: string;
    reason: string;
    risk_level: string;
    risk_score: number;
    seller_message: string;
    type: string;
  };
  paid: boolean;
  payment_intent: string;
  payment_method: string;
  payment_method_details: {
    card: {
      brand: string;
      checks: {
        address_line1_check: string;
        address_postal_code_check: string;
        cvc_check: string;
      };
      country: string;
      exp_month: number;
      exp_year: number;
      fingerprint: string;
      funding: string;
      installments: any;
      last4: string;
      mandate: any;
      network: string;
      three_d_secure: any;
      wallet: any;
    };
    type: "card";
  };
  receipt_email: string;
  receipt_number: any;
  receipt_url: string;
  refunded: boolean;
  refunds: {
    object: string;
    data: any[];
    has_more: boolean;
    url: string;
  };
  review: any;
  shipping: any;
  source: any;
  source_transfer: any;
  statement_descriptor: string;
  statement_descriptor_suffix: string;
  status: string;
  transfer_data: any;
  transfer_group: any;
}

export interface IStripePaymentIntent {
  id: string;
  object: string;
  amount: number;
  client_secret: string;
  created: number;
  currency: string;
  flow: string;
  livemode: boolean;
  metadata: any;
  owner: {
    adress: string;
    email: string;
    name: string;
    phone: string;
    verified_address: string;
    verified_email: string;
    verified_name: string;
    verified_phone: string;
  };
  redirect: {
    failure_reason: string;
    return_url: string;
    status: string;
    url: string;
  };
  sofort: {
    country: string;
    bank_code: string;
    bank_name: string;
    bic: string;
    iban_last4: string;
    statement_descriptor: string;
    preferred_language: string;
  };
  statement_descriptor: string;
  status: string;
  type: string;
  usage: string;
}
