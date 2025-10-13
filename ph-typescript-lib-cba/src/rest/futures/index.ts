import { API_PREFIX, RESTBase } from '../../utils';
import {
  CancelPendingFuturesSweep,
  GetCurrentMarginWindowRequest,
  GetCurrentMarginWindowResponse,
  GetFuturesBalanceSummaryResponse,
  GetFuturesPositionRequest,
  GetFuturesPositionResponse,
  GetIntradayMarginSettingResponse,
  ListFuturesPositionsResponse,
  ListFuturesSweepsResponse,
  ScheduleFuturesSweepRequest,
  ScheduleFuturesSweepResponse,
  SetIntradayMarginSettingRequest,
  SetIntradayMarginSettingResponse,
} from './types';

export class FuturesAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  getBalanceSummary(): Promise<GetFuturesBalanceSummaryResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/balance_summary`,
      isPublic: false,
    });
  }

  getIntradayMarginSetting(): Promise<GetIntradayMarginSettingResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/intraday/margin_setting`,
      isPublic: false,
    });
  }

  setIntradayMarginSetting(
    request: SetIntradayMarginSettingRequest
  ): Promise<SetIntradayMarginSettingResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/cfm/intraday/margin_setting`,
      bodyParams: request,
      isPublic: false,
    });
  }

  getCurrentMarginWindow(
    request: GetCurrentMarginWindowRequest
  ): Promise<GetCurrentMarginWindowResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/intraday/current_margin_window`,
      queryParams: request,
      isPublic: false,
    });
  }

  listPositions(): Promise<ListFuturesPositionsResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/positions`,
      isPublic: false,
    });
  }

  getPosition(
    request: GetFuturesPositionRequest
  ): Promise<GetFuturesPositionResponse> {
    const { product_id } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/positions/${product_id}`,
      isPublic: false,
    });
  }

  scheduleSweep(
    request: ScheduleFuturesSweepRequest
  ): Promise<ScheduleFuturesSweepResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/cfm/sweeps/schedule`,
      bodyParams: request,
      isPublic: false,
    });
  }

  listSweeps(): Promise<ListFuturesSweepsResponse> {
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/cfm/sweeps`,
      isPublic: false,
    });
  }

  cancelPendingSweep(): Promise<CancelPendingFuturesSweep> {
    return this.request({
      method: 'DELETE',
      endpoint: `${API_PREFIX}/cfm/sweeps`,
      isPublic: false,
    });
  }
}
