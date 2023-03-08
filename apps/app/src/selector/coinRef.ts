import type { Prisma } from '@my-coin/database';
import { selectCatalog } from './catalog';
import { selectCoin, selectCoinLow } from './coin';
import type { CheckSelectKeys } from './types';

const createCoinRefSelect = <T extends Prisma.CoinRefSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinRefSelect>
): CheckSelectKeys<T, Prisma.CoinRefSelect> => arg;

export const selectCoinRef = createCoinRefSelect({
  id: true,
  composition: true,
  created_at: true,
  updated_at: true,
  value: true,
  valueShort: true,
  diameter: true,
  edgeDescription: true,
  edgeType: true,
  edgeImage: true,
  demonetized: true,
  alignment: true,
  weight: true,
  observeImage: true,
  obverseCreator: true,
  obverseDescription: true,
  reverseCreator: true,
  reverseDescription: true,
  thickness: true,
  type: true,
  reverseImage: true,
  shape: true,
  catalogId: true,
});

export type CoinRef = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRef;
}>;

export const selectCoinRefWithCatalog = createCoinRefSelect({
  ...selectCoinRef,
  catalog: {
    select: selectCatalog,
  },
});

export type CoinRefWithCatalog = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRefWithCatalog;
}>;

export const selectCoinRefWithCoins = createCoinRefSelect({
  ...selectCoinRef,
  coins: {
    select: selectCoin,
  },
});

export type CoinRefWithCoins = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRefWithCoins;
}>;

export const selectCoinRefFull = createCoinRefSelect({
  ...selectCoinRef,
  catalog: {
    select: selectCatalog,
  },
  coins: {
    select: selectCoin,
  },
});

export type CoinRefFull = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRefFull;
}>;

export const selectCoinRefLow = createCoinRefSelect({
  id: true,
  type: true,
  catalogId: true,
});

export type CoinRefLow = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRefLow;
}>;

export const selectCoinRefLowWithCoin = createCoinRefSelect({
  id: true,
  type: true,
  catalogId: true,
  coins: {
    select: selectCoinLow,
  },
});

export type CoinRefLowWithCoin = Prisma.CoinRefGetPayload<{
  select: typeof selectCoinRefLowWithCoin;
}>;
