import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoin } from '../../selector/coin';
import { router, publicProcedure } from './trpc';

export const coinRouter = router({
  byId: publicProcedure
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
  count: publicProcedure.query(async ({ ctx }) => {
    const count = await ctx.prisma.coin.count();
    return count;
  }),
});
