import { styled } from '@my-coin/ui';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC } from 'react';
import { User as UserType } from '../../../../selector/user';
import { User } from '../../../global/User';

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
  users: UserType[];
};

export const SearchUsersContainer: FC<SearchUsersContainerProps> = ({
  users,
}) => (
  <Container>
    <Title as="h2">Users</Title>

    <UsersContainer>
      {users?.map((user) => (
        <User
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          as="li"
        />
      ))}
    </UsersContainer>
  </Container>
);
