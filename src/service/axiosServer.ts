import { authOptions } from '@/lib';

import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const originRes = NextResponse.next();

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

axiosAuth.interceptors.request.use(
  async (request) => {
    const session = await getServerSession(authOptions);

    if (session) {
      request.headers['Authorization'] = `JWT ${session.token}`;
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosAuth.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;

    if (response.status === 401) {
      originRes.cookies.delete('next-auth.session-token');
      return originRes;
    } else {
      // 기타 에러 처리
      return Promise.reject(error);
    }
  },
);
