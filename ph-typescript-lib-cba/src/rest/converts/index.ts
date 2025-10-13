import { API_PREFIX, RESTBase } from '../../utils';
import {
  CommitConvertTradeRequest,
  CommitConvertTradeResponse,
  CreateConvertQuoteRequest,
  CreateConvertQuoteResponse,
  GetConvertTradeRequest,
  GetConvertTradeResponse,
} from './types';

export class ConvertsAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  createQuote(
    request: CreateConvertQuoteRequest
  ): Promise<CreateConvertQuoteResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/convert/quote`,
      bodyParams: request,
      isPublic: false,
    });
  }

  getTrade(request: GetConvertTradeRequest): Promise<GetConvertTradeResponse> {
    const { trade_id, ...restOfRequest } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/convert/trade/${trade_id}`,
      queryParams: restOfRequest,
      isPublic: false,
    });
  }

  commitTrade(
    request: CommitConvertTradeRequest
  ): Promise<CommitConvertTradeResponse> {
    const { trade_id, ...restOfRequest } = request;
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/convert/trade/${trade_id}`,
      bodyParams: restOfRequest,
      isPublic: false,
    });
  }
}
