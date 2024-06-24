import BaseApi from '@/app/StateManagement/Base';
import { PriceState } from '@/app/Model/Prices';
const asyncGetPrices = async () => {
  try {
    const response = await BaseApi.get<PriceState[]>('/prices.json');
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export { asyncGetPrices };