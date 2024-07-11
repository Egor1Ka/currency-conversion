export interface PreserveQueryLinkProps {
  to: string;
  children: React.ReactNode;
}

export interface CurrencyState {
  baseCurrency: {
    value: number;
    currency: string;
  };
  targetCurrency: {
    value: number;
    currency: string;
  };
  currencies: string[];
  rates: Record<string, number>;
  error: string | null;
}
