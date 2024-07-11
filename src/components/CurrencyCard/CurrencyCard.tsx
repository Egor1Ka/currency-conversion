import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../redux/store';
import {
  setBaseCurrency,
  setTargetCurrency,
  calculateValue,
} from '../../redux/currencySlice';
import styles from './styles.module.scss';
import { fetchRates, fetchCurrencies } from '../../redux/actionCreators';
import { CurrentDate } from '../../components/CurrentDate';

export const CurrencyCard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const baseCurrency = useSelector(
    (state: RootState) => state.currency.baseCurrency
  );
  const targetCurrency = useSelector(
    (state: RootState) => state.currency.targetCurrency
  );
  const currencies = useSelector(
    (state: RootState) => state.currency.currencies
  );
  const rates = useSelector((state: RootState) => state.currency.rates);
  const error = useSelector((state: RootState) => state.currency.error);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const baseCurrencyFromUrl = queryParams.get('baseCurrency');
    const targetCurrencyFromUrl = queryParams.get('targetCurrency');
    const baseValueFromUrl = queryParams.get('baseValue');
    const targetValueFromUrl = queryParams.get('targetValue');

    if (baseCurrencyFromUrl) {
      dispatch(
        setBaseCurrency({
          currency: baseCurrencyFromUrl,
          value: baseValueFromUrl
            ? parseFloat(baseValueFromUrl)
            : baseCurrency.value,
        })
      );
    }
    if (targetCurrencyFromUrl) {
      dispatch(
        setTargetCurrency({
          currency: targetCurrencyFromUrl,
          value: targetValueFromUrl
            ? parseFloat(targetValueFromUrl)
            : targetCurrency.value,
        })
      );
    }
    dispatch(fetchCurrencies());
    dispatch(fetchRates(baseCurrencyFromUrl || baseCurrency.currency));
  }, []);

  useEffect(() => {
    updateUrl(
      baseCurrency.currency,
      targetCurrency.currency,
      baseCurrency.value,
      targetCurrency.value
    );
  }, [baseCurrency, targetCurrency]);

  const updateUrl = (
    baseCurrency: string,
    targetCurrency: string,
    baseValue: number,
    targetValue: number
  ) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('baseCurrency', baseCurrency);
    queryParams.set('targetCurrency', targetCurrency);
    queryParams.set('baseValue', baseValue.toString());
    queryParams.set('targetValue', targetValue.toString());
    navigate({ search: queryParams.toString() });
  };

  const handleBaseCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = e.target.value;
    dispatch(setBaseCurrency({ ...baseCurrency, currency }));
    dispatch(fetchRates(currency));
    dispatch(calculateValue());
  };

  const handleBaseCurrencyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch(setBaseCurrency({ ...baseCurrency, value }));
    dispatch(calculateValue());
  };

  const handleTargetCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = e.target.value;
    dispatch(setTargetCurrency({ ...targetCurrency, currency }));
    dispatch(calculateValue());
  };

  const handleTargetCurrencyValueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    dispatch(setTargetCurrency({ ...targetCurrency, value }));
    const rate = rates[targetCurrency.currency];
    if (rate) {
      dispatch(setBaseCurrency({ ...baseCurrency, value: value / rate }));
    } else {
      dispatch(setBaseCurrency({ ...baseCurrency, value: 0 }));
    }
    dispatch(calculateValue());
  };

  const handleSwapCurrencies = () => {
    const newBaseCurrency = targetCurrency.currency;
    const newTargetCurrency = baseCurrency.currency;

    dispatch(setBaseCurrency({ ...baseCurrency, currency: newBaseCurrency }));
    dispatch(
      setTargetCurrency({ ...targetCurrency, currency: newTargetCurrency })
    );
    dispatch(fetchRates(newBaseCurrency));
    dispatch(calculateValue());
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.header}>
            <CurrentDate />
            <span>Currency</span>
          </div>
          <div className={styles.body}>
            <div className={styles.inputContainer}>
              <input
                type='number'
                value={baseCurrency.value.toFixed(2)}
                onChange={handleBaseCurrencyValueChange}
              />
              <select
                value={baseCurrency.currency}
                onChange={handleBaseCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={handleSwapCurrencies}>Swap</button>
            <div className={styles.inputContainer}>
              <input
                type='number'
                value={targetCurrency.value.toFixed(2)}
                onChange={handleTargetCurrencyValueChange}
              />
              <select
                value={targetCurrency.currency}
                onChange={handleTargetCurrencyChange}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </div>
      </div>
    </div>
  );
};
