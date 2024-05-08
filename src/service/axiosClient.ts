'use client';

import axios from 'axios';
import { getSession } from 'next-auth/react';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  async (request) => {
    const session = await getSession();

    if (session) {
      request.headers['Authorization'] = `JWT ${session.token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const { config } = error;

    return axios(config);
  },
);
