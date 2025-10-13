import Stripe from "stripe";

export const StripeConstants = {
  TEST_MODE: "test",
  LIVE_MODE: "live",
  API_VERSION: "2025-09-30.clover",
  HEADER_SIGNATURE: "stripe-signature",
  PUBLIC_API_KEY_PREFIX: "pk_",
  SECRET_API_KEY_PREFIX: "sk_",
  RESTRICTED_API_KEY_PREFIX: "rk_",
  FEE_TYPE: "stripe_fee",
  SUCCEEDED: "succeeded",
  CANCELED: "canceled",
  ENABLED: "enabled",
  FEE_PATH: "charges.data.balance_transaction",
} as const;

export const STRIPE_DEFAULT_EVENTS: Stripe.WebhookEndpointCreateParams.EnabledEvent[] =
  [
    "charge.failed",
    "charge.pending",
    "charge.refunded",
    "charge.succeeded",
    "charge.updated",
    "charge.refund.updated",
    "payment_intent.canceled",
    "payment_intent.created",
    "payment_intent.payment_failed",
    "payment_intent.succeeded",
  ];
