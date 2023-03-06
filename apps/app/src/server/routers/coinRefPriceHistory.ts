import { z } from 'zod';
import { selectCoinRefPriceHistory } from '../../selector/coinRefPriceHistory';
import { router, publicProcedure } from './trpc';

export const coinRefPriceHistoryRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
        startAt: z.date().optional(),
        endAt: z.date().optional(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, endAt = new Date(), startAt, take = 365 } = input;
      const coinRefPriceHistory = await ctx.prisma.coinRefPriceHistory.findMany(
        {
          where: {
            coinRefId: id,
            created_at: {
              gte: startAt,
              lte: endAt,
            },
          },
          select: selectCoinRefPriceHistory,
          take: take >= 365 ? 365 : take,
          orderBy: {
            created_at: 'asc',
          },
        }
      );

      return coinRefPriceHistory;
    }),
});
