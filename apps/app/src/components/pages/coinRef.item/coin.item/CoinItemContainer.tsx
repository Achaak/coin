import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo, useState } from 'react';
import { Breadcrumb } from '../../../global/Breadcrumb';
import { Card } from '../../../global/Card';
import { Table } from '@my-coin/ui/dist/components/table/index';
import { CoinHeader } from '../header';
import { CoinFull } from '../../../../selector/coinFull';
import { getLink } from '@my-coin/router/dist/app';
import { trpc } from '../../../../utils/trpc';
import { wishlistStore } from '../../../../store/wishlist';
import { useStore } from 'zustand';
import { CoinImages } from '../images';
import { CoinInformation } from '../information';
import { formatYears } from '../../../../utils/date';
import { CoinExchange } from '../exchange';
import { CoinItemMyCollectionContainer } from './my-collection';
import { useSession } from 'next-auth/react';
import { CoinStatistics } from '../statistics';
import { CoinPriceEvolution } from '../priceEvolution';
import { getYearRange } from '../../../../utils/coin';

type CoinItemContainerProps = {
  coin: CoinFull;
};

export const CoinItemContainer: FC<CoinItemContainerProps> = ({ coin }) => {
  const { status } = useSession();
  const [historyStartAt, setHistoryStartAt] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );
  const { coinsWishlist, refreshCoinsWishlist } = useStore(
    wishlistStore,
    (state) => ({
      coinsWishlist: state.coinsWishlist,
      refreshCoinsWishlist: state.refreshCoinsWishlist,
    })
  );

  const {
    mutate: addOrRemoveCoinWishlistMutation,
    isLoading: addOrRemoveCoinWishlistIsLoading,
  } = trpc.coinWishlist.addOrRemove.useMutation({
    onSuccess: async () => {
      await refreshCoinsWishlist();
    },
  });

  const { data: priceData, isLoading: priceIsLoading } =
    trpc.coin.getPriceById.useQuery({
      id: coin.id,
    });

  const { data: coinRarityData, isLoading: coinRarityIsLoading } =
    trpc.coin.getRarityById.useQuery({
      id: coin.id,
    });

  const {
    data: coinWishlistCountByCoinIdData,
    isLoading: coinWishlistCountByCoinIdIsLoading,
  } = trpc.coinWishlist.countByCoinId.useQuery({
    coinId: coin.id,
  });

  const {
    data: userCoinCountByCoinIdData,
    isLoading: userCoinCountByCoinIdIsLoading,
  } = trpc.userCoin.countUsersHasCoins.useQuery({
    coinId: coin.id,
  });

  const { data: coinPriceHistoryData, isLoading: coinPriceHistoryIsLoading } =
    trpc.coinPriceHistory.getById.useQuery({
      id: coin.id,
      startAt: historyStartAt,
    });

  const periodYears = useMemo(() => {
    const yearsRange = getYearRange(coin.ref.coins);
    return formatYears(yearsRange[0], yearsRange[1]);
  }, [coin.ref.coins]);

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
            label: coin.ref.denomination,
            url: getLink('coinRef.item', {
              queries: {
                coinRefId: coin.ref.id,
              },
            }),
          },
          {
            label: `${coin.ref.catalog.country.name} ${coin.ref.denomination},  ${coin.year}`,
            current: true,
          },
        ]}
      />
      <CoinHeader
        id={coin.ref.id}
        title={`${coin.ref.catalog.country.name} ${coin.ref.denomination},  ${coin.year}`}
        onAddOrRemoveToFavorites={(id) =>
          addOrRemoveCoinWishlistMutation({ coinId: id })
        }
        isLoadingAddOrRemoveToFavorites={addOrRemoveCoinWishlistIsLoading}
        isFavorite={
          coinsWishlist.some(
            (coinWishlist) => coinWishlist.coinId === coin.id
          ) ?? false
        }
        price={priceData ?? null}
        priceLoading={priceIsLoading}
        countryCode={coin.ref.catalog.country.code}
      />
      <Grid
        type="container"
        cols={{
          default: 12,
        }}
        columnGap={{
          default: 16,
          xl: 24,
        }}
        rowGap={{
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
          <CoinImages
            observeImage={coin.ref.observeImage}
            obverseCreator={coin.ref.obverseCreator}
            obverseDescription={coin.ref.obverseDescription}
            reverseCreator={coin.ref.reverseCreator}
            reverseDescription={coin.ref.reverseDescription}
            reverseImage={coin.ref.reverseImage}
          />
          <CoinInformation
            alignment={coin.ref.alignment}
            composition={coin.ref.composition}
            edgeDescription={coin.ref.edgeDescription}
            edgeType={coin.ref.edgeType}
            country={coin.ref.catalog.country.name}
            diameter={coin.ref.diameter}
            denomination={coin.ref.denomination}
            weight={coin.ref.weight}
            period={`${coin.ref.catalog.name} (${periodYears})`}
            shape={coin.ref.shape}
            thickness={coin.ref.thickness}
            type={coin.ref.type}
          />
          <Card
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Title as="h2">Frappe</Title>
            <Table
              columns={[
                {
                  accessorKey: 'year',
                  header: 'Year',
                },
                {
                  accessorKey: 'mintage',
                  header: 'Mintage',
                  columns: [
                    {
                      accessorKey: 'unc',
                      header: 'UNC',
                    },
                    {
                      accessorKey: 'bu',
                      header: 'BU',
                    },
                    {
                      accessorKey: 'prf',
                      header: 'PRF',
                    },
                  ],
                },
                {
                  accessorKey: 'price',
                  header: 'Price',
                },
              ]}
              data={[
                {
                  year: '2019',
                  unc: '1',
                  bu: '2',
                  prf: '3',
                  price: '4',
                },
              ]}
              fullWidth
              css={{
                thSpan: {
                  justifyContent: 'center',
                },
                tdContent: {
                  justifyContent: 'center',
                },
              }}
            />
          </Card>
          <CoinPriceEvolution
            data={
              coinPriceHistoryData?.map((coinPriceHistory) => ({
                date: coinPriceHistory.created_at,
                price: coinPriceHistory.price,
              })) ?? []
            }
            defaultPeriod={7}
            onPeriodChange={(period) => {
              setHistoryStartAt(
                new Date(new Date().setDate(new Date().getDate() - period))
              );
            }}
            loading={coinPriceHistoryIsLoading}
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
          {status === 'authenticated' && (
            <CoinItemMyCollectionContainer coin={coin} />
          )}
          <CoinStatistics
            rarity={coinRarityData ?? 0}
            rarityLoading={coinRarityIsLoading}
            usersHasIt={userCoinCountByCoinIdData ?? 0}
            usersHasItLoading={userCoinCountByCoinIdIsLoading}
            usersWishingIt={coinWishlistCountByCoinIdData ?? 0}
            usersWishingItLoading={coinWishlistCountByCoinIdIsLoading}
            mintage={
              (coin.mintageQtyBU ?? 0) +
              (coin.mintageQtyUNC ?? 0) +
              (coin.mintageQtyPRF ?? 0)
            }
          />
          <CoinExchange />
        </Grid>
      </Grid>
    </>
  );
};
