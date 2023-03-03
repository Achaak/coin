import { catalogRouter } from './catalog';
import { coinRouter } from './coin';
import { userCoinRouter } from './userCoin';
import { protectedExampleRouter } from './protected';
import { router } from './trpc';
import { userRouter } from './user';
import { coinRefRouter } from './coinRef';
import { coinRefWishlistRouter } from './coinRefWishlist';
import { coinWishlistRouter } from './coinWishlist';
import { contactRouter } from './contact';
import { coinPriceHistoryRouter } from './coinPriceHistory';
import { coinRefPriceHistoryRouter } from './coinRefPriceHistory';
import { userCoinsPriceHistoryRouter } from './userCoinsPriceHistory';

export const appRouter = router({
  user: userRouter,
  catalog: catalogRouter,
  coin: coinRouter,
  protected: protectedExampleRouter,
  userCoin: userCoinRouter,
  coinRef: coinRefRouter,
  coinRefWishlist: coinRefWishlistRouter,
  coinWishlist: coinWishlistRouter,
  contact: contactRouter,
  coinPriceHistory: coinPriceHistoryRouter,
  coinRefPriceHistory: coinRefPriceHistoryRouter,
  userCoinsPriceHistory: userCoinsPriceHistoryRouter,
});

export type AppRouter = typeof appRouter;
