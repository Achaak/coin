import type { Prisma } from '@my-coin/database';
import type { CheckSelectKeys } from './types';
import { selectUser } from './user';

const createContactSelect = <T extends Prisma.ContactSelect>(
  arg: CheckSelectKeys<T, Prisma.ContactSelect>
): CheckSelectKeys<T, Prisma.ContactSelect> => arg;

export const selectContact = createContactSelect({
  user: {
    select: selectUser,
  },
  userId: true,
  userContact: {
    select: selectUser,
  },
  userContactId: true,
  created_at: true,
  id: true,
});

export type Contact = Prisma.ContactGetPayload<{
  select: typeof selectContact;
}>;
