import { FC, useContext, useEffect, useState } from 'react';
import { CoinExplorerMenu } from '../Menu';
import { CoinExplorerCoin } from '../Coins';
import { Tabs } from '@my-coin/ui/dist/components/tabs/index';
import { CoinExplorerContext } from '../CoinExplorer';

export const CoinExplorerSmall: FC = () => {
  const { catalogIdSelected } = useContext(CoinExplorerContext);
  const [tabsIdSelected, setTabsIdSelected] = useState('menu');

  useEffect(() => {
    if (catalogIdSelected) {
      setTabsIdSelected('coin');
    }
  }, [catalogIdSelected]);

  return (
    <>
      <Tabs
        defaultValue={tabsIdSelected}
        value={tabsIdSelected}
        onValueChange={setTabsIdSelected}
        items={[
          {
            content: <CoinExplorerMenu />,
            trigger: 'Catalogs',
            id: 'menu',
          },
          {
            content: <CoinExplorerCoin />,
            trigger: 'Coins',
            id: 'coin',
          },
        ]}
      />
    </>
  );
};
