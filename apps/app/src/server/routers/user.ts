import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUser } from '../../selector/user';
import { router, publicProcedure } from '../routers/trpc';

export const userRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { id },
        select: selectUser,
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No user with id '${id}'`,
        });
      }

      return {
        ...user,
      };
    }),
  coinRankById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;

      console.log('id', id, ctx);
      // TODO

      return 1;
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { query, take = 10 } = input;
      const users = await ctx.prisma.user.findMany({
        where: {
          OR: [
            {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          ],
        },
        select: selectUser,
        take: take > 100 ? 100 : take,
      });

      return users;
    }),
});
