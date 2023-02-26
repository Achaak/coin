import { HomeIcon } from '@my-coin/ui/dist/icons/Home';
import { getLink } from '@my-coin/router/dist/app';
import { FC } from 'react';
import { IconProps } from '@my-coin/ui/dist/core/pikas-ui/Icons';

type MenuConfigDefault = {
  icon: FC<IconProps>;
  label: string;
  type: 'button' | 'link';
};

type MenuConfigLink = MenuConfigDefault & {
  type: 'link';
  link: string;
  linkAs?: string;
};

type MenuConfigButton = MenuConfigDefault & {
  type: 'button';
  onClick: () => void;
};

export type MenuConfig = MenuConfigButton | MenuConfigLink;

export const menuConfig = (): MenuConfig[] => [
  {
    type: 'link',
    icon: HomeIcon,
    label: 'Catalog',
    link: getLink('home'),
    linkAs: getLink('home'),
  },
  {
    type: 'link',
    icon: HomeIcon,
    label: 'My Collection',
    link: getLink('home'),
    linkAs: getLink('home'),
  },
  {
    type: 'link',
    icon: HomeIcon,
    label: 'Exchanges',
    link: getLink('home'),
    linkAs: getLink('home'),
  },
];
export const menuConfigAdmin = (): MenuConfig[] => [
  {
    type: 'link',
    icon: HomeIcon,
    label: 'Dashboard',
    link: getLink('admin.dashboard'),
    linkAs: getLink('admin.dashboard'),
  },
];
