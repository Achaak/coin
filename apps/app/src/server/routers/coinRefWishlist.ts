import { z } from 'zod';
import { selectCoinRefWishlist } from '../../selector/coinRefWishlist';
import { router, publicProcedure, authProcedure } from './trpc';

export const coinRefWishlistRouter = router({
  /* Get coin ref wishlist by user id */
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

      const RefWishlist = await ctx.prisma.coinRefWishlist.findMany({
        where: { userId: input?.userId ?? session?.user?.id },
        select: selectCoinRefWishlist,
      });

      return RefWishlist;
    }),

  /* Count coin ref wishlist by user id */
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

  /* Count coin ref wishlist by coin ref id */
  countByCoinRefId: publicProcedure
    .input(
      z.object({
        coinRefId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { coinRefId } = input;
      const count = await ctx.prisma.coinRefWishlist.count({
        where: { coinRefId },
      });

      return count;
    }),

  /* Check if coin ref is in wishlist by user id */
  getIsInWishlist: publicProcedure
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

  /* Add or remove coin ref from wishlist */
  addOrRemove: authProcedure
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
