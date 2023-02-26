import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCatalog } from '../../selector/catalog';
import { router, publicProcedure } from './trpc';

export const catalogRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const catalog = await ctx.prisma.catalog.findUnique({
        where: { id },
        select: selectCatalog,
      });

      if (!catalog) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No catalog with id '${id}'`,
        });
      }

      return {
        ...catalog,
      };
    }),
});
