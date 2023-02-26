import { prisma } from '.';

import type { User } from '@prisma/client';

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: 'Tim Apple',
    email: 'tim@apple.com',
  },
] as Array<Partial<User>>;

const seed = async (): Promise<void> => {
  try {
    await Promise.all(
      DEFAULT_USERS.map(async (user) =>
        prisma.user
          .upsert({
            where: {
              email: user.email!,
            },
            update: {
              ...user,
            },
            create: {
              email: user.email!,
              name: user.name,
            },
          })
          .then((u) => {
            // eslint-disable-next-line no-console
            console.log(`Created user: ${u.name ?? u.id}`);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
          })
      )
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

void seed();
