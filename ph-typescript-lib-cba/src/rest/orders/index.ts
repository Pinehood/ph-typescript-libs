import { API_PREFIX, RESTBase } from '../../utils';
import {
  CancelOrdersRequest,
  CancelOrdersResponse,
  ClosePositionRequest,
  ClosePositionResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  EditOrderPreviewRequest,
  EditOrderPreviewResponse,
  EditOrderRequest,
  EditOrderResponse,
  GetOrderRequest,
  GetOrderResponse,
  ListFillsRequest,
  ListFillsResponse,
  ListOrdersRequest,
  ListOrdersResponse,
  PreviewOrderRequest,
  PreviewOrderResponse,
} from './types';

export class OrdersAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  create(request: CreateOrderRequest): Promise<CreateOrderResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders`,
      bodyParams: request,
      isPublic: false,
    });
  }

  cancel(request: CancelOrdersRequest): Promise<CancelOrdersResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/batch_cancel`,
      bodyParams: request,
      isPublic: false,
    });
  }

  edit(request: EditOrderRequest): Promise<EditOrderResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/edit`,
      bodyParams: request,
      isPublic: false,
    });
  }

  editPreview(
    request: EditOrderPreviewRequest
  ): Promise<EditOrderPreviewResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/edit_preview`,
      bodyParams: request,
      isPublic: false,
    });
  }

  list(request: ListOrdersRequest): Promise<ListOrdersResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/historical/batch`,
      queryParams: request,
      isPublic: false,
    });
  }

  listFills(request: ListFillsRequest): Promise<ListFillsResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/orders/historical/fills`,
      queryParams: request,
      isPublic: false,
    });
  }

  get(request: GetOrderRequest): Promise<GetOrderResponse> {
    const { order_id } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/orders/historical/${order_id}`,
      isPublic: false,
    });
  }

  preview(request: PreviewOrderRequest): Promise<PreviewOrderResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/preview`,
      bodyParams: request,
      isPublic: false,
    });
  }

  closePosition(request: ClosePositionRequest): Promise<ClosePositionResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/orders/close_position`,
      queryParams: undefined,
      bodyParams: request,
      isPublic: false,
    });
  }
}
