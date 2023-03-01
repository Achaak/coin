import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Button } from '@my-coin/ui/dist/components/inputs/button/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { FC, useMemo } from 'react';
import { Breadcrumb } from '../../../global/Breadcrumb';
import { Card } from '../../../global/Card';
import { Table } from '@my-coin/ui/dist/components/table/index';
import { CoinHeaderContainer } from '../header';
import { Coin } from '../../../../selector/coin';
import { getLink } from '@my-coin/router/dist/app';
import { CoinRefFull } from '../../../../selector/coinRef';
import { trpc } from '../../../../utils/trpc';
import { wishlistStore } from '../../../../store/wishlist';
import { useStore } from 'zustand';
import { CoinImagesContainer } from '../images';
import { CoinInformationContainer } from '../information';
import { formatYears, getMinAndMaxYear } from '../../../../utils/date';
import { CoinExchangeContainer } from '../exchange';

type CoinItemContainerProps = {
  coin: Coin;
  coinRef: CoinRefFull;
};

export const CoinItemContainer: FC<CoinItemContainerProps> = ({
  coin,
  coinRef,
}) => {
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
            label: coinRef.denomination,
            url: getLink('coinRef', {
              queries: {
                coinRefId: coinRef.id,
              },
            }),
          },
          {
            label: `${coinRef.catalog.country.name} ${coinRef.denomination},  ${coin.year}`,
            current: true,
          },
        ]}
      />
      <CoinHeaderContainer
        id={coinRef.id}
        title={`${coinRef.catalog.country.name} ${coinRef.denomination},  ${coin.year}`}
        onAddOrRemoveToFavorites={(id) =>
          addOrRemoveCoinWishlistMutation({ coinId: id })
        }
        isLoadingAddOrRemoveToFavorites={addOrRemoveCoinWishlistIsLoading}
        isFavorite={
          coinsWishlist.some(
            (coinWishlist) => coinWishlist.coinId === coin.id
          ) ?? false
        }
        price={1}
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
          <Card
            paddingHorizontal={{
              default: 32,
            }}
            paddingVertical={{
              default: 24,
            }}
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
          <Card
            paddingHorizontal={{
              default: 32,
            }}
            paddingVertical={{
              default: 24,
            }}
          >
            <Title as="h2">Ma Collection</Title>

            <Button>+ Ajouter à ma collection</Button>
          </Card>
          <CoinExchangeContainer />
        </Grid>
      </Grid>
    </>
  );
};
