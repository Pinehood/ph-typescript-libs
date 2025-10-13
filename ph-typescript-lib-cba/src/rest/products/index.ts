import { API_PREFIX, RESTBase } from '../../utils';
import { Candles, Product, Products } from '../../types';
import {
  GetBestBidAskRequest,
  GetBestBidAskResponse,
  GetMarketTradesRequest,
  GetMarketTradesResponse,
  GetProductBookRequest,
  GetProductBookResponse,
  GetProductCandlesRequest,
  GetProductRequest,
  ListProductsRequest,
} from './types';

export class ProductsAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  getBestBidAsk(request: GetBestBidAskRequest): Promise<GetBestBidAskResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/best_bid_ask`,
      queryParams: request,
      isPublic: false,
    });
  }

  getBook(request: GetProductBookRequest): Promise<GetProductBookResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/product_book`,
      queryParams: request,
      isPublic: false,
    });
  }

  list(request: ListProductsRequest): Promise<Products> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/products`,
      queryParams: request,
      isPublic: false,
    });
  }

  get(request: GetProductRequest): Promise<Product> {
    const { product_id, ...restOfRequest } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/products/${product_id}`,
      queryParams: restOfRequest,
      isPublic: false,
    });
  }

  getCandles(request: GetProductCandlesRequest): Promise<Candles> {
    const { product_id, ...restOfRequest } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/products/${product_id}/candles`,
      queryParams: restOfRequest,
      isPublic: false,
    });
  }

  getMarketTrades(
    request: GetMarketTradesRequest
  ): Promise<GetMarketTradesResponse> {
    const { product_id, ...restOfRequest } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/products/${product_id}/ticker`,
      queryParams: restOfRequest,
      isPublic: false,
    });
  }
}
