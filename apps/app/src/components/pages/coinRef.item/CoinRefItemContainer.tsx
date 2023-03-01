import { getLink } from '@my-coin/router/dist/app';
import { FC, useMemo } from 'react';
import { CoinRefFull } from '../../../selector/coinRef';
import { Breadcrumb } from '../../global/Breadcrumb';
import { CoinHeaderContainer } from './header';

type CoinRefItemContainerProps = {
  coinRef: CoinRefFull;
};

export const CoinRefItemContainer: FC<CoinRefItemContainerProps> = ({
  coinRef,
}) => {
  const years = useMemo(() => {
    const minYear = coinRef.coins.reduce(
      (min, coin) => (coin.year < min ? coin.year : min),
      coinRef.coins[0].year
    );
    const maxYear = coinRef.coins.reduce(
      (max, coin) => (coin.year > max ? coin.year : max),
      coinRef.coins[0].year
    );

    return {
      minYear,
      maxYear,
    };
  }, [coinRef]);

  return (
    <>
      <Breadcrumb
        data={[
          {
            label: 'Accueil',
            url: getLink('home'),
          },
          {
            label: 'France',
            url: '/france',
          },
          {
            label: `${coinRef.catalog.country.name} ${coinRef.denomination}, ${years.minYear}-${years.maxYear}`,
            current: true,
          },
        ]}
      />
      <CoinHeaderContainer
        id={coinRef.id}
        title={`${coinRef.catalog.country.name} ${coinRef.denomination}, ${years.minYear}-${years.maxYear}`}
      />
    </>
  );
};
