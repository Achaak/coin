import { useLocalStorage } from 'usehooks-ts';
import { currencyStore } from '../store/currency';

export const useCurrency = (amount: number | null | undefined) => {
  const [currency] = useLocalStorage('currency', 'USD');

  if (amount === null || amount === undefined) {
    return formatCurrency({ amount: 0, currency }).replaceAll('0', '-');
  }

  return formatCurrency({
    amount: convertUSDToCurrency({ amount, currency }),
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
}) => {
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
