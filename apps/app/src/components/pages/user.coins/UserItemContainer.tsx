import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { User } from '../../../selector/user';
import { trpc } from '../../../utils/trpc';
import { CoinExplorer } from '../../global/CoinExplorer';
import { UserHeader } from '../../global/UserHeader';

type UserItemContainerProps = {
  user: User;
};

export const UserCoinsContainer: FC<UserItemContainerProps> = ({ user }) => {
  const router = useRouter();
  const { userId } = router.query;
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();

  const { data: catalogs, isLoading: catalogsIsLoading } =
    trpc.catalog.getByUserId.useQuery({
      userId: userId as string,
    });

  const { data: userCoins, isLoading: isLoadingUserCoins } =
    trpc.userCoin.getByCatalogIdAndUserId.useQuery(
      {
        userId: userId as string,
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );

  return (
    <>
      <UserHeader image={user.image} name={user.name} id={user.id} />
      <CoinExplorer
        catalogs={catalogs}
        catalogsIsLoading={catalogsIsLoading}
        onCatalogSelected={(catalogId) => {
          setCatalogIdSelected(catalogId);
        }}
        coins={userCoins?.map((userCoin) => userCoin.coin)}
        coinsIsLoading={isLoadingUserCoins}
      />
    </>
  );
};
