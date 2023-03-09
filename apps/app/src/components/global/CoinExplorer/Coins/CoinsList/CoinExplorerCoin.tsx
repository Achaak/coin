import { CoinType } from '@my-coin/database';
import { getLink } from '@my-coin/router/dist/app';
import { FC, useContext, useMemo } from 'react';
import { getYearRange } from '../../../../../utils/coin';
import { CoinCard } from '../../../CoinCard';
import { CoinExplorerContext } from '../../CoinExplorer';

type CoinMergedBase = {
  variant: 'coin' | 'ref';
  value: string;
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

export const CoinExplorerCoinList: FC = () => {
  const { coinRefs, coins } = useContext(CoinExplorerContext);

  const orderCoins = useMemo(() => {
    const coinsFormatted: CoinMerged[] = [
      ...(coinRefs
        ? coinRefs.map(
            (coinRef) =>
              ({
                value: coinRef.value,
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
                value: coin.ref.value,
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
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    });
  }, [coins, coinRefs]);

  return (
    <>
      {orderCoins?.map((orderCoin, index) => (
        <CoinCard
          key={`${orderCoin.id}-${index}`}
          composition={orderCoin.composition}
          value={orderCoin.value}
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
    </>
  );
};
