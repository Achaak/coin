import { routes } from '@pikas-utils/router';

export const { getLink } = routes({
  origin: 'http://localhost:3000',
  links: {
    home: '/',
    settings: '/settings',
    login: '/login',
    exchange: '/exchange',
    'user.item': '/user/:userId',
    'user.coins': '/user/:userId/coins',
    'user.wishlist': '/user/:userId/wishlist',
    'coinRef.item': '/coin/:coinRefId',
    'coin.item': '/coin/:coinRefId/:coinId',
    search: '/search',
    contacts: '/contacts',
    catalog: '/catalog',
    'catalog.item': '/catalog/:catalogId',
    'my-collection': '/my-collection',
    'admin.dashboard': '/admin/dashboard',
  },
});
