import { FC } from 'react';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { CardStat } from '../../global/CardStat';
import { CoinSolidIcon } from '@my-coin/ui/dist/icons/CoinSolid';
import { LayerSolidIcon } from '@my-coin/ui/dist/icons/LayerSolid';

const formatNumber = new Intl.NumberFormat();

export const HomeContainer: FC = () => (
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
        paddingHorizontal={{
          default: 24,
        }}
        paddingVertical={{
          default: 24,
        }}
        Icon={CoinSolidIcon}
        value={formatNumber.format(125458)}
        label="Total of coins"
      />
      <CardStat
        paddingHorizontal={{
          default: 24,
        }}
        paddingVertical={{
          default: 24,
        }}
        Icon={LayerSolidIcon}
        value={formatNumber.format(1234)}
        label="Total of catalogs"
      />
      <CardStat
        paddingHorizontal={{
          default: 24,
        }}
        paddingVertical={{
          default: 24,
        }}
        Icon={CoinSolidIcon}
        value={formatNumber.format(125886445)}
        label="Total of coins entered"
      />
      <CardStat
        paddingHorizontal={{
          default: 24,
        }}
        paddingVertical={{
          default: 24,
        }}
        Icon={CoinSolidIcon}
        value={`$${formatNumber.format(123946465)}`}
        label="Total of coins valued"
      />
    </Grid>
  </>
);
