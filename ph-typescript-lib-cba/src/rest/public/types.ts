import {
  ContractExpiryType,
  ExpiringContractStatus,
  HistoricalMarketTrade,
  PriceBook,
  ProductType,
} from '../../types';

export type GetServerTimeResponse = {
  iso?: string;
  epoch_seconds?: number;
  epoch_millis?: number;
};

export type GetPublicProductBookRequest = {
  product_id: string;
  limit?: number;
  aggregation_price_increment?: number;
};

export type GetPublicProductBookResponse = {
  pricebook: PriceBook;
  last: string;
  mid_market: string;
  spread_bps: string;
  spread_absolute: string;
};

export type ListPublicProductsRequest = {
  limit?: number;
  offset?: number;
  product_type?: ProductType;
  product_ids?: string[];
  contract_expiry_type?: ContractExpiryType;
  expiring_contract_status?: ExpiringContractStatus;
  get_all_products?: boolean;
};

export type GetPublicProductRequest = {
  product_id: string;
};

export type GetPublicProductCandlesRequest = {
  product_id: string;
  start: string;
  end: string;
  granularity: string;
  limit?: number;
};

export type GetPublicMarketTradesRequest = {
  product_id: string;
  limit: number;
  start?: string;
  end?: string;
};

export type GetPublicMarketTradesResponse = {
  trades?: HistoricalMarketTrade[];
  best_bid?: string;
  best_ask?: string;
};
