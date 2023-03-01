import { routes } from '@pikas-utils/router';

export const { getLink } = routes({
  origin: 'http://localhost:3000',
  links: {
    home: '/',
    settings: '/settings',
    login: '/login',
    exchange: '/exchange',
    user: '/user/:userId',
    'user.coins': '/user/:userId/coins',
    coin: '/coin/:coinId',
    search: '/search',
    catalog: '/catalog/:catalogId',
    'my-collection': '/my-collection',
    'admin.dashboard': '/admin/dashboard',
  },
});
