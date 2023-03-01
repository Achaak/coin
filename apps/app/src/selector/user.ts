import type { Prisma } from '@my-coin/database';

import type { CheckSelectKeys } from './types';

const createUserSelect = <T extends Prisma.UserSelect>(
  arg: CheckSelectKeys<T, Prisma.UserSelect>
): CheckSelectKeys<T, Prisma.UserSelect> => arg;

export const selectUser = createUserSelect({
  id: true,
  image: true,
  name: true,
});

export const selectUserFull = createUserSelect({
  ...selectUser,
  email: true,
  emailVerified: true,
});

export type UserFull = Prisma.UserGetPayload<{
  select: typeof selectUserFull;
}>;

export type User = Prisma.UserGetPayload<{
  select: typeof selectUser;
}>;
