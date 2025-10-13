import { RatConvertTrade, TradeIncentiveMetadata } from '../../types';

export type CreateConvertQuoteRequest = {
  from_account: string;
  to_account: string;
  amount: string;
  trade_incentive_metadata?: TradeIncentiveMetadata;
};

export type CreateConvertQuoteResponse = {
  trade?: RatConvertTrade;
};

export type GetConvertTradeRequest = {
  trade_id: string;
  from_account: string;
  to_account: string;
};

export type GetConvertTradeResponse = {
  trade?: RatConvertTrade;
};

export type CommitConvertTradeRequest = {
  trade_id: string;
  from_account: string;
  to_account: string;
};

export type CommitConvertTradeResponse = {
  trade?: RatConvertTrade;
};
