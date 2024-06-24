import { asyncGetPrices } from '@/app/StateManagement/Service/Prices';
import { useQuery } from '@tanstack/react-query';

const useGetPrices = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['prices'],
    queryFn: () => {
      return asyncGetPrices()
    }
  });
  return { data, isError, isLoading };
};

export default useGetPrices;