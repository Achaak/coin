import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUserCoinsPriceHistory } from '../../selector/userCoinsPriceHistory';
import { router, publicProcedure } from './trpc';

export const userCoinsPriceHistoryRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const userCoinsPriceHistory =
        await ctx.prisma.userCoinsPriceHistory.findUnique({
          where: { id },
          select: selectUserCoinsPriceHistory,
        });

      if (!userCoinsPriceHistory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No userCoinsPriceHistory with id '${id}'`,
        });
      }

      return userCoinsPriceHistory;
    }),
});
