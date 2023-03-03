import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo } from 'react';
import { Breadcrumb } from '../../../global/Breadcrumb';
import { Card } from '../../../global/Card';
import { Table } from '@my-coin/ui/dist/components/table/index';
import { CoinHeaderContainer } from '../header';
import { CoinFull } from '../../../../selector/coinFull';
import { getLink } from '@my-coin/router/dist/app';
import { trpc } from '../../../../utils/trpc';
import { wishlistStore } from '../../../../store/wishlist';
import { useStore } from 'zustand';
import { CoinImagesContainer } from '../images';
import { CoinInformationContainer } from '../information';
import { formatYears, getMinAndMaxYear } from '../../../../utils/date';
import { CoinExchangeContainer } from '../exchange';
import { CoinItemMyCollectionContainer } from './my-collection';
import { useSession } from 'next-auth/react';
import { CoinStatisticsContainer } from '../statistics';

type CoinItemContainerProps = {
  coin: CoinFull;
};

export const CoinItemContainer: FC<CoinItemContainerProps> = ({ coin }) => {
  const { status } = useSession();
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
    trpc.coin.priceById.useQuery({
      id: coin.id,
    });

  const { data: coinRarityData, isLoading: coinRarityIsLoading } =
    trpc.coin.rarityById.useQuery({
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

  const years = useMemo(
    () =>
      getMinAndMaxYear(
        coin.ref.coins.filter((c) => c.year).map((c) => c.year!)
      ),
    [coin.ref]
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
            label: coin.ref.denomination,
            url: getLink('coinRef', {
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
      <CoinHeaderContainer
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
          default: 32,
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
          <CoinImagesContainer
            observeImage={coin.ref.observeImage}
            obverseCreator={coin.ref.obverseCreator}
            obverseDescription={coin.ref.obverseDescription}
            reverseCreator={coin.ref.reverseCreator}
            reverseDescription={coin.ref.reverseDescription}
            reverseImage={coin.ref.reverseImage}
          />
          <CoinInformationContainer
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
          <Card
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Title as="h2">Evolution de prix</Title>
          </Card>
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
          <CoinStatisticsContainer
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
          <CoinExchangeContainer />
        </Grid>
      </Grid>
    </>
  );
};
