import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoinPriceHistory } from '../../selector/coinPriceHistory';
import { router, publicProcedure } from './trpc';

export const coinPriceHistoryRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coinPriceHistory = await ctx.prisma.coinPriceHistory.findUnique({
        where: { id },
        select: selectCoinPriceHistory,
      });

      if (!coinPriceHistory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No userCoinsPriceHistory with id '${id}'`,
        });
      }

      return coinPriceHistory;
    }),
});
