import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  setCurrencies,
  setRates,
  setError,
  calculateValue,
} from './currencySlice';
import { RootState } from './store';
import { FETCH_CURRENCIES, FETCH_RATES } from './actionTypes';

function* fetchCurrenciesSaga(): Generator<any, any, any> {
  try {
    const response: AxiosResponse = yield call(
      axios.get,
      'https://api.exchangerate-api.com/v4/latest/USD'
    );
    const currencies = Object.keys(response.data.rates);
    yield put(setCurrencies(currencies));
  } catch (error) {
    yield put(setError('Failed to fetch currencies'));
  }
}

function* fetchRatesSaga(action: {
  type: string;
  payload?: string;
}): Generator<any, any, any> {
  try {
    const baseCurrency: string =
      action.payload ||
      (yield select(
        (state: RootState) => state.currency.baseCurrency.currency
      ));
    const response: AxiosResponse = yield call(
      axios.get,
      `https://api.exchangerate-api.com/v4/latest/${baseCurrency}`
    );
    yield put(setRates(response.data.rates));
    yield put(calculateValue());
  } catch (error) {
    yield put(setError('Failed to fetch rates'));
  }
}

export default function* rootSaga() {
  yield takeEvery(FETCH_CURRENCIES, fetchCurrenciesSaga);
  yield takeEvery(FETCH_RATES, fetchRatesSaga);
}
