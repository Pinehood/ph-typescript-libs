import {
  ContractExpiryType,
  ExpiringContractStatus,
  Granularity,
  HistoricalMarketTrade,
  PriceBook,
  ProductType,
} from '../../types';

export type GetBestBidAskRequest = {
  product_ids?: string[];
};

export type GetBestBidAskResponse = {
  pricebooks: PriceBook[];
};

export type GetProductBookRequest = {
  product_id: string;
  limit?: number;
  aggregation_price_increment?: number;
};

export type GetProductBookResponse = {
  pricebook: PriceBook;
  last: string;
  mid_market: string;
  spread_bps: string;
  spread_absolute: string;
};

export type ListProductsRequest = {
  limit?: number;
  offset?: number;
  product_type?: ProductType;
  product_ids?: string[];
  contract_expiry_type?: ContractExpiryType;
  expiring_contract_status?: ExpiringContractStatus;
  get_tradability_status?: boolean;
  get_all_products?: boolean;
};

export type GetProductRequest = {
  product_id: string;
  get_tradability_status?: boolean;
};

export type GetProductCandlesRequest = {
  product_id: string;
  start: string;
  end: string;
  granularity: Granularity;
  limit?: number;
};

export type GetMarketTradesRequest = {
  product_id: string;
  limit: number;
  start?: string;
  end?: string;
};

export type GetMarketTradesResponse = {
  trades?: HistoricalMarketTrade[];
  best_bid?: string;
  best_ask?: string;
};
