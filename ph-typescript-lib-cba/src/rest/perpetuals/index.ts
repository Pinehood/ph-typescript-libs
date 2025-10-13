import { API_PREFIX, RESTBase } from '../../utils';
import {
  AllocatePortfolioRequest,
  AllocatePortfolioResponse,
  GetPerpetualsPortfolioSummaryRequest,
  GetPerpetualsPortfolioSummaryResponse,
  GetPerpetualsPositionRequest,
  GetPerpetualsPositionResponse,
  GetPortfolioBalancesRequest,
  GetPortfolioBalancesResponse,
  ListPerpetualsPositionsRequest,
  ListPerpetualsPositionsResponse,
  OptInOutMultiAssetCollateralRequest,
  OptInOutMultiAssetCollateralResponse,
} from './types';

export class PerpetualsAPI extends RESTBase {
  constructor(
    key?: string | undefined,
    secret?: string | undefined,
    sandbox?: boolean | undefined,
    logger?: (message: string) => void
  ) {
    super(key, secret, sandbox, logger);
  }

  allocate(
    request: AllocatePortfolioRequest
  ): Promise<AllocatePortfolioResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/intx/allocate`,
      bodyParams: request,
      isPublic: false,
    });
  }

  getSummary(
    request: GetPerpetualsPortfolioSummaryRequest
  ): Promise<GetPerpetualsPortfolioSummaryResponse> {
    const { portfolio_uuid } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/intx/portfolio/${portfolio_uuid}`,
      isPublic: false,
    });
  }

  listPositions(
    request: ListPerpetualsPositionsRequest
  ): Promise<ListPerpetualsPositionsResponse> {
    const { portfolio_uuid } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/intx/positions/${portfolio_uuid}`,
      isPublic: false,
    });
  }

  getPosition(
    request: GetPerpetualsPositionRequest
  ): Promise<GetPerpetualsPositionResponse> {
    const { portfolio_uuid, symbol } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/intx/positions/${portfolio_uuid}/${symbol}`,
      isPublic: false,
    });
  }

  getBalances(
    request: GetPortfolioBalancesRequest
  ): Promise<GetPortfolioBalancesResponse> {
    const { portfolio_uuid } = request;
    return this.request({
      method: 'GET',
      endpoint: `${API_PREFIX}/intx/balances/${portfolio_uuid}`,
      isPublic: false,
    });
  }

  optInOutMultiAssetCollateral(
    request: OptInOutMultiAssetCollateralRequest
  ): Promise<OptInOutMultiAssetCollateralResponse> {
    return this.request({
      method: 'POST',
      endpoint: `${API_PREFIX}/intx/multi_asset_collateral`,
      bodyParams: request,
      isPublic: false,
    });
  }
}
