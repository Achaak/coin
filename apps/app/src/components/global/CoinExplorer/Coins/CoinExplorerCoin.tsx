import { CoinType } from '@my-coin/database';
import { getLink } from '@my-coin/router/dist/app';
import { ToggleGroup } from '@my-coin/ui/dist/components/toggleGroup/index';
import { ListUlIcon } from '@my-coin/ui/dist/icons/ListUl';
import { TableIcon } from '@my-coin/ui/dist/icons/Table';
import { styled } from '@my-coin/ui';
import { FC, useContext, useEffect, useMemo } from 'react';
import { getYearRange } from '../../../../utils/coin';
import { CoinCard } from '../../CoinCard';
import { CoinExplorerContext } from '../CoinExplorer';
import { useLocalStorage } from 'usehooks-ts';

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

type CoinMergedBase = {
  variant: 'coin' | 'ref';
  denomination: string;
  id: string;
  composition: string;
  diameter: number;
  weight: number;
  observeImage: string;
  reverseImage: string;
  type: CoinType;
};

type CoinMergedCoin = CoinMergedBase & {
  variant: 'coin';
  year: number;
  refId: string;
};

type CoinMergedRef = CoinMergedBase & {
  variant: 'ref';
  yearRange: [number, number];
};

type CoinMerged = CoinMergedCoin | CoinMergedRef;

export const CoinExplorerCoin: FC = () => {
  const [view, setView] = useLocalStorage<'list' | 'table'>(
    'coin-explorer-view',
    'table'
  );
  const {
    coinsRef,
    coinsRefIsLoading,
    onCatalogSelected,
    catalogIdSelected,
    coins,
    coinsIsLoading,
  } = useContext(CoinExplorerContext);

  const orderCoins = useMemo(() => {
    const coinsFormatted: CoinMerged[] = [
      ...(coinsRef
        ? coinsRef.map(
            (coinRef) =>
              ({
                denomination: coinRef.denomination,
                variant: 'ref',
                id: coinRef.id,
                composition: coinRef.composition,
                diameter: coinRef.diameter,
                weight: coinRef.weight,
                observeImage: coinRef.observeImage,
                reverseImage: coinRef.reverseImage,
                type: coinRef.type,
                yearRange: getYearRange(coinRef.coins),
              } as CoinMergedRef)
          )
        : []),
      ...(coins
        ? coins.map(
            (coin) =>
              ({
                denomination: coin.ref.denomination,
                variant: 'coin',
                id: coin.id,
                composition: coin.ref.composition,
                diameter: coin.ref.diameter,
                weight: coin.ref.weight,
                observeImage: coin.observeImage,
                reverseImage: coin.reverseImage,
                type: coin.ref.type,
                year: coin.year,
                refId: coin.refId,
              } as CoinMergedCoin)
          )
        : []),
    ];

    return coinsFormatted?.sort((a, b) => {
      if (a.denomination > b.denomination) {
        return 1;
      }
      if (a.denomination < b.denomination) {
        return -1;
      }
      return 0;
    });
  }, [coins, coinsRef]);

  useEffect(() => {
    if (!catalogIdSelected) {
      return;
    }

    onCatalogSelected(catalogIdSelected);
  }, [catalogIdSelected, onCatalogSelected]);

  if (coinsRefIsLoading || coinsIsLoading) {
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

      {view === 'table' && <></>}

      {view === 'list' &&
        orderCoins?.map((orderCoin, index) => (
          <CoinCard
            key={`${orderCoin.id}-${index}`}
            composition={orderCoin.composition}
            denomination={orderCoin.denomination}
            year={orderCoin.variant === 'coin' ? orderCoin.year : undefined}
            yearRange={
              orderCoin.variant === 'ref' ? orderCoin.yearRange : undefined
            }
            diameter={orderCoin.diameter}
            weight={orderCoin.weight}
            observeImage={orderCoin.observeImage}
            reverseImage={orderCoin.reverseImage}
            price={0}
            type={orderCoin.type}
            link={
              orderCoin.variant === 'coin'
                ? getLink('coin.item', {
                    queries: {
                      coinRefId: orderCoin.refId,
                      coinId: orderCoin.id,
                    },
                  })
                : getLink('coinRef.item', {
                    queries: {
                      coinRefId: orderCoin.id,
                    },
                  })
            }
          />
        ))}
    </Container>
  );
};
