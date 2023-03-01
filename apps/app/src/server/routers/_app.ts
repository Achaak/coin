import { catalogRouter } from './catalog';
import { coinRouter } from './coin';
import { userCoinRouter } from './userCoin';
import { protectedExampleRouter } from './protected';
import { router } from './trpc';
import { userRouter } from './user';
import { coinRefRouter } from './coinRef';
import { coinRefWishlistRouter } from './coinRefWishlist';
import { coinWishlistRouter } from './coinWishlist';

export const appRouter = router({
  user: userRouter,
  catalog: catalogRouter,
  coin: coinRouter,
  protected: protectedExampleRouter,
  userCoin: userCoinRouter,
  coinRef: coinRefRouter,
  coinRefWishlist: coinRefWishlistRouter,
  coinWishlist: coinWishlistRouter,
});

export type AppRouter = typeof appRouter;
