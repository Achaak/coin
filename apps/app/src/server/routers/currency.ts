import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCurrency } from '../../selector/currency';
import { router, publicProcedure } from './trpc';

export const currencyRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        code: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { code } = input;
      const currency = await ctx.prisma.currency.findUnique({
        where: { code },
        select: selectCurrency,
      });

      if (!currency) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Currency with code ${code} not found`,
        });
      }

      return {
        ...currency,
      };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const currencies = await ctx.prisma.currency.findMany({
      select: selectCurrency,
    });

    return currencies;
  }),
});
