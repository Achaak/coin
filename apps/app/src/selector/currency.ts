import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createCurrencySelect = <T extends Prisma.CurrencySelect>(
  arg: CheckSelectKeys<T, Prisma.CurrencySelect>
): CheckSelectKeys<T, Prisma.CurrencySelect> => arg;

export const selectCurrency = createCurrencySelect({
  rate: true,
  updated_at: true,
  code: true,
});

export type Currency = Prisma.CurrencyGetPayload<{
  select: typeof selectCurrency;
}>;
