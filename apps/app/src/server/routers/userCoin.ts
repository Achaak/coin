import { ConditionCoin } from '@my-coin/database';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectUserCoin } from '../../selector/userCoin';
import { router, publicProcedure, protectedProcedure } from './trpc';

export const userCoinRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const userCoin = await ctx.prisma.userCoin.findUnique({
        where: { id },
        select: selectUserCoin,
      });

      if (!userCoin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      return {
        ...userCoin,
      };
    }),
  remove: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const userCoin = await ctx.prisma.userCoin.findUnique({
        where: { id },
        select: selectUserCoin,
      });

      if (!userCoin) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin with id '${id}'`,
        });
      }

      await ctx.prisma.userCoin.delete({
        where: { id },
      });

      return {
        ...userCoin,
      };
    }),
  add: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        price: z.number(),
        condition: z.nativeEnum(ConditionCoin),
        exchangeable: z.boolean(),
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { comment, price, condition, exchangeable, coinId } = input;
      const { user } = ctx.session;

      if (user?.id === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated',
        });
      }

      const userCoin = await ctx.prisma.userCoin.create({
        data: {
          comment,
          price,
          condition,
          exchangeable,
          coinId,
          userId: user.id,
        },
        select: selectUserCoin,
      });

      return {
        ...userCoin,
      };
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        comment: z.string(),
        price: z.number(),
        condition: z.nativeEnum(ConditionCoin),
        exchangeable: z.boolean(),
        coinId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id, comment, price, condition, exchangeable, coinId } = input;
      const { user } = ctx.session;

      if (user?.id === undefined) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User is not authenticated',
        });
      }

      const userCoin = await ctx.prisma.userCoin.update({
        where: { id },
        data: {
          comment,
          price,
          condition,
          exchangeable,
          coinId,
        },
        select: selectUserCoin,
      });

      return {
        ...userCoin,
      };
    }),
});
