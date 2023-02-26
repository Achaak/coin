import { createStore } from 'zustand/vanilla';
import { Session } from 'next-auth';

type UserState = {
  me: Required<Session>['user'] | null;
  setMe: (me: Required<Session>['user']) => void;
  clearMe: () => void;
};
export const userStore = createStore<UserState>()((set) => ({
  me: null,
  client: null,
  wsClient: null,
  setMe: (me) =>
    set(() => ({
      me,
    })),
  clearMe: () =>
    set(() => ({
      me: null,
      client: null,
      wsClient: null,
    })),
}));
