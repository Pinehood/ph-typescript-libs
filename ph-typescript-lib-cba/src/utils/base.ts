import { BASE_SANDBOX_URL, BASE_URL, USER_AGENT } from './constants';
import { token } from './token';
import { handleException } from './errors';
import { RequestOptions } from '../types/request';

export class RESTBase {
  private readonly apiKey: string | undefined;
  private readonly apiSecret: string | undefined;
  private readonly isSandbox: boolean | undefined;
  private readonly logger: (message: string) => void | undefined;

  constructor(
    key?: string,
    secret?: string,
    sandbox?: boolean,
    logger?: (message: string) => void
  ) {
    this.apiKey = key;
    this.apiSecret = secret;
    this.isSandbox = sandbox || false;
    this.logger = logger;
  }

  request(options: RequestOptions): Promise<any> {
    const { method, endpoint, isPublic } = options;
    let { queryParams, bodyParams } = options;
    queryParams = queryParams ? this.filter(queryParams) : {};
    if (bodyParams !== undefined) {
      bodyParams = bodyParams ? this.filter(bodyParams) : {};
    }
    return this.prepare(
      method,
      endpoint,
      queryParams,
      bodyParams,
      isPublic,
      this.isSandbox
    );
  }

  private prepare(
    httpMethod: string,
    urlPath: string,
    queryParams?: Record<string, any>,
    bodyParams?: Record<string, any>,
    isPublic?: boolean,
    isSandbox?: boolean
  ) {
    const headers = this.headers(httpMethod, urlPath, isPublic, isSandbox);
    const queryString = this.query(queryParams);
    const url = `https://${isSandbox ? BASE_SANDBOX_URL : BASE_URL}${urlPath}${queryString}`;
    const requestOptions = {
      method: httpMethod,
      body: JSON.stringify(bodyParams),
      url,
    };
    this.logger?.(
      `[${Date.now()}] Request '${httpMethod} ${urlPath}'\n${JSON.stringify(requestOptions)}`
    );
    return this.send({ ...requestOptions, headers });
  }

  private async send(requestOptions: any) {
    const response = await fetch(requestOptions.url, requestOptions);
    const responseText = await response.text();
    this.logger?.(
      `[${Date.now()}] Response for previous '${requestOptions.method}' request\n${responseText}`
    );
    handleException(response, responseText, response.statusText);
    return JSON.parse(responseText);
  }

  private headers(
    httpMethod: string,
    urlPath: string,
    isPublic?: boolean,
    isSandbox?: boolean
  ) {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'User-Agent': USER_AGENT,
    };
    if (this.apiKey !== undefined && this.apiSecret !== undefined) {
      headers['Authorization'] =
        `Bearer ${token(httpMethod, urlPath, this.apiKey, this.apiSecret, isSandbox || false)}`;
    } else if (isPublic == undefined || isPublic == false) {
      throw new Error(
        'Attempting to access authenticated endpoint with invalid API_KEY or API_SECRET.'
      );
    }
    return headers;
  }

  private filter(data: Record<string, any>) {
    const filteredParams: Record<string, any> = {};
    for (const key in data) {
      if (data[key] !== undefined) {
        filteredParams[key] = data[key];
      }
    }
    return filteredParams;
  }

  private query(queryParams?: Record<string, any>): string {
    if (!queryParams || Object.keys(queryParams).length === 0) {
      return '';
    }
    const queryString = Object.entries(queryParams)
      .flatMap(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map(
            (item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
          );
        } else {
          return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }
      })
      .join('&');
    return `?${queryString}`;
  }
}
