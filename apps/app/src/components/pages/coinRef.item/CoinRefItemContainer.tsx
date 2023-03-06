import { getLink } from '@my-coin/router/dist/app';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { CoinRefFull } from '../../../selector/coinRef';
import { wishlistStore } from '../../../store/wishlist';
import { formatYears, getMinAndMaxYear } from '../../../utils/date';
import { trpc } from '../../../utils/trpc';
import { Breadcrumb } from '../../global/Breadcrumb';
import { Card } from '../../global/Card';
import { CoinExchange } from './exchange';
import { CoinHeader } from './header';
import { CoinImages } from './images';
import { CoinInformation } from './information';
import { CoinPriceEvolution } from './priceEvolution';
import { CoinStatistics } from './statistics';

type CoinRefItemContainerProps = {
  coinRef: CoinRefFull;
};

export const CoinRefItemContainer: FC<CoinRefItemContainerProps> = ({
  coinRef,
}) => {
  const [historyStartAt, setHistoryStartAt] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
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

  const { data: priceData, isLoading: priceIsLoading } =
    trpc.coinRef.priceById.useQuery({
      id: coinRef.id,
    });

  const { data: coinRefRarityData, isLoading: coinRefRarityIsLoading } =
    trpc.coinRef.rarityById.useQuery({
      id: coinRef.id,
    });

  const {
    data: coinRefWishlistCountByCoinIdData,
    isLoading: coinRefWishlistCountByCoinIdIsLoading,
  } = trpc.coinRefWishlist.countByCoinRefId.useQuery({
    coinRefId: coinRef.id,
  });

  const {
    data: userCoinRefCountByCoinIdData,
    isLoading: userCoinRefCountByCoinIdIsLoading,
  } = trpc.userCoin.countUsersHasCoinsRef.useQuery({
    coinRefId: coinRef.id,
  });

  const {
    data: coinRefPriceHistoryData,
    isLoading: coinRefPriceHistoryIsLoading,
  } = trpc.coinRefPriceHistory.byId.useQuery({
    id: coinRef.id,
    startAt: historyStartAt,
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
      <CoinHeader
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
        price={priceData ?? null}
        priceLoading={priceIsLoading}
        countryCode={coinRef.catalog.country.code}
      />

      <Grid
        type="container"
        cols={{
          default: 12,
        }}
        columnGap={{
          default: 16,
          md: 24,
          xl: 32,
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
          <CoinImages
            observeImage={coinRef.observeImage}
            obverseCreator={coinRef.obverseCreator}
            obverseDescription={coinRef.obverseDescription}
            reverseCreator={coinRef.reverseCreator}
            reverseDescription={coinRef.reverseDescription}
            reverseImage={coinRef.reverseImage}
          />
          <CoinInformation
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
          <CoinPriceEvolution
            data={
              coinRefPriceHistoryData?.map((coinRefPriceHistory) => ({
                date: coinRefPriceHistory.created_at,
                price: coinRefPriceHistory.price,
              })) ?? []
            }
            defaultPeriod={7}
            onPeriodChange={(period) => {
              setHistoryStartAt(
                new Date(new Date().setDate(new Date().getDate() - period))
              );
            }}
            loading={coinRefPriceHistoryIsLoading}
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
          <CoinStatistics
            rarity={coinRefRarityData ?? 0}
            rarityLoading={coinRefRarityIsLoading}
            usersHasIt={userCoinRefCountByCoinIdData ?? 0}
            usersHasItLoading={userCoinRefCountByCoinIdIsLoading}
            usersWishingIt={coinRefWishlistCountByCoinIdData ?? 0}
            usersWishingItLoading={coinRefWishlistCountByCoinIdIsLoading}
            mintage={
              coinRef.coins.reduce(
                (acc, coin) =>
                  acc +
                  (coin.mintageQtyBU ?? 0) +
                  (coin.mintageQtyUNC ?? 0) +
                  (coin.mintageQtyPRF ?? 0),
                0
              ) ?? 0
            }
          />
          <CoinExchange />
        </Grid>
      </Grid>
    </>
  );
};
