import { z } from 'zod';
import { selectUserCoinsPriceHistory } from '../../selector/userCoinsPriceHistory';
import { router, publicProcedure } from './trpc';

export const userCoinsPriceHistoryRouter = router({
  /* Get userCoinsPriceHistory by id */
  getByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        startAt: z.date().optional(),
        endAt: z.date().optional(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, endAt = new Date(), startAt, take = 365 } = input;

      const userCoinsPriceHistory =
        await ctx.prisma.userCoinsPriceHistory.findMany({
          where: {
            userId,
            created_at: {
              gte: startAt,
              lte: endAt,
            },
          },
          take: take >= 365 ? 365 : take,
          orderBy: {
            created_at: 'asc',
          },
          select: selectUserCoinsPriceHistory,
        });

      return userCoinsPriceHistory;
    }),
});
