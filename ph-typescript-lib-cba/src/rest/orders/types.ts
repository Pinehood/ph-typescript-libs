import {
  CancelOrderObject,
  ContractExpiryType,
  MarginType,
  Order,
  OrderConfiguration,
  OrderPlacementSource,
  OrderSide,
  ProductType,
  SortBy,
} from '../../types';

export type CreateOrderRequest = {
  client_order_id: string;
  product_id: string;
  side: OrderSide;
  order_configuration: OrderConfiguration;
  self_trade_prevention_id?: string;
  leverage?: string;
  margin_type?: MarginType;
  retail_portfolio_id?: string;
};

export type CreateOrderResponse = {
  success: boolean;
  success_response: Partial<Order> & { [key: string]: any };
  order_configuration?: OrderConfiguration;
  error_response: Partial<Order> & { [key: string]: any };
  failure_reason?: Record<string, any>;
};

export type CancelOrdersRequest = {
  order_ids: string[];
};

export type CancelOrdersResponse = {
  results?: CancelOrderObject[];
};

export type EditOrderRequest = {
  order_id: string;
  price?: string;
  size?: string;
};

export type EditOrderResponse = {
  success: boolean;
  response?:
    | { success_response: Record<string, any> }
    | { error_response: Record<string, any> };
  errors?: Record<string, any>[];
};

export type EditOrderPreviewRequest = {
  order_id: string;
  price?: string;
  size?: string;
};

export type EditOrderPreviewResponse = {
  errors: Record<string, any>[];
  slippage?: string;
  order_total?: string;
  commission_total?: string;
  quote_size?: string;
  base_size?: string;
  best_bid?: string;
  average_filled_price?: string;
};

export type ListOrdersRequest = {
  order_ids?: string[];
  product_ids?: string[];
  order_status?: string[];
  limit?: number;
  start_date?: string;
  end_date?: string;
  order_type?: string;
  order_side?: OrderSide;
  cursor?: string;
  product_type?: ProductType;
  order_placement_source?: OrderPlacementSource;
  contract_expiry_type?: ContractExpiryType;
  asset_filters?: string[];
  retail_portfolio_id?: string;
  time_in_forces?: string;
  sort_by?: SortBy;
};

export type ListOrdersResponse = {
  orders: Order[];
  sequence?: number;
  has_next: boolean;
  cursor?: string;
};

export type ListFillsRequest = {
  order_ids?: string[];
  trade_ids?: string[];
  product_ids?: string[];
  start_sequence_timestamp?: string;
  end_sequence_timestamp?: string;
  retail_portfolio_id?: string;
  limit?: number;
  cursor?: string;
  sort_by?: SortBy;
};

export type ListFillsResponse = {
  fills?: Record<string, any>[];
  cursor?: string;
};

export type GetOrderRequest = {
  order_id: string;
};

export type GetOrderResponse = {
  order?: Order;
};

export type PreviewOrderRequest = {
  product_id: string;
  side: OrderSide;
  order_configuration: OrderConfiguration;
  leverage?: string;
  margin_type?: MarginType;
  retail_portfolio_id?: string;
};

export type PreviewOrderResponse = {
  order_total: string;
  commission_total: string;
  errs: Record<string, any>[];
  warning: Record<string, any>[];
  quote_size: string;
  base_size: string;
  best_bid: string;
  best_ask: string;
  is_max: boolean;
  order_margin_total?: string;
  leverage?: string;
  long_leverage?: string;
  short_leverage?: string;
  slippage?: string;
  preview_id?: string;
  current_liquidation_buffer?: string;
  projected_liquidation_buffer?: string;
  max_leverage?: string;
  pnl_configuration?: Record<string, any>;
};

export type ClosePositionRequest = {
  client_order_id: string;
  product_id: string;
  size?: string;
};

export type ClosePositionResponse = {
  success: boolean;
  response?:
    | { success_response: Record<string, any> }
    | { error_response: Record<string, any> };
  order_configuration?: OrderConfiguration;
};
