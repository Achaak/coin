import { Title } from '@my-coin/ui/dist/components/title/index';
import { useSession } from 'next-auth/react';
import { FC, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CoinExplorer } from '../../global/CoinExplorer';

export const MyCollectionContainer: FC = () => {
  const { data } = useSession();
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();

  const { data: catalogs, isLoading: catalogsIsLoading } =
    trpc.catalog.getByUserId.useQuery(
      {
        userId: data?.user?.id ?? '',
      },
      {
        enabled: !!data?.user?.id,
      }
    );

  const { data: userCoins, isLoading: isLoadingUserCoins } =
    trpc.userCoin.getByCatalogIdAndUserId.useQuery(
      {
        userId: data?.user?.id ?? '',
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected && !!data?.user?.id,
      }
    );

  return (
    <>
      <Title as="h1">My collection</Title>
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
