import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrencyState } from '../types/types';

const initialState: CurrencyState = {
  baseCurrency: {
    currency: 'USD',
    value: 0,
  },
  targetCurrency: {
    currency: 'UAH',
    value: 0,
  },
  currencies: [],
  rates: {},
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBaseCurrency(
      state,
      action: PayloadAction<{ currency: string; value: number }>
    ) {
      state.baseCurrency = action.payload;
    },
    setTargetCurrency(
      state,
      action: PayloadAction<{ currency: string; value: number }>
    ) {
      state.targetCurrency = action.payload;
    },
    setCurrencies(state, action: PayloadAction<string[]>) {
      state.currencies = action.payload;
    },
    setRates(state, action: PayloadAction<Record<string, number>>) {
      state.rates = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    calculateValue(state) {
      const rate = state.rates[state.targetCurrency.currency];
      if (rate) {
        state.targetCurrency.value = state.baseCurrency.value * rate;
      }
    },
  },
});

export const {
  setBaseCurrency,
  setTargetCurrency,
  setCurrencies,
  setRates,
  setError,
  calculateValue,
} = currencySlice.actions;

export default currencySlice.reducer;
