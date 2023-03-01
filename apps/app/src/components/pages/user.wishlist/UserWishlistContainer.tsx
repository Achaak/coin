import { FC } from 'react';
import { User } from '../../../selector/user';
import { UserHeader } from '../../global/UserHeader';

type UserWishlistContainerProps = {
  user: User;
};

export const UserWishlistContainer: FC<UserWishlistContainerProps> = ({
  user,
}) => (
  <>
    <UserHeader image={user.image} name={user.name} id={user.id} />
  </>
);
