import axios, { AxiosInstance } from 'axios';
import { SERVER_BASE_URL } from '../infra/constant';

const hostAddress = SERVER_BASE_URL;

export interface IHttpClientConfig {
  serviceURL?: string;
}

export class HttpClient {
  protected http: AxiosInstance;

  constructor({ serviceURL = '', ...AxiosConfig }: IHttpClientConfig) {
    this.http = axios.create({
      baseURL: `${hostAddress}/${serviceURL}`,
      headers: { 'Content-Type': 'application/json' },
      timeout: 60 * 1000,
      ...AxiosConfig,
    });

    this.http.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      },
    );

    this.http.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        return Promise.reject(error);
      },
    );
  }
}
