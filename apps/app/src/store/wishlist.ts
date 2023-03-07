import { createStore } from 'zustand/vanilla';
import { CoinWishlist } from '../selector/coinWishlist';
import { CoinRefWishlist } from '../selector/coinRefWishlist';
import { trpcProxy } from '../utils/trpc';

const getCoinsWishlist = async () => {
  const res = await trpcProxy.coinWishlist.getByUserId.query();
  return res;
};

const getCoinsRefWishlist = async () => {
  const res = await trpcProxy.coinRefWishlist.getByUserId.query();
  return res;
};

type WishlistState = {
  coinsWishlist: CoinWishlist[];
  coinsRefWishlist: CoinRefWishlist[];
  init: () => void;
  refresh: () => void;
  refreshCoinsWishlist: () => void;
  refreshCoinsRefWishlist: () => void;
};

export const wishlistStore = createStore<WishlistState>()((set, get) => ({
  coinsWishlist: [],
  coinsRefWishlist: [],
  init: async () => {
    await get().refresh();
  },
  refresh: async () => {
    await Promise.all([
      get().refreshCoinsWishlist(),
      get().refreshCoinsRefWishlist(),
    ]);
  },
  refreshCoinsWishlist: async () => {
    const coinsWishlist = await getCoinsWishlist();
    set(() => ({
      coinsWishlist,
    }));
  },
  refreshCoinsRefWishlist: async () => {
    const coinsRefWishlist = await getCoinsRefWishlist();
    set(() => ({
      coinsRefWishlist,
    }));
  },
}));
