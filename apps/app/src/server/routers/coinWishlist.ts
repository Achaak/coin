import { z } from 'zod';
import { selectCoinWishlist } from '../../selector/coinWishlist';
import { router, publicProcedure, protectedProcedure } from './trpc';

export const coinWishlistRouter = router({
  byUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const wishlist = await ctx.prisma.coinWishlist.findMany({
        where: { userId },
        select: selectCoinWishlist,
      });

      return wishlist;
    }),
  countByUserId: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const count = await ctx.prisma.coinWishlist.count({
        where: { userId },
      });

      return count;
    }),
  isFavorite: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { userId, coinId } = input;
      const count = await ctx.prisma.coinWishlist.count({
        where: { userId, coinId },
      });

      return count > 0;
    }),
  addOrRemove: protectedProcedure
    .input(
      z.object({
        coinId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { coinId } = input;
      const userId = ctx.session.user.id;
      const count = await ctx.prisma.coinWishlist.count({
        where: { userId, coinId },
      });

      if (count > 0) {
        await ctx.prisma.coinWishlist.deleteMany({
          where: {
            coinId,
            userId,
          },
        });
      } else {
        await ctx.prisma.coinWishlist.create({
          data: {
            userId,
            coinId,
          },
        });
      }
    }),
});
