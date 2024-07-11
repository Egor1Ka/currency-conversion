import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { fetchRates } from '../../redux/actionCreators';
import getFlagUrl from '../../utils/getFlagUrl';
import { CurrentDate } from '../../components/CurrentDate';
import styles from './styles.module.scss';

export const ExchangeRatesList: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const baseCurrencyFromStore = useSelector(
    (state: RootState) => state.currency.baseCurrency
  );
  const rates = useSelector((state: RootState) => state.currency.rates);
  const [baseCurrency, setBaseCurrency] = useState(
    baseCurrencyFromStore.currency
  );
  const [baseValue, setBaseValue] = useState(baseCurrencyFromStore.value);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const baseCurrencyFromUrl = queryParams.get('baseCurrency');
    const baseValueFromUrl = queryParams.get('baseValue');
    if (baseCurrencyFromUrl) {
      setBaseCurrency(baseCurrencyFromUrl);
      dispatch(fetchRates(baseCurrencyFromUrl));
    } else {
      dispatch(fetchRates(baseCurrencyFromStore.currency));
    }
    if (baseValueFromUrl) {
      setBaseValue(parseFloat(baseValueFromUrl));
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('baseCurrency', baseCurrency);
    queryParams.set('baseValue', baseValue.toString());
    navigate({ search: queryParams.toString() });
  }, [baseCurrency, baseValue, navigate]);

  const handleBaseCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const currency = e.target.value;
    setBaseCurrency(currency);
    dispatch(fetchRates(currency));
  };

  const handleBaseValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setBaseValue(value);
  };

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.style.display = 'none';
    const parent = event.currentTarget.parentElement;
    if (parent) {
      parent.innerHTML = '🚩';
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.card}>
          <CurrentDate />
          <div className={styles.inputContainer}>
            <input
              type='number'
              value={baseValue.toFixed(2)}
              onChange={handleBaseValueChange}
            />

            <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
              {Object.keys(rates).map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Currency</th>
                <th>Rate</th>
                <th>Flag</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(rates).map((currency) => (
                <tr key={currency}>
                  <td>{currency}</td>
                  <td>{rates[currency] * baseValue}</td>
                  <td>
                    <img
                      src={getFlagUrl(currency)}
                      alt={`${currency} flag`}
                      onError={handleImageError}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
