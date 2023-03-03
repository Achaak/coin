import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { selectContact } from '../../selector/contact';
import { router, authProcedure } from './trpc';

export const contactRouter = router({
  get: authProcedure.query(async ({ ctx }) => {
    const { session } = ctx;

    const contact = await ctx.prisma.contact.findMany({
      where: {
        userId: session?.user?.id,
      },
      select: selectContact,
    });

    return contact;
  }),
  add: authProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const { session } = ctx;

      if (userId === session?.user?.id) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `You can't add yourself as a contact`,
        });
      }

      const contact = await ctx.prisma.contact.create({
        data: {
          userId: session?.user?.id,
          userContactId: userId,
        },
        select: selectContact,
      });

      return contact;
    }),
  remove: authProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = input;
      const { session } = ctx;

      const contact = await ctx.prisma.contact.deleteMany({
        where: {
          userId: session?.user?.id,
          userContactId: userId,
        },
      });

      return contact;
    }),
});
