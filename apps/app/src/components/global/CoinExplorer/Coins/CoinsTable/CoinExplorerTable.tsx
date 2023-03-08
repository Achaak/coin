import { FC, useContext } from 'react';
import { trpc } from '../../../../../utils/trpc';
import { CoinExplorerContext } from '../../CoinExplorer';

export const CoinExplorerCoinTable: FC = () => {
  const { coinsRef, coins, catalogIdSelected } =
    useContext(CoinExplorerContext);

  const { data: coinsRefToPossess, isLoading: coinsRefToPossessIsLoading } =
    trpc.coinRef.getLowByCatalogId.useQuery(
      {
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );



  // const coinRefPossesses = useMemo(() => {

  if (coinsRefToPossessIsLoading) {
    return <>Loading...</>;
  }

  console.log(coinsRefToPossess);

  return <></>;
};
