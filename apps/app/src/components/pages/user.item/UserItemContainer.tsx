import { getLink } from '@my-coin/router/dist/app';
import { styled } from '@my-coin/ui';
import { Grid } from '@my-coin/ui/dist/components/grid/index';
import { Title } from '@my-coin/ui/dist/components/title/index';
import { CoinIcon } from '@my-coin/ui/dist/icons/Coin';
import Link from 'next/link';
import { FC, useState } from 'react';
import { User } from '../../../selector/user';
import { getYearRange } from '../../../utils/coin';
import { trpc } from '../../../utils/trpc';
import { Card } from '../../global/Card';
import { CardStat } from '../../global/CardStat';
import { CoinCard } from '../../global/CoinCard';
import { UserHeader } from '../../global/UserHeader';
import { UserPriceEvolution } from './priceEvolution';

const SeeAll = styled('span', {
  color: '$gray-darker',
  fontWeight: '$medium',
  fontSize: '$em-large',
  cursor: 'pointer',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: '$primary',
  },
});

const numberFormat = new Intl.NumberFormat();

type UserItemContainerProps = {
  user: User;
};

export const UserItemContainer: FC<UserItemContainerProps> = ({ user }) => {
  const [historyStartAt, setHistoryStartAt] = useState<Date>(
    new Date(new Date().setDate(new Date().getDate() - 7))
  );

  const { data: coinCountByUserIdData, isLoading: coinCountByUserIdIsLoading } =
    trpc.userCoin.countByUserId.useQuery({
      userId: user.id,
    });
  const {
    data: catalogCountByUserIdData,
    isLoading: catalogCountByUserIdIsLoading,
  } = trpc.catalog.countByUserId.useQuery({
    userId: user.id,
  });
  const {
    data: countPeriodByUserIdData,
    isLoading: countPeriodByUserIdIsLoading,
  } = trpc.period.countByUserId.useQuery({
    userId: user.id,
  });
  const {
    data: lastCoinsByUserIdData,
    // isLoading: lastCoinsByUserIdIsLoading, TODO
  } = trpc.userCoin.getLastByUserId.useQuery({
    userId: user.id,
  });

  const { data: userPriceHistoryData, isLoading: userPriceHistoryIsLoading } =
    trpc.userCoinsPriceHistory.getByUserId.useQuery({
      userId: user.id,
      startAt: historyStartAt,
    });

  return (
    <>
      <UserHeader image={user.image} name={user.name} id={user.id} />
      <Grid
        type="container"
        cols={{
          default: 1,
          lg: 2,
          '2xl': 4,
        }}
        columnGap={{
          default: 16,
          xl: 24,
        }}
        rowGap={{
          default: 16,
          xl: 24,
        }}
      >
        <CardStat
          Icon={CoinIcon}
          label="Coins"
          value={
            coinCountByUserIdData !== undefined
              ? numberFormat.format(coinCountByUserIdData)
              : undefined
          }
          loading={coinCountByUserIdIsLoading}
          right={
            <Link
              href={getLink('user.coins', {
                queries: {
                  userId: user.id,
                },
              })}
            >
              <SeeAll>See all</SeeAll>
            </Link>
          }
        />
        <CardStat Icon={CoinIcon} label="Rank" value={'#1'} />
        <CardStat
          Icon={CoinIcon}
          label="Pays"
          value={
            countPeriodByUserIdData !== undefined
              ? numberFormat.format(countPeriodByUserIdData)
              : undefined
          }
          loading={countPeriodByUserIdIsLoading}
        />
        <CardStat
          Icon={CoinIcon}
          label="Catalogue"
          value={
            catalogCountByUserIdData !== undefined
              ? numberFormat.format(catalogCountByUserIdData)
              : undefined
          }
          loading={catalogCountByUserIdIsLoading}
        />
      </Grid>
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
        rowGap={{
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
          <UserPriceEvolution
            data={
              userPriceHistoryData?.map((coinRefPriceHistory) => ({
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
            loading={userPriceHistoryIsLoading}
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
          <Card
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Title as="h2">Last coins</Title>
            {lastCoinsByUserIdData?.map((userCoin) => (
              <CoinCard
                paddingHorizontal={{
                  default: 0,
                }}
                paddingVertical={{
                  default: 0,
                }}
                key={userCoin.id}
                composition={userCoin.coin.ref.composition}
                year={userCoin.coin.year}
                value={userCoin.coin.ref.value}
                diameter={userCoin.coin.ref.diameter}
                weight={userCoin.coin.ref.weight}
                observeImage={
                  userCoin.observeImage ?? userCoin.coin.ref.observeImage
                }
                reverseImage={
                  userCoin.reverseImage ?? userCoin.coin.ref.reverseImage
                }
                price={userCoin.price}
                type={userCoin.coin.ref.type}
                yearRange={getYearRange(userCoin.coin.ref.coins)}
                link={getLink('coin.item', {
                  queries: {
                    coinId: userCoin.coin.id,
                    coinRefId: userCoin.coin.ref.id,
                  },
                })}
              />
            ))}

            {lastCoinsByUserIdData?.length === 0 && (
              <span>No coins for this user</span>
            )}
          </Card>
          <Card
            css={{
              rowGap: '$16',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Title as="h2">Echange</Title>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
