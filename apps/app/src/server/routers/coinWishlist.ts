import { z } from 'zod';
import { selectCoinWishlist } from '../../selector/coinWishlist';
import { router, publicProcedure, authProcedure } from './trpc';

export const coinWishlistRouter = router({
  /* Get coin wishlist by user id */
  getByUserId: publicProcedure
    .input(
      z
        .object({
          userId: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const { session } = ctx;

      const wishlist = await ctx.prisma.coinWishlist.findMany({
        where: { userId: input?.userId ?? session?.user?.id },
        select: selectCoinWishlist,
      });

      return wishlist;
    }),

  /* Count coin wishlist by user id */
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

  /* Count coin wishlist by coin id */
  countByCoinId: publicProcedure
    .input(
      z.object({
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { coinId } = input;
      const count = await ctx.prisma.coinWishlist.count({
        where: { coinId },
      });

      return count;
    }),

  /* Check if coin is in wishlist by user id */
  getIsInWishlist: publicProcedure
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

  /* Add or remove coin from wishlist */
  addOrRemove: authProcedure
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
