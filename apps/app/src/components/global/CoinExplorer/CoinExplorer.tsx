import { useMediaScreenValid } from '@pikas-utils/screen';
import { createContext, FC, useState } from 'react';
import { Catalog } from '../../../selector/catalog';
import { CoinFull } from '../../../selector/coinFull';
import { CoinRefFull } from '../../../selector/coinRef';
import { CoinExplorerLarge } from './Large';
import { CoinExplorerSmall } from './Small';

export const CoinExplorerContext = createContext<{
  catalogs?: Catalog[];
  catalogsIsLoading?: boolean;
  onCatalogSelected: (catalogId: string) => void;
  catalogIdSelected?: string;
  setCatalogIdSelected: (catalogId: string) => void;
  coins?: CoinFull[];
  coinsIsLoading?: boolean;
  coinsRef?: CoinRefFull[];
  coinsRefIsLoading?: boolean;
}>({
  catalogs: [],
  onCatalogSelected: () => [],
  setCatalogIdSelected: () => {
    /* Nothing */
  },
});

export type CoinExplorerProps = {
  catalogs?: Catalog[];
  catalogsIsLoading?: boolean;
  onCatalogSelected: (catalogId: string) => void;
  coinsRef?: CoinRefFull[];
  coinsRefIsLoading?: boolean;
  coins?: CoinFull[];
  coinsIsLoading?: boolean;
};

export const CoinExplorer: FC<CoinExplorerProps> = ({
  catalogs,
  onCatalogSelected,
  catalogsIsLoading,
  coinsRef,
  coinsRefIsLoading,
  coins,
  coinsIsLoading,
}) => {
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();
  const isLargeScreen = useMediaScreenValid({
    media: 'xl',
    operator: '>=',
  });

  return (
    <CoinExplorerContext.Provider
      value={{
        catalogs,
        catalogsIsLoading,
        onCatalogSelected,
        catalogIdSelected,
        setCatalogIdSelected,
        coinsRef,
        coinsRefIsLoading,
        coins,
        coinsIsLoading,
      }}
    >
      {isLargeScreen && <CoinExplorerLarge />}
      {!isLargeScreen && <CoinExplorerSmall />}
    </CoinExplorerContext.Provider>
  );
};
