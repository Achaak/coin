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
  coinRefs?: CoinRefFull[];
  coinRefsIsLoading?: boolean;
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
  coinRefs?: CoinRefFull[];
  coinRefsIsLoading?: boolean;
  coins?: CoinFull[];
  coinsIsLoading?: boolean;
};

export const CoinExplorer: FC<CoinExplorerProps> = ({
  catalogs,
  onCatalogSelected,
  catalogsIsLoading,
  coinRefs,
  coinRefsIsLoading,
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
        coinRefs,
        coinRefsIsLoading,
        coins,
        coinsIsLoading,
      }}
    >
      {isLargeScreen && <CoinExplorerLarge />}
      {!isLargeScreen && <CoinExplorerSmall />}
    </CoinExplorerContext.Provider>
  );
};
