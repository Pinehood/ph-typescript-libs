import { Account } from '../../types';

export type GetAccountRequest = {
  account_uuid: string;
};

export type GetAccountResponse = {
  account?: Account;
};

export type ListAccountsRequest = {
  limit?: number;
  cursor?: string;
  retail_portfolio_id?: string;
};

export type ListAccountsResponse = {
  accounts?: Account[];
  has_next: boolean;
  cursor?: string;
  size?: number;
};
