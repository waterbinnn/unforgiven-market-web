'use client';

import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

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
    const { response } = error;

    if (response.status === 401) {
      // 토큰 만료로 인한 401 오류인 경우 로그아웃
      signOut();
    }
    return Promise.reject(error);
  },
);
