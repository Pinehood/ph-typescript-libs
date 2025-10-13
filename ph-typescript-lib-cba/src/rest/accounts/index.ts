import { API_PREFIX, RESTBase } from '../../utils';
import {
  GetAccountRequest,
  GetAccountResponse,
  ListAccountsRequest,
  ListAccountsResponse,
} from './types';

export class AccountsAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  get(request: GetAccountRequest): Promise<GetAccountResponse> {
    const { account_uuid } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/accounts/${account_uuid}`,
      isPublic: false,
    });
  }

  list(request: ListAccountsRequest): Promise<ListAccountsResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/accounts`,
      queryParams: request,
      isPublic: false,
    });
  }
}
