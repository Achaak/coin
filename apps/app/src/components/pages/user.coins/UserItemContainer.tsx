import { useRouter } from 'next/router';
import { FC } from 'react';
import { User } from '../../../selector/user';
import { CoinExplorer } from '../../global/CoinExplorer';
import { UserHeader } from '../../global/UserHeader';

type UserItemContainerProps = {
  user: User;
};

export const UserCoinsContainer: FC<UserItemContainerProps> = ({ user }) => {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <>
      <UserHeader image={user.image} name={user.name} id={user.id} />
      <CoinExplorer userId={userId as string} />
    </>
  );
};
