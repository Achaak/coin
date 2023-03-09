import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCatalog } from '../../selector/catalog';
import { router, publicProcedure } from './trpc';

export const catalogRouter = router({
  /* Get all catalogs */
  getAll: publicProcedure.query(async ({ ctx }) => {
    const catalogs = await ctx.prisma.catalog.findMany({
      select: selectCatalog,
    });

    return catalogs;
  }),

  /* Get category by id */
  getById: publicProcedure
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

  /* Get catalogs by user id */
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

  /* Get catalogs in wishlist of coins and coins ref by user id */
  getWishlistByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const catalog = await ctx.prisma.catalog.findMany({
        where: {
          OR: [
            {
              coinRefs: {
                some: {
                  wishlist: {
                    some: {
                      userId,
                    },
                  },
                },
              },
            },
            {
              coinRefs: {
                some: {
                  coins: {
                    some: {
                      wishlist: {
                        some: {
                          userId,
                        },
                      },
                    },
                  },
                },
              },
            },
          ],
        },
        select: selectCatalog,
      });

      return catalog;
    }),

  /* Count catalogs */
  count: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.catalog.count();
    return count;
  }),

  /* Count catalogs by user id */
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
          coinRefs: {
            some: {
              coins: {
                some: {
                  userCoins: {
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

  /* Search catalogs */
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
              period: {
                name: {
                  contains: query,
                  mode: 'insensitive',
                },
              },
            },
          ],
        },
        select: selectCatalog,
        take: take > 100 ? 100 : take,
      });

      return catalogs;
    }),
});
