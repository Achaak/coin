import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC } from 'react';
import { CoinRefFull } from '../../../../selector/coinRef';
import { getYearRange } from '../../../../utils/coin';
import { CoinCard } from '../../../global/CoinCard';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$16',
  width: '100%',
});

type SearchCoinRefsContainerProps = {
  coinRefs: CoinRefFull[];
};

export const SearchCoinRefsContainer: FC<SearchCoinRefsContainerProps> = ({
  coinRefs,
}) => (
  <Container>
    <Title as="h2">Coins</Title>

    <Grid
      type="container"
      cols={{
        default: 1,
        lg: 2,
        xl: 3,
      }}
      columnGap={{
        default: 16,
        xl: 24,
      }}
      rowGap={{
        default: 16,
        xl: 24,
      }}
    >
      {coinRefs?.map((coinRef) => (
        <CoinCard
          key={coinRef.id}
          value={coinRef.value}
          observeImage={coinRef.observeImage}
          reverseImage={coinRef.reverseImage}
          composition={coinRef.composition}
          diameter={coinRef.diameter}
          price={1}
          weight={coinRef.weight}
          type={coinRef.type}
          link={getLink('coinRef.item', {
            queries: {
              coinRefId: coinRef.id,
            },
          })}
          yearRange={getYearRange(coinRef.coins)}
        />
      ))}
    </Grid>
  </Container>
);
