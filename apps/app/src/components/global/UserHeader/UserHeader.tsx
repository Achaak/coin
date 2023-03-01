import { styled } from '@my-coin/ui';
import type { FC } from 'react';
import { User } from '../../../selector/user';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import Link from 'next/link';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { getLink } from '@my-coin/router/dist/app';

const Top = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  columnGap: '$24',
  width: '100%',
});

const TopLeft = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$24',
});

const TopRight = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  columnGap: '$24',
});

export type UserHeaderProps = {
  image: User['image'];
  name: User['name'];
  id: User['id'];
};

export const UserHeader: FC<UserHeaderProps> = ({ image, name, id }) => (
  <Top>
    <TopLeft>
      <Avatar
        alt={name ?? ''}
        borderRadius="3xl"
        fallback={name?.[0] ?? ''}
        size={120}
        src={image ?? ''}
      />
      <Link
        href={getLink('user', {
          queries: {
            userId: id,
          },
        })}
      >
        <Title as="h1">{name}</Title>
      </Link>
    </TopLeft>
    <TopRight>
      <Button>Message</Button>
    </TopRight>
  </Top>
);
