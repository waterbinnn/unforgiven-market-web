'use client';

import { useMemo } from 'react';
import { Cookies } from 'react-cookie';

export const useUserType = () => {
  const cookie = useMemo(() => new Cookies(), []);
  const userType = cookie.get('USER_TYPE');
  const removeUserType = cookie.remove('USER_TYPE');

  return {
    userType,
    removeUserType,
  };
};
