'use client';

import { useSession } from 'next-auth/react';

export const getUserType = () => {
  const { data: session } = useSession();

  const userType = session?.user_type;

  return {
    userType,
  };
};
