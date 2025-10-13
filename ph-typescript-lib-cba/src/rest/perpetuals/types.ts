import {
  PerpetualPortfolio,
  PortfolioBalance,
  PortfolioSummary,
  Position,
  PositionSummary,
} from '../../types';

export type AllocatePortfolioRequest = {
  portfolio_uuid: string;
  symbol: string;
  amount: string;
  currency: string;
};

export type AllocatePortfolioResponse = Record<string, never>;

export type GetPerpetualsPortfolioSummaryRequest = {
  portfolio_uuid: string;
};

export type GetPerpetualsPortfolioSummaryResponse = {
  portfolios?: PerpetualPortfolio[];
  summary?: PortfolioSummary;
};

export type ListPerpetualsPositionsRequest = {
  portfolio_uuid: string;
};

export type ListPerpetualsPositionsResponse = {
  positions?: Position[];
  summary?: PositionSummary;
};

export type GetPerpetualsPositionRequest = {
  portfolio_uuid: string;
  symbol: string;
};

export type GetPerpetualsPositionResponse = {
  position?: Position;
};

export type GetPortfolioBalancesRequest = {
  portfolio_uuid: string;
};

export type GetPortfolioBalancesResponse = {
  portfolio_balancces?: PortfolioBalance[];
};

export type OptInOutMultiAssetCollateralRequest = {
  portfolio_uuid?: string;
  multi_asset_collateral_enabled?: boolean;
};

export type OptInOutMultiAssetCollateralResponse = {
  cross_collateral_enabled?: boolean;
};
