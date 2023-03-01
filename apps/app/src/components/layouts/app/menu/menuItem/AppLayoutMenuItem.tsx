import { styled } from '@my-coin/ui';
import { IconProps } from '@my-coin/ui/dist/core/pikas-ui/Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const MenuItem = styled('li', {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  columnGap: '$16',
});

const MenuLabel = styled('span', {
  fontWeight: '$medium',
  overflow: 'hidden',
  display: 'flex',
  whiteSpace: 'nowrap',
  color: '$black',
  fontSize: '$em-large',

  variants: {
    isSelected: {
      true: {
        fontWeight: '$bold',
      },
    },
  },
});

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

type CustomProps = {
  item: MenuConfig;
  onClosed?: () => void;
};

export const AppLayoutMenuItem: FC<CustomProps> = ({ item, onClosed }) => {
  const router = useRouter();

  const getIsSelected = (): boolean => {
    if (item.type === 'button') {
      return false;
    }

    if (item?.linkAs?.some((link) => router.asPath === link)) {
      return true;
    }

    return false;
  };

  const isSelected = getIsSelected();

  return (
    <>
      {item.type === 'link' && (
        <Link href={item.link}>
          <MenuItem onClick={onClosed}>
            {isSelected && item.iconActive ? (
              <item.iconActive colorName="primary" size="1.5em" />
            ) : (
              <item.icon
                colorName={isSelected ? 'primary' : 'black'}
                size="1.5em"
              />
            )}
            <MenuLabel isSelected={isSelected}>{item.label}</MenuLabel>
          </MenuItem>
        </Link>
      )}
      {item.type === 'button' && (
        <MenuItem
          onClick={(): void => {
            onClosed?.();
            item.onClick();
          }}
        >
          {isSelected && item.iconActive ? (
            <item.iconActive colorName="primary" size="1.5em" />
          ) : (
            <item.icon
              colorName={isSelected ? 'primary' : 'black'}
              size="1.5em"
            />
          )}
          <MenuLabel isSelected={isSelected}>{item.label}</MenuLabel>
        </MenuItem>
      )}
    </>
  );
};
