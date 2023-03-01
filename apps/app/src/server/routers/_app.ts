import { catalogRouter } from './catalog';
import { coinRouter } from './coin';
import { userCoinRouter } from './userCoin';
import { protectedExampleRouter } from './protected';
import { router } from './trpc';
import { userRouter } from './user';
import { coinRefRouter } from './coinRef';

export const appRouter = router({
  user: userRouter,
  catalog: catalogRouter,
  coin: coinRouter,
  protected: protectedExampleRouter,
  userCoin: userCoinRouter,
  coinRef: coinRefRouter,
});

export type AppRouter = typeof appRouter;
