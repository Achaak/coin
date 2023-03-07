import { FC, useState } from 'react';
import { User } from '../../../selector/user';
import { trpc } from '../../../utils/trpc';
import { CoinExplorer } from '../../global/CoinExplorer';
import { UserHeader } from '../../global/UserHeader';

type UserWishlistContainerProps = {
  user: User;
};

export const UserWishlistContainer: FC<UserWishlistContainerProps> = ({
  user,
}) => {
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();

  const { data: catalog, isLoading: isLoadingCatalog } =
    trpc.catalog.getWishlistByUserId.useQuery({
      userId: user.id,
    });

  const { data: coins, isLoading: isLoadingCoins } =
    trpc.coin.getWishlistByUserIdAndCatalogId.useQuery(
      {
        userId: user.id,
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );

  const { data: coinsRef, isLoading: isLoadingCoinsRef } =
    trpc.coinRef.getWishlistByUserIdAndCatalogId.useQuery(
      {
        userId: user.id,
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
        catalogs={catalog}
        catalogsIsLoading={isLoadingCatalog}
        onCatalogSelected={(catalogId) => setCatalogIdSelected(catalogId)}
        coins={coins}
        coinsIsLoading={isLoadingCoins}
        coinsRef={coinsRef}
        coinsRefIsLoading={isLoadingCoinsRef}
      />
    </>
  );
};
