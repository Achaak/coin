import { createStore } from 'zustand/vanilla';
import { Currency } from '../selector/currency';
import { trpcProxy } from '../utils/trpc';

const getCurrencies = async () => {
  const res = await trpcProxy.currency.getAll.query();
  return res;
};

type CurrencyState = {
  currencies: Currency[] | null;
  init: () => void;
};
export const currencyStore = createStore<CurrencyState>()((set) => ({
  currencies: null,
  init: async () => {
    const currencies = await getCurrencies();
    set(() => ({
      currencies,
    }));
  },
}));
