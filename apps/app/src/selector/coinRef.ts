import type { Prisma } from '@my-coin/database';
import { selectCatalog } from './catalog';
import type { CheckSelectKeys } from './types';

const createCoinRefSelect = <T extends Prisma.CoinRefSelect>(
  arg: CheckSelectKeys<T, Prisma.CoinRefSelect>
): CheckSelectKeys<T, Prisma.CoinRefSelect> => arg;

export const selectCoinRef = createCoinRefSelect({
  id: true,
  composition: true,
  created_at: true,
  updated_at: true,
  denomination: true,
  diameter: true,
  edge: true,
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
  catalog: {
    select: selectCatalog,
  },
  catalogId: true,
});

export type CoinRef = Prisma.UserGetPayload<{
  select: typeof selectCoinRef;
}>;
