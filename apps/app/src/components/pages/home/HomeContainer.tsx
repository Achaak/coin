import { FC } from 'react';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { CardStat } from '../../global/CardStat';
import { CoinSolidIcon } from '@my-coin/ui/dist/icons/CoinSolid';
import { LayerSolidIcon } from '@my-coin/ui/dist/icons/LayerSolid';
import { trpc } from '../../../utils/trpc';

const formatNumber = new Intl.NumberFormat();

export const HomeContainer: FC = () => {
  const { data: userCoinsCountData, isLoading: userCoinsCountIsLoading } =
    trpc.userCoin.count.useQuery();

  const { data: catalogsCountData, isLoading: catalogsCountIsLoading } =
    trpc.catalog.count.useQuery();

  const { data: coinsCountData, isLoading: coinsCountIsLoading } =
    trpc.coin.count.useQuery();

  return (
    <>
      <Title
        as="h1"
        css={{
          h1: {
            span: {
              color: '$primary',
            },
          },
        }}
      >
        Welcome to <span>My Coin</span>
      </Title>
      <Grid
        type="container"
        cols={{
          default: 1,
          lg: 2,
          '2xl': 4,
        }}
        columnGap={{
          default: 24,
        }}
        rowGap={{
          default: 24,
        }}
      >
        <CardStat
          Icon={CoinSolidIcon}
          value={
            coinsCountData !== undefined
              ? formatNumber.format(coinsCountData)
              : undefined
          }
          loading={coinsCountIsLoading}
          label="Total of coins"
        />
        <CardStat
          Icon={LayerSolidIcon}
          value={
            catalogsCountData !== undefined ? catalogsCountData : undefined
          }
          loading={catalogsCountIsLoading}
          label="Total of catalogs"
        />
        <CardStat
          Icon={CoinSolidIcon}
          value={
            userCoinsCountData !== undefined
              ? formatNumber.format(userCoinsCountData)
              : undefined
          }
          loading={userCoinsCountIsLoading}
          label="Total of coins entered"
        />
        <CardStat
          Icon={CoinSolidIcon}
          value={`$${formatNumber.format(123946465)}`}
          label="Total of coins valued"
        />
      </Grid>
    </>
  );
};
