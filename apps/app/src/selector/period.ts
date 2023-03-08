import type { Prisma } from '@my-coin/database';
import type { CheckSelectKeys } from './types';

const createPeriodSelect = <T extends Prisma.PeriodSelect>(
  arg: CheckSelectKeys<T, Prisma.PeriodSelect>
): CheckSelectKeys<T, Prisma.PeriodSelect> => arg;

export const selectPeriod = createPeriodSelect({
  id: true,
  name: true,
  flag: true,
  yearEnd: true,
  yearStart: true,
});

export type Period = Prisma.PeriodGetPayload<{
  select: typeof selectPeriod;
}>;
