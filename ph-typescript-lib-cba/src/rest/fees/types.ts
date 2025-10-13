import { ContractExpiryType, ProductType, ProductVenue } from '../../types';

export type GetTransactionsSummaryRequest = {
  product_type?: ProductType;
  contract_expiry_type?: ContractExpiryType;
  product_venue?: ProductVenue;
};

export type GetTransactionsSummaryResponse = {
  total_volume: number;
  total_fees: number;
  fee_tier: Record<string, any>;
  margin_rate?: Record<string, any>;
  goods_and_services_tax?: Record<string, any>;
  advanced_trade_only_volumes?: number;
  advanced_trade_only_fees?: number;
  coinbase_pro_volume?: number;
  coinbase_pro_fees?: number;
  total_balance?: string;
  has_promo_fee?: boolean;
};
