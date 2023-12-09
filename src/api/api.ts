import axios, { AxiosInstance } from 'axios';

const BASE_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPIClient = (): AxiosInstance => (
  axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  })
);
