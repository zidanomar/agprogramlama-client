import { useQuery } from '@tanstack/react-query';

import * as API from 'src/api';

export default function useAuth() {
  const { isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: API.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  if (isLoading || error) {
    return { isAuthenticated: false, isLoading: true };
  }

  return { isAuthenticated: true, isLoading: false };
}
