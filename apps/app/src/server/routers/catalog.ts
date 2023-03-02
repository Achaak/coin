import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCatalog } from '../../selector/catalog';
import { router, publicProcedure } from './trpc';

export const catalogRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const catalog = await ctx.prisma.catalog.findUnique({
        where: { id },
        select: selectCatalog,
      });

      if (!catalog) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No catalog with id '${id}'`,
        });
      }

      return {
        ...catalog,
      };
    }),
  countByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const count = await ctx.prisma.catalog.count({
        where: {
          coinsRef: {
            some: {
              coins: {
                some: {
                  usersCoin: {
                    some: {
                      userId,
                    },
                  },
                },
              },
            },
          },
        },
      });

      return count;
    }),
  countCountryByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const catalogs = await ctx.prisma.catalog.findMany({
        where: {
          coinsRef: {
            some: {
              coins: {
                some: {
                  usersCoin: {
                    some: {
                      userId,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const count = catalogs
        .map((catalog) => catalog.countryCode)
        .filter(
          (countryCode, index, self) => self.indexOf(countryCode) === index
        );
      return count.length;
    }),
  count: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.catalog.count();
    return count;
  }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, take = 10 } = input;
      const catalogs = await ctx.prisma.catalog.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
            {
              countryCode: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: selectCatalog,
        take: take > 100 ? 100 : take,
      });

      return catalogs;
    }),
  getByUserId: publicProcedure
    .input(
      z
        .object({
          userId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { session } = ctx;
      const userId = input?.userId ?? session?.user?.id;

      if (userId === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated or userId is not provided',
        });
      }

      const catalog = await ctx.prisma.userCoin.findMany({
        where: { userId },
        select: {
          coin: {
            select: {
              ref: {
                select: {
                  catalog: {
                    select: selectCatalog,
                  },
                },
              },
            },
          },
        },
      });

      return catalog.map((c) => c.coin.ref.catalog);
    }),
});
