import { Axios, AxiosHeaders } from 'axios';
import { EHttpMethods, EScraperUseForRequests } from '../utils/enums';
import { FetchDetails, TScraperUseForRequests } from '../utils/types';

export class RequestService {
  static send(
    use: TScraperUseForRequests,
    url: string,
    fetching: FetchDetails
  ) {
    if (use === EScraperUseForRequests.AXIOS) {
      const axios = new Axios({});
      switch (fetching.method) {
        case EHttpMethods.GET:
          return axios.get(url, {
            headers: fetching.headers as AxiosHeaders,
          });
        case EHttpMethods.POST:
          return axios.post(url, fetching.body, {
            headers: fetching.headers as AxiosHeaders,
          });
        case EHttpMethods.PUT:
          return axios.put(url, fetching.body, {
            headers: fetching.headers as AxiosHeaders,
          });
      }
    } else if (use === EScraperUseForRequests.FETCH) {
      switch (fetching.method) {
        case EHttpMethods.GET:
          return fetch(url, {
            method: fetching.method,
            headers: fetching.headers,
          });
        case EHttpMethods.POST:
          return fetch(url, {
            method: fetching.method,
            headers: fetching.headers,
            body: JSON.stringify(fetching.body),
          });
        case EHttpMethods.PUT:
          return fetch(url, {
            method: fetching.method,
            headers: fetching.headers,
            body: JSON.stringify(fetching.body),
          });
      }
    }
  }
}
