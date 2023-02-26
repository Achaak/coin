import { styled } from '@my-coin/ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { MenuConfig } from '../../../../../configs/menu';

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

  variants: {
    isSelected: {
      true: {
        color: '$primary',
      },
      false: {
        color: '$black',
      },
    },
  },
});

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

    if (item.linkAs && router.pathname.includes(item.linkAs)) {
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
            <item.icon
              colorName={isSelected ? 'primary' : 'black'}
              size="1.5em"
            />
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
          <item.icon
            colorName={isSelected ? 'primary' : 'black'}
            size="1.5em"
          />
          <MenuLabel isSelected={isSelected}>{item.label}</MenuLabel>
        </MenuItem>
      )}
    </>
  );
};
