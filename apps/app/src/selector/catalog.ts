import type { Prisma } from '@my-coin/database';
import { selectCountry } from './country';

import type { CheckSelectKeys } from './types';

const createCatalogSelect = <T extends Prisma.CatalogSelect>(
  arg: CheckSelectKeys<T, Prisma.CatalogSelect>
): CheckSelectKeys<T, Prisma.CatalogSelect> => arg;

export const selectCatalog = createCatalogSelect({
  id: true,
  name: true,
  country: {
    select: selectCountry,
  },
  countryCode: true,
  created_at: true,
  updated_at: true,
});

export type Catalog = Prisma.CatalogGetPayload<{
  select: typeof selectCatalog;
}>;
