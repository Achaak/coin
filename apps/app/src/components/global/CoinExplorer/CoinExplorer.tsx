import { useMediaScreenValid } from '@pikas-utils/screen';
import { createContext, FC, useState } from 'react';
import { CoinExplorerLarge } from './Large';
import { CoinExplorerSmall } from './Small';

export const CoinExplorerContext = createContext<{
  userId: string;
  catalogIdSelected?: string;
  setCatalogIdSelected: (catalogId: string) => void;
}>({
  userId: '',
  setCatalogIdSelected: () => {
    /* Nothing */
  },
});

export type CoinExplorerProps = {
  userId: string;
};

export const CoinExplorer: FC<CoinExplorerProps> = ({ userId }) => {
  const [catalogIdSelected, setCatalogIdSelected] = useState<string>();
  const isLargeScreen = useMediaScreenValid({
    media: 'xl',
    operator: '>=',
  });

  return (
    <CoinExplorerContext.Provider
      value={{ userId, catalogIdSelected, setCatalogIdSelected }}
    >
      {isLargeScreen && <CoinExplorerLarge />}
      {!isLargeScreen && <CoinExplorerSmall />}
    </CoinExplorerContext.Provider>
  );
};
