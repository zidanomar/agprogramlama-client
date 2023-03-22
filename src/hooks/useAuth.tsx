import { useQuery } from '@tanstack/react-query';
import * as API from 'src/api';

export default function useAuth() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user/auth'],
    queryFn: API.getUserAuth,
  });

  return { data, isLoading, error };
}
