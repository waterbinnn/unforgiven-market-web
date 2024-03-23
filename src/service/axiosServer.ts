import { authOptions } from '@/lib';
import axios from 'axios';
import { getServerSession } from 'next-auth';

export const axiosAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
});

axiosAuth.interceptors.request.use(
  async (request) => {
    const auth_header = request.headers['x-auth-not-required'];

    const session = await getServerSession(authOptions);

    if (auth_header) return request;

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
    const { config } = error;

    return axios(config);
  },
);
