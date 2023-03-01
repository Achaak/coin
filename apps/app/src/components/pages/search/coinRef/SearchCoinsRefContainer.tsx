import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC } from 'react';
import { CoinRef } from '../../../../selector/coinRef';
import { CoinCard } from '../../../global/CoinCard';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$16',
  width: '100%',
});

type SearchCoinsRefsContainerProps = {
  coinsRefs: CoinRef[];
};

export const SearchCoinsRefsContainer: FC<SearchCoinsRefsContainerProps> = ({
  coinsRefs,
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
        default: '$16',
      }}
      rowGap={{
        default: '$16',
      }}
    >
      {coinsRefs?.map((coinRef) => (
        <CoinCard
          key={coinRef.id}
          denomination={coinRef.denomination}
          observeImage={coinRef.observeImage}
          reverseImage={coinRef.reverseImage}
          composition={coinRef.composition}
          diameter={coinRef.diameter}
          price={1}
          weight={coinRef.weight}
          type={coinRef.type}
          link={getLink('coinRef', {
            queries: {
              coinRefId: coinRef.id,
            },
          })}
          yearRange={[2000, 2042]}
        />
      ))}
    </Grid>
  </Container>
);
