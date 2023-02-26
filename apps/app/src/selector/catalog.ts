import type { Prisma } from '@my-coin/database';
import { selectCoin } from './coin';

import type { CheckSelectKeys } from './types';

const createCatalogSelect = <T extends Prisma.CatalogSelect>(
  arg: CheckSelectKeys<T, Prisma.CatalogSelect>
): CheckSelectKeys<T, Prisma.CatalogSelect> => arg;

export const selectCatalog = createCatalogSelect({
  id: true,
  name: true,
});

export type Catalog = Prisma.UserGetPayload<{
  select: typeof selectCatalog;
}>;

export const selectCatalogWithCoins = createCatalogSelect({
  ...selectCatalog,
  coins: {
    select: selectCoin,
  },
});

export type CatalogWithCoins = Prisma.UserGetPayload<{
  select: typeof selectCatalogWithCoins;
}>;
