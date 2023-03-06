import { CoinCondition, PrismaClient } from '@my-coin/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUserCoin } from '../../selector/userCoin';
import { router, publicProcedure, authProcedure } from './trpc';

const updateCoinPriceHistory = async (
  ctx: {
    prisma: PrismaClient;
  },
  coinId: string
) => {
  const coinsPriceAvg = await ctx.prisma.userCoin.groupBy({
    by: ['coinId'],
    where: { coinId },
    _avg: {
      price: true,
    },
  });

  const avgPrice = coinsPriceAvg[0]._avg.price;

  if (avgPrice !== null) {
    const coinPriceHistory = await ctx.prisma.coinPriceHistory.findMany({
      where: {
        coinId,
        created_at: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    });

    if (coinPriceHistory.length === 0) {
      await ctx.prisma.coinPriceHistory.create({
        data: {
          coinId,
          price: avgPrice,
        },
      });
    } else {
      await ctx.prisma.coinPriceHistory.update({
        where: { id: coinPriceHistory[0].id },
        data: {
          price: avgPrice,
        },
      });
    }
  }
};

const updateCoinRefPriceHistory = async (
  ctx: {
    prisma: PrismaClient;
  },
  coinRefId: string
) => {
  const coinRefPriceAvg = await ctx.prisma.coinRef.findUnique({
    where: { id: coinRefId },
    select: {
      id: true,
      coins: {
        select: {
          usersCoin: {
            select: {
              price: true,
            },
          },
        },
      },
    },
  });

  if (!coinRefPriceAvg) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No coinRef with id '${coinRefId}'`,
    });
  }

  const sum = coinRefPriceAvg.coins.reduce(
    (acc, coin) =>
      acc +
      coin.usersCoin.reduce(
        (acc2, userCoin) => acc2 + (userCoin.price ?? 0),
        0
      ),
    0
  );
  const count = coinRefPriceAvg.coins.reduce(
    (acc, coin) => acc + coin.usersCoin.length,
    0
  );
  const avgPrice = sum / count;

  const coinRefPriceHistory = await ctx.prisma.coinRefPriceHistory.findMany({
    where: {
      coinRefId,
      created_at: {
        gte: new Date(new Date().setHours(0, 0, 0, 0)),
        lte: new Date(new Date().setHours(23, 59, 59, 999)),
      },
    },
  });

  if (coinRefPriceHistory.length === 0) {
    await ctx.prisma.coinRefPriceHistory.create({
      data: {
        coinRefId,
        price: avgPrice,
      },
    });
  } else {
    await ctx.prisma.coinRefPriceHistory.update({
      where: { id: coinRefPriceHistory[0].id },
      data: {
        price: avgPrice,
      },
    });
  }
};

export const userCoinRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, userId } = input;
      const { session } = ctx;

      const userIdRes = userId ?? session?.user?.id;

      if (userIdRes === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated or userId is not provided',
        });
      }

      const userCoin = await ctx.prisma.userCoin.findMany({
        where: { id, userId: userIdRes },
        select: selectUserCoin,
      });

      if (!userCoin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      return userCoin[0];
    }),
  byCoinId: publicProcedure
    .input(
      z.object({
        coinId: z.string(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { coinId, userId } = input;
      const { session } = ctx;

      const userIdRes = userId ?? session?.user?.id;

      if (userIdRes === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated or userId is not provided',
        });
      }

      const userCoin = await ctx.prisma.userCoin.findMany({
        where: { coinId, userId: userIdRes },
        select: selectUserCoin,
      });

      if (!userCoin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${coinId}'`,
        });
      }

      return userCoin;
    }),
  remove: authProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const userCoin = await ctx.prisma.userCoin.findUnique({
        where: { id },
        select: selectUserCoin,
      });

      if (!userCoin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      await ctx.prisma.userCoin.delete({
        where: { id },
      });

      return {
        ...userCoin,
      };
    }),
  add: authProcedure
    .input(
      z.object({
        comment: z.string().optional().nullable(),
        price: z.number().optional().nullable(),
        condition: z.nativeEnum(CoinCondition),
        exchangeable: z.boolean(),
        coinId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { comment, price, condition, exchangeable, coinId } = input;
      const { user } = ctx.session;

      if (user?.id === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated',
        });
      }

      const userCoin = await ctx.prisma.userCoin.create({
        data: {
          comment,
          price,
          condition,
          exchangeable,
          coinId,
          userId: user.id,
        },
        select: selectUserCoin,
      });

      // Update coin price history
      if (userCoin.price !== null) {
        void updateCoinPriceHistory(ctx, coinId);
        void updateCoinRefPriceHistory(ctx, userCoin.coin.ref.id);
      }

      return {
        ...userCoin,
      };
    }),
  update: authProcedure
    .input(
      z.object({
        id: z.string(),
        comment: z.string().optional().nullable(),
        price: z.number().optional().nullable(),
        condition: z.nativeEnum(CoinCondition),
        exchangeable: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, comment, price, condition, exchangeable } = input;
      const { user } = ctx.session;

      if (user?.id === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated',
        });
      }

      const userCoin = await ctx.prisma.userCoin.update({
        where: { id },
        data: {
          comment,
          price,
          condition,
          exchangeable,
        },
        select: selectUserCoin,
      });

      // Update coin price history
      if (userCoin.price !== null) {
        void updateCoinPriceHistory(ctx, userCoin.coinId);
        void updateCoinRefPriceHistory(ctx, userCoin.coin.ref.id);
      }

      return {
        ...userCoin,
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

      const count = await ctx.prisma.userCoin.count({
        where: { userId },
      });

      return count;
    }),
  lastByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, take = 10 } = input;

      const userCoin = await ctx.prisma.userCoin.findMany({
        where: { userId },
        orderBy: { created_at: 'desc' },
        select: selectUserCoin,
        take: take && take > 100 ? 100 : take,
      });

      return userCoin;
    }),
  count: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.userCoin.count();

    return count;
  }),
  getByCatalogIdAndUserId: publicProcedure
    .input(
      z.object({
        catalogId: z.string(),
        userId: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { catalogId, userId } = input;
      const { session } = ctx;

      const userIdRes = userId ?? session?.user?.id;

      if (userIdRes === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated or userId is not provided',
        });
      }

      const userCoins = await ctx.prisma.userCoin.findMany({
        where: {
          userId: userIdRes,
          coin: {
            ref: {
              catalogId,
            },
          },
        },
        select: selectUserCoin,
      });

      return userCoins;
    }),
  countByCoinIdAndUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, coinId } = input;

      const count = await ctx.prisma.userCoin.count({
        where: { userId, coinId },
      });

      return count;
    }),
  countUsersHasCoins: publicProcedure
    .input(
      z.object({
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { coinId } = input;

      const usersHasCoins = await ctx.prisma.userCoin.groupBy({
        by: ['userId'],
        where: { coinId },
      });

      return usersHasCoins.length;
    }),
  countUsersHasCoinsRef: publicProcedure
    .input(
      z.object({
        coinRefId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { coinRefId } = input;

      const usersHasCoins = await ctx.prisma.userCoin.groupBy({
        by: ['userId'],
        where: { coin: { refId: coinRefId } },
      });

      return usersHasCoins.length;
    }),
});
