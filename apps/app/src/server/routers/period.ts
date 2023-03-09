import { z } from 'zod';
import { router, publicProcedure } from './trpc';

export const periodRouter = router({
  /* Count countries by user id */
  countByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;

      const periodCount = await ctx.prisma.period.count({
        where: {
          catalogs: {
            some: {
              coinRefs: {
                some: {
                  coins: {
                    some: {
                      userCoins: {
                        some: {
                          userId,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      return periodCount;
    }),
});
