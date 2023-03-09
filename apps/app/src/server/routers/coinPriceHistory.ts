import { z } from 'zod';
import { selectCoinPriceHistory } from '../../selector/coinPriceHistory';
import { router, publicProcedure } from './trpc';

export const coinPriceHistoryRouter = router({
  /* Get coin price history by coin id */
  getByCoinId: publicProcedure
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
      const coinPriceHistory = await ctx.prisma.coinPriceHistory.findMany({
        where: {
          coinId: id,
          created_at: {
            gte: startAt,
            lte: endAt,
          },
        },
        select: selectCoinPriceHistory,
        take: take >= 365 ? 365 : take,
        orderBy: {
          created_at: 'asc',
        },
      });

      return coinPriceHistory;
    }),
});
