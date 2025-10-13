import { API_PREFIX, RESTBase } from '../../utils';
import {
  GetPaymentMethodRequest,
  GetPaymentMethodResponse,
  ListPaymentMethodsResponse,
} from './types';

export class PaymentsAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  list(): Promise<ListPaymentMethodsResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/payment_methods`,
      isPublic: false,
    });
  }

  get(request: GetPaymentMethodRequest): Promise<GetPaymentMethodResponse> {
    const { payment_method_id } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/payment_methods/${payment_method_id}`,
      isPublic: false,
    });
  }
}
