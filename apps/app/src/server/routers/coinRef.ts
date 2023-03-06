import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoinRef, selectCoinRefFull } from '../../selector/coinRef';
import { router, publicProcedure } from './trpc';

export const coinRefRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coinRef = await ctx.prisma.coinRef.findUnique({
        where: { id },
        select: selectCoinRef,
      });

      if (!coinRef) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin ref with id '${id}'`,
        });
      }

      return {
        ...coinRef,
      };
    }),
  byIdFull: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coinRef = await ctx.prisma.coinRef.findUnique({
        where: { id },
        select: selectCoinRefFull,
      });

      if (!coinRef) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin ref with id '${id}'`,
        });
      }

      return {
        ...coinRef,
      };
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const isNumber = /^\d+$/.test(input.query);

      const { query, take = 10 } = input;
      const coinRefs = await ctx.prisma.coinRef.findMany({
        where: {
          OR: [
            { composition: { contains: query, mode: 'insensitive' } },
            { denomination: { contains: query, mode: 'insensitive' } },
            { obverseCreator: { contains: query, mode: 'insensitive' } },
            { reverseCreator: { contains: query, mode: 'insensitive' } },
            {
              coins: {
                some: {
                  OR: [
                    ...(isNumber
                      ? [
                          {
                            year: {
                              equals: parseInt(query, 10),
                            },
                          },
                        ]
                      : []),
                  ],
                },
              },
            },
          ],
        },
        take: take > 100 ? 100 : take,
        select: selectCoinRef,
      });

      return coinRefs;
    }),
  rarityById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const coinRef = await ctx.prisma.coinRef.findUnique({
        where: { id },
        select: {
          catalogId: true,
        },
      });

      const countByUserCoinOfCatalog = await ctx.prisma.userCoin.groupBy({
        where: {
          coin: {
            ref: {
              catalogId: coinRef?.catalogId,
            },
          },
        },
        _count: {
          coinId: true,
        },
        by: ['userId'],
      });

      const countCoinOfCatalog = countByUserCoinOfCatalog.reduce(
        (acc, cur) => acc + cur._count.coinId,
        0
      );

      if (countCoinOfCatalog === 0) {
        return 0;
      }

      const countByUserCoin = await ctx.prisma.userCoin.groupBy({
        where: {
          coin: {
            ref: {
              id,
            },
          },
        },
        _count: {
          coinId: true,
        },
        by: ['userId'],
      });

      const countCoin = countByUserCoin.reduce(
        (acc, cur) => acc + cur._count.coinId,
        0
      );

      const rarity = countCoin / countCoinOfCatalog;

      return Math.round(rarity * 10) / 10;
    }),
  priceById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const price = await ctx.prisma.coinRefPriceHistory.findMany({
        where: {
          coinRefId: id,
        },
        orderBy: {
          created_at: 'desc',
        },
        select: {
          price: true,
        },
      });

      if (price.length === 0) {
        return null;
      }

      return Math.round(price[0].price * 100) / 100;
    }),
});
