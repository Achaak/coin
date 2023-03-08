import { getLink } from '@my-coin/router/dist/app';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo, useState } from 'react';
import { useStore } from 'zustand';
import { CoinRefFull } from '../../../selector/coinRef';
import { wishlistStore } from '../../../store/wishlist';
import { getYearRange } from '../../../utils/coin';
import { formatYears } from '../../../utils/date';
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
  const { coinRefsWishlist, refreshCoinRefsWishlist } = useStore(
    wishlistStore,
    (state) => ({
      coinRefsWishlist: state.coinRefsWishlist,
      refreshCoinRefsWishlist: state.refreshCoinRefsWishlist,
    })
  );

  const {
    mutate: addOrRemoveCoinRefWishlistMutation,
    isLoading: addOrRemoveCoinRefWishlistIsLoading,
  } = trpc.coinRefWishlist.addOrRemove.useMutation({
    onSuccess: async () => {
      await refreshCoinRefsWishlist();
    },
  });

  const { data: priceData, isLoading: priceIsLoading } =
    trpc.coinRef.getPriceById.useQuery({
      id: coinRef.id,
    });

  const { data: coinRefRarityData, isLoading: coinRefRarityIsLoading } =
    trpc.coinRef.getRarityById.useQuery({
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
  } = trpc.userCoin.countUsersHasCoinRefs.useQuery({
    coinRefId: coinRef.id,
  });

  const {
    data: coinRefPriceHistoryData,
    isLoading: coinRefPriceHistoryIsLoading,
  } = trpc.coinRefPriceHistory.getById.useQuery({
    id: coinRef.id,
    startAt: historyStartAt,
  });

  const periodYears = useMemo(() => {
    const yearsRange = getYearRange(coinRef.coins);
    return formatYears(yearsRange[0], yearsRange[1]);
  }, [coinRef.coins]);

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
            label: `${coinRef.catalog.period.name} ${coinRef.value}, ${periodYears}`,
            current: true,
          },
        ]}
      />
      <CoinHeader
        id={coinRef.id}
        title={`${coinRef.catalog.period.name} ${coinRef.value}, ${periodYears}`}
        onAddOrRemoveToFavorites={(id) =>
          addOrRemoveCoinRefWishlistMutation({ coinRefId: id })
        }
        isLoadingAddOrRemoveToFavorites={addOrRemoveCoinRefWishlistIsLoading}
        isFavorite={
          coinRefsWishlist.some(
            (coinRefWishlist) => coinRefWishlist.coinRefId === coinRef.id
          ) ?? false
        }
        price={priceData ?? null}
        priceLoading={priceIsLoading}
        flagUrl={coinRef.catalog.period.flag}
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
            diameter={coinRef.diameter}
            value={coinRef.value}
            weight={coinRef.weight}
            period={`${coinRef.catalog.period.name} (${periodYears})`}
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
