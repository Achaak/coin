import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoinRefPriceHistory } from '../../selector/coinRefPriceHistory';
import { router, publicProcedure } from './trpc';

export const coinRefPriceHistoryRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coinRefPriceHistory =
        await ctx.prisma.coinRefPriceHistory.findUnique({
          where: { id },
          select: selectCoinRefPriceHistory,
        });

      if (!coinRefPriceHistory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coinRefPriceHistory with id '${id}'`,
        });
      }

      return coinRefPriceHistory;
    }),
});
