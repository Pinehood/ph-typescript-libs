import { API_PREFIX, RESTBase } from '../../utils';
import { Candles, Product, Products } from '../../types';
import {
  GetPublicMarketTradesRequest,
  GetPublicMarketTradesResponse,
  GetPublicProductBookRequest,
  GetPublicProductBookResponse,
  GetPublicProductCandlesRequest,
  GetPublicProductRequest,
  GetServerTimeResponse,
  ListPublicProductsRequest,
} from './types';

export class PublicAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  getServerTime(): Promise<GetServerTimeResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/time`,
      isPublic: true,
    });
  }

  getProductBook(
    request: GetPublicProductBookRequest
  ): Promise<GetPublicProductBookResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/market/product_book`,
      queryParams: request,
      isPublic: true,
    });
  }

  listProducts(request: ListPublicProductsRequest): Promise<Products> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/market/products`,
      queryParams: request,
      isPublic: true,
    });
  }

  getProduct(request: GetPublicProductRequest): Promise<Product> {
    const { product_id } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/market/products/${product_id}`,
      isPublic: true,
    });
  }

  getProductCandles(request: GetPublicProductCandlesRequest): Promise<Candles> {
    const { product_id, ...restOfProps } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/market/products/${product_id}/candles`,
      queryParams: restOfProps,
      isPublic: true,
    });
  }

  getMarketTrades(
    request: GetPublicMarketTradesRequest
  ): Promise<GetPublicMarketTradesResponse> {
    const { product_id, ...restOfProps } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/products/${product_id}/ticker`,
      queryParams: restOfProps,
      isPublic: true,
    });
  }
}
