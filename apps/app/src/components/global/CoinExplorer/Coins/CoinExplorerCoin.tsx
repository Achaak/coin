import { ToggleGroup } from '@my-coin/ui/dist/components/toggleGroup/index';
import { ListUlIcon } from '@my-coin/ui/dist/icons/ListUl';
import { TableIcon } from '@my-coin/ui/dist/icons/Table';
import { styled } from '@my-coin/ui';
import { FC, useContext, useEffect } from 'react';
import { CoinExplorerContext } from '../CoinExplorer';
import { useLocalStorage } from 'usehooks-ts';
import { CoinExplorerCoinList } from './CoinsList';
import { CoinExplorerCoinTable } from './CoinsTable';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  rowGap: '$16',
});

const Top = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const TopStart = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

const TopEnd = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});

export const CoinExplorerCoin: FC = () => {
  const [view, setView] = useLocalStorage<'list' | 'table'>(
    'coin-explorer-view',
    'table'
  );
  const {
    coinRefsIsLoading,
    onCatalogSelected,
    catalogIdSelected,
    coinsIsLoading,
  } = useContext(CoinExplorerContext);

  useEffect(() => {
    if (!catalogIdSelected) {
      return;
    }

    onCatalogSelected(catalogIdSelected);
  }, [catalogIdSelected, onCatalogSelected]);

  if (coinRefsIsLoading || coinsIsLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Top>
        <TopStart></TopStart>
        <TopEnd>
          <ToggleGroup
            data={[
              {
                Icon: ListUlIcon,
                value: 'list',
              },
              {
                Icon: TableIcon,
                value: 'table',
              },
            ]}
            type="single"
            defaultValue={view}
            onValueChange={(value) => setView(value as 'list' | 'table')}
            padding="sm"
          />
        </TopEnd>
      </Top>

      {view === 'table' && <CoinExplorerCoinTable />}

      {view === 'list' && <CoinExplorerCoinList />}
    </Container>
  );
};
