import { FETCH_CURRENCIES, FETCH_RATES } from './actionTypes';

export const fetchCurrencies = () => ({ type: FETCH_CURRENCIES });
export const fetchRates = (payload?: string) => ({
  type: FETCH_RATES,
  payload,
});
