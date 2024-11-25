import axios, { AxiosResponse } from "axios";

const API_URL = "https://notifymebackend.onrender.com/api/v1";

const getToken = () => localStorage.getItem("token");

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

interface HttpService {
  get: <T>(endpoint: string) => Promise<T>;
  post: <T>(endpoint: string, data: any) => Promise<T>;
  put: <T>(endpoint: string, data: any) => Promise<T>;
  delete: <T>(endpoint: string) => Promise<T>;
}
export let isLoading = false;

const setLoader = (status: boolean) => {
  isLoading = status;
};
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const httpPromise: HttpService = {
  get: async <T>(endpoint: string): Promise<T> => {
    setLoader(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(
        endpoint,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }
  },
  post: async <T>(endpoint: string, data: any): Promise<T> => {
    setLoader(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(
        endpoint,
        data,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }
  },
  put: async <T>(endpoint: string, data: any): Promise<T> => {
    setLoader(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(
        endpoint,
        data,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }
  },
  delete: async <T>(endpoint: string): Promise<T> => {
    setLoader(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(
        endpoint,
        authHeaders()
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`HTTP error! Status: ${error.response?.status}`);
      } else {
        throw new Error("An unexpected error occurred");
      }
    } finally {
      setLoader(false);
    }
  },
};
