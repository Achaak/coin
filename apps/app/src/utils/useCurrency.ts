import { useLocalStorage } from 'usehooks-ts';
import { currencyStore } from '../store/currency';

export const useCurrency = ({
  amount,
  currencyFrom = 'USD',
}: {
  amount: number | null | undefined;
  currencyFrom?: string;
}) => {
  const [currency] = useLocalStorage('currency', 'USD');

  if (amount === null || amount === undefined) {
    return formatCurrency({ amount: 0, currency }).replaceAll('0', '-');
  }

  const amountConverted = convertCurrencyToCurrency({
    amount,
    fromCurrency: currencyFrom,
    toCurrency: currency,
  });

  return formatCurrency({
    amount: amountConverted,
    currency,
  });
};

export const useCurrencyCode = () => {
  const [currency] = useLocalStorage('currency', 'USD');
  return currency;
};

export const convertUSDToCurrency = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}): number => {
  const { currencies } = currencyStore.getState();
  return amount * (currencies?.find((c) => c.code === currency)?.rate ?? 1);
};

export const convertCurrencyToUSD = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  const { currencies } = currencyStore.getState();
  return amount / (currencies?.find((c) => c.code === currency)?.rate ?? 1);
};

export const convertCurrencyToCurrency = ({
  amount,
  fromCurrency,
  toCurrency,
}: {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
}) => {
  const usd = convertCurrencyToUSD({ amount, currency: fromCurrency });
  const currencyAmount = convertUSDToCurrency({
    amount: usd,
    currency: toCurrency,
  });
  return currencyAmount;
};

export const formatCurrency = ({
  amount,
  currency,
  locale = 'en-US',
}: {
  amount: number;
  currency: string;
  locale?: string;
}) => {
  const currencyFormat = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  });

  return currencyFormat.format(amount);
};

export const useCurrencySymbol = () => {
  const [currency] = useLocalStorage('currency', 'USD');
  return formatCurrency({ amount: 0, currency })
    .replaceAll('0', '')
    .replaceAll(' ', '')
    .replaceAll('.', '')
    .replaceAll(',', '');
};
