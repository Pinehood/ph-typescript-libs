import { Portfolio, PortfolioBreakdown, PortfolioType } from '../../types';

export type ListPortfoliosRequest = {
  portfolio_type?: PortfolioType;
};

export type ListPortfoliosResponse = {
  portfolios?: Portfolio[];
};

export type CreatePortfolioRequest = {
  name: string;
};

export type CreatePortfolioResponse = {
  portfolio?: Portfolio;
};

export type MovePortfolioFundsRequest = {
  funds: Record<string, any>;
  source_portfolio_uuid: string;
  target_portfolio_uuid: string;
};

export type MovePortfolioFundsResponse = {
  source_portfolio_uuid?: string;
  target_portfolio_uuid?: string;
};

export type GetPortfolioBreakdownRequest = {
  portfolio_uuid: string;
  currency?: string;
};

export type GetPortfolioBreakdownResponse = {
  breakdown?: PortfolioBreakdown;
};

export type DeletePortfolioRequest = {
  portfolio_uuid: string;
};

export type DeletePortfolioResponse = Record<string, never>;

export type EditPortfolioRequest = {
  portfolio_uuid: string;
  name: string;
};

export type EditPortfolioResponse = {
  portfolio?: Portfolio;
};
