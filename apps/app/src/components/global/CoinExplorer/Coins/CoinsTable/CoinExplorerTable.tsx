import { FC, useContext } from 'react';
import { trpc } from '../../../../../utils/trpc';
import { CoinExplorerContext } from '../../CoinExplorer';

export const CoinExplorerCoinTable: FC = () => {
  const { catalogIdSelected } = useContext(CoinExplorerContext);

  const { data: coinRefsToPossess, isLoading: coinRefsToPossessIsLoading } =
    trpc.coinRef.getLowByCatalogId.useQuery(
      {
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );

  // const coinRefPossesses = useMemo(() => {

  if (coinRefsToPossessIsLoading) {
    return <>Loading...</>;
  }

  console.log(coinRefsToPossess);

  return <></>;
};
