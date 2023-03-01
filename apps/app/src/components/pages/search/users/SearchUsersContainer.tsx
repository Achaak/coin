import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Avatar } from '@my-coin/ui/dist/components/avatar/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import Link from 'next/link';
import { FC } from 'react';
import { User } from '../../../../selector/user';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$16',
});

const UsersContainer = styled('ul', {
  display: 'flex',
  width: '100%',
});

type SearchUsersContainerProps = {
  users: User[];
};

export const SearchUsersContainer: FC<SearchUsersContainerProps> = ({
  users,
}) => (
  <Container>
    <Title as="h2">Users</Title>

    <UsersContainer>
      {users?.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </UsersContainer>
  </Container>
);

const UserItemStyled = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  rowGap: '$12',
});

const UserItemName = styled('span', {
  fontWeight: '$medium',
  color: '$black',
});

const UserItem: FC<{ user: User }> = ({ user }) => (
  <Link
    href={getLink('user', {
      queries: {
        userId: user.id,
      },
    })}
  >
    <UserItemStyled>
      <Avatar
        alt={user.name ?? 'User'}
        fallback={user.name?.[0] ?? 'U'}
        size={80}
        borderRadius="3xl"
        src={user.image ?? undefined}
      />
      <UserItemName>{user.name}</UserItemName>
    </UserItemStyled>
  </Link>
);
