import { getLink } from '@my-coin/router/dist/app';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo } from 'react';
import { useStore } from 'zustand';
import { CoinRefFull } from '../../../selector/coinRef';
import { wishlistStore } from '../../../store/wishlist';
import { formatYears, getMinAndMaxYear } from '../../../utils/date';
import { trpc } from '../../../utils/trpc';
import { Breadcrumb } from '../../global/Breadcrumb';
import { Card } from '../../global/Card';
import { CoinExchangeContainer } from './exchange';
import { CoinHeaderContainer } from './header';
import { CoinImagesContainer } from './images';
import { CoinInformationContainer } from './information';

type CoinRefItemContainerProps = {
  coinRef: CoinRefFull;
};

export const CoinRefItemContainer: FC<CoinRefItemContainerProps> = ({
  coinRef,
}) => {
  const { coinsRefWishlist, refreshCoinsRefWishlist } = useStore(
    wishlistStore,
    (state) => ({
      coinsRefWishlist: state.coinsRefWishlist,
      refreshCoinsRefWishlist: state.refreshCoinsRefWishlist,
    })
  );

  const {
    mutate: addOrRemoveCoinRefWishlistMutation,
    isLoading: addOrRemoveCoinRefWishlistIsLoading,
  } = trpc.coinRefWishlist.addOrRemove.useMutation({
    onSuccess: async () => {
      await refreshCoinsRefWishlist();
    },
  });

  const years = useMemo(
    () =>
      getMinAndMaxYear(coinRef.coins.filter((c) => c.year).map((c) => c.year!)),
    [coinRef]
  );

  const periodYears = useMemo(() => {
    formatYears(years.minYear, years.maxYear);
  }, [years]);

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
        onAddOrRemoveToFavorites={(id) =>
          addOrRemoveCoinRefWishlistMutation({ coinRefId: id })
        }
        isLoadingAddOrRemoveToFavorites={addOrRemoveCoinRefWishlistIsLoading}
        isFavorite={
          coinsRefWishlist.some(
            (coinRefWishlist) => coinRefWishlist.coinRefId === coinRef.id
          ) ?? false
        }
        price={1}
        countryCode={coinRef.catalog.country.code}
      />

      <Grid
        type="container"
        cols={{
          default: 12,
        }}
        columnGap={{
          default: 32,
        }}
      >
        <Grid
          type="item"
          cols={{
            default: 12,
            xl: 8,
          }}
          css={{
            rowGap: '$32',
          }}
        >
          <CoinImagesContainer
            observeImage={coinRef.observeImage}
            obverseCreator={coinRef.obverseCreator}
            obverseDescription={coinRef.obverseDescription}
            reverseCreator={coinRef.reverseCreator}
            reverseDescription={coinRef.reverseDescription}
            reverseImage={coinRef.reverseImage}
          />
          <CoinInformationContainer
            alignment={coinRef.alignment}
            composition={coinRef.composition}
            edgeDescription={coinRef.edgeDescription}
            edgeType={coinRef.edgeType}
            country={coinRef.catalog.country.name}
            diameter={coinRef.diameter}
            denomination={coinRef.denomination}
            weight={coinRef.weight}
            period={`${coinRef.catalog.name} (${periodYears})`}
            shape={coinRef.shape}
            thickness={coinRef.thickness}
            type={coinRef.type}
          />
        </Grid>

        <Grid
          type="item"
          cols={{
            default: 12,
            xl: 4,
          }}
          css={{
            rowGap: '$32',
          }}
        >
          <Card>
            <Title as="h2">Variété</Title>
          </Card>
          <CoinExchangeContainer />
        </Grid>
      </Grid>
    </>
  );
};
