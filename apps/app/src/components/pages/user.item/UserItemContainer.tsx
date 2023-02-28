import { FC } from 'react';
import { User } from '../../../selector/user';

type UserItemContainerProps = {
  user: User | null;
};

export const UserItemContainer: FC<UserItemContainerProps> = ({ user }) => (
  <>{user?.name}</>
);
