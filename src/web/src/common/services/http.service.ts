"use client";

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosHeaders,
} from "axios";

import Cookies from "js-cookie";

class HttpService {
  // singleton instance of axios
  private static client: AxiosInstance | null = null;

  private static instance: HttpService;

  private baseUrl: string;
  public static accessToken: string = "";

  // constructor
  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL || "";
  }

  public static getInstance(): HttpService {
    if (!HttpService.instance) HttpService.instance = new HttpService();
    HttpService.instance.initClient();
    HttpService.accessToken = Cookies.get("access_token") || "";
    return HttpService.instance;
  }

  public static getClient(): AxiosInstance {
    return HttpService.client != null
      ? HttpService.client
      : HttpService.getInstance().initClient();
  }

  private get http(): AxiosInstance {
    return HttpService.client != null ? HttpService.client : this.initClient();
  }

  private initClient(): AxiosInstance {
    const http = axios.create({
      baseURL: this.baseUrl,
    });

    http.interceptors.request.use(
      (config) => {
        const newConfig: AxiosRequestConfig = config;
        newConfig.headers = { ...newConfig.headers } as AxiosHeaders;
        if (HttpService.accessToken !== "") {
          newConfig.headers = newConfig.headers ?? {};
          // @ts-ignore
          newConfig.headers.Authorization = `Bearer ${HttpService.accessToken}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    return http;
  }

  public static get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return HttpService.getClient().get<T, R>(url, config);
  }

  public static post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return HttpService.getClient().post<T, R>(url, data, config);
  }

  public static put<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return HttpService.getClient().put<T, R>(url, data, config);
  }

  public static delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return HttpService.getClient().delete<T, R>(url, config);
  }

  public static getBaseUrl() {
    return `${HttpService.instance.baseUrl}`;
  }

  public static getFetcher<Type>() {
    const fetcher = (url: string) => {
      const client = HttpService.getClient();

      return client.get(url).then((res) => res.data);
    };

    return fetcher;
  }
}

export default HttpService;
