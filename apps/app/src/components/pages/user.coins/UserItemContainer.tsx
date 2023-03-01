import { FC } from 'react';
import { User } from '../../../selector/user';
import { UserHeader } from '../../global/UserHeader';

type UserItemContainerProps = {
  user: User;
};

export const UserCoinsContainer: FC<UserItemContainerProps> = ({ user }) => (
  <>
    <UserHeader image={user.image} name={user.name} id={user.id} />
  </>
);
