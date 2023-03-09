import { createStore } from 'zustand/vanilla';
import { CoinWishlist } from '../selector/coinWishlist';
import { CoinRefWishlist } from '../selector/coinRefWishlist';
import { trpcProxy } from '../utils/trpc';

const getCoinsWishlist = async () => {
  const res = await trpcProxy.coinWishlist.getByUserId.query();
  return res;
};

const getCoinRefsWishlist = async () => {
  const res = await trpcProxy.coinRefWishlist.getByUserId.query();
  return res;
};

type WishlistState = {
  coinsWishlist: CoinWishlist[];
  coinRefsWishlist: CoinRefWishlist[];
  init: () => void;
  refresh: () => void;
  refreshCoinsWishlist: () => void;
  refreshCoinRefsWishlist: () => void;
};

export const wishlistStore = createStore<WishlistState>()((set, get) => ({
  coinsWishlist: [],
  coinRefsWishlist: [],
  init: async () => {
    await get().refresh();
  },
  refresh: async () => {
    await Promise.all([
      get().refreshCoinsWishlist(),
      get().refreshCoinRefsWishlist(),
    ]);
  },
  refreshCoinsWishlist: async () => {
    const coinsWishlist = await getCoinsWishlist();
    set(() => ({
      coinsWishlist,
    }));
  },
  refreshCoinRefsWishlist: async () => {
    const coinRefsWishlist = await getCoinRefsWishlist();
    set(() => ({
      coinRefsWishlist,
    }));
  },
}));
