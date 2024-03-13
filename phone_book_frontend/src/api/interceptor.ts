/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

export const http = axios.create();

http.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  config.baseURL = 'http://127.0.0.1:8000/';

  // config.headers['Content-Type'] = 'application/json'
  //   const token = localStorage.getItem('token') || '';
  //   if (token) {
  //     config.headers.Authorization = 'Token ' + token;
  //   }
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError | any) => {
    if (
      error?.response?.status === 403 &&
      !error?.request?.responseURL.includes('/user/api/v1/user_detail')
    ) {
      return (window.location.href = window.location.origin + '/signup');
    }
    if (
      error?.request?.responseURL.includes('/user/api/v1/user_detail') &&
      (error?.response?.status === 500 || error?.response?.status === 401)
    )
      return;
    if (error?.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = window.location.origin;
      return;
    }
    if (error?.response?.data?.message)
      toast.error(error?.response?.data?.message);
    else toast.error('Some unknown error has occured');
  }
);
