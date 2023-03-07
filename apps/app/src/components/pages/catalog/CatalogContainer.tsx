import { FC, useState } from 'react';
import { trpc } from '../../../utils/trpc';
import { CoinExplorer } from '../../global/CoinExplorer';

export const CatalogContainer: FC = () => {
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();

  const { data: catalogs, isLoading: catalogsIsLoading } =
    trpc.catalog.getAll.useQuery();

  const { data: coins, isLoading: isLoadingCoins } =
    trpc.coin.getByCatalogId.useQuery(
      {
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );

  return (
    <CoinExplorer
      catalogs={catalogs}
      catalogsIsLoading={catalogsIsLoading}
      onCatalogSelected={(catalogId) => {
        setCatalogIdSelected(catalogId);
      }}
      coins={coins}
      coinsIsLoading={isLoadingCoins}
    />
  );
};
