import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUser } from '../../selector/user';
import { router, publicProcedure } from '../routers/trpc';

export const userRouter = router({
  /* Get user by id */
  getById: publicProcedure
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

  /* Get coin rank by user id */
  getCoinRankByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      // eslint-disable-next-line no-console
      console.log('userId', userId, ctx);
      // TODO

      return 1;
    }),

  /* Search users */
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
