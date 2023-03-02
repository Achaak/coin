import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { FC, useContext, useMemo } from 'react';
import { CoinFull } from '../../../../selector/coinFull';
import { UserCoin } from '../../../../selector/userCoin';
import { trpc } from '../../../../utils/trpc';
import { CoinCard } from '../../CoinCard';
import { CoinExplorerContext } from '../CoinExplorer';

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  rowGap: '$16',
});

export const CoinExplorerCoin: FC = () => {
  const { userId, catalogIdSelected } = useContext(CoinExplorerContext);
  const { data: userCoins, isLoading: isLoadingUserCoins } =
    trpc.userCoin.getByCatalogIdAndUserId.useQuery(
      {
        userId,
        catalogId: catalogIdSelected ?? '',
      },
      {
        enabled: !!catalogIdSelected,
      }
    );

  const orderUserCoins = useMemo(
    () =>
      userCoins?.reduce((acc, userCoin) => {
        const coin = acc.find((c) => c.id === userCoin.coin.id);

        if (coin) {
          if (!coin.userCoins.some((c) => c.id === userCoin.id)) {
            coin.userCoins.push(userCoin);
          }
        } else {
          acc.push({
            id: userCoin.coin.id,
            coin: userCoin.coin,
            userCoins: [userCoin],
          });
        }

        return acc;
      }, [] as Array<{ id: string; coin: CoinFull; userCoins: UserCoin[] }>),
    [userCoins]
  );

  if (isLoadingUserCoins) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {orderUserCoins?.map((userCoin) => (
        <CoinCard
          key={userCoin.id}
          composition={userCoin.coin.ref.composition}
          denomination={userCoin.coin.ref.denomination}
          year={userCoin.coin.year}
          diameter={userCoin.coin.ref.diameter}
          weight={userCoin.coin.ref.weight}
          observeImage={userCoin.coin.observeImage}
          reverseImage={userCoin.coin.reverseImage}
          price={0}
          type={userCoin.coin.ref.type}
          link={getLink('coin', {
            queries: {
              coinId: userCoin.id,
              coinRefId: userCoin.coin.ref.id,
            },
          })}
        />
      ))}
    </Container>
  );
};
