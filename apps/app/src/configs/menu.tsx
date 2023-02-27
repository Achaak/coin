import { LayerIcon } from '@my-coin/ui/dist/icons/Layer';
import { LayerSolidIcon } from '@my-coin/ui/dist/icons/LayerSolid';
import { getLink } from '@my-coin/router/dist/app';
import { FC } from 'react';
import { IconProps } from '@my-coin/ui/dist/core/pikas-ui/Icons';
import { TransferIcon } from '@my-coin/ui/dist/icons/Transfer';
import { CoinIcon } from '@my-coin/ui/dist/icons/Coin';
import { CoinSolidIcon } from '@my-coin/ui/dist/icons/CoinSolid';

type MenuConfigDefault = {
  icon: FC<IconProps>;
  iconActive?: FC<IconProps>;
  label: string;
  type: 'button' | 'link';
};

type MenuConfigLink = MenuConfigDefault & {
  type: 'link';
  link: string;
  linkAs?: string[];
};

type MenuConfigButton = MenuConfigDefault & {
  type: 'button';
  onClick: () => void;
};

export type MenuConfig = MenuConfigButton | MenuConfigLink;

export const menuConfig = (): MenuConfig[] => [
  {
    type: 'link',
    icon: LayerIcon,
    iconActive: LayerSolidIcon,
    label: 'Catalog',
    link: getLink('home'),
    linkAs: [getLink('home')],
  },
  {
    type: 'link',
    icon: CoinIcon,
    label: 'My Collection',
    link: getLink('my-collection'),
    linkAs: [getLink('my-collection')],
  },
  {
    type: 'link',
    icon: TransferIcon,
    iconActive: CoinSolidIcon,
    label: 'Exchange',
    link: getLink('exchange'),
    linkAs: [getLink('exchange')],
  },
];
export const menuConfigAdmin = (): MenuConfig[] => [
  {
    type: 'link',
    icon: LayerIcon,
    label: 'Dashboard',
    link: getLink('admin.dashboard'),
    linkAs: [getLink('admin.dashboard')],
  },
];
