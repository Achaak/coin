import { catalogRouter } from './catalog';
import { coinRouter } from './coin';
import { protectedExampleRouter } from './protected';
import { router } from './trpc';
import { userRouter } from './user';

export const appRouter = router({
  user: userRouter,
  catalog: catalogRouter,
  coin: coinRouter,
  protected: protectedExampleRouter,
});

export type AppRouter = typeof appRouter;
