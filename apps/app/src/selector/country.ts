import type { Prisma } from '@my-coin/database';
import type { CheckSelectKeys } from './types';

const createCountrySelect = <T extends Prisma.CountrySelect>(
  arg: CheckSelectKeys<T, Prisma.CountrySelect>
): CheckSelectKeys<T, Prisma.CountrySelect> => arg;

export const selectCountry = createCountrySelect({
  code: true,
  name: true,
});

export type Country = Prisma.CountryGetPayload<{
  select: typeof selectCountry;
}>;
