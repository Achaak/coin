import { z } from 'zod';
import { selectCoinRefWishlist } from '../../selector/coinRefWishlist';
import { router, publicProcedure, protectedProcedure } from './trpc';

export const coinRefWishlistRouter = router({
  byUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const RefWishlist = await ctx.prisma.coinRefWishlist.findMany({
        where: { userId },
        select: selectCoinRefWishlist,
      });

      return RefWishlist;
    }),
  countByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const count = await ctx.prisma.coinRefWishlist.count({
        where: { userId },
      });

      return count;
    }),
  isFavorite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        coinRefId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, coinRefId } = input;
      const count = await ctx.prisma.coinRefWishlist.count({
        where: { userId, coinRefId },
      });

      return count > 0;
    }),
  addOrRemove: protectedProcedure
    .input(
      z.object({
        coinRefId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { coinRefId } = input;
      const userId = ctx.session.user.id;
      const count = await ctx.prisma.coinRefWishlist.count({
        where: { userId, coinRefId },
      });

      if (count > 0) {
        await ctx.prisma.coinRefWishlist.deleteMany({
          where: {
            coinRefId,
            userId,
          },
        });
      } else {
        await ctx.prisma.coinRefWishlist.create({
          data: {
            userId,
            coinRefId,
          },
        });
      }
    }),
});
