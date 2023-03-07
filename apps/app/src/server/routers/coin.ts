import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoin } from '../../selector/coin';
import { selectCoinFull } from '../../selector/coinFull';
import { router, publicProcedure } from './trpc';

export const coinRouter = router({
  /* Get coins by ids */
  getById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coin = await ctx.prisma.coin.findUnique({
        where: { id },
        select: selectCoin,
      });

      if (!coin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      return {
        ...coin,
      };
    }),

  /* Get coins with full data by ids */
  getByIdFull: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coin = await ctx.prisma.coin.findUnique({
        where: { id },
        select: selectCoinFull,
      });

      if (!coin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      return {
        ...coin,
      };
    }),

  /* Get coins by catalog id */
  getByCatalogId: publicProcedure
    .input(
      z.object({
        catalogId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { catalogId } = input;

      const coins = await ctx.prisma.coin.findMany({
        where: {
          ref: {
            catalogId,
          },
        },
        select: selectCoinFull,
      });

      return coins;
    }),

  /* Get coins in wishlist by user id and catalog id */
  getWishlistByUserIdAndCatalogId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        catalogId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, catalogId } = input;

      const coins = await ctx.prisma.coin.findMany({
        where: {
          wishlist: {
            some: {
              userId,
            },
          },
          ref: {
            catalogId,
          },
        },
        select: selectCoinFull,
      });

      return coins;
    }),

  /* Count all coins */
  count: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.coin.count();
    return count;
  }),

  /* Get rarity of coin by id */
  getRarityById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const coin = await ctx.prisma.coin.findUnique({
        where: { id },
        select: {
          ref: {
            select: {
              catalogId: true,
            },
          },
        },
      });

      const countByUserCoinOfCatalog = await ctx.prisma.userCoin.groupBy({
        where: {
          coin: {
            ref: {
              catalogId: coin?.ref.catalogId,
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
        where: { coinId: id },
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

  /* Get price of coin by id */
  getPriceById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      const price = await ctx.prisma.coinPriceHistory.findMany({
        where: {
          coinId: id,
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
