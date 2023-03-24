import { useQuery } from '@tanstack/react-query';

import * as API from 'src/api';

export default function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: API.getCurrentUser,
    staleTime: Infinity,
    retry: false,
  });

  return { isAuthenticated: data ? true : false, isLoading };
}
