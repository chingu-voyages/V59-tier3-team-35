import axios, { AxiosInstance, RawAxiosRequestHeaders } from "axios";

interface ClientOptions {
  baseURL?: string;
  multipart?: boolean;
  extraHeaders?: RawAxiosRequestHeaders;
}

class AxiosClient {
  private instance: AxiosInstance;

  constructor({ baseURL = "", multipart = false, extraHeaders = {} }: ClientOptions = {}) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": multipart ? "multipart/form-data" : "application/json",
        ...extraHeaders,
      },
    });

    this._setInterceptors();
  }

  private _setInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        console.log("error from axios.client: ", error);
        if (error.code === "ERR_NETWORK") {
          error["response"] = {
            data: {
              title: "Network error",
              message: "Please try again later, thank you.",
            },
          };
        }
        return Promise.reject(error);
      }
    );
  }

  get client(): AxiosInstance {
    return this.instance;
  }
}

export const mainClient = new AxiosClient().client;

