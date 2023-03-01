import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectCoinRef } from '../../selector/coinRef';
import { router, publicProcedure } from './trpc';

export const coinRefRouter = router({
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const coinRef = await ctx.prisma.coinRef.findUnique({
        where: { id },
        select: selectCoinRef,
      });

      if (!coinRef) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No coin ref with id '${id}'`,
        });
      }

      return {
        ...coinRef,
      };
    }),
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        take: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const isNumber = /^\d+$/.test(input.query);

      const { query, take = 10 } = input;
      const coinRefs = await ctx.prisma.coinRef.findMany({
        where: {
          OR: [
            { composition: { contains: query, mode: 'insensitive' } },
            { denomination: { contains: query, mode: 'insensitive' } },
            { obverseCreator: { contains: query, mode: 'insensitive' } },
            { reverseCreator: { contains: query, mode: 'insensitive' } },
            {
              coins: {
                some: {
                  OR: [
                    ...(isNumber
                      ? [
                          {
                            year: {
                              equals: parseInt(query, 10),
                            },
                          },
                        ]
                      : []),
                  ],
                },
              },
            },
          ],
        },
        take: take > 100 ? 100 : take,
        select: selectCoinRef,
      });

      return coinRefs;
    }),
});
