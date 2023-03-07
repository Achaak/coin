import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '$12',
});

const Content = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '$8',

  '&:hover': {
    span: {
      color: '$primary',
    },
  },
});

const UserItemName = styled('span', {
  fontWeight: '$medium',
  color: '$black',
});

export type InfosData = {
  label: string;
  value: string;
};

type UserProps = {
  as?: 'div' | 'li';
  image: string | null;
  name: string | null;
  id: string;
  bottomChildren?: ReactNode;
};

export const User: FC<UserProps> = ({
  id,
  image,
  name,
  as,
  bottomChildren,
}) => (
  <Container as={as}>
    <Link
      href={getLink('user.item', {
        queries: {
          userId: id,
        },
      })}
    >
      <Content>
        <Avatar
          alt={name ?? 'User'}
          fallback={name?.[0] ?? 'U'}
          size={80}
          borderRadius="3xl"
          src={image ?? undefined}
        />
        <UserItemName>{name}</UserItemName>
      </Content>
    </Link>
    {bottomChildren}
  </Container>
);
