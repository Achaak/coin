import { createStore } from 'zustand/vanilla';
import { Contact } from '../selector/contact';
import { trpcProxy } from '../utils/trpc';

const getContacts = async () => {
  const res = await trpcProxy.contact.get.query();
  return res;
};

type WishlistState = {
  contacts: Contact[];
  init: () => void;
  refresh: () => void;
  isContact: (userId: string) => boolean;
};

export const contactStore = createStore<WishlistState>()((set, get) => ({
  contacts: [],
  coinsRefWishlist: [],
  init: async () => {
    await get().refresh();
  },
  refresh: async () => {
    const contacts = await getContacts();
    set(() => ({
      contacts,
    }));
  },
  isContact: (userId: string) => {
    const contacts = get().contacts;
    return contacts.some((contact) => contact.userContactId === userId);
  },
}));
