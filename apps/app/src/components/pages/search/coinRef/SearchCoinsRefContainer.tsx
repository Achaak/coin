import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Title } from '@my-coin/ui/dist/components/title/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { CoinRefWithCatalog } from '../../../../selector/coinRef';
import { trpc } from '../../../../utils/trpc';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  rowGap: '$24',
});

const CoinsRefsContainer = styled('ul', {
  display: 'flex',
});

export const SearchCoinsRefsContainer: FC = () => {
  const router = useRouter();
  const { q } = router.query;

  const { data: coinsRefsData, isLoading: coinsRefIsLoading } =
    trpc.coinRef.search.useQuery({
      query: q as string,
    });

  return (
    <Container>
      <Title as="h2">Coins</Title>

      {coinsRefIsLoading ? (
        <p>Loading...</p>
      ) : (
        <CoinsRefsContainer>
          {coinsRefsData?.map((coinRef) => (
            <CoinRefItem key={coinRef.id} coinsRef={coinRef} />
          ))}
        </CoinsRefsContainer>
      )}
    </Container>
  );
};

const CoinRefItemStyled = styled('li', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const CoinRefItem: FC<{ coinsRef: CoinRefWithCatalog }> = ({ coinsRef }) => (
  <Link
    href={getLink('coin', {
      queries: {
        coinId: coinsRef.id,
      },
    })}
  >
    <CoinRefItemStyled>{coinsRef.denomination}</CoinRefItemStyled>
  </Link>
);
